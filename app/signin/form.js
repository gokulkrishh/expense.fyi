'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import { supabase } from 'lib/supabase';
import Loader from '/components/Loader';

const initialState = { loading: false, email: '', error: '', success: false };

export default function Form() {
	const [state, setState] = useState(initialState);
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
		setState((prev) => ({ ...prev, loading: true, error: '', success: false }));
		try {
			const { error } = await supabase.auth.signInWithOtp({
				email: state.email,
			});
			if (error) {
				throw error;
			}
			setState((prev) => ({ ...prev, success: true, loading: false, email: '' }));
		} catch (error) {
			setState((prev) => ({ ...prev, error: error.message, loading: false }));
		}
	};

	return (
		<form
			className='grid w-full grid-cols-1 items-center gap-4'
			onSubmit={(event) => {
				event.preventDefault();
				handleLogin();
			}}
		>
			<label className='mb-1 block'>
				<span className='text-md block font-semibold leading-6 text-gray-700'>Email address</span>
				<input
					autoFocus
					className='mt-2 block h-11 w-full appearance-none rounded-md bg-white px-3 text-slate-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-600 sm:text-sm'
					type='email'
					placeholder='john@gmail.com'
					required
					value={state.email}
					onChange={(event) => {
						setState({ ...state, email: event.target.value });
					}}
					ref={inputElement}
				/>
			</label>
			<button
				type='submit'
				className='flex items-center justify-center rounded-lg bg-slate-800 py-2.5 px-4 font-normal text-white hover:bg-slate-700'
			>
				{state.loading ? (
					<>
						<Loader /> Sending...
					</>
				) : (
					'Send magic link'
				)}
			</button>

			<p className='mb-6 h-[50px] text-center text-sm font-medium'>
				{state.success && !state.error ? (
					<span className='text-green-600'>We just sent an email to you, check your inbox.</span>
				) : null}

				{!state.success && state.error ? <span className='text-red-500'>{state.error}</span> : null}
			</p>
		</form>
	);
}
