'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from 'components/ui/toast';
import { useToast } from 'components/ui/use-toast';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				const isSuccess = !title && props.variant === 'success';
				const isFailure = !title && props.variant === 'destructive';
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && (
								<ToastDescription className="flex items-center">
									{isSuccess ? <CheckCircle2 className="mr-1.5 h-4 w-4" /> : null}
									{isFailure ? <XCircle className="mr-1.5 h-4 w-4" /> : null}
									{description}
								</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
