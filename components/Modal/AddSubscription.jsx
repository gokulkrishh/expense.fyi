import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import { format } from 'date-fns';
import useAutoFocus from 'hooks/useAutoFocus';

import Button from 'components/Button';
import Loader from 'components/Loader';

import { getCurrencySymbol } from 'utils/formatter';

import { dateFormatStr, datePattern, payingKey, subscriptionPayment } from 'constants/index';

import Modal from './';

const checkUrl = (string) => {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url.protocol === 'http:' || url.protocol === 'https:';
};

const preSelectedDate = format(new Date(), dateFormatStr);

const initialState = {
	name: '',
	url: '',
	paid: payingKey.monthly,
	price: '',
	notes: '',
	date: preSelectedDate,
};

export default function AddSubscription({ show, selected, onHide, onSubmit, loading, currency, locale }) {
	const inputRef = useAutoFocus();
	const [state, setState] = useState(initialState);
	const [hasValidUrl, setHasValidUrl] = useState(false);

	useEffect(() => setState(selected.id ? selected : initialState), [selected]);
	useEffect(() => setHasValidUrl(checkUrl(state.url)), [state.url]);

	return (
		<Modal show={show} title={`${selected.id ? 'Edit' : 'Add'} Subscription`} onHide={onHide}>
			<div className="flex items-start">
				<form
					className="md:[420px] grid w-full grid-cols-1 items-center gap-4"
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit(state);
						if (!selected.id) setState({ ...initialState });
					}}
				>
					<label className="block">
						<span className="block text-sm font-medium text-zinc-600">Name</span>
						<input
							className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
							type="text"
							placeholder="Netflix"
							required
							autoFocus
							maxLength="30"
							ref={inputRef}
							onChange={(event) => {
								setState({ ...state, name: event.target.value });
							}}
							value={state.name}
						/>
					</label>
					<label className="block">
						<span className="flex grow-0 items-center text-sm font-medium text-zinc-600">
							Website
							{hasValidUrl && state.url ? (
								<Image
									src={`http://www.google.com/s2/favicons?domain=${state.url}&sz=125`}
									width={15}
									height={15}
									alt={state?.name}
									className="ml-2"
								/>
							) : null}
						</span>
						<div className="relative">
							<input
								className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500"
								type="url"
								placeholder="https://netflix.com"
								pattern="https://.*|http://.*"
								required
								maxLength="30"
								onChange={(event) => setState({ ...state, url: event.target.value })}
								value={state.url}
							/>
						</div>
					</label>
					<div className="grid grid-cols-[32%,38%,30%]">
						<label className="mr-4 block">
							<span className="block text-sm font-medium text-zinc-600">
								Price
								<span className="ml-2 font-mono text-xs">({getCurrencySymbol(currency, locale)})</span>
							</span>
							<div className="flex items-center justify-between">
								<input
									className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
									type="number"
									placeholder="10"
									required
									min="0"
									step=".01"
									onChange={(event) => setState({ ...state, price: event.target.value })}
									value={state.price}
								/>
							</div>
						</label>
						<label className="mr-4 block">
							<span className="block text-sm font-medium text-zinc-600">Start Date</span>
							<div className="flex items-center justify-between">
								<input
									className="mt-2 block h-10 w-full appearance-none rounded-md bg-white p-3 text-sm leading-tight text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 md:w-full"
									type="date"
									required
									pattern={datePattern}
									onChange={(event) => {
										setState({ ...state, date: event.target.value });
									}}
									value={state.date}
								/>
							</div>
						</label>
						<label className="block">
							<span className="block text-sm font-medium text-zinc-600">Paying</span>
							<select
								name="paid"
								className="mt-2 block h-10 w-full appearance-none rounded-md bg-white py-2 px-3 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
								onChange={(event) => {
									setState({ ...state, paid: event.target.value });
								}}
								value={state.paid}
								required
							>
								{Object.keys(subscriptionPayment).map((key) => (
									<option key={key} value={key}>
										{subscriptionPayment[key]}
									</option>
								))}
							</select>
						</label>
					</div>
					<label className="block">
						<span className="block text-sm font-medium text-zinc-600">
							Notes <span className="mb-6 text-center text-sm font-medium text-gray-500">(optional)</span>
						</span>
						<textarea
							className="mt-2 block h-20 w-full appearance-none rounded-md bg-white px-3 py-2 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
							placeholder=""
							onChange={(event) => setState({ ...state, notes: event.target.value })}
							value={state.notes}
							maxLength="60"
						/>
					</label>

					<Button type="submit" loading={loading} text={state.id ? 'Update' : 'Submit'} />
				</form>
			</div>
		</Modal>
	);
}
