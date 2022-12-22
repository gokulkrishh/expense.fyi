import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { ClockIcon } from '@heroicons/react/24/solid';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

import { supabase } from 'lib/supabase';
import Loader from '/components/Loader';

export default function Signup() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState('');
	const inputElement = useRef(null);
	const router = useRouter();
	const user = useUser();

	useEffect(() => {
		inputElement.current?.focus();
	}, []);

	useEffect(() => {
		if (user) {
			router.replace('/');
		}
	}, [user, router]);

	const handleLogin = async () => {
		setLoading(true);
		setEmailSent(false);
		setError('');
		try {
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) {
				throw error;
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setEmailSent(true);
			setLoading(false);
			setTimeout(() => {
				setEmailSent(false);
			}, 15000);
		}
	};

	return (
		<>
			<Head>
				<title>Sign up - Expense Tracker</title>
				<meta name='description' content='Sign up - Expense Tracker' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container flex h-full w-full'>
				<div className='flex w-1/2 flex-1 flex-col bg-[url("/expense.jpg")] bg-cover p-10'>
					{/* <ul className='list-disc pl-10 pt-5'>
						<li className='pt-3'>
							Track your expense overall based on the categories.
						</li>
						<li className='pt-3'>
							Find out exactly where money is spend at a glance
						</li>
						<li className='pt-3'>Quick add expenses option.</li>
						<li className='pt-3'>
							Get notified via email when a subscription is about to renewed.
						</li>
					</ul> */}
				</div>
				<div className='flex max-w-md flex-1 flex-col justify-center p-10 lg:w-1/2'>
					<h1 className='mb-6 flex w-full items-center text-2xl font-bold text-slate-700'>
						<ClockIcon className='mr-2 h-8 w-8  text-slate-700' />
						Expense Tracker
					</h1>

					<form
						className='grid w-full grid-cols-1 items-center gap-4'
						onSubmit={(event) => {
							event.preventDefault();
							handleLogin();
						}}
					>
						<label className='mb-1 block'>
							<span className='text-md block font-semibold leading-6 text-gray-700'>
								Email address
							</span>
							<input
								autoFocus
								className='mt-2 block h-11 w-full appearance-none rounded-md bg-white px-3 text-slate-800 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm'
								type='email'
								placeholder='john@gmail.com'
								required
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								ref={inputElement}
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

						<p className='mb-6 h-[50px] text-center text-sm font-semibold'>
							{emailSent && !error ? (
								<span className='text-green-600'>
									We just sent an email to you at{' '}
									<span className='underline '> {email}</span>, check your
									inbox.
								</span>
							) : null}

							{emailSent && error ? (
								<span className='text-red-500'>{error}</span>
							) : null}
						</p>
					</form>
				</div>
			</main>
		</>
	);
}
