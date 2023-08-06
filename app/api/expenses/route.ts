import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import messages from 'constants/messages';

type Where = {
	user_id: string;
	date?: {
		lte: string;
		gte: string;
	};
	categories?: {
		contains: string;
	};
};

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const from = searchParams.get('from') || '';
	const to = searchParams.get('to') || '';
	const categories: any = searchParams.get('categories') || '';
	const OR = { OR: categories?.split(',').map((category: any) => ({ category: { contains: category } })) };

	return await checkAuth(async (user: any) => {
		try {
			const where = {
				user_id: user.id,
				...(categories.length && OR),
				...(to && from && { date: { lte: to, gte: from } }),
			};

			if (!from && !to) {
				delete where.date;
			}

			const data = await prisma.expenses.findMany({
				where,
				orderBy: { updated_at: 'desc' },
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
			return NextResponse.json(data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)));
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}

export async function DELETE(request: NextRequest) {
	const { id } = await request.json();
	return await checkAuth(async (user: any) => {
		if (!id.length) {
			return NextResponse.json(messages.request.invalid, { status: 400 });
		}
		try {
			await prisma.expenses.delete({
				where: { id: id[0] },
			});
			return NextResponse.json('deleted', { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}

export async function PUT(request: NextRequest) {
	const { notes, name, price, category, id, date, paid_via } = await request.json();

	return await checkAuth(async () => {
		if (!id) {
			return NextResponse.json(messages.request.invalid, { status: 400 });
		}
		try {
			await prisma.expenses.update({
				data: { notes, name, price, date, paid_via, category },
				where: { id },
			});
			return NextResponse.json('updated', { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
