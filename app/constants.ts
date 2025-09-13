export interface ExperienceItem {
	title: string;
	affiliation: string;
	affiliationUrl?: string;
	period: string;
	description: string;
}

export const EXPERIENCE_DATA = [
	{
		title: "フルスタックエンジニア",
		affiliation: "株式会社ポケットサイン",
		affiliationUrl: "https://pocketsign.co.jp/",
		period: "August 2025 - Present",
		description: "株式会社ポケットサインにてフルスタックエンジニアを担当",
	},
	{
		title: "CS専攻大学生になる",
		affiliation: "早稲田大学情報理工学科",
		affiliationUrl: "https://www.cs.waseda.ac.jp/",
		period: "April 2025 - Present",
		description:
			"大学の進振りで第一希望の情報理工学科に進学でき、本格的にコンピュータサイエンスを専攻し始める",
	},
	{
		title: "フロントエンドエンジニア",
		affiliation: "株式会社アルゴ式",
		affiliationUrl: "https://algo-method.co.jp/",
		period: "March 2025 - Present",
		description: "株式会社アルゴ式にてフロントエンドエンジニアを担当",
	},
	{
		title: "プログラミングの勉強を開始",
		affiliation: "winc",
		period: "April 2024 - Present",
		description:
			"大学入学後、早稲田大学のコンピュータサークルWINCに参加し、プログラミングの基礎を学び始めました。",
		affiliationUrl: "https://www.winc.ne.jp/",
	},
] as const;

export const SKILLS_DATA = {
	frontend: [
		"Next.js",
		"React",
		"Shadcn",
		"Tailwind CSS",
		"TypeScript",
		"Astro",
		"Tanstack Query",
	],
	backend: [
		"Ruby on Rails",
		"Hono",
		"Node.js",
		"Prisma",
		"Python",
		"PostgreSQL",
		"Go lang",
	],
	tools: ["Git", "Docker", "Vercel", "Slack", "Figma"],
} as const;
