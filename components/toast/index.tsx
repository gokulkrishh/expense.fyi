import { Transition } from '@headlessui/react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

import CircleLoader from 'components/loader/circle';

import messages from 'constants/messages';

const defaultDuration = 1500;

export const showToast = (message = '', duration = defaultDuration) => {
	return toast.custom(
		(t) => (
			<div
				className={`${
					t.visible ? 'animate-enter' : 'animate-leave'
				} font-default inline-flex max-w-md rounded-md bg-white p-2 px-3 text-[0.8125rem] font-semibold leading-5 text-zinc-800 shadow-md`}
			>
				<div className="flex items-center">
					<Transition
						appear={true}
						show={true}
						enter="transform transition duration-200"
						enterFrom="opacity-0 rotate-[45deg] scale-0"
						enterTo="opacity-100 rotate-0 scale-100"
						leave="transform duration-100 transition ease-in-out"
						leaveFrom="opacity-100 rotate-0 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Info className="mr-2 h-5 w-5 text-blue-500" />
					</Transition>
					<span className="text-zinc-900">{message}</span>
				</div>
			</div>
		),
		{ duration }
	);
};

export const showSuccessToast = (message = '', duration = defaultDuration) => {
	return toast.custom(
		(t) => (
			<div
				className={`${
					t.visible ? 'animate-enter' : 'animate-leave'
				} font-default inline-flex max-w-md rounded-md bg-green-50 p-2 px-3 text-[0.8125rem] font-semibold leading-5 text-zinc-800 shadow-md`}
			>
				<div className="flex items-center">
					<Transition
						appear={true}
						show={true}
						enter="transform transition duration-200"
						enterFrom="opacity-0 rotate-[45deg] scale-0"
						enterTo="opacity-100 rotate-0 scale-100"
						leave="transform duration-100 transition ease-in-out"
						leaveFrom="opacity-100 rotate-0 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
					</Transition>
					<span className="text-green-900">{message}</span>
				</div>
			</div>
		),
		{ duration }
	);
};

export const showErrorToast = (message = messages.error, duration = 3000) => {
	return toast.custom(
		(t) => (
			<div
				className={`${
					t.visible ? 'animate-enter' : 'animate-leave'
				} font-default inline-flex max-w-md rounded-md bg-red-50 p-2 px-3 text-[0.8125rem] font-semibold leading-5 text-zinc-800 shadow-md`}
			>
				<div className="flex items-center">
					<Transition
						appear={true}
						show={true}
						enter="transform transition duration-200"
						enterFrom="opacity-0 rotate-[45deg] scale-0"
						enterTo="opacity-100 rotate-0 scale-100"
						leave="transform duration-100 transition ease-in-out"
						leaveFrom="opacity-100 rotate-0 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<XCircle className="mr-2 h-5 w-5 text-red-500" />
					</Transition>
					<span className="text-red-900">{message}</span>
				</div>
			</div>
		),
		{ duration }
	);
};

export const showWarningToast = (message = '', duration = 3000) => {
	return toast.custom(
		(t) => (
			<div
				className={`${
					t.visible ? 'animate-enter' : 'animate-leave'
				} font-default inline-flex max-w-md rounded-md bg-orange-50 p-2 px-3 text-[0.8125rem] font-semibold leading-5 text-zinc-800 shadow-md`}
			>
				<div className="flex items-center">
					<Transition
						appear={true}
						show={true}
						enter="transform transition duration-200"
						enterFrom="opacity-0 rotate-[45deg] scale-0"
						enterTo="opacity-100 rotate-0 scale-100"
						leave="transform duration-100 transition ease-in-out"
						leaveFrom="opacity-100 rotate-0 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
					</Transition>
					<span className="text-orange-900">{message}</span>
				</div>
			</div>
		),
		{ duration }
	);
};

const ToastLoader = (t: any) => (
	<div
		className={`${
			t.visible ? 'animate-enter' : 'animate-leave'
		} font-default inline-flex max-w-md rounded-md bg-white p-2 px-3 text-[0.8125rem] font-semibold leading-5 text-zinc-800 shadow-md`}
	>
		<div className="flex items-center">
			<CircleLoader color="black" className="mr-2 h-5 w-5" />
			<span>{messages.loading}</span>
		</div>
	</div>
);

export const showToastLoading = (duration = defaultDuration) => {
	return toast.custom((t) => <ToastLoader t={t} />, { duration });
};
