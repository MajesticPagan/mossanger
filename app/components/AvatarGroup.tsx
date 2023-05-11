"use client";

import Image from "next/image";

import { User } from "@prisma/client";

interface AvatarGroupProps {
	users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
	const slicedUsers = users.slice(0, 3);

	const positionMap = {
		0: "top-0 left-[12px]",
		1: "bottom-0",
		2: "bottom-0 right-0",
	};

	return (
		<div className="relative w-11 h-11">
			{slicedUsers.map((user, index) => (
				<div
					key={user.id}
					className={`absolute inline-block rounded-full overflow-hidden w-[21px] h-[21px] ${
						positionMap[index as keyof typeof positionMap]
					}`}
				>
					<Image
						alt={`Avatar de ${user?.name}`}
						src={user?.image || "/images/placeholder.jpg"}
						fill
					/>
				</div>
			))}
		</div>
	);
};

export default AvatarGroup;
