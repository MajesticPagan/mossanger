"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";

import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";

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

	const handleOnGroupModalOpen = () => {
		setIsGroupModalOpen(true);
	};

	const handleOnGroupModalClose = () => {
		setIsGroupModalOpen(false);
	};

	const listClasses = clsx(
		"fixed inset-y-0 lg:left-20 pb-20 lg:pb-0 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
		isOpen ? "hidden" : "block w-full left-0"
	);

	let renderedItems: React.ReactNode = (
		<p className="text-sm text-gray-500 italic">Não existem mensagens.</p>
	);

	if (initialItems.length > 0) {
		renderedItems = items.map((item) => (
			<ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
		));
	}

	return (
		<>
			<GroupChatModal isOpen={isGroupModalOpen} users={users} onClose={handleOnGroupModalClose} />

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
