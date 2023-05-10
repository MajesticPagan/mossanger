import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse("Não autorizado.", { status: 401 });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: body,
		});

		return NextResponse.json(updatedUser);
	} catch (error: any) {
		console.error(error, "USER_SETTINGS_ERROR");
		return new NextResponse("Erro interno.", { status: 500 });
	}
}
