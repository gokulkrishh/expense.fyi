import Image from 'next/image';

import SvgLogoWhite from 'public/static/icons/logo-white.svg';
import SvgLogoBlack from 'public/static/icons/logo.svg';

export default function Logo({ theme = 'dark', w = '28', h = '28' }) {
	return (
		<>
			{theme === 'white' ? (
				<Image src={SvgLogoWhite} className="mr-2" width={w} height={h} alt="Expense.fyi" />
			) : (
				<Image src={SvgLogoBlack} className="mr-2" width={w} height={h} alt="Expense.fyi" />
			)}
			<span className="font-default font-black tracking-[-0.03em]">Expense.fyi</span>
		</>
	);
}
