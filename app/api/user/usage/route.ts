import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import messages from 'constants/messages';

export async function POST(request: NextRequest) {
	return await checkAuth(async (user: any) => {
		try {
			await prisma.users.update({ data: { usage: { increment: 1 } }, where: { id: user.id } });
			return NextResponse.json('Done');
		} catch (error: any) {
			return NextResponse.json({ message: String(error) || messages.error }, { status: 500 });
		}
	});
}
