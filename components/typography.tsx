type TypographyH1Props = {
	text: string;
};

export const TypographyH1 = ({ text }: TypographyH1Props) => {
	return (
		<h1 className="text-4xl font-bold tracking-tight border-b-3 border-primary-accent pb-2 inline-block">
			{text}
		</h1>
	);
};

type TypographyH2Props = {
	text: string;
};

export const TypographyH2 = ({ text }: TypographyH2Props) => {
	return (
		<h2 className="text-3xl font-semibold tracking-tight border-b-2 border-primary-accent pb-1 inline-block">
			{text}
		</h2>
	);
};
