"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

import Avatar from "@/app/components/Avatar";

import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";

interface HeaderProps {
	conversation: Conversation & {
		users: User[];
	};
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const otherUser = useOtherUser(conversation);
	const { members } = useActiveList();
	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} membros`;
		}

		return isActive ? "Ativo" : "Offline";
	}, [conversation, isActive]);

	const handleOnDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleOnDrawerClose = () => {
		setDrawerOpen(false);
	};

	return (
		<>
			<ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={handleOnDrawerClose} />

			<div className="w-full flex items-center justify-between px-4 sm:px-4 lg:px-6 py-3 shadow-sm border-b-[1px] bg-white">
				<div className="flex items-center gap-3">
					<Link
						href="/conversations"
						className="block lg:hidden cursor-pointer transition text-sky-500 hover:text-sky-600"
					>
						<HiChevronLeft size={32} />
					</Link>

					{conversation.isGroup ? (
						<AvatarGroup users={conversation.users} />
					) : (
						<Avatar user={otherUser} />
					)}

					<div className="flex flex-col">
						<div>{conversation.name || otherUser.name}</div>
						<div className="text-sm font-light text-neutral-500">{statusText}</div>
					</div>
				</div>

				<HiEllipsisHorizontal
					size={32}
					className="cursor-pointer transition text-sky-500 hover:text-sky-600"
					onClick={handleOnDrawerOpen}
				/>
			</div>
		</>
	);
};

export default Header;
