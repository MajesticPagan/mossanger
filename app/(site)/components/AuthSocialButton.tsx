"use client";

import { IconType } from "react-icons";

interface AuthSocialButtonProps {
	icon: IconType;
	onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, onClick }) => {
	return (
		<button
			type="button"
			className="w-full inline-flex justify-center rounded-md px-4 py-2 shadow-sm transition text-gray-500 hover:text-white bg-white hover:bg-gray-500 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
			onClick={onClick}
		>
			<Icon />
		</button>
	);
};

export default AuthSocialButton;
