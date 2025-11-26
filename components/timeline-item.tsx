import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

import React from "react";

type AnchorProps = {
  url: string;
  children: React.ReactNode;
}

const Anchor = ({ url, children }: AnchorProps) => {
  return (
    <a
      href={url}
      className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-slate-700 after:scale-x-0 after:scale-y-100 after:origin-left-top after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-right-top"
    >
      {children}
    </a>
  );
}


type TimelineItemProps = {
	title: string;
	subtitle: string;
	url: string;
	period: string;
	description: string;
	blogUrl?: string;
};

export function TimelineItem({
	title,
	subtitle,
	url,
	period,
	description,
	blogUrl,
}: TimelineItemProps) {
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
							<CardDescription>
								{subtitle}
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
