"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotatableAvatar } from "@/components/ui/rotatable-avatar";
import { Typewriter } from "@/components/ui/typewriter";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-background bg-gray-900">
			<div className="container mx-auto px-4 py-8 space-y-24">
				{/* Biography Section */}
				<section id="biography" className="space-y-6">
					<div className="text-center space-y-4">
						<RotatableAvatar
							src="avatar.png"
							alt="TsukuneA1's Avatar"
						/>
						<h1 className="text-4xl font-bold tracking-tight text-white">TsukuneA1</h1>

						<div className="flex flex-wrap justify-center whitespace-pre text-[26px] sm:text-2xl md:text-[48px] tracking-tight text-gradient animate-gradient-x text-center font-bold text-4xl bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 bg-clip-text text-transparent">
							<span className="font-bold">I'm a</span>
							<Typewriter
								typeWriterText={[
									" software engineer",
									" web developer",
									" full-stack developer",
									" typescript enthusiast",
								]}
							/>
						</div>
					</div>
					<Card className="max-w-4xl mx-auto">
						<CardHeader>
							<CardTitle>About Me</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground">
								現在早稲田大学基幹理工学部情報理工学科2年生
							</p>
						</CardContent>
					</Card>
				</section>

				{/* Skills Section */}
				<section id="skills" className="space-y-6">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-white">Skills</h2>
						<p className="text-muted-foreground mt-2">
							Technologies and tools I work with
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Frontend</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary">Next.js</Badge>
									<Badge variant="secondary">React</Badge>
									<Badge variant="secondary">Shadcn</Badge>
									<Badge variant="secondary">Tailwind CSS</Badge>
									<Badge variant="secondary">TypeScript</Badge>
									<Badge variant="secondary">Astro</Badge>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Backend</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary">Ruby on Rails</Badge>
									<Badge variant="secondary">Hono</Badge>
									<Badge variant="secondary">Node.js</Badge>
									<Badge variant="secondary">Prisma</Badge>
									<Badge variant="secondary">Python</Badge>
									<Badge variant="secondary">PostgreSQL</Badge>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Tools</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary">Git</Badge>
									<Badge variant="secondary">Docker</Badge>
									<Badge variant="secondary">Vercel</Badge>
									<Badge variant="secondary">Slack</Badge>
									<Badge variant="secondary">Figma</Badge>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Experience Section */}
				<section id="experience" className="space-y-6">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-white">Experience</h2>
						<p className="text-muted-foreground mt-2">
							My professional journey
						</p>
					</div>
					<div className="max-w-4xl mx-auto">
						<div className="relative">
							{/* Timeline line */}
							<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

							<div className="space-y-8">
								<div className="relative flex items-start space-x-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full border-4 border-background relative z-10"></div>
									<Card className="flex-1">
										<CardHeader>
											<div className="flex justify-between items-start">
												<div>
													<CardTitle className="text-lg">
														フルスタックエンジニア
													</CardTitle>
													<CardDescription>
														<Link href="https://pocketsign.co.jp/">
														株式会社ポケットサイン
														</Link>
														
													</CardDescription>
												</div>
												<Badge variant="outline">August 2025 - Present</Badge>
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground">
												株式会社ポケットサインにてフルスタックエンジニアを担当
											</p>
										</CardContent>
									</Card>
								</div>

								<div className="relative flex items-start space-x-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full border-4 border-background relative z-10"></div>
									<Card className="flex-1">
										<CardHeader>
											<div className="flex justify-between items-start">
												<div>
													<CardTitle className="text-lg">
														フロントエンドエンジニア
													</CardTitle>
													<CardDescription>
														<Link href="https://algo-method.co.jp/">
														株式会社アルゴ式
														</Link>
														
													</CardDescription>
												</div>
												<Badge variant="outline">March 2025 - Present</Badge>
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground">
												株式会社アルゴ式にてフロントエンドエンジニアを担当
											</p>
										</CardContent>
									</Card>
								</div>

								<div className="relative flex items-start space-x-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full border-4 border-background relative z-10"></div>
									<Card className="flex-1">
										<CardHeader>
											<div className="flex justify-between items-start">
												<div>
													<CardTitle className="text-lg">
														プログラミングの勉強を開始
													</CardTitle>
													<CardDescription>Previous Company</CardDescription>
												</div>
												<Badge variant="outline">April 2024 - Present</Badge>
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground">
												大学入学後、早稲田大学のコンピュータサークルWINCに参加し、
												プログラミングの基礎を学び始めました。
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section id="contact" className="space-y-6">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-white">Contact</h2>
						<p className="text-muted-foreground mt-2">Get in touch with me</p>
					</div>
					<Card className="max-w-2xl mx-auto">
						<CardHeader>
							<CardTitle>Let's Connect</CardTitle>
							<CardDescription>
								I'm always open to discussing new opportunities and interesting
								projects.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Button variant="outline" className="w-full">
									Email Me
								</Button>
								<Button variant="outline" className="w-full">
									LinkedIn
								</Button>
								<Button variant="outline" className="w-full">
									GitHub
								</Button>
								<Button variant="outline" className="w-full">
									Twitter
								</Button>
							</div>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}
