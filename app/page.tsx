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
import { TimelineItem } from "@/components/timeline-item";
import { EXPERIENCE_DATA, SKILLS_DATA } from "./constants";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Github, GithubIcon } from "lucide-react";

export default function Home() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8 space-y-24">
				{/* Biography Section */}
				<section id="biography" className="space-y-6">
					<div className="text-center space-y-4">
						<RotatableAvatar src="avatar.png" alt="TsukuneA1's Avatar"/>
						<TypographyH1 text="TsukuneA1" />

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
						<TypographyH2 text="Skills" />
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
									{SKILLS_DATA.frontend.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Backend</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{SKILLS_DATA.backend.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Tools</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{SKILLS_DATA.tools.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Experience Section */}
				<section id="experience" className="space-y-6">
					<div className="text-center">
						<TypographyH2 text="Experience" />
						<p className="text-muted-foreground mt-2">
							My professional journey
						</p>
					</div>
					<div className="max-w-4xl mx-auto">
						<div className="relative">
							<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

							<div className="space-y-8">
								{EXPERIENCE_DATA.map((experience, index) => (
									<TimelineItem
										key={index}
										title={experience.title}
										affiliation={experience.affiliation}
										affiliationUrl={experience.affiliationUrl}
										period={experience.period}
										description={experience.description}
									/>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section id="contact" className="space-y-6">
					<div className="text-center">
						<TypographyH2 text="Contact" />
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
							<a href="https://github.com/tsukuneA1">
								<GithubIcon className="mx-auto" size={48} />
							</a>

							{/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Button variant="outline" className="w-full">
									Email Me
								</Button>
								<Button variant="outline" className="w-full">
									LinkedIn
								</Button>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => window.open("https://github.com/tsukuneA1/")}
								>
									GitHub
								</Button>
								<Button variant="outline" className="w-full">
									Twitter
								</Button>
							</div> */}
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}
