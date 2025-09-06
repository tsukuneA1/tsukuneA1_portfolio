import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

// GitHub API クライアント（パブリックアクセス用）
const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN, // オプション：レート制限を上げるため
});

async function fetchRepositoryData(owner: string, repo: string) {
	try {
		const [repoInfo, fileTree, commits, readme] = await Promise.all([
			octokit.repos.get({ owner, repo }),
			octokit.git
				.getTree({
					owner,
					repo,
					tree_sha: "HEAD",
					recursive: "true",
				})
				.catch(() => ({ data: { tree: [] } })),
			octokit.repos
				.listCommits({
					owner,
					repo,
					per_page: 5,
				})
				.catch(() => ({ data: [] })),
			octokit.repos.getReadme({ owner, repo }).catch(() => null),
		]);

		return {
			info: repoInfo.data,
			files: fileTree.data.tree,
			commits: commits.data,
			readme: readme?.data,
		};
	} catch (error) {
		console.error("Error fetching repository data:", error);
		throw error;
	}
}

async function analyzeQuestion(message: string, repoData: any) {
	const { info, files, commits, readme } = repoData;

	// 質問の種類を判定
	const questionTypes = {
		structure: /構造|ファイル|ディレクトリ|architecture/i.test(message),
		commits: /コミット|履歴|変更|history/i.test(message),
		readme: /README|説明|使い方|how to/i.test(message),
		tech: /技術|言語|フレームワーク|technology/i.test(message),
		general: true,
	};

	let response = `${info.full_name}について回答します。\n\n`;

	if (questionTypes.structure) {
		const mainFiles = files
			.filter((f) => f.type === "blob")
			.slice(0, 10)
			.map((f) => f.path)
			.join("\n- ");

		response += `## プロジェクト構造\n主要ファイル:\n- ${mainFiles}\n\n`;
	}

	if (questionTypes.commits) {
		const recentCommits = commits
			.slice(0, 3)
			.map(
				(c) =>
					`- ${c.commit.message} (${new Date(c.commit.author.date).toLocaleDateString()})`,
			)
			.join("\n");

		response += `## 最近のコミット\n${recentCommits}\n\n`;
	}

	if (questionTypes.readme && readme) {
		const content = Buffer.from(readme.content, "base64").toString("utf8");
		const preview = content.slice(0, 300) + (content.length > 300 ? "..." : "");
		response += `## README\n${preview}\n\n`;
	}

	if (questionTypes.tech) {
		response += `## 技術情報\n`;
		response += `- 主要言語: ${info.language || "N/A"}\n`;
		response += `- サイズ: ${info.size} KB\n`;
		response += `- 最終更新: ${new Date(info.updated_at).toLocaleDateString()}\n\n`;
	}

	// プロジェクトの基本情報を追加
	response += `## プロジェクト概要\n`;
	response += `${info.description || "プロジェクトの説明がありません。"}\n\n`;
	response += `⭐ ${info.stargazers_count} Stars | 🍴 ${info.forks_count} Forks`;

	return response;
}

export async function POST(request: NextRequest) {
	try {
		const { message, repositoryName, githubOwner } = await request.json();

		// GitHub APIでリポジトリ情報を取得
		const repoData = await fetchRepositoryData(githubOwner, repositoryName);

		// 質問を分析して回答を生成
		const response = await analyzeQuestion(message, repoData);

		return NextResponse.json({
			content: response,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error processing chat message:", error);

		// エラーの種類に応じた回答
		if (error.status === 404) {
			return NextResponse.json({
				content: `リポジトリ「${githubOwner}/${repositoryName}」が見つかりませんでした。リポジトリ名を確認してください。`,
				timestamp: new Date().toISOString(),
			});
		}

		if (error.status === 403) {
			return NextResponse.json({
				content: `リポジトリ「${githubOwner}/${repositoryName}」へのアクセスが制限されています。プライベートリポジトリの可能性があります。`,
				timestamp: new Date().toISOString(),
			});
		}

		return NextResponse.json({
			content:
				"申し訳ございません。リポジトリ情報の取得中にエラーが発生しました。しばらくしてから再度お試しください。",
			timestamp: new Date().toISOString(),
		});
	}
}
