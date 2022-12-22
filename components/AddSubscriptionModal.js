import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import Loader from './Loader';

const options = [
	{ id: 'monthly', name: 'Monthly' },
	{ id: 'yearly', name: 'Yearly' },
];

const checkUrl = (string) => {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url.protocol === 'http:' || url.protocol === 'https:';
};

const initialState = { name: '', url: '', paid: '', price: 0, notes: '' };

export default function AddSubscriptionModal({
	data = {},
	onHide,
	onSubmit,
	isLoading,
}) {
	const [state, setState] = useState(initialState);
	const [hasValidUrl, setHasValidUrl] = useState(false);

	useEffect(() => {
		setHasValidUrl(checkUrl(state.url));
	}, [state.url]);

	useEffect(() => {
		setState(data);
	}, [data]);

	return (
		<div
			className='relative z-10'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div className='fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity'>
				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='relative m-auto mt-24 max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all'>
						<div className='bg-white p-4'>
							<h2 className='mb-4 flex w-full items-center text-2xl text-slate-700'>
								Add Subscription
							</h2>
							<XMarkIcon
								aria-label='close'
								className='absolute top-4 right-4 h-7 w-7 cursor-pointer text-slate-700 hover:text-slate-500'
								onClick={onHide}
							/>

							<div className='sm:flex sm:items-start'>
								<form
									className='grid w-[420px] grid-cols-1 items-center gap-4 pb-2'
									onSubmit={(event) => {
										event.preventDefault();
										onSubmit(state);
									}}
								>
									<label className='block'>
										<span className='text-md block font-semibold leading-6 text-gray-900'>
											Name
										</span>
										<input
											className='mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-800 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm'
											type='text'
											placeholder='Netflix'
											required
											autoFocus
											onChange={(event) =>
												setState({ ...state, name: event.target.value })
											}
											value={state.name}
										/>
									</label>
									<label className='block'>
										<span className='text-md flex grow-0 items-center font-semibold leading-6 text-gray-900'>
											URL
											{hasValidUrl ? (
												<Image
													src={`http://www.google.com/s2/favicons?domain=${state.url}&sz=125`}
													width={15}
													height={15}
													alt=''
													className='ml-2'
												/>
											) : null}
										</span>
										<input
											className='mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-800 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm'
											type='url'
											placeholder='https://netflix.com'
											required
											onChange={(event) =>
												setState({ ...state, url: event.target.value })
											}
											value={state.url}
										/>
									</label>
									<div className='flex'>
										<label className='block w-[420px]'>
											<span className='text-md block font-semibold leading-6 text-gray-900'>
												Price
											</span>
											<div className='flex items-center justify-between'>
												<input
													className='mt-2 mr-4 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-800 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm'
													type='number'
													placeholder='$10'
													required
													min='0'
													max='9999'
													onChange={(event) =>
														setState({ ...state, price: event.target.value })
													}
													value={state.price}
												/>
											</div>
										</label>
										<label className='block w-[210px] '>
											<span className='text-md block font-semibold leading-6 text-gray-900'>
												Paid
											</span>
											<Dropdown
												options={options}
												onSelect={(paid) => {
													setState({ ...state, paid: paid.name });
												}}
												selected={state.paid}
												className={'w-[140px]'}
											/>
										</label>
									</div>
									<label className='block'>
										<span className='text-md block font-semibold leading-6 text-gray-900'>
											Notes{' '}
											<span className='mb-6 text-center text-sm font-normal text-gray-400'>
												(optional)
											</span>
										</span>
										<textarea
											className='mt-2 block h-20 w-full appearance-none rounded-md bg-white px-3 py-2 text-slate-800 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm'
											type='text'
											placeholder=''
											onChange={(event) =>
												setState({
													...state,
													notes: event.target.value,
												})
											}
											value={state.notes}
										/>
									</label>

									<button
										type='submit'
										className='mt-2 flex items-center justify-center rounded-lg bg-slate-800 py-2.5 px-4 font-normal text-white hover:bg-slate-700'
									>
										{isLoading ? (
											<>
												{' '}
												<Loader /> Submitting...
											</>
										) : state.id ? (
											'Update'
										) : (
											'Submit'
										)}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
