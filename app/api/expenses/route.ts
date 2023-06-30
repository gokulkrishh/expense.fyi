import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import messages from 'constants/messages';

export async function POST(request: NextRequest) {
	const { from, to, categories = [] } = await request.json();

	const OR = { OR: categories.map((category: any) => ({ category: { contains: category } })) };

	return await checkAuth(async (user: any) => {
		try {
			const data = await prisma.expenses.findMany({
				where: {
					user_id: user.id,
					date: { lte: to, gte: from },
					...(categories.length && OR),
				},
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
			return NextResponse.json(data);
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
