import { Badge } from "./ui/badge";

type SkillBadgeProps = {
	displayName: string;
	iconPath: string;
};

export const SkillBadge = ({ displayName, iconPath }: SkillBadgeProps) => {
	return (
		<Badge
			key={displayName}
			variant="secondary"
			className="text-md py-1 pl-1 pr-2 gap-2 flex items-center"
		>
			<img
				src={`https://skillicons.dev/icons?i=${iconPath}`}
				className="w-6 h-6"
			/>
			<p>{displayName}</p>
		</Badge>
	);
};
