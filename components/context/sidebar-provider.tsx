'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const SidebarContext = createContext(null);

type Props = {
	children: React.ReactNode;
};

export const SidebarContextProvider = (props: Props) => {
	const { children } = props;
	const [show, setShow] = useState(false);

	const value = useMemo(() => ({ show, setShow }), [show, setShow]);

	return <SidebarContext.Provider value={value as any}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
	const context = useContext<any>(SidebarContext);
	if (context === undefined) {
		throw new Error(`useSidebar must be used within a SidebarContext.`);
	}
	return context;
};
