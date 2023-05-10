"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import Image from "next/image";

import { FullMessageType } from "@/app/types";

import Avatar from "@/app/components/Avatar";

interface MessageBoxProps {
	data: FullMessageType;
	isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
	const session = useSession();

	const isOwn = session?.data?.user?.email === data?.sender?.email;

	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => <Avatar key={user.id} user={user} hideStatus small />);

	const containerClasses = clsx("flex gap-3 p-4", isOwn && "justify-end");
	const avatarClasses = clsx(isOwn && "order-2");
	const bodyClasses = clsx("flex flex-col gap-2", isOwn && "items-end");
	const messageClasses = clsx(
		"text-sm w-fit overflow-hidden transition",
		isOwn ? "text-white bg-sky-500 hover:bg-sky-600" : "bg-gray-100 hover:bg-gray-200",
		data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
	);

	return (
		<div className={containerClasses}>
			<div className={avatarClasses}>
				<Avatar user={data.sender} />
			</div>
			<div className={bodyClasses}>
				<div className="flex items-baseline gap-1">
					<div className="text-sm text-gray-500">{data.sender.name}</div>
					<div className="text-xs text-gray-400">
						{format(new Date(data.createdAt), "p", { locale: pt })}
					</div>
				</div>
				<div className={messageClasses}>
					{data.image ? (
						<Image
							className="object-cover cursor-pointer transition translate hover:scale-110"
							width={288}
							height={288}
							alt={`Imagem enviada por ${data.sender.name}`}
							src={data.image}
						/>
					) : (
						<span>{data.body}</span>
					)}
				</div>
				{isLast && isOwn && seenList.length > 0 && (
					<div className="flex items-center gap-1 -mt-1">{seenList}</div>
				)}
			</div>
		</div>
	);
};

export default MessageBox;
