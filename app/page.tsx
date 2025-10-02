import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotatableAvatar } from "@/components/ui/rotatable-avatar";
import { Typewriter } from "@/components/ui/typewriter";
import { TimelineItem } from "@/components/timeline-item";
import {
	BACKEND_SKILLS,
	EXPERIENCE_DATA,
	FRONTEND_SKILLS,
	TOOL_SKILLS,
} from "./constants";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { SkillBadge } from "@/components/skill-badge";

export default function Home() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8 space-y-24">
				{/* Biography Section */}
				<section id="biography" className="space-y-6">
					<div className="text-center space-y-4">
						<RotatableAvatar src="avatar.png" alt="TsukuneA1's Avatar" />
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
					<Card className="max-w-4xl mx-auto py-4 md:px-6">
						<CardHeader>
							<CardTitle>About Me</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground">
								早稲田大学基幹理工学部情報理工学科2年生
							</p>
						</CardContent>
					</Card>
				</section>

				{/* Skills Section */}
				<section id="skills" className="space-y-6">
					<div className="text-center">
						<TypographyH2 text="Skills" />
						<p className="text-muted-foreground mt-2">技術スタックとツール</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Frontend</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{FRONTEND_SKILLS.map((skill) => (
										<SkillBadge key={skill.displayName} {...skill} />
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
									{BACKEND_SKILLS.map((skill) => (
										<SkillBadge key={skill.displayName} {...skill} />
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
									{TOOL_SKILLS.map((skill) => (
										<SkillBadge key={skill.displayName} {...skill} />
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
							これまでの職務経験とプロジェクト
						</p>
					</div>
					<div className="max-w-4xl mx-auto">
						<div className="relative">
							<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

							<div className="space-y-8">
								{EXPERIENCE_DATA.map((experience, index) => (
									<TimelineItem key={index} {...experience} />
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section id="contact" className="space-y-6">
					<div className="text-center">
						<TypographyH2 text="Contact" />
						<p className="text-muted-foreground mt-2">
							連絡先情報とソーシャルメディア
						</p>
					</div>
					<div className="flex justify-center">
						<a
							href="https://github.com/tsukuneA1"
							aria-label="Visit my GitHub profile"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									fillRule="evenodd"
									d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
								/>
							</svg>
						</a>
					</div>
				</section>
			</div>
		</div>
	);
}
