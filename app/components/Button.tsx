"use client";

import clsx from "clsx";

interface ButtonProps {
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
	fullWidth?: boolean;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	children,
	type,
	fullWidth,
	secondary,
	danger,
	disabled,
	onClick,
}) => {
	const buttonClasses = clsx(
		"flex justify-center rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
		disabled && "opacity-50 cursor-default",
		fullWidth && "w-full",
		secondary ? "text-gray-900" : "text-white",
		danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
		!secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
	);

	return (
		<button type={type} disabled={disabled} onClick={onClick} className={buttonClasses}>
			{children}
		</button>
	);
};

export default Button;
