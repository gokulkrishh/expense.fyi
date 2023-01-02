import Footer from 'components/Footer';

export default function Layout({ children }) {
	return (
		<>
			<main className='relative min-h-screen w-full'>
				<div className='container m-auto flex h-full items-center justify-center'>{children}</div>
			</main>
			<Footer className='absolute' />
		</>
	);
}
