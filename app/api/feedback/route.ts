import { NextRequest, NextResponse } from 'next/server';

import FeedbackEmail from 'emails/feedback';

import { checkAuth } from 'lib/auth';
import resend from 'lib/email';
import prisma from 'lib/prisma';

import { emails } from 'constants/messages';

export async function POST(request: NextRequest) {
	const { message } = await request.json();
	return await checkAuth(async (user: any) => {
		try {
			await prisma.feedbacks.create({ data: { message, user_id: user.id } });
			await resend.emails.send({
				from: emails.from,
				subject: emails.feedback.subject,
				to: emails.email,
				reply_to: user.email,
				react: FeedbackEmail({ message, email: user.email }),
			});
			return NextResponse.json({ message: emails.feedback.sent }, { status: 201 });
		} catch (error: any) {
			return NextResponse.json({ error: { message: emails.feedback.failed } }, { status: 500 });
		}
	});
}
