'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import CircleLoader from 'components/loader/circle';
import { Button } from 'components/ui/button';

import { apiUrls } from 'lib/apiUrls';

import url from 'constants/url';

const initialState = { loading: false, email: '', success: false, error: '' };

export default function Form() {
	const [state, setState] = useState(initialState);
	const inputElement = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputElement.current?.focus();
	}, []);

	const handleSignup = async () => {
		setState((prev) => ({ ...prev, loading: true, error: '', success: false }));

		try {
			const res = await fetch(apiUrls.auth.signup, {
				method: 'POST',
				body: JSON.stringify({ email: state.email }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message);
			}
			setState((prev) => ({ ...prev, success: true, loading: false, email: '' }));
		} catch (error: any) {
			setState((prev) => ({ ...prev, error: error.message, loading: false }));
		}
	};

	return (
		<form
			className="grid w-full grid-cols-1 items-center gap-4 text-gray-800"
			onSubmit={(event) => {
				event.preventDefault();
				handleSignup();
			}}
		>
			<label className="mb-1 block">
				<span className="mb-2 block text-sm font-semibold leading-6">Email Address</span>
				<input
					className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
					autoFocus
					type="email"
					inputMode="email"
					autoComplete="email"
					placeholder="tim@apple.com"
					required
					value={state.email}
					onChange={(event) => {
						setState({ ...state, email: event.target.value });
					}}
					ref={inputElement}
				/>
			</label>
			<Button size={'lg'} type="submit" disabled={state.loading}>
				{state.loading ? <CircleLoader /> : 'Sign up here'}
			</Button>

			<p className="text-center text-sm font-medium text-zinc-700">
				Already registered?{' '}
				<Link
					href={url.app.signin}
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
	);
}
