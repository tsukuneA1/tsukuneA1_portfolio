"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export type Work = {
	image: string;
	title: string;
	description: string;
	technologies: string[];
	demoUrl: string;
	githubUrl: string;
    detailUrl: string;
};

export const WorkCard = (work: Work) => {
	return (
		<Card className="group hover:shadow-lg transition-shadow">
            <Link href={work.detailUrl}>
            <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
				<img
					src={work.image}
					alt={work.title}
					className="w-full h-full object-contain"
				/>
			</div>
            </Link>
			
			<CardHeader>
				<div className="flex justify-between items-start">
					<CardTitle className="text-lg group-hover:text-primary transition-colors">
						{work.title}
					</CardTitle>
				</div>
				<CardDescription>{work.description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-wrap gap-2">
					{work.technologies.map((tech) => (
						<Badge key={tech} variant="secondary" className="text-xs">
							{tech}
						</Badge>
					))}
				</div>
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="default"
						className="flex-1"
						onClick={() => window.open(work.demoUrl, "_blank")}
					>
						Demo
					</Button>

					<Button
						size="sm"
						variant="outline"
						className="flex-1"
						onClick={() => window.open(work.githubUrl, "_blank")}
					>
						GitHub
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
