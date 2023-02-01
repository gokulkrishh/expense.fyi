import Head from 'next/head';
import Link from 'next/link';

import { useState } from 'react';

import Footer from 'components/Footer';
import Loader from 'components/Loader';
import Logo from 'components/Logo';

const initalState = { loading: false, email: '', subject: '', message: '', sent: false };

export default function Contact() {
	const [state, setState] = useState({ ...initalState });
	return (
		<>
			<Head>
				<title>Expense.fyi – Contact Us</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>

			<div
				className={`relative min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 pl-1 pr-1 text-zinc-800`}
			>
				<div className="relative m-auto h-[40px] max-w-4xl pt-3">
					<header className="absolute left-0 right-0 top-3 z-20 flex items-center justify-between">
						<Link href="/" className="flex h-[40px] max-w-[180px] items-center p-3 text-2xl">
							<Logo />
						</Link>
					</header>
				</div>
				<div className="absolute inset-x-0 top-0 z-10 h-40 overflow-hidden text-slate-600/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]">
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
				<div className="font-default m-4 mt-4 h-full max-w-3xl pt-3 sm:m-4 sm:mt-8 lg:m-auto">
					<h1 className="mb-4 mt-10 text-center text-3xl font-black leading-[1.15] tracking-[-0.03em] sm:text-4xl sm:leading-[1.15]">
						Contact Us
					</h1>
					<p className="m-auto mb-8 max-w-lg text-center font-normal text-zinc-600">
						Got a technical issue? Want to send feedback about a beta feature?
					</p>
					<form
						className="m-auto mb-20 flex max-w-md flex-col justify-center space-y-4"
						method="POST"
						onSubmit={async (event) => {
							event.preventDefault();
							setState({ ...state, loading: true, sent: false });
							const body = JSON.stringify({ email: state.email, subject: state.subject, message: state.message });
							await fetch('/api/contact', {
								method: 'POST',
								body,
								headers: { 'Content-Type': 'application/json' },
							}).then(() => {
								setState({ ...state, ...initalState, sent: true, loading: false });
							});
						}}
					>
						<div>
							<label className="mb-2 block text-sm font-medium dark:text-gray-300">Email Address</label>
							<input
								className="mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
								type="text"
								placeholder="tim@apple.com"
								required
								autoFocus
								onChange={(event) => {
									setState({ ...state, email: event.target.value });
								}}
								value={state.email}
							/>
						</div>
						<div>
							<label className="mb-2 block text-sm font-medium dark:text-gray-300">Subject</label>
							<input
								className="mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
								type="text"
								placeholder="Let us know how we can help you"
								required
								onChange={(event) => {
									setState({ ...state, subject: event.target.value });
								}}
								value={state.subject}
							/>
						</div>
						<div className="sm:col-span-2">
							<label className="mb-2 block text-sm font-medium">Your message</label>
							<textarea
								className="mt-1 block h-20 w-full appearance-none rounded-md bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
								placeholder=""
								onChange={(event) => {
									setState({ ...state, message: event.target.value });
								}}
								value={state.message}
								maxLength="150"
							/>
						</div>
						<button
							type="submit"
							className="mt-0 flex h-[44px] items-center justify-center rounded-md bg-zinc-900 py-2.5 px-4 text-white hover:bg-zinc-700"
						>
							{state.loading ? <Loader /> : 'Send message'}
						</button>
						<p className={`mb-6 h-[50px] text-center text-sm font-medium ${state.sent ? '' : 'invisible'}`}>
							{state.sent ? (
								<span className="text-green-700">We have received your details. Thanks for contacting us.</span>
							) : null}
						</p>
					</form>
				</div>
				<Footer />
			</div>
		</>
	);
}
