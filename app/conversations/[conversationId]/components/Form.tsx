"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

import useConversation from "@/app/hooks/useConversation";

import MessageInput from "./MessageInput";

const Form = () => {
	const { conversationId } = useConversation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue("message", "", { shouldValidate: true });

		axios.post("/api/messages", {
			...data,
			conversationId,
		});
	};

	const handleUpload = (result: any) => {
		axios.post("/api/messages/", {
			image: result?.info?.secure_url,
			conversationId,
		});
	};

	return (
		<div className="w-full flex items-center gap-2 lg:gap-4 p-4 border-t bg:white">
			<CldUploadButton
				options={{ maxFiles: 1 }}
				onUpload={handleUpload}
				uploadPreset="oetywtq5"
			>
				<HiPhoto
					size={30}
					className="cursor-pointer transition text-gray-400 hover:text-gray-500"
				/>
			</CldUploadButton>
			<form
				className="w-full flex items-center gap-2 lg:gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<MessageInput
					id="message"
					placeholder="Escreva uma mensagem..."
					register={register}
					errors={errors}
					required
				/>
				<button
					type="submit"
					className="rounded-full p-2 cursor-pointer transition bg-sky-500 hover:bg-sky-600"
				>
					<HiPaperAirplane size={18} className="text-white" />
				</button>
			</form>
		</div>
	);
};

export default Form;
