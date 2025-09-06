"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Avatar, AvatarImage } from "./avatar";

interface RotatableAvatarProps {
	src: string;
	alt: string;
	className?: string;
}

export const RotatableAvatar = ({
	src,
	alt,
	className = "",
}: RotatableAvatarProps) => {
	const [rotation, setRotation] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [startAngle, setStartAngle] = useState(0);
	const [startRotation, setStartRotation] = useState(0);
	const [velocity, setVelocity] = useState(0);
	const [isSpinning, setIsSpinning] = useState(false);
	const [lastMoveTime, setLastMoveTime] = useState(0);
	const [lastAngle, setLastAngle] = useState(0);
	const avatarRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number>(0);

	const getAngle = (clientX: number, clientY: number) => {
		if (!avatarRef.current) return 0;

		const rect = avatarRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(true);
		setIsSpinning(false);
		setVelocity(0);
		const angle = getAngle(e.clientX, e.clientY);
		setStartAngle(angle);
		setStartRotation(rotation);
		setLastAngle(angle);
		setLastMoveTime(Date.now());
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		e.preventDefault();
		setIsDragging(true);
		setIsSpinning(false);
		setVelocity(0);
		const touch = e.touches[0];
		const angle = getAngle(touch.clientX, touch.clientY);
		setStartAngle(angle);
		setStartRotation(rotation);
		setLastAngle(angle);
		setLastMoveTime(Date.now());
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;

		const currentAngle = getAngle(e.clientX, e.clientY);
		const currentTime = Date.now();
		const deltaAngle = currentAngle - startAngle;
		const timeDiff = currentTime - lastMoveTime;

		if (timeDiff > 0) {
			const angleDiff = currentAngle - lastAngle;
			setVelocity((angleDiff / timeDiff) * 16.67); // 60fps基準で調整
		}

		setRotation(startRotation + deltaAngle);
		setLastAngle(currentAngle);
		setLastMoveTime(currentTime);
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (!isDragging) return;
		e.preventDefault();

		const touch = e.touches[0];
		const currentAngle = getAngle(touch.clientX, touch.clientY);
		const currentTime = Date.now();
		const deltaAngle = currentAngle - startAngle;
		const timeDiff = currentTime - lastMoveTime;

		if (timeDiff > 0) {
			const angleDiff = currentAngle - lastAngle;
			setVelocity((angleDiff / timeDiff) * 16.67);
		}

		setRotation(startRotation + deltaAngle);
		setLastAngle(currentAngle);
		setLastMoveTime(currentTime);
	};

	const handleEnd = () => {
		setIsDragging(false);
		// 一定以上の速度があれば慣性回転を開始
		if (Math.abs(velocity) > 0.5) {
			setIsSpinning(true);
		}
	};

	// 慣性回転のアニメーション
	const spinAnimation = useCallback(() => {
		if (!isSpinning) return;

		setRotation((prev) => prev + velocity);

		// 摩擦による減速
		setVelocity((prev) => {
			const newVelocity = prev * 0.98; // 摩擦係数

			// 速度が十分小さくなったら停止
			if (Math.abs(newVelocity) < 0.1) {
				setIsSpinning(false);
				return 0;
			}

			return newVelocity;
		});

		animationRef.current = requestAnimationFrame(spinAnimation);
	}, [isSpinning, velocity]);

	useEffect(() => {
		if (isSpinning) {
			animationRef.current = requestAnimationFrame(spinAnimation);
		} else {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isSpinning, spinAnimation]);

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleEnd);
			document.addEventListener("touchmove", handleTouchMove, {
				passive: false,
			});
			document.addEventListener("touchend", handleEnd);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleEnd);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleEnd);
		};
	}, [isDragging, startAngle, startRotation, lastAngle, lastMoveTime]);

	return (
		<div
			ref={avatarRef}
			className={`select-none cursor-grab active:cursor-grabbing ${className}`}
			style={{
				transform: `rotate(${rotation}deg)`,
				transition:
					isDragging || isSpinning ? "none" : "transform 0.3s ease-out",
			}}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		>
			<Avatar className="mx-auto w-36 h-36">
				<AvatarImage
					src={src}
					alt={alt}
					className="rounded-full w-36 h-36 mx-auto object-cover"
				/>
			</Avatar>
		</div>
	);
};
