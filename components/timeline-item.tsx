import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface TimelineItemProps {
	title: string;
	affiliation: string;
	affiliationUrl?: string;
	period: string;
	description: string;
}

export function TimelineItem({
	title,
	affiliation,
	affiliationUrl,
	period,
	description,
}: TimelineItemProps) {
	return (
		<div className="relative flex items-start space-x-4">
			<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full border-4 border-background relative z-10"></div>
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
				</CardContent>
			</Card>
		</div>
	);
}
