import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { blogPosts } from "../constants";
import { readFile } from "fs/promises";
import { join } from "path";

async function getBlogContent(id: string): Promise<string> {
	try {
		const filePath = join(
			process.cwd(),
			"app",
			"blogs",
			"constants",
			`${id}.md`,
		);
		const content = await readFile(filePath, "utf-8");
		return content;
	} catch (error) {
		throw new Error(`Blog post not found: ${id}`);
	}
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ blog: string }>;
}) {
	const { blog } = await params;
	const post = blogPosts.find((p) => p.id === blog);

	if (!post) {
		notFound();
	}

	let content: string;
	try {
		content = await getBlogContent(blog);
	} catch (error) {
		notFound();
	}

	return (
		<article className="max-w-4xl mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
				<time className="text-gray-500">{post.date}</time>
			</header>

			<div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					components={{
						h1: ({ node, ...props }) => (
							<h1
								{...props}
								className="text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-gray-200"
							/>
						),
						h2: ({ node, ...props }) => (
							<h2
								{...props}
								className="text-2xl font-semibold text-gray-800 mt-6 mb-3 pb-1 border-b border-gray-300"
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
					{content}
				</ReactMarkdown>
			</div>
		</article>
	);
}

export function generateStaticParams() {
	return blogPosts.map((post) => ({
		blog: post.id,
	}));
}
