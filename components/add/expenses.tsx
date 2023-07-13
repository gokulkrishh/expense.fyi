'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { incrementUsage } from 'app/dashboard/apis';
import { addExpense, editExpense } from 'app/dashboard/expenses/apis';
import { format } from 'date-fns';
import debounce from 'debounce';

import AutoCompleteList from 'components/autocomplete-list';
import { useUser } from 'components/context/auth-provider';
import CircleLoader from 'components/loader/circle';
import Modal from 'components/modal';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';
import { useToast } from 'components/ui/use-toast';

import { getCurrencySymbol } from 'lib/formatter';

import { expensesCategory, expensesPay, groupedExpenses } from 'constants/categories';
import { dateFormat, datePattern } from 'constants/date';
import messages from 'constants/messages';

interface AddExpenseProps {
	show: boolean;
	selected: any;
	onHide: () => void;
	mutate: () => void;
	lookup: (value: any) => void;
}

const todayDate = format(new Date(), dateFormat);

const initialState = {
	category: 'food',
	paid_via: 'upi',
	name: '',
	notes: '',
	price: '',
	date: todayDate,
	id: null,
	autocomplete: [],
};

export default function AddExpense({ show, onHide, mutate, selected, lookup }: AddExpenseProps) {
	const user = useUser();
	const [state, setState] = useState<any>(initialState);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const inputRef = useRef<any>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(
		() =>
			setState(
				selected.id
					? { ...selected, ...{ paid_via: selected.paid_via ? selected.paid_via : initialState.paid_via } }
					: initialState
			),
		[selected]
	);

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
				await editExpense(state);
			} else {
				incrementUsage();
				await addExpense(state);
			}
			setLoading(false);
			toast({ description: `${isEditing ? messages.updated : messages.success}`, variant: 'success' });
			if (mutate) mutate();
			onHide();
			setState({ ...initialState });
		} catch {
			setLoading(false);
			toast({ description: messages.error, variant: 'destructive' });
		}
	};

	return (
		<Modal someRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} Expense`} onHide={onHide}>
			<div className="sm:flex sm:items-start">
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
							className="mt-1"
							id="name"
							placeholder="Swiggy - Biriyani"
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
									setState({ ...state, name: '', category: 'food', paid_via: 'upi' });
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
							onClick={({ name, category, paid_via }) => {
								setState({ ...state, name, category, paid_via, autocomplete: [] });
							}}
							show={Boolean(state.autocomplete?.length)}
						/>
					</div>
					<div className="grid grid-cols-[50%,50%] gap-3">
						<div className="mr-3">
							<Label htmlFor="price">
								Price
								<span className="ml-2 font-mono text-xs text-muted-foreground">
									({getCurrencySymbol(user.currency, user.locale)})
								</span>
							</Label>
							<Input
								className="mt-1"
								id="price"
								type="number"
								placeholder="199"
								required
								min="0"
								onChange={(event) => setState({ ...state, price: event.target.value })}
								value={state.price}
							/>
						</div>
						<div className="mr-3">
							<Label htmlFor="date">Spent Date</Label>
							<Input
								className="mt-1"
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
					</div>
					<div className="grid grid-cols-[50%,50%] gap-3">
						<div className="mr-3">
							<Label htmlFor="category">Category</Label>
							<select
								id="category"
								className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								onChange={(event) => {
									setState({ ...state, category: event.target.value });
								}}
								value={state.category}
								required
							>
								{Object.keys(groupedExpenses).map((key) => {
									return (
										<optgroup label={groupedExpenses[key].name} key={groupedExpenses[key].name}>
											{Object.keys(groupedExpenses[key].list).map((listKey) => {
												return (
													<option key={listKey} value={listKey}>
														{groupedExpenses[key].list[listKey].name}
													</option>
												);
											})}
										</optgroup>
									);
								})}
								<option key={'other'} value={'other'}>
									{expensesCategory.other.name}
								</option>
							</select>
						</div>
						<div className="mr-3">
							<Label htmlFor="paid">Paid Via</Label>
							<select
								id="paid"
								className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								onChange={(event) => {
									setState({ ...state, paid_via: event.target.value });
								}}
								value={state.paid_via}
								required
							>
								{Object.keys(expensesPay).map((key) => {
									return (
										<option key={key} value={key}>
											{expensesPay[key].name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<Label className="block">
						Notes <span className="mb-6 text-center text-sm text-muted-foreground">(optional)</span>
					</Label>
					<Textarea
						className="h-20"
						onChange={(event) => setState({ ...state, notes: event.target.value })}
						value={state.notes}
						maxLength={60}
					/>

					<Button disabled={loading} className="mt-1" type="submit">
						{loading ? <CircleLoader /> : `${selected?.id ? 'Update' : 'Submit'}`}
					</Button>
				</form>
			</div>
		</Modal>
	);
}
