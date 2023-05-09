"use client";

import { useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/app/hooks/useRoutes";

import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
	currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
	const routes = useRoutes();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="hidden lg:flex lg:flex-col justify-between lg:fixed lg:inset-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:pb-4 lg:overflow-y-auto lg:bg-white lg:border-r-[1px]">
			<nav className="mt-4 flex flex-col justify-between">
				<ul role="list" className="flex flex-col items-center space-y-1">
					{routes.map((route) => (
						<DesktopItem
							key={route.label}
							href={route.href}
							label={route.label}
							icon={route.icon}
							active={route.active}
							onClick={route.onClick}
						/>
					))}
				</ul>
			</nav>
			<nav className="mt-4 flex flex-col justify-between items-center">
				<div
					onClick={() => setIsOpen(true)}
					className="cursor-pointer transition hover:opacity-75"
				>
					<Avatar user={currentUser}/>
				</div>
			</nav>
		</div>
	);
};

export default DesktopSidebar;
