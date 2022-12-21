import { useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { supabase } from 'lib/supabase';

import Loader from '/components/Loader';

export default function Signup() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [emailSent, setEmailSent] = useState(false);

	const handleLogin = async () => {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) {
				throw error;
			} else {
				setEmailSent(true);
			}
		} catch (error) {
		} finally {
			setLoading(false);
			setTimeout(() => {
				setEmailSent(false);
			}, 6000);
		}
	};

	return (
		<main className='container mx-auto flex h-full flex-col items-center justify-center'>
			<div className='relative flex w-full max-w-sm flex-1 flex-col items-center justify-center pt-12 pb-16'>
				<h1 className='mb-6 flex items-center text-slate-800'>
					<ClockIcon className='mr-2 h-7 w-7 text-slate-800' />
					Expense Tracker
				</h1>
				<form
					className='grid w-full grid-cols-1 items-center gap-4'
					onSubmit={(event) => {
						event.preventDefault();
						handleLogin();
					}}
				>
					<label className='block'>
						<span className='block text-sm font-semibold leading-6 text-gray-900'>
							Email address
						</span>
						<input
							className='mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-800 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 sm:text-sm'
							type='email'
							placeholder='john@gmail.com'
							required
							value={email}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
					</label>
					<button
						type='submit'
						className='flex items-center justify-center rounded-lg bg-slate-800 py-2.5 px-4 font-normal text-white hover:bg-slate-700'
					>
						{loading ? (
							<>
								<Loader /> Sending...
							</>
						) : (
							<>Send magic link</>
						)}
					</button>

					<p className='mb-6 text-center text-sm font-semibold text-green-600'>
						{emailSent
							? `We just sent an email to you at ${email}, check your inbox.`
							: null}
					</p>
				</form>
			</div>
		</main>
	);
}

export const getServerSideProps = async (ctx) => {
	const supabase = createServerSupabaseClient(ctx);

	const { data } = await supabase.auth.getSession();
	const { session } = data;

	if (session) {
		return {
			redirect: { destination: '/', permanent: true },
		};
	}

	return { props: {} };
};
