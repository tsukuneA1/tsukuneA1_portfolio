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
		period: "August 2025 - October 2025",
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
			"大学入学後、早稲田大学のコンピュータサークルWINCに参加し、Web開発を学び始めました。",
		affiliationUrl: "https://www.winc.ne.jp/",
	},
] as const;

type SkillData = {
	displayName: string;
	iconPath: string;
};

export const FRONTEND_SKILLS: SkillData[] = [
	{ displayName: "Next.js", iconPath: "next" },
	{ displayName: "React", iconPath: "react" },
	{ displayName: "Tailwind CSS", iconPath: "tailwind" },
	{ displayName: "TypeScript", iconPath: "ts" },
	{ displayName: "Astro", iconPath: "astro" },
];

export const BACKEND_SKILLS: SkillData[] = [
	{ displayName: "Ruby on Rails", iconPath: "rails" },
	{ displayName: "Go", iconPath: "go" },
	{ displayName: "Node.js", iconPath: "nodejs" },
	{ displayName: "Prisma", iconPath: "prisma" },
	{ displayName: "Python", iconPath: "python" },
	{ displayName: "PostgreSQL", iconPath: "postgres" },
	{ displayName: "TypeScript", iconPath: "ts" },
];

export const TOOL_SKILLS: SkillData[] = [
	{ displayName: "Git", iconPath: "git" },
	{ displayName: "GitHub", iconPath: "github" },
	{ displayName: "Docker", iconPath: "docker" },
	{ displayName: "Vercel", iconPath: "vercel" },
	{ displayName: "Figma", iconPath: "figma" },
];
