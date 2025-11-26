import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Link from "next/link";
import { Anchor } from "../../components/anchor";
import { EXPERIENCE_DATA } from "../constants";

type TimelineItemProps = {
	title: string;
	subtitle: string;
	url: string;
	period: string;
	description: string;
	blogUrl?: string;
};

const TimelineItem = ({
	title,
	subtitle,
	url,
	period,
	description,
	blogUrl,
}: TimelineItemProps) => {
	return (
		<div className="relative flex items-start space-x-4 group">
			<div className="flex-shrink-0 w-4 h-4 bg-primary-accent group-hover:scale-130 group-hover:bg-white group-hover:border-primary-accent group-hover:border-2 rounded-full border-4 border-background relative z-10 transition-all duration-300"></div>
			<Card className="flex-1">
				<CardHeader>
					<div className="flex justify-between items-start">
						<div>
							<CardTitle className="text-lg">
								<Anchor url={url}>{title}</Anchor>
							</CardTitle>
							<CardDescription>{subtitle}</CardDescription>
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
};

export const Timeline = () => {
	return (
		<div className="max-w-4xl mx-auto">
			<div className="relative">
				<div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-border bg-primary-accent"></div>

				<div className="space-y-8">
					{EXPERIENCE_DATA.map((experience, index) => (
						<TimelineItem key={index} {...experience} />
					))}
				</div>
			</div>
		</div>
	);
};
