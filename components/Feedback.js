import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { Transition } from '@headlessui/react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import DeviceDetector from 'device-detector-js';

import Loader from 'components/Loader';

import { showErrorToast } from './Toast';

const deviceDetector = new DeviceDetector();

const Feedback = ({ className }) => {
	const [state, setState] = useState({ show: false, message: '', emoji: '', sent: false, deviceDetails: {} });
	const ref = useRef(null);
	const inputElement = useRef(null);

	useEffect(() => {
		inputElement.current?.focus();
	}, [inputElement]);

	const onHide = useCallback(() => {
		setState({ ...state, show: false, message: '' });
	}, [state]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				onHide();
			}
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [onHide]);

	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				onHide();
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [onHide]);

	const onSubmit = async (message) => {
		const deviceDetails = deviceDetector.parse(window.navigator.userAgent);
		const { client, device, os } = deviceDetails;

		const clientData = `${client.name} v${client.version}`;
		const deviceData = `${device.type} ${device.brand}`;
		const osData = `${os.name} v${os.version}`;
		let body = JSON.stringify({ message, client: clientData, os: osData, device: deviceData });

		setState({ ...state, loading: true });

		try {
			const res = await fetch('/api/feedbacks/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body,
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			setState((prev) => ({ ...prev, sent: true, loading: false, message: '' }));
			setTimeout(() => {
				setState((prev) => ({ ...prev, show: false, sent: false }));
			}, 6000);
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false }));
			showErrorToast(error.message);
		}
	};

	return (
		<div ref={ref} className={`relative inline-block text-left ${className}`}>
			<div className="ml-2 mt-0 flex">
				<button
					className="font-xs shadow-xs inline-flex items-center rounded-md border border-zinc-200 bg-white px-[12px] py-[10px] text-sm font-medium leading-[16px] text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:px-[8px]"
					onClick={() => setState({ ...state, show: !state.show })}
				>
					<ChatBubbleBottomCenterTextIcon className="relative top-[1px] h-4 w-4" />{' '}
					<span className="ml-2 hidden sm:block">Feedback</span>
				</button>
			</div>

			<Transition
				as={Fragment}
				show={state.show}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<div
					className="absolute right-0 z-10 mt-2 h-[197px] w-[290px] origin-top-right rounded-md bg-white px-4 py-2 shadow-md shadow-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
					tabIndex="-1"
				>
					<div>
						{!state.sent ? (
							<>
								<span className="text-md mb-2 mt-[2px] flex w-full items-center text-zinc-800">Feedback</span>
								<form
									onSubmit={(event) => {
										event.preventDefault();
										if (!state.loading) {
											onSubmit(state.message);
										}
									}}
								>
									<textarea
										className="mt-3 mb-3 block h-[100px] w-full appearance-none rounded-md bg-white px-3 py-2 text-sm text-zinc-800 ring-1 ring-gray-300 placeholder:text-zinc-400 focus:outline-none"
										placeholder="Share your feedback"
										onChange={(event) => setState({ ...state, message: event.target.value })}
										value={state.message}
										style={{ resize: 'none' }}
										required
										autoFocus
										ref={inputElement}
										maxLength="250"
									/>
									<div className="flex h-[30px] w-full justify-end">
										<button
											className={`w-[70px] items-center rounded-md bg-blue-600 text-sm font-medium uppercase text-white hover:bg-blue-700 ${
												state.loading ? 'bg-blue-400' : 'bg-blue-600'
											}`}
											disabled={state.loading}
										>
											{state.loading ? (
												<div className="flex justify-center">
													<Loader />
												</div>
											) : (
												'Send'
											)}
										</button>
									</div>
								</form>
							</>
						) : (
							<div className="flex h-[204px] flex-col items-center justify-center">
								<CheckCircleIcon className="mb-2 h-10 w-10 text-green-500" />
								<span className="mb-2 block text-sm font-medium text-zinc-800">Your feedback is received.</span>
								<span className="mb-3 block text-sm font-medium text-zinc-800">Will get in touch with you soon!</span>
							</div>
						)}
					</div>
				</div>
			</Transition>
		</div>
	);
};

export default Feedback;
