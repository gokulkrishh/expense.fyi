import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import messages, { emails } from 'constants/messages';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const from = searchParams.get('from') || '';
	const to = searchParams.get('to') || '';
	const categories: any = searchParams.get('categories') || [];

	const OR = { OR: categories.map((category: any) => ({ category: { contains: category } })) };

	return await checkAuth(async (user: any) => {
		try {
			const where = { user_id: user.id, ...(categories.length && OR) };

			if (from !== 'all' && to !== 'all') {
				where.date = { lte: to, gte: from };
			}

			const data = await prisma.investments.findMany({
				where,
				orderBy: { date: 'desc' },
				select: {
					notes: true,
					name: true,
					price: true,
					units: true,
					category: true,
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

export async function DELETE(request: NextRequest) {
	const { id } = await request.json();
	return await checkAuth(async (user: any) => {
		if (!id.length) {
			return NextResponse.json(messages.request.invalid, { status: 400 });
		}
		try {
			await prisma.investments.delete({
				where: { id: id[0] },
			});
			return NextResponse.json('deleted', { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}

export async function PUT(request: NextRequest) {
	const { notes, name, price, category, id, date, units } = await request.json();

	return await checkAuth(async () => {
		if (!id) {
			return NextResponse.json(messages.request.invalid, { status: 400 });
		}
		try {
			await prisma.investments.update({
				data: { notes, name, price, date, category, units },
				where: { id },
			});
			return NextResponse.json('updated', { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
