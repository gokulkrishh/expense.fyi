import { useUser } from '@supabase/auth-helpers-react';

import Sidebar from './Sidebar';

export default function Layout({ children }) {
	const user = useUser();

	return (
		<main className='relative min-h-screen w-full'>
			{user ? (
				<Sidebar className='absolute left-0 flex h-full w-[260px] flex-col' />
			) : null}
			<div className={`${user ? 'ml-[260px] p-6' : ''} h-screen`}>
				{children}
			</div>
		</main>
	);
}
