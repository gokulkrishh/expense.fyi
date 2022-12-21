import Link from 'next/link';

export default function NotFound() {
	return (
		<main className='dark:bg-grey-900 flex h-full items-center p-16 dark:text-slate-200'>
			<div className='container mx-auto my-8 flex flex-col items-center justify-center px-5'>
				<div className='max-w-md text-center'>
					<h2 className='mb-6 text-7xl font-extrabold text-slate-900'>
						<span className='sr-only text-slate-900'>Error</span>404
					</h2>
					<p className='text-md mb-8 text-xl font-medium text-slate-900'>
						Sorry, we couldn&apos;t find this page.
					</p>
					<Link
						rel='noopener noreferrer'
						href='/'
						className='rounded px-8 py-3 text-white dark:bg-slate-900'
					>
						Go back
					</Link>
				</div>
			</div>
		</main>
	);
}
