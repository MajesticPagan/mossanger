"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
	label: string;
	id: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	type = "text",
	required,
	disabled,
	register,
	errors,
}) => {
	const inputClasses = clsx(
		"form-input block w-full rounded-md border-0 py-1.5 shadow-sm transition sm:text-sm sm:leading-6 text-gray-900 ring-1 focus:ring-2 ring-inset focus:ring-inset ring-gray-300 focus:ring-sky-600 placeholder:text-gray-400",
		errors[id] && "focus:ring-rose-500",
		disabled && "opacity-50 cursor-default"
	);

	return (
		<div>
			<label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={id}>
				{label}
				{required && <span className="text-rose-500 ml-1">*</span>}
			</label>
			<div className="mt-2">
				<input
					type={type}
					id={id}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={inputClasses}
				/>
			</div>
		</div>
	);
};

export default Input;
