'use client';

import { useState } from 'react';

import { set } from 'date-fns';

import { useUser } from 'components/context/auth-provider';
import DeleteModal from 'components/modal/delete';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader } from 'components/ui/card';

export default function DeleteAccount() {
	const [show, setShow] = useState(false);
	const onHide = () => setShow(false);
	return (
		<>
			<Card className="w-full border border-red-600">
				<CardHeader>
					<h2 className="font-semibold text-primary dark:text-white">Delete Your Account</h2>
				</CardHeader>
				<CardContent>
					<div className="relative mb-3 flex items-center justify-between">
						<div>
							<p className="mr-1 text-sm">Permanently delete your account and data. This action is not reversible.</p>
						</div>
						<Button
							variant={'destructive'}
							onClick={() => {
								setShow(true);
							}}
						>
							Delete
						</Button>
					</div>
				</CardContent>
			</Card>
			<DeleteModal show={show} onHide={onHide} />
		</>
	);
}
