"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
	id: string;
	type?: string;
	required?: boolean;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
	id,
	type = "text",
	required,
	placeholder,
	register,
	errors,
}) => {
	return (
		<div className="relative w-full">
			<input
				type={type}
				id={id}
				autoComplete={id}
				placeholder={placeholder}
				{...register(id, { required })}
				className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
			/>
		</div>
	);
};

export default MessageInput;
