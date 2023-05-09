"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";

interface UserBoxProps {
	data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(() => {
		setIsLoading(true);

		axios
			.post("/api/conversations", {
				userId: data.id,
			})
			.then((data) => router.push(`/conversations/${data.data.id}`))
			.catch((error) => toast.error(`Ocorreu algo de errado: ${error.response.data}`))
			.finally(() => setIsLoading(false));
	}, [data.id, router]);

	return (
		<article
			onClick={handleClick}
			className="relative w-full flex items-center space-x-3 p-3 rounded-lg transition cursor-pointer bg-white hover:bg-neutral-100"
		>
			<Avatar user={data} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<h4 className="text-sm font-medium text-gray-900">{data.name}</h4>
					</div>
				</div>
			</div>
		</article>
	);
};

export default UserBox;
