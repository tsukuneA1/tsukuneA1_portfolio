import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { readFile } from "fs/promises";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// TODO: getStaticPropsについてちゃんと公式ドキュメント読むんご
// TODO: npmのmarkdown系のライブラリを調査する(gray-matter, marked)
// TODO: 読む (https://zenn.dev/midra_lab/articles/f79768e1141046) I am piyopiyo. I am kusozako. zakodesumimasen.

type BlogContent = {
	title: string;
	excerpt: string;
	createdAt?: string;
	content?: string;
};

async function getBlogContent(fileName: string): Promise<BlogContent> {
	try {
		const filePath = join(
			process.cwd(),
			"app/blogs/constants",
			`${fileName}.md`,
		);
		const fileContents = await readFile(filePath, "utf-8");
		const { data, content } = matter(fileContents);

		const title = data.title || "Untitled";
		const excerpt = data.excerpt || "ブログ記事";
		const createdAt = data.createdAt;

		return {
			title,
			excerpt,
			createdAt,
			content,
		};
	} catch (error) {
		throw new Error(`Blog post not found: ${fileName}`);
	}
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ blog: string }>;
}) {
	const { blog } = await params;

	let content: BlogContent;
	try {
		content = await getBlogContent(blog);
	} catch (error) {
		notFound();
	}

	return (
		<article className="max-w-4xl mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold mb-2">{content.title}</h1>
				<time className="text-gray-500">作成日:{content.createdAt}</time>
			</header>

			<div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					components={{
						h1: ({ node, ...props }) => (
							<h1
								{...props}
								className="text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-gray-200 text-primary"
							/>
						),
						h2: ({ node, ...props }) => (
							<h2
								{...props}
								className="text-2xl font-semibold text-gray-800 mt-6 mb-3 pb-1 border-b-2 border-primary-accent text-primary"
							/>
						),
						h3: ({ node, ...props }) => (
							<h3
								{...props}
								className="text-xl font-medium text-gray-800 mt-5 mb-2"
							/>
						),
						a: ({ node, ...props }) => (
							<a
								{...props}
								className="text-blue-500 hover:text-blue-700 underline"
							/>
						),
						br: ({ node, ...props }) => <br {...props} className="mb-4" />,
						ol: ({ node, ...props }) => (
							<ol
								{...props}
								className="list-decimal list-inside mb-4 space-y-2"
							/>
						),
						ul: ({ node, ...props }) => (
							<ul {...props} className="list-disc list-inside mb-4 space-y-2" />
						),
						li: ({ node, ...props }) => <li {...props} className="ml-4" />,
					}}
				>
					{content.content}
				</ReactMarkdown>
			</div>
		</article>
	);
}

export async function generateStaticParams() {
	const blogDir = path.join(process.cwd(), "app/blogs/constants");
	const filenames = await fs.promises.readdir(blogDir);
	const mdFiles = filenames.filter((name) => name.endsWith(".md"));

	return mdFiles.map((filename) => ({
		blog: path.basename(filename, ".md"),
	}));
}
