import { NextRequest, NextResponse } from 'next/server';

import { format } from 'date-fns';

import { checkAuth } from 'lib/auth';
import { calculatePaidDates, calculatePrevRenewalDate, calculateRenewalDate } from 'lib/date';
import prisma from 'lib/prisma';

import { dateFormat } from 'constants/date';
import messages, { emails } from 'constants/messages';

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
			const updatedDate = data.map((datum) => {
				const renewal_date = calculateRenewalDate(datum.date, datum.paid);
				const prev_renewal_date = format(calculatePrevRenewalDate(renewal_date, datum.paid), dateFormat);
				return {
					...datum,
					renewal_date: format(renewal_date, dateFormat),
					prev_renewal_date,
					paid_dates: calculatePaidDates(datum, from, to),
				};
			});
			return NextResponse.json(updatedDate, { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
