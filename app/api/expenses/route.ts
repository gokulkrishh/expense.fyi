import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import messages, { emails } from 'constants/messages';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const from = searchParams.get('from') || '';
	const to = searchParams.get('to') || '';

	return await checkAuth(async (user: any) => {
		try {
			const data = await prisma.expenses.findMany({
				where: { user_id: user.id, date: { lte: to, gte: from } },
				orderBy: { date: 'desc' },
				select: {
					notes: true,
					name: true,
					price: true,
					category: true,
					paid_via: true,
					id: true,
					date: true,
					created_at: true,
					updated_at: true,
				},
			});
			return NextResponse.json(data, { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
