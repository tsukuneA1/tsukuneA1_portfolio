import React from "react";

type AnchorProps = {
	url: string;
	children: React.ReactNode;
};

export const Anchor = ({ url, children }: AnchorProps) => {
	return (
		<a
			href={url}
			className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-slate-700 after:scale-x-0 after:scale-y-100 after:origin-left-top after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-right-top"
		>
			{children}
		</a>
	);
};
