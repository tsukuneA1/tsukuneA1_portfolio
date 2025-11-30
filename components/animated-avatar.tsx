"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const IMAGES = ["/idle.png", "/move1.png", "/move2.png"] as const;

export const AnimatedAvatar = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isHovered) {
			interval = setInterval(() => {
				setCurrentImageIndex((prevIndex) => {
					if (prevIndex === 0) return 1;
					return prevIndex === 1 ? 2 : 1;
				});
			}, 300);
		} else {
			setCurrentImageIndex(0);
		}

		return () => clearInterval(interval);
	}, [isHovered]);

	return (
		<div
			className="relative w-32 h-32 flex items-center justify-center mx-auto"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Image
				src={IMAGES[currentImageIndex]}
				alt="Avatar"
				width={128}
				height={128}
				priority
			/>

			<div className="hidden">
				{IMAGES.map((src) => (
					<img key={src} src={src} alt="preload" />
				))}
			</div>
		</div>
	);
};
