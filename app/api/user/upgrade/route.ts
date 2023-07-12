import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import messages from 'constants/messages';

export async function POST(request: NextRequest) {
	const { order_identifier, billing_start_date, plan_status, order_status, order_store_id, order_number } =
		await request.json();
	return await checkAuth(async (user: any) => {
		try {
			await prisma.users.update({
				data: { order_identifier, billing_start_date, plan_status, order_status, order_store_id, order_number },
				where: { id: user.id },
			});
			return NextResponse.json('Successful', { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
