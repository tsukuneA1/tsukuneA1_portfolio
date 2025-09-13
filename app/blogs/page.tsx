import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { TypographyH1 } from "@/components/typography";

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
			<div className="text-center space-y-4 mb-12">
				<TypographyH1 text="Blogs" />
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					これまでの体験や学びについての記事をまとめています
				</p>
			</div>

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
