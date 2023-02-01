const defaultClassName =
	'ml-2 mr-2 inline-block h-[20px] w-fit rounded-full px-2 text-center text-xs font-medium leading-[18px] text-black absolute right-[-10px] leading-[1.6] text-white';

export default function Badge({ className, text }) {
	return <span className={`${defaultClassName} ${className}`}>{text}</span>;
}
