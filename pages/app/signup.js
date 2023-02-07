import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import SvgLogoBlack from 'public/static/icons/logo.svg';

import Footer from 'components/Footer';
import Loader from 'components/Loader';

import { siteUrls } from 'constants/index';

const initialState = { loading: false, email: '', error: '', success: false };

export default function Signup() {
	const [state, setState] = useState(initialState);
	const inputElement = useRef(null);
	const user = useUser();

	const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
	const signInUrl = isProduction ? siteUrls.signin : siteUrls.localSignin;
	const homeUrl = isProduction ? `https://${siteUrls.home}` : `http://${siteUrls.local}`;

	useEffect(() => {
		if (user) window.location = '/';
	}, [user]);

	useEffect(() => {
		inputElement.current?.focus();
	}, []);

	const checkAccountExists = async (email) => {
		const res = await fetch('/api/auth/account-exists', {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: { 'Content-Type': 'application/json' },
		});
		return await res.json();
	};

	const handleSignup = async () => {
		setState((prev) => ({ ...prev, loading: true, error: '', success: false }));

		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				body: JSON.stringify({ email: state.email }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message);
			}
			setState((prev) => ({ ...prev, success: true, loading: false, email: '' }));
		} catch (error) {
			setState((prev) => ({ ...prev, error: error.message, loading: false }));
		}
	};

	return (
		<>
			<Head>
				<title>Sign up for Expense.fyi</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>
			<main
				className={`font-default relative m-auto flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 pl-2 pr-2`}
			>
				<div className="absolute inset-x-0 top-0 z-10 h-96 overflow-hidden text-slate-600/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]">
					<div className="">
						<svg className="absolute inset-0 top-0 h-full w-full text-gray-800" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<pattern
									id="pricing-pattern"
									width="32"
									height="32"
									patternUnits="userSpaceOnUse"
									x="50%"
									y="100%"
									patternTransform="translate(0 -1)"
								>
									<path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#pricing-pattern)"></rect>
						</svg>
					</div>
				</div>
				<div className="absolute z-50 flex w-[380px] flex-1 flex-col justify-center p-6 sm:w-[468px] sm:p-10">
					<Link href={homeUrl}>
						<h1 className="flex flex-col items-center text-3xl text-black">
							<Image src={SvgLogoBlack} width={50} height={50} alt="Expense.fyi" />
							<span className="mt-2 font-black">Expense.fyi</span>
						</h1>
					</Link>
					<p className="mt-3 mb-6 text-center text-sm font-medium text-zinc-600">
						Get started for free. No credit card required.
					</p>
					<form
						className="grid w-full grid-cols-1 items-center gap-4"
						onSubmit={(event) => {
							event.preventDefault();
							handleSignup();
						}}
					>
						<label className="mb-1 block">
							<span className="block text-sm font-semibold leading-6 text-zinc-800">Email Address</span>
							<input
								autoFocus
								className="mt-2 block h-11 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
								type="email"
								placeholder="tim@apple.com"
								required
								value={state.email}
								onChange={(event) => {
									setState({ ...state, email: event.target.value });
								}}
								ref={inputElement}
							/>
						</label>
						<button
							type="submit"
							className="flex h-[44px] items-center justify-center rounded-lg bg-zinc-900 py-2.5 px-4 font-medium text-white hover:bg-zinc-700"
							disabled={state.loading}
						>
							{state.loading ? (
								<>
									<Loader />
								</>
							) : (
								'Send magic link'
							)}
						</button>

						<p className="text-center text-sm font-medium text-zinc-700">
							Already registered?{' '}
							<Link
								href={signInUrl}
								className="border-b-[1px] border-zinc-700 pb-[1px] font-bold hover:border-zinc-500 hover:text-zinc-600"
							>
								Sign in
							</Link>{' '}
							to your account.
						</p>

						<p
							className={`mb-6 h-[50px] text-center text-sm font-medium ${
								(state.success && !state.error) || (!state.success && state.error) ? '' : 'invisible'
							}`}
						>
							{state.success && !state.error ? (
								<span className="text-green-700">We just sent an email with magic link, check your inbox.</span>
							) : null}

							{!state.success && state.error ? <span className="text-red-500">{state.error}</span> : null}
						</p>
					</form>
				</div>
				<Footer className={'absolute bottom-0'} />
			</main>
		</>
	);
}

export const getServerSideProps = async (context) => {
	const supabase = createServerSupabaseClient(context);

	const { data } = await supabase.auth.getSession();
	const { session } = data;

	if (session) {
		return {
			redirect: { destination: '/', permanent: true },
		};
	}

	return {
		props: {},
	};
};
