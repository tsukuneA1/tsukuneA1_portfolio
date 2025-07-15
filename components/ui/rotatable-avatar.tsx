"use client";

import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarImage } from "./avatar";

interface RotatableAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export function RotatableAvatar({ src, alt, className = "" }: RotatableAvatarProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const avatarRef = useRef<HTMLDivElement>(null);

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
    const angle = getAngle(e.clientX, e.clientY);
    setStartAngle(angle);
    setStartRotation(rotation);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const angle = getAngle(touch.clientX, touch.clientY);
    setStartAngle(angle);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const currentAngle = getAngle(e.clientX, e.clientY);
    const deltaAngle = currentAngle - startAngle;
    setRotation(startRotation + deltaAngle);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const currentAngle = getAngle(touch.clientX, touch.clientY);
    const deltaAngle = currentAngle - startAngle;
    setRotation(startRotation + deltaAngle);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, startAngle, startRotation]);

  return (
    <div
      ref={avatarRef}
      className={`select-none cursor-grab active:cursor-grabbing transition-transform duration-75 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
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
}