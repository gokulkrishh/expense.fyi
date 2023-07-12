import { useCallback, useState } from 'react';

import MenuIcon from 'components/Menu/MenuIcon';
import Sidebar from 'components/Menu/Sidebar';

export default function Layout({ className, children, user }) {
	const [state, setState] = useState({ show: false, overrideClassname: '' });

	const onToggle = useCallback(
		(isOutsideMenu) => {
			setState({ show: !state.show, overrideClassname: isOutsideMenu && !state.show ? 'max-sm:flex' : '' });
		},
		[state]
	);

	const onHide = useCallback(() => setState({ ...state, show: false }), [state]);

	return (
		<main className={`relative flex min-h-full w-full bg-zinc-50 ${className}`}>
			<Sidebar
				user={user}
				show={state.show}
				overrideClassname={state.overrideClassname}
				onHide={onHide}
				onToggle={() => onToggle(true)}
				className="fixed left-0 top-0 bottom-0"
			/>
			<div className="ml-[64px] h-full w-full p-4 max-sm:ml-0">
				<MenuIcon onShow={() => onToggle(true)} />
				{children}
			</div>
		</main>
	);
}
