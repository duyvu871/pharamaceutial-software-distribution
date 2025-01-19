import { NextRequest, NextResponse } from "next/server";
import prisma from '@lib/prisma.ts';

export async function GET(req: NextRequest) {
	const users = await prisma.users.findMany();
	return NextResponse.json(users);
}