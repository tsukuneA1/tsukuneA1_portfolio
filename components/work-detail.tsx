"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Github, ExternalLink } from "lucide-react";

interface Message {
	id: string;
	content: string;
	sender: "user" | "assistant";
	timestamp: Date;
}

export interface Work {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	githubUrl: string;
	demoUrl?: string;
	repositoryName: string; // For gitMCP integration
	githubOwner: string; // For gitMCP integration
}

interface WorkDetailProps {
	work: Work;
}

export default function WorkDetail({ work }: WorkDetailProps) {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: `こんにちは！${work.title}リポジトリについて何でも質問してください。コードの内容、使用方法、実装について説明します。`,
			sender: "assistant",
			timestamp: new Date(),
		},
	]);
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: inputMessage,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputMessage("");
		setIsLoading(true);

		try {
			const response = await fetch(`/api/chat/${work.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: inputMessage,
					repositoryName: work.repositoryName,
					githubOwner: work.githubOwner,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			const data = await response.json();

			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: data.content,
				sender: "assistant",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Error sending message:", error);

			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				content:
					"申し訳ございません。エラーが発生しました。しばらくお待ちしてから再度お試しください。",
				sender: "assistant",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold tracking-tight mb-4">
						{work.title}
					</h1>
					<p className="text-xl text-muted-foreground mb-6">
						{work.description}
					</p>

					{/* Project Info */}
					<div className="flex flex-wrap gap-4 mb-6">
						<Button variant="outline" asChild>
							<a
								href={work.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="w-4 h-4 mr-2" />
								GitHub Repository
							</a>
						</Button>
						{work.demoUrl && (
							<Button variant="outline" asChild>
								<a
									href={work.demoUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<ExternalLink className="w-4 h-4 mr-2" />
									Live Demo
								</a>
							</Button>
						)}
					</div>

					{/* Technologies */}
					<div className="flex flex-wrap gap-2 mb-6">
						{work.technologies.map((tech) => (
							<Badge key={tech} variant="secondary">
								{tech}
							</Badge>
						))}
					</div>
				</div>

				{/* Chat Interface */}
				<Card className="max-w-4xl mx-auto">
					<CardHeader>
						<CardTitle>リポジトリについて質問してください</CardTitle>
						<CardDescription>
							このチャットでは、{work.title}
							リポジトリの内容について詳しく説明します。
							コードの実装、使用方法、アーキテクチャなど、何でもお聞きください。
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* Messages */}
						<ScrollArea className="h-96 w-full pr-4 mb-4">
							<div className="space-y-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
									>
										<div
											className={`max-w-[70%] rounded-lg px-4 py-2 ${
												message.sender === "user"
													? "bg-primary text-primary-foreground"
													: "bg-muted"
											}`}
										>
											<p className="text-sm">{message.content}</p>
											<p className="text-xs opacity-70 mt-1">
												{message.timestamp.toLocaleTimeString()}
											</p>
										</div>
									</div>
								))}
								{isLoading && (
									<div className="flex justify-start">
										<div className="bg-muted rounded-lg px-4 py-2">
											<p className="text-sm">回答を生成中...</p>
										</div>
									</div>
								)}
							</div>
						</ScrollArea>

						{/* Input */}
						<div className="flex gap-2">
							<Input
								placeholder="リポジトリについて質問してください..."
								value={inputMessage}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setInputMessage(e.target.value)
								}
								onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
									e.key === "Enter" && handleSendMessage()
								}
								disabled={isLoading}
							/>
							<Button
								onClick={handleSendMessage}
								disabled={isLoading || !inputMessage.trim()}
							>
								<Send className="w-4 h-4" />
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
