"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import clsx from "clsx";

interface InputProps {
	label: string;
	placeholder?: string;
	disabled?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	onUpload: (result: any) => void;
}

const ImageInput: React.FC<InputProps> = ({
	label,
	placeholder,
	disabled,
	register,
	errors,
	onUpload,
}) => {
	const inputClasses = clsx(
		"flex items-center gap-x-3 mt-2 transition",
		disabled && "opacity-75"
	);

	return (
		<div>
			<label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
			<div className={inputClasses}>
				<Image
					width={48}
					height={48}
					alt="Avatar"
					className="rounded-full w-12 h-12"
					src={placeholder || "/images/placeholder.jpg"}
				/>
				<CldUploadButton
					options={{ maxFiles: 1 }}
					onUpload={onUpload}
					uploadPreset="oetywtq5"
				>
					<span className="flex justify-center px-3 py-2 cursor-pointer text-sm font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
						Alterar
					</span>
				</CldUploadButton>
			</div>
		</div>
	);
};

export default ImageInput;
