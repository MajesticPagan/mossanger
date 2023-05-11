import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
	conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		const { conversationId } = params;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse("Não autorizado.", { status: 401 });
		}

		// Find existing conversation

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seen: true,
					},
				},
				users: true,
			},
		});

		if (!conversation) {
			return new NextResponse("ID inválido.", { status: 400 });
		}

		// Find last message from existing conversation, update seen

		const lastMessage = conversation.messages[conversation.messages.length - 1];

		if (!lastMessage) {
			return NextResponse.json(conversation);
		}

		const updateMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			include: {
				sender: true,
				seen: true,
			},
			data: {
				seen: {
					connect: {
						id: currentUser.id,
					},
				},
			},
		});

		// Pusher: Publish conversation update event on the current user channel
		await pusherServer.trigger(currentUser.email, "conversation:update", {
			id: conversationId,
			messages: [updateMessage],
		});

		if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
			return NextResponse.json(conversation);
		}

		// Pusher: Publish message update event on the conversation channel (seen message)
		await pusherServer.trigger(conversationId!, "messages:update", updateMessage);

		return NextResponse.json(updateMessage);
	} catch (error: any) {
		console.error(error, "CONVERSATION_SEEN_ERROR");
		return new NextResponse("Erro interno.", { status: 500 });
	}
}
