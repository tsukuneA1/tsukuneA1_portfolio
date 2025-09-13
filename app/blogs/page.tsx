import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	content?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
	const blogDir = path.join(process.cwd(), "app/blogs/constants");
	const filenames = await fs.readdir(blogDir);
	const mdFiles = filenames.filter((name) => name.endsWith(".md"));

	const posts = await Promise.all(
		mdFiles.map(async (filename) => {
			const filePath = path.join(blogDir, filename);
			const fileContents = await fs.readFile(filePath, "utf8");
			const { data } = matter(fileContents);

			return {
				id: path.basename(filename, ".md"),
				title: data.title,
				excerpt: data.excerpt,
				date: data.createdAt,
			};
		}),
	);

	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export default async function BlogsPage() {
	const blogPosts = await getBlogPosts();

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
			<div className="space-y-6">
				{blogPosts.map((post) => (
					<article key={post.id} className="border-b border-gray-200 pb-6">
						<Link
							href={`/blogs/${post.id}`}
							className="block group hover:opacity-80 transition-opacity"
						>
							<h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
								{post.title}
							</h2>
							<p className="text-gray-600 mb-2">{post.excerpt}</p>
							<time className="text-sm text-gray-400">{post.date}</time>
						</Link>
					</article>
				))}
			</div>
		</div>
	);
}
