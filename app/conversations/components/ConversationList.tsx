"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useSession } from "next-auth/react";
import { find } from "lodash";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";

import { pusherClient } from "@/app/libs/pusher";

import useConversation from "@/app/hooks/useConversation";

import ConversationBox from "./ConversationBox";
import GroupChatModal from "@/app/components/modals/GroupChatModal";

interface ConversationListProps {
	initialItems: FullConversationType[];
	users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
	const router = useRouter();
	const [items, setItems] = useState(initialItems);
	const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
	const { conversationId, isOpen } = useConversation();
	const session = useSession();

	const handleOnGroupModalOpen = () => {
		setIsGroupModalOpen(true);
	};

	const handleOnGroupModalClose = () => {
		setIsGroupModalOpen(false);
	};

	// Get current user email which is the channel key
	const pusherEventKey = useMemo(() => {
		return session?.data?.user?.email;
	}, [session?.data?.user?.email]);

	useEffect(() => {
		if (!pusherEventKey) {
			return;
		}

		// Subscribe client to the channel conversation
		pusherClient.subscribe(pusherEventKey);

		const newItemsHandler = (newConversation: FullConversationType) => {
			setItems((currentState: any) => {
				if (find(currentState, { id: newConversation.id })) {
					return currentState;
				}

				return [newConversation, ...currentState];
			});
		};

		const updateItemsHandler = (newConversation: FullConversationType) => {
			setItems((currentState: any) =>
				currentState.map((currentConversation: FullConversationType) => {
					if (currentConversation.id === newConversation.id) {
						return {
							...currentConversation,
							messages: newConversation.messages,
						};
					}

					return currentConversation;
				})
			);
		};

		const deleteItemsHandler = ({
			deletedBy,
			conversation,
		}: {
			deletedBy: User;
			conversation: FullConversationType;
		}) => {
			setItems((currentState: any) =>
				currentState.filter((currentConversation: FullConversationType) => {
					return currentConversation.id !== conversation.id;
				})
			);

			if (
				conversationId === conversation.id &&
				session?.data?.user?.email !== deletedBy.email
			) {
				toast.error(`Oops! A conversa foi apagada por ${deletedBy.name}.`);
				router.push("/conversations");
			}
		};

		pusherClient.bind("conversation:new", newItemsHandler);
		pusherClient.bind("conversation:update", updateItemsHandler);
		pusherClient.bind("conversation:delete", deleteItemsHandler);

		return () => {
			pusherClient.unsubscribe(pusherEventKey);
			pusherClient.unbind("conversation:new", newItemsHandler);
			pusherClient.unbind("conversation:update", updateItemsHandler);
			pusherClient.unbind("conversation:delete", deleteItemsHandler);
		};
	}, [pusherEventKey, conversationId, session?.data?.user?.email, router]);

	const listClasses = clsx(
		"fixed inset-y-0 lg:left-20 pb-20 lg:pb-0 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
		isOpen ? "hidden" : "block w-full left-0"
	);

	let renderedItems: React.ReactNode = (
		<p className="text-sm text-gray-500 italic">Não existem mensagens.</p>
	);

	if (items.length > 0) {
		renderedItems = items.map((item) => (
			<ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
		));
	}

	return (
		<>
			<GroupChatModal
				isOpen={isGroupModalOpen}
				users={users}
				onClose={handleOnGroupModalClose}
			/>

			<aside className={listClasses}>
				<div className="px-5">
					<div className="flex justify-between mb-4 pt-4">
						<h3 className="text-2xl font-bold text-neutral-800">Mensagens</h3>
						<button
							type="button"
							className="rounded-full p-2 transition cursor-pointer bg-gray-100 text-gray-600 hover:opacity-75"
							onClick={handleOnGroupModalOpen}
						>
							<MdOutlineGroupAdd size={20} />
						</button>
					</div>
					{renderedItems}
				</div>
			</aside>
		</>
	);
};

export default ConversationList;
