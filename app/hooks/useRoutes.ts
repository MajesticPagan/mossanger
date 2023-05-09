import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import useConversation from "./useConversation";

const useRoutes = () => {
	const pathname = usePathname();
	const { conversationId } = useConversation();

	const routes = useMemo(
		() => [
			{
				label: "Conversas",
				href: "/conversations",
				icon: HiChat,
				active: pathname === "/conversations" || !!conversationId,
			},
			{
				label: "Utilizadores",
				href: "/users",
				icon: HiUsers,
				active: pathname === "/users",
			},
			{
				label: "Terminar Sessão",
				href: "#",
				icon: HiArrowLeftOnRectangle,
				onClick: () => signOut(),
			},
		],
		[pathname, conversationId]
	);

	return routes;
};

export default useRoutes;
