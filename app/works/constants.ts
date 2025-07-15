type Work = {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl: string;
    githubUrl: string;
    detailUrl: string;
    year: string;
}

export const works: Work[] = [
	{
		id: 1,
		title: "ポケモン金ネジキダメージ計算アプリ",
		description:
			"ポケモンプラチナ・HGSSの金ネジキ戦でのダメージ計算を支援するアプリ。React、TypeScript、Tailwind CSSを使用。",
		image: "/nejiki-image.png",
		technologies: [
			"Next.js",
			"TypeScript",
			"Prisma",
			"Supabase",
			"Tailwind CSS",
		],
		demoUrl: "https://nejiki-calculator.com/",
		githubUrl: "https://github.com/tsukuneA1/nejiki_calculator",
		year: "2024",
        detailUrl: "works/nejiki-calculator",
	},
] as const;