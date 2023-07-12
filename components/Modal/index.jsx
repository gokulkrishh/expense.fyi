import { Fragment, useEffect } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import Portal from './Portal';

export default function Modal({ show, title, children, onHide, inputRef }) {
	return (
		<Portal>
			<Transition appear show={show} as={Fragment}>
				<Dialog initialFocus={inputRef} open={show} as="div" className={`relative z-20`} onClose={onHide}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-500"
						enterFrom="opacity-0 sm:translate-y-0 sm:scale-100"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-out duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-out duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Panel className="fixed bottom-0 w-full transform overflow-hidden bg-white p-4 text-left align-middle shadow transition-all sm:static sm:max-w-md sm:rounded-lg">
									<Dialog.Title as="h2" className="mb-2 mt-[-4px] flex w-full items-center text-xl text-zinc-800">
										{title}
										<button
											onClick={onHide}
											className="absolute top-[3px] right-[4px] flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full text-gray-500 transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200"
										>
											<XMarkIcon className="h-6 w-6 text-slate-700 hover:text-slate-500" />
										</button>
									</Dialog.Title>
									{children}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</Portal>
	);
}
