'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import CircleLoader from '@/components/loader/circle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import url from '@/constants/url';

const initialState = { loading: false, email: '', success: false, error: '' };

export default function Form() {
	const [state, setState] = useState(initialState);
	const inputElement = useRef(null);

	useEffect(() => {
		inputElement.current?.focus();
	}, []);

	const handleSignIn = async () => {
		setState((prev) => ({ ...prev, loading: true, error: '', success: false }));

		try {
			const res = await fetch('/api/auth/signin', {
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
				handleSignIn();
			}}
		>
			<label className="mb-1 block">
				<span className="mb-2 block text-sm font-semibold leading-6">Email Address</span>
				<Input
					autoFocus
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
			<Button size={'lg'} type="submit" disabled={state.loading}>
				{state.loading ? <CircleLoader /> : 'Send magic link'}
			</Button>

			<p className="text-center text-sm font-medium text-gray-700">
				Don{"'"}t have an account?{' '}
				<Link
					href={url.app.signup}
					className="border-b-[1px] border-gray-700 pb-[1px] font-bold hover:border-gray-500 hover:text-gray-600"
				>
					Sign up
				</Link>{' '}
				for free.
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
