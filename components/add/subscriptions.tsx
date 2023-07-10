'use client';

import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import { incrementUsage } from 'app/dashboard/apis';
import { addSubscription, editSubscription } from 'app/dashboard/subscriptions/apis';
import { format } from 'date-fns';

import { useUser } from 'components/context/auth-provider';
import CircleLoader from 'components/loader/circle';
import Modal from 'components/modal';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';
import { useToast } from 'components/ui/use-toast';

import { getCurrencySymbol } from 'lib/formatter';

import { subscriptionCategory } from 'constants/categories';
import { dateFormat, datePattern } from 'constants/date';
import messages from 'constants/messages';

const checkUrl = (urlString: string) => {
	let url;
	try {
		url = new URL(urlString);
	} catch (_) {
		return false;
	}
	return url.protocol === 'http:' || url.protocol === 'https:';
};

interface AddSubscriptions {
	show: boolean;
	selected: any;
	onHide: () => void;
	mutate: () => void;
}

const todayDate = format(new Date(), dateFormat);

const initialState = {
	date: todayDate,
	name: '',
	notes: '',
	url: '',
	price: '',
	paid: 'monthly',
};

export default function AddSubscriptions({ show, onHide, mutate, selected }: AddSubscriptions) {
	const user = useUser();
	const [state, setState] = useState<any>(initialState);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const [hasValidUrl, setHasValidUrl] = useState(false);
	const inputRef = useRef<any>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => setState(selected.id ? selected : initialState), [selected]);
	useEffect(() => setHasValidUrl(checkUrl(state.url)), [state.url]);

	const onSubmit = async () => {
		try {
			setLoading(true);
			const isEditing = selected?.id;
			if (isEditing) {
				await editSubscription(state);
			} else {
				incrementUsage();
				await addSubscription(state);
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
		<Modal someRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} Subscription`} onHide={onHide}>
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
						placeholder="Netflix or Amazon Prime"
						maxLength={30}
						required
						ref={inputRef}
						autoFocus
						autoComplete="off"
						onChange={({ target }) => {
							const { value } = target;
							if (value.length) {
								setState({ ...state, name: value });
							} else {
								setState({ ...state, name: '', paid: 'monthly' });
							}
						}}
						value={state.name}
					/>
					<div className="mt-1 grid grid-cols-[100%] gap-1">
						<Label className="flex grow-0 items-center" htmlFor="website">
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
						</Label>
						<div className="mt-2 flex items-center justify-between">
							<Input
								id="website"
								type="url"
								pattern="https://.*|http://.*"
								maxLength={30}
								placeholder="netflix.com"
								required
								onChange={(event) => setState({ ...state, url: event.target.value })}
								value={state.url}
							/>
						</div>
					</div>
					<div className="grid grid-cols-[34%,36%,30%] gap-1">
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
							<Label htmlFor="date">Bought Date</Label>
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
						<div className="mr-3">
							<Label htmlFor="paying">Paying</Label>
							<div className="mt-2 flex items-center justify-between">
								<select
									id="paying"
									className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
									onChange={(event) => {
										setState({ ...state, paid: event.target.value });
									}}
									value={state.paid}
									required
								>
									{Object.keys(subscriptionCategory).map((key) => {
										return (
											<option key={key} value={key}>
												{subscriptionCategory[key].name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					</div>
					<Label className="mt-1 block">
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
