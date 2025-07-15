import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { message, repositoryName, githubOwner } = await request.json();

		// gitMCP integration would go here
		// For now, return a placeholder response
		const response = {
			content: `あなたの質問「${message}」について回答しています。gitMCP統合は現在実装中です。${githubOwner}/${repositoryName}リポジトリに関する具体的な情報は、GitHub上で直接確認できます。`,
			timestamp: new Date().toISOString(),
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error("Error processing chat message:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
