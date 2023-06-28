'use client';

import { useState } from 'react';

import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { CheckCircle2, MessageSquarePlus } from 'lucide-react';

import { Button } from 'components/ui/button';
import { Popover } from 'components/ui/popover';
import { Textarea } from 'components/ui/textarea';

import { showErrorToast } from './toast';

export default function Feedback() {
	const [state, setState] = useState({ show: false, loading: false, message: '', sent: false });

	const onSubmit = async () => {
		setState({ ...state, loading: true });

		try {
			const res = await fetch(`/api/feedback`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: state.message }),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			setState((prev) => ({ ...prev, sent: true, loading: false, message: '' }));

			setTimeout(() => {
				setState((prev) => ({ ...prev, sent: false, show: false }));
			}, 5000);
		} catch (error: any) {
			setState((prev) => ({ ...prev, loading: false }));
			showErrorToast(error.message);
		}
	};

	return (
		<Popover>
			<PopoverTrigger>
				<Button asChild size={'sm'}>
					<span>
						<MessageSquarePlus className="mr-[6px] mt-[2px] h-4 w-4" />
						Feedback
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="z-10 mr-1 mt-2 h-[158px] w-[290px] rounded-md border border-border bg-muted bg-popover p-4">
				{!state.sent ? (
					<form
						onSubmit={(event) => {
							event.preventDefault();
							onSubmit();
						}}
					>
						<Textarea
							onChange={(event) => setState({ ...state, message: event.target.value })}
							value={state.message}
							placeholder="Share your feedback here"
							className="h-[90px] resize-none "
						/>
						<Button disabled={state.loading} size={'sm'} className="float-right mt-[10px]">
							Send
						</Button>
					</form>
				) : (
					<div className="flex h-[140px] flex-col items-center justify-center">
						<CheckCircle2 className="mb-2 h-14 w-14 text-green-500" />
						<span className="mb-1 mt-1 block text-sm font-semibold text-primary">Your feedback is received!</span>
						<span className="mb-3 block text-sm font-normal text-muted-foreground">
							Thanks for improving the product.
						</span>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}
