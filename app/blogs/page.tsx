import Link from "next/link";
import { blogPosts } from "./constants";

export default function BlogsPage() {
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
