'use client';

import { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { deleteUser } from 'app/dashboard/settings/apis';

import { useUser } from 'components/context/auth-provider';
import CircleLoader from 'components/loader/circle';
import { Button } from 'components/ui/button';

import Modal from '.';

export default function DeleteModal({ show, onHide }: { show: boolean; onHide: () => void }) {
	const [loading, setLoading] = useState(false);
	const supabase = createClientComponentClient();

	const onDelete = async () => {
		setLoading(true);
		await deleteUser();
		setLoading(false);
		await supabase.auth.signOut();
		window.location.href = '/signup';
	};

	return (
		<Modal show={show} title="Delete Your Account" onHide={onHide} someRef={null}>
			<div className="text-sm text-muted-foreground">Are you sure you want to delete your account?</div>
			<Button onClick={onDelete} variant={'destructive'} disabled={loading} className="float-right mt-4">
				{loading ? (
					<>
						<CircleLoader /> <span className="ml-2">Deleting</span>
					</>
				) : (
					'Delete'
				)}
			</Button>
		</Modal>
	);
}
