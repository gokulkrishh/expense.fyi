'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { ExpenseData, addExpense, editExpense } from 'app/dashboard/expenses/apis';
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
import { incrementUsage } from 'app/dashboard/apis';

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			toast({ description: `${isEditing ? messages.updated : messages.success}` });
		} catch {
			toast({ description: messages.error, variant: 'destructive' });
		} finally {
			if (mutate) mutate();
			onHide();
			setState({ ...initialState });
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
					<Label htmlFor="name">Name</Label>
					<Input
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
					<div className="grid grid-cols-[50%,50%] gap-3">
						<div className="mr-3">
							<Label htmlFor="price">
								Price
								<span className="ml-2 font-mono text-xs text-muted-foreground">
									({getCurrencySymbol(user.currency, user.locale)})
								</span>
							</Label>
							<div className="mt-2 flex items-center justify-between">
								<Input
									id="price"
									type="number"
									placeholder="199"
									required
									min="0"
									onChange={(event) => setState({ ...state, price: event.target.value })}
									value={state.price}
								/>
							</div>
						</div>
						<div className="mr-3">
							<Label htmlFor="date">Spent Date</Label>
							<div className="mt-2 flex items-center justify-between">
								<Input
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
					</div>
					<div className="grid grid-cols-[50%,50%] gap-3">
						<div className="mr-3">
							<Label htmlFor="category">Category</Label>
							<div className="mt-2 flex items-center justify-between">
								<select
									id="category"
									className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
						</div>
						<div className="mr-3">
							<Label htmlFor="paid">Paid via</Label>
							<div className="mt-2 flex items-center justify-between">
								<select
									id="paid"
									className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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

					<Button disabled={loading} className="mt-2" type="submit">
						{loading ? <CircleLoader /> : `${selected?.id ? 'Update' : 'Submit'}`}
					</Button>
				</form>
			</div>
		</Modal>
	);
}
