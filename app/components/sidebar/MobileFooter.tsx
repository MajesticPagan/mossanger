"use client";

import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";

import MobileItem from "./MobileItem";

const MobileFooter = () => {
	const routes = useRoutes();
	const { isOpen } = useConversation();

	if (isOpen) {
		return null;
	}

	return (
		<div className="fixed bottom-0 z-40 flex lg:hidden items-center justify-between w-full bg-white border-t-[1px]">
			{routes.map((route) => (
				<MobileItem
					key={route.label}
					href={route.href}
					icon={route.icon}
					active={route.active}
					onClick={route.onClick}
				/>
			))}
		</div>
	);
};

export default MobileFooter;
