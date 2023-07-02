'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: any }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

	return mounted ? createPortal(children, document.querySelector('#modal-root')!) : null;
};

export default Portal;
