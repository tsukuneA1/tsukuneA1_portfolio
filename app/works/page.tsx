import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

interface Work {
	id: number;
	title: string;
	description: string;
	image: string;
	technologies: string[];
	demoUrl?: string;
	githubUrl?: string;
	year: string;
}

const works: Work[] = [
	{
		id: 1,
		title: "E-commerce Platform",
		description:
			"フルスタックのEコマースプラットフォーム。Next.js、TypeScript、Prisma、PostgreSQLを使用して構築しました。",
		image: "/placeholder-project.jpg",
		technologies: [
			"Next.js",
			"TypeScript",
			"Prisma",
			"PostgreSQL",
			"Tailwind CSS",
		],
		demoUrl: "https://example.com",
		githubUrl: "https://github.com/example",
		year: "2024",
	},
	{
		id: 2,
		title: "Task Management App",
		description:
			"リアルタイム同期機能を持つタスク管理アプリケーション。React、Node.js、Socket.ioを使用。",
		image: "/placeholder-project.jpg",
		technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
		demoUrl: "https://example.com",
		githubUrl: "https://github.com/example",
		year: "2023",
	},
	{
		id: 3,
		title: "Weather Dashboard",
		description:
			"天気予報APIを活用したダッシュボードアプリ。Vue.js、Express、外部APIとの連携を実装。",
		image: "/placeholder-project.jpg",
		technologies: ["Vue.js", "Express", "Chart.js", "OpenWeather API"],
		demoUrl: "https://example.com",
		year: "2023",
	},
];

export default function Works() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<div className="container mx-auto px-4 py-8">
				<div className="text-center space-y-4 mb-12">
					<h1 className="text-4xl font-bold tracking-tight">Works</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						これまでに制作したプロジェクトや作品をご紹介します
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{works.map((work) => (
						<Card
							key={work.id}
							className="group hover:shadow-lg transition-shadow"
						>
							<div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
								<div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
									<span className="text-muted-foreground text-sm">
										Project Image
									</span>
								</div>
							</div>
							<CardHeader>
								<div className="flex justify-between items-start">
									<CardTitle className="text-lg group-hover:text-primary transition-colors">
										{work.title}
									</CardTitle>
									<Badge variant="outline">{work.year}</Badge>
								</div>
								<CardDescription>{work.description}</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-2">
									{work.technologies.map((tech) => (
										<Badge key={tech} variant="secondary" className="text-xs">
											{tech}
										</Badge>
									))}
								</div>
								<div className="flex gap-2">
									{work.demoUrl && (
										<Button size="sm" variant="default" className="flex-1">
											Demo
										</Button>
									)}
									{work.githubUrl && (
										<Button size="sm" variant="outline" className="flex-1">
											GitHub
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
