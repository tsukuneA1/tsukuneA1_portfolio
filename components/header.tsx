"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "Profile" },
		{ href: "/works", label: "Works" },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<span className="font-bold text-xl">TsukuneA1</span>
					</Link>

					<nav className="flex items-center space-x-2">
						{navItems.map((item) => (
							<Button
								key={item.href}
								variant={pathname === item.href ? "default" : "ghost"}
								asChild
							>
								<Link href={item.href}>{item.label}</Link>
							</Button>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
