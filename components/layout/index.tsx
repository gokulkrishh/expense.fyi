'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

export default function Layout({ children }: { children: any }) {
	return <Tooltip.Provider delayDuration={500}>{children}</Tooltip.Provider>;
}
