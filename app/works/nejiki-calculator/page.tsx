import WorkDetail from "@/components/work-detail";

const nejikiCalculatorWork = {
	id: "nejiki-calculator",
	title: "Nejiki Calculator",
	description: "金ネジキのダメージ計算を簡単に行えるWebアプリケーション",
	technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
	githubUrl: "https://github.com/tsukuneA1/nejiki_calculator",
	demoUrl: undefined, // デモURLがない場合はundefinedに設定
	repositoryName: "nejiki_calculator",
	githubOwner: "tsukuneA1",
};

export default function NejikiCalculatorPage() {
	return <WorkDetail work={nejikiCalculatorWork} />;
}
