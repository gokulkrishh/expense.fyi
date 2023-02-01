import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import useAutoFocus from 'hooks/useAutoFocus';

import Button from 'components/Button';
import Loader from 'components/Loader';

import { getCurrencySymbol } from 'utils/formatter';

import { dateFormatStr, datePattern } from 'constants/index';
import { investmentCategory } from 'constants/index';

import Modal from './';

const initialState = {
	category: '',
	name: '',
	notes: '',
	price: '',
	units: '',
	date: format(new Date(), dateFormatStr),
};

export default function AddInvestment({ show, selected, onHide, onSubmit, loading, currency, locale }) {
	const inputRef = useAutoFocus();
	const [state, setState] = useState(initialState);
	useEffect(() => setState(selected.id ? selected : initialState), [selected]);

	return (
		<Modal show={show} title={`${selected.id ? 'Edit' : 'Add'} Investment`} onHide={onHide}>
			<div className="sm:flex sm:items-start">
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
							placeholder="Company or Symbol Name"
							required
							maxLength="30"
							autoFocus
							ref={inputRef}
							onChange={(event) => {
								setState({ ...state, name: event.target.value });
							}}
							value={state.name}
						/>
					</label>

					<div className="grid grid-cols-[60%,40%]">
						<label className="mr-4 block">
							<span className="block text-sm font-medium text-zinc-600">
								Single Stock Price
								<span className="ml-2 font-mono text-xs">({getCurrencySymbol(currency, locale)})</span>
							</span>
							<input
								className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 md:w-full"
								type="number"
								placeholder="1000"
								required
								step=".00001"
								min="1"
								onChange={(event) => setState({ ...state, price: event.target.value })}
								value={state.price}
							/>
						</label>
						<label className="block">
							<span className="block text-sm font-medium text-zinc-600">Units</span>
							<input
								className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
								type="number"
								placeholder="1"
								required
								min="1"
								step=".01"
								onChange={(event) => setState({ ...state, units: event.target.value })}
								value={state.units}
							/>
						</label>
					</div>
					<div className="grid grid-cols-[60%,40%]">
						<label className="block">
							<span className="block text-sm font-medium text-zinc-600">Bought Date</span>
							<div className="flex items-center justify-between">
								<input
									className="mt-2 mr-4 block h-10 w-full appearance-none rounded-md bg-white p-3 text-sm leading-tight text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2  focus:ring-gray-900 "
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
							<span className="block text-sm font-medium text-zinc-600">Category</span>
							<select
								name="category"
								className="mt-2 block h-10 w-full appearance-none rounded-md bg-white py-2 px-3 text-sm text-zinc-600 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
								onChange={(event) => {
									setState({ ...state, category: event.target.value });
								}}
								value={state.category}
								required
							>
								{Object.keys(investmentCategory).map((key) => {
									return (
										<option key={key} value={key}>
											{investmentCategory[key]}
										</option>
									);
								})}
							</select>
						</label>
					</div>
					<label className="block">
						<span className="block text-sm font-medium text-zinc-600">
							Notes <span className="mb-6 text-center text-sm font-medium text-gray-400">(optional)</span>
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
