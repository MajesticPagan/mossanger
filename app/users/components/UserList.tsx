"use client";

import { User } from "@prisma/client";

import UserBox from "./UserBox";

interface UserListProps {
	items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
	let renderedItems: React.ReactNode = (
		<p className="text-sm text-gray-500 italic">Não existem pessoas.</p>
	);

	if (items.length > 0) {
		renderedItems = items.map((item) => <UserBox key={item.id} data={item} />);
	}

	return (
		<aside className="fixed inset-y-0 left-0 lg:left-20 pb-20 lg:pb-0 w-full lg:w-80 overflow-y-auto border-r border-gray-200 block">
			<div className="px-5">
				<div className="flex flex-col">
					<h3 className="text-2xl font-bold text-neutral-800 py-4">Pessoas</h3>
					{renderedItems}
				</div>
			</div>
		</aside>
	);
};

export default UserList;
