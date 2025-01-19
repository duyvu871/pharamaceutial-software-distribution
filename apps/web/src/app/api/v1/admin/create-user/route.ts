import { NextRequest, NextResponse } from "next/server";
import { createUser } from '@app/api/v1/admin/create-user/_action.ts';


export async function POST(req: NextRequest) {
	// Get the request body
	const body = await req.json();

	const user = await createUser(body);

	return NextResponse.json(user);
}