import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

type Summary = { title: String; data: any; icon?: any; tooltip?: string; info?: any };

export default function SummaryCard({ title, data, icon: Icon, tooltip = '', info: Info }: Summary) {
	const IconWithTooltip = () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Icon className="absolute right-3 top-1 h-4 w-4" />
			</TooltipTrigger>
			<TooltipContent className="normal-case" side="bottom">
				{tooltip}
			</TooltipContent>
		</Tooltip>
	);

	return (
		<Card className="relative">
			<CardHeader className="pb-0">
				<CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
					{title}
					{Info ? <Info /> : null}
				</CardTitle>
				{Icon && tooltip ? <IconWithTooltip /> : Icon ? <Icon className="absolute right-3 top-1 h-4 w-4" /> : null}
			</CardHeader>
			<CardContent>
				<p
					title={data}
					className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-extrabold tabular-nums text-foreground"
				>
					{data}
				</p>
			</CardContent>
		</Card>
	);
}
