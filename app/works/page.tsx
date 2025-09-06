import { WorkCard } from "@/components/workCard";
import { works } from "./constants";

export default function Works() {
	return (
		<div className="min-h-screen bg-background bg-gray-900">
			<div className="container mx-auto px-4 py-8">
				<div className="text-center space-y-4 mb-12">
					<h1 className="text-4xl font-bold tracking-tight text-white">
						Works
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						これまでに制作したプロジェクトや作品をご紹介します
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{works.map((work) => (
						<WorkCard key={work.id} {...work} />
					))}
				</div>
			</div>
		</div>
	);
}
