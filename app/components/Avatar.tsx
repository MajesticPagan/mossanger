"use client";

import Image from "next/image";
import clsx from "clsx";

import { User } from "@prisma/client";

import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
	user?: User;
	small?: boolean;
	hideStatus?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ user, small, hideStatus }) => {
	const { members } = useActiveList();
	const isActive = members.indexOf(user?.email!) !== -1;

	const avatarClasses = clsx(
		"relative inline-block rounded-full overflow-hidden",
		small ? "w-3.5 h-3.5" : "w-9 h-9 md:w-11 md:h-11"
	);

	return (
		<div className="relative">
			<div className={avatarClasses}>
				<Image
					alt={`Avatar de ${user?.name}`}
					src={user?.image || "/images/placeholder.jpg"}
					fill
				/>
			</div>
			{!hideStatus && isActive && (
				<span className="absolute top-0 right-0 block rounded-full bg-green-500 ring-2 ring-white w-2 h-2 md:w-3 md:h-3" />
			)}
		</div>
	);
};

export default Avatar;
