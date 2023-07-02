'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import useAutoFocus from 'hooks/useAutoFocus';

import { useUser } from 'components/context/auth-provider';
import CircleLoader from 'components/loader/circle';
import Modal from 'components/modal';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';

import { getCurrencySymbol } from 'lib/formatter';

import { expensesCategory, expensesPay, groupedExpenses } from 'constants/categories';
import { dateFormat, datePattern } from 'constants/date';

interface AddExpenseProps {
	show: boolean;
	selected: any;
	onHide: () => void;
	onSubmit: () => void;
}

const todayDate = format(new Date(), dateFormat);

const initialState = {
	loading: false,
	category: 'food',
	paid_via: 'upi',
	name: '',
	notes: '',
	price: '',
	date: todayDate,
	autocomplete: [],
};

export default function AddExpense({ show, onHide, onSubmit }: AddExpenseProps) {
	const inputRef = useAutoFocus();
	const user = useUser();
	const [state, setState] = useState(initialState);

	const onLookup = (value: string) => {};

	return (
		<Modal inputRef={inputRef} show={show} title={`Add Expense`} onHide={onHide}>
			<div className="sm:flex sm:items-start">
				<form
					className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit();
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
						onChange={({ target }) => {
							const { value } = target;
							if (value.length) {
								setState({ ...state, name: value, autocomplete: [] });
								if (value.length > 2) onLookup(value);
							} else {
								setState({ ...state, name: '', category: 'food', paid_via: 'cash', autocomplete: [] });
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
						className="h-18"
						onChange={(event) => setState({ ...state, notes: event.target.value })}
						value={state.notes}
						maxLength={60}
					/>

					<Button disabled={state.loading} className="mt-2" type="submit">
						{state.loading ? <CircleLoader /> : 'Submit'}
					</Button>
				</form>
			</div>
		</Modal>
	);
}
