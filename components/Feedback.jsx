import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';
import { Transition } from '@headlessui/react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import useAutoFocus from 'hooks/useAutoFocus';
import { useHotkeys } from 'react-hotkeys-hook';

import Loader from 'components/Loader';

import { shortcuts } from 'constants/index';

import { showErrorToast } from './Toast';
import TooltipText from './TooltipText';

const openShortcutKey = Object.values(shortcuts.overview.feedback.shortcut);

const Feedback = ({ className }) => {
	const [state, setState] = useState({ show: false, message: '', emoji: '', sent: false });
	const ref = useRef(null);
	const inputElement = useAutoFocus();
	useHotkeys(openShortcutKey, () => setState({ ...state, show: true }));

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
		setState({ ...state, loading: true });

		try {
			const res = await fetch('/api/feedbacks/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message }),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			setState((prev) => ({ ...prev, sent: true, loading: false, message: '' }));
			setTimeout(() => {
				setState((prev) => ({ ...prev, sent: false, show: false }));
			}, 5000);
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false }));
			showErrorToast(error.message);
		}
	};

	return (
		<div ref={ref} className={`relative inline-block text-left ${className}`}>
			<div className="ml-2 mt-0 flex">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<button
							className="font-xs shadow-xs inline-flex items-center rounded-md border border-zinc-200 bg-white px-[12px] py-[10px] text-sm font-medium leading-[16px] text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 sm:px-[8px]"
							onClick={() => setState({ ...state, show: !state.show })}
						>
							<ChatBubbleBottomCenterTextIcon className="relative top-[1px] h-4 w-4" />{' '}
							<span className="ml-2 hidden sm:block">Feedback</span>
						</button>
					</Tooltip.Trigger>
					<Tooltip.Content hideWhenDetached className="TooltipContent">
						<TooltipText className="mt-2" text="Open feedback" shortcut={openShortcutKey} />
					</Tooltip.Content>
				</Tooltip.Root>
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
					className="absolute right-0 z-10 mt-2 h-[170px] w-[290px] origin-top-right rounded-md bg-white px-4 py-2 shadow-md shadow-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
					tabIndex="-1"
				>
					<div>
						{!state.sent ? (
							<>
								<form
									onSubmit={(event) => {
										event.preventDefault();
										if (!state.loading) {
											onSubmit(state.message);
										}
									}}
								>
									<textarea
										className="mt-2 mb-2 block h-[100px] w-full appearance-none rounded-md bg-white px-3 py-2 text-sm text-zinc-800 ring-2 ring-gray-300 transition-all placeholder:text-zinc-400 focus:outline-none focus:ring-gray-500"
										placeholder="Share your feedback..."
										onChange={(event) => setState({ ...state, message: event.target.value })}
										value={state.message}
										style={{ resize: 'none' }}
										required
										autoFocus
										ref={inputElement}
										maxLength="250"
									/>
									<div className="mt-[12px] flex h-[32px] w-full justify-end">
										<button
											className={`w-[70px] items-center rounded-md text-sm font-medium uppercase text-white hover:bg-blue-800 ${
												state.loading ? 'bg-blue-500' : 'bg-blue-700'
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
							<div className="mt-[10px] flex h-[140px] flex-col items-center justify-center">
								<Transition
									appear={true}
									show={true}
									enter="transform transition duration-[200ms]"
									enterFrom="opacity-0 rotate-[45deg] scale-0"
									enterTo="opacity-100 rotate-0 scale-100"
									leave="transform duration-100 transition ease-in-out"
									leaveFrom="opacity-100 rotate-0 scale-100"
									leaveTo="opacity-0 rotate-0 scale-95"
								>
									<CheckCircleIcon className="mb-2 h-12 w-12 text-green-500 " />
								</Transition>
								<span className="mb-1 block text-sm font-semibold text-zinc-800">Your feedback is received!</span>
								<span className="mb-3 block text-sm font-normal text-zinc-600">Thanks for improving the product.</span>
							</div>
						)}
					</div>
				</div>
			</Transition>
		</div>
	);
};

export default Feedback;
