'use client';

import { usePathname, useRouter } from 'next/navigation';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import * as NProgress from 'nprogress';

const SidebarContext = createContext(null);

interface Sidebar {
	Sidebar: Array<any>;
}

type Props = {
	children: React.ReactNode;
};

export const SidebarContextProvider = (props: Props) => {
	const { children } = props;
	const [show, setShow] = useState(false);

	const value = useMemo(() => ({ show, setShow }), [show, setShow]);

	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		NProgress.done();
	}, [pathname, router]);

	return <SidebarContext.Provider value={value as any}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
	const context = useContext<any>(SidebarContext);
	if (context === undefined) {
		throw new Error(`useSidebar must be used within a SidebarContext.`);
	}
	return context;
};
