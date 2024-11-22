import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	return new NextResponse(JSON.stringify({
		message: "refresh",
	}), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}