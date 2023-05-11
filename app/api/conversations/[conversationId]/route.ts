import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
	conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		const { conversationId } = params;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse("Não autorizado.", { status: 401 });
		}

		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});

		if (!existingConversation) {
			return new NextResponse("ID inválido", { status: 400 });
		}

		const deletedConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id],
				},
			},
		});

		// Pusher: Publish conversation removed event to all user channels
		existingConversation.users.forEach((user) => {
			if (user.email) {
				pusherServer.trigger(user.email, "conversation:delete", {
					deletedBy: currentUser,
					conversation: existingConversation,
				});
			}
		});

		return NextResponse.json(deletedConversation);
	} catch (error: any) {
		console.error(error, "CONVERSATION_DELETE_ERROR");
		return new NextResponse("Erro interno.", { status: 500 });
	}
}
