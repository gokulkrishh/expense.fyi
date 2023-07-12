import { tierNames } from 'constants/index';

const defaultClassName =
	'ml-2 mr-2 inline-block h-[18px] w-fit rounded-md px-1 text-center text-[8px] font-bold uppercase leading-[18px] text-black';

export default function PlanBadge({ plan = tierNames.basic.key, className = '', isPremiumPlanEnded }) {
	const colorClassName = plan === tierNames.premium.key ? 'bg-yellow-300' : 'bg-sky-300';
	return (
		<p className={`${defaultClassName} ${colorClassName} ${className}`}>{isPremiumPlanEnded ? 'Expired' : plan}</p>
	);
}
