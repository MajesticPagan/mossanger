"use client";

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface MobileItemProps {
	href: string;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	const linkClasses = clsx(
		"group flex justify-center gap-x-3 text-sm leading-6 font-semibold w-full p-4 transition text-gray-500 hover:text-black hover:bg-gray-100",
		active && "bg-gray-100 text-black"
	);

	return (
		<Link href={href} onClick={onClick} className={linkClasses}>
			<Icon className="w-6 h-6" />
		</Link>
	);
};

export default MobileItem;
