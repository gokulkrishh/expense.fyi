import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import messages from 'constants/messages';

export async function POST(request: NextRequest) {
	const { notes, name, price, category, date, paid_via } = await request.json();
	return await checkAuth(async (user: any) => {
		try {
			await prisma.expenses.create({
				data: { notes, name, price, category, user_id: user.id, date, paid_via },
			});
			return NextResponse.json('added', { status: 201 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	}, false);
}
