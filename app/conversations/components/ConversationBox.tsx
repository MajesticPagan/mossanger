"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";

import useOtherUser from "@/app/hooks/useOtherUser";

import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
	data: FullConversationType;
	selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
	const otherUser = useOtherUser(data);
	const session = useSession();
	const router = useRouter();

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];

		return messages[messages.length - 1];
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		// If there is no last message, return not seen
		if (!lastMessage) {
			return false;
		}

		const seenArray = lastMessage.seen || [];

		// If there is no user email, return not seen
		if (!userEmail) {
			return false;
		}

		// Check if the current user has seen the message in the array
		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [lastMessage, userEmail]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return "Enviou uma mensagem";
		}

		if (lastMessage?.body) {
			if (lastMessage.sender.id !== otherUser.id) {
				return `Eu: ${lastMessage.body}`;
			} else {
				return lastMessage.body;
			}
		}

		return "Iniciou uma conversa";
	}, [lastMessage, otherUser.id]);

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [router, data.id]);

	const conversationClasses = clsx(
		"relative w-full flex items-center space-x-3 p-3 rounded-lg transition cursor-pointer",
		selected ? "bg-neutral-100" : "bg-white hover:bg-neutral-100"
	);

	const messageTextClasses = clsx(
		"truncate text-sm",
		hasSeen ? "text-gray-500" : "text-black font-medium"
	);

	return (
		<article onClick={handleClick} className={conversationClasses}>
			<Avatar user={otherUser} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<h4 className="text-md font-medium text-gray-900">
							{data.name || otherUser.name}
						</h4>
						{lastMessage?.createdAt && (
							<p className="text-xs text-gray-400 font-light">
								{format(new Date(lastMessage.createdAt), "p", { locale: pt })}
							</p>
						)}
					</div>
					<p className={messageTextClasses}>{lastMessageText}</p>
				</div>
			</div>
		</article>
	);
};

export default ConversationBox;
