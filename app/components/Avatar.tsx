"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
	user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
	return (
		<div className="relative">
			<div className="relative inline-block rounded-full overflow-hidden w-9 h-9 md:w-11 md:h-11">
				<Image
					alt={`${user?.name}'s avatar`}
					src={user?.image || "/images/placeholder.jpg"}
					fill
				/>
			</div>
			<span className="absolute top-0 right-0 block rounded-full bg-green-500 ring-2 ring-white w-2 h-2 md:w-3 md:h-3" />
		</div>
	);
};

export default Avatar;
