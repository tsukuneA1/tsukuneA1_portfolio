import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

type TimelineItemProps = {
	title: string;
	affiliation: string;
	affiliationUrl?: string;
	period: string;
	description: string;
	blogUrl?: string;
};

export function TimelineItem({
	title,
	affiliation,
	affiliationUrl,
	period,
	description,
	blogUrl,
}: TimelineItemProps) {
	return (
		<div className="relative flex items-start space-x-4">
			<div className="flex-shrink-0 w-4 h-4 bg-primary-accent hover:scale-130 hover:bg-white hover:border-primary-accent hover:border-2 rounded-full border-4 border-background relative z-10 transition-all duration-300"></div>
			<Card className="flex-1">
				<CardHeader>
					<div className="flex justify-between items-start">
						<div>
							<CardTitle className="text-lg">{title}</CardTitle>
							<CardDescription>
								{affiliationUrl ? (
									<Link href={affiliationUrl}>{affiliation}</Link>
								) : (
									affiliation
								)}
							</CardDescription>
						</div>
						<Badge variant="outline">{period}</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">{description}</p>
					{blogUrl && (
						<Link
							href={blogUrl}
							className="text-blue-500 hover:text-blue-700 underline mt-2 block"
						>
							Read more
						</Link>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
