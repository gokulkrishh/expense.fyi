import { NextRequest, NextResponse } from 'next/server';

import { format } from 'date-fns';

import { checkAuth } from 'lib/auth';
import { calculatePaidDates, calculatePrevRenewalDate, calculateRenewalDate } from 'lib/date';
import prisma from 'lib/prisma';

import { dateFormat } from 'constants/date';
import messages from 'constants/messages';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const from = searchParams.get('from') || '';
	const to = searchParams.get('to') || '';

	return await checkAuth(async (user: any) => {
		try {
			const data = await prisma.subscriptions.findMany({
				where: { user_id: user.id },
				orderBy: { date: 'desc' },
			});

			let updatedDate = data.map((datum) => {
				const renewal_date = calculateRenewalDate(datum.date, datum.paid);
				const prev_renewal_date = format(calculatePrevRenewalDate(renewal_date, datum.paid), dateFormat);
				return {
					...datum,
					renewal_date: format(renewal_date, dateFormat),
					prev_renewal_date,
					paid_dates: calculatePaidDates(datum, from, to),
				};
			});

			if (from !== '' && to !== '') {
				updatedDate = updatedDate.filter((datum) => datum.paid_dates?.length);
			}

			return NextResponse.json(updatedDate, { status: 200 });
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
			await prisma.subscriptions.delete({
				where: { id: id[0] },
			});
			return NextResponse.json('deleted', { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}

export async function PUT(request: NextRequest) {
	const { notes, name, price, paid, id, url, date, active, cancelled_at } = await request.json();

	return await checkAuth(async () => {
		if (!id) {
			return NextResponse.json(messages.request.invalid, { status: 400 });
		}
		try {
			await prisma.subscriptions.update({
				data: { notes, name, price, date, url, paid, active, cancelled_at },
				where: { id },
			});
			return NextResponse.json('updated', { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
