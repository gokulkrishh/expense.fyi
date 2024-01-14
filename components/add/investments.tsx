'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { incrementUsage } from 'app/dashboard/apis';
import { addInvestment, editInvestment } from 'app/dashboard/investments/apis';
import { format } from 'date-fns';
import debounce from 'debounce';
import { toast } from 'sonner';

import AutoCompleteList from 'components/autocomplete-list';
import { useUser } from 'components/context/auth-provider';
import CircleLoader from 'components/loader/circle';
import Modal from 'components/modal';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';

import { getCurrencySymbol } from 'lib/formatter';

import { investmentCategory } from 'constants/categories';
import { dateFormat, datePattern } from 'constants/date';
import messages from 'constants/messages';

interface AddInvestments {
	show: boolean;
	selected: any;
	onHide: () => void;
	mutate: () => void;
	lookup: (value: any) => void;
}

const initialState = {
	category: '',
	date: '',
	name: '',
	notes: '',
	price: '',
	autocomplete: [],
};

export default function AddInvestments({ show, onHide, mutate, selected, lookup }: AddInvestments) {
	const user = useUser();
	const todayDate = format(new Date(), dateFormat);
	const [state, setState] = useState<any>({ ...initialState, date: todayDate });
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<any>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => setState(selected.id ? selected : { ...initialState, date: todayDate }), [selected, todayDate]);

	const onLookup = useMemo(() => {
		const callbackHandler = (value: string) => {
			setState((prev: any) => ({ ...prev, autocomplete: lookup(value) }));
		};
		return debounce(callbackHandler, 500);
	}, [lookup]);

	const onSubmit = async () => {
		try {
			setLoading(true);
			const isEditing = selected?.id;
			if (isEditing) {
				await editInvestment(state);
			} else {
				await addInvestment(state);
				incrementUsage();
			}
			setLoading(false);
			if (mutate) mutate();
			toast.success(isEditing ? messages.updated : messages.success);
			onHide();
			setState({ ...initialState });
		} catch {
			setLoading(false);
			toast.error(messages.error);
		}
	};

	return (
		<Modal someRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} Investment`} onHide={onHide}>
			<div className="sm:flex sm:items-start max-sm:pb-6">
				<form
					className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit();
						if (!selected.id) setState({ ...initialState });
					}}
				>
					<div className="relative">
						<Label htmlFor="name">Name</Label>
						<Input
							className="mt-1.5"
							id="name"
							placeholder="Name or $TSLA"
							maxLength={30}
							required
							ref={inputRef}
							autoFocus
							autoComplete="off"
							onChange={({ target }) => {
								const { value } = target;
								if (value.length) {
									setState({ ...state, name: value, autocomplete: [] });
									if (value.length > 2) onLookup(value);
								} else {
									setState({ ...state, name: '', category: '', autocomplete: [] });
								}
							}}
							value={state.name}
						/>
						<AutoCompleteList
							onHide={() => {
								setState({ ...state, autocomplete: [] });
							}}
							data={state.autocomplete}
							searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
							onClick={({ name, category }) => {
								setState({ ...state, name, category, autocomplete: [] });
							}}
							show={Boolean(state.autocomplete?.length)}
						/>
					</div>
					<div className="grid grid-cols-[50%,50%] gap-1">
						<div className="mr-3">
							<Label htmlFor="price">
								Single Stock Price
								<span className="ml-2 font-mono text-xs text-muted-foreground">
									({getCurrencySymbol(user.currency, user.locale)})
								</span>
							</Label>
							<Input
								className="mt-1.5"
								id="price"
								inputMode="decimal"
								type="number"
								placeholder="1000"
								required
								step="any"
								min="0"
								onChange={(event) => setState({ ...state, price: event.target.value })}
								value={state.price}
							/>
						</div>
						<div className="mr-3">
							<Label htmlFor="units">Units</Label>
							<Input
								className="mt-1.5"
								id="units"
								type="number"
								inputMode="decimal"
								placeholder="10"
								required
								min="0"
								step="any"
								onChange={(event) => setState({ ...state, units: event.target.value })}
								value={state.units}
							/>
						</div>
					</div>
					<div className="grid grid-cols-[50%,50%] gap-1">
						<div className="mr-3">
							<Label htmlFor="date">Bought Date</Label>
							<Input
								className="mt-1.5 appearance-none"
								id="date"
								type="date"
								required
								max={todayDate}
								pattern={datePattern}
								onChange={(event) => {
									setState({ ...state, date: event.target.value });
								}}
								value={state.date}
							/>
						</div>
						<div className="mr-3">
							<Label htmlFor="category">Category</Label>
							<select
								id="category"
								className="mt-1.5 flex h-9 max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								onChange={(event) => {
									setState({ ...state, category: event.target.value });
								}}
								value={state.category}
								required
							>
								{Object.keys(investmentCategory).map((categoryKey) => {
									return (
										<option key={categoryKey} value={categoryKey}>
											{investmentCategory[categoryKey]}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div>
						<Label className="mt-1 block">
							Notes <span className="mb-6 text-center text-sm text-muted-foreground">(optional)</span>
						</Label>
						<Textarea
							className="mt-2 h-20"
							onChange={(event) => setState({ ...state, notes: event.target.value })}
							value={state.notes}
							maxLength={60}
						/>
					</div>

					<Button disabled={loading} className="mt-1.5" type="submit">
						{loading ? <CircleLoader /> : `${selected?.id ? 'Update' : 'Submit'}`}
					</Button>
				</form>
			</div>
		</Modal>
	);
}
