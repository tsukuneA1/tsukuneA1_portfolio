export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	content?: string;
}

export const blogPosts: BlogPost[] = [
	{
		id: "hackathon_pm",
		title: "WINCというサークルの夏合宿ハッカソンでPMをやった話",
		excerpt:
			"早稲田大学のWINCというプログラミングサークルで毎年夏に開催されているアプリ開発ハッカソンに参加しました。なぜかPMをやっていてGithubの情報をFFだったりフォローしていなくても受動的にfeedできるアプリを開発していました。",
		date: "2025-09-06",
	},
];
