"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import { User } from "@prisma/client";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import Button from "../Button";

interface GroupChatModalProps {
	isOpen?: boolean;
	users: User[];
	onClose: () => void;
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, users, onClose }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		handleSubmit,
		setValue,
		watch,
		register,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			members: [],
		},
	});

	const members = watch("members");

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/conversations", {
				...data,
				isGroup: true,
			})
			.then(({ data }) => {
				onClose();
				toast.success("Conversa de grupo criada com sucesso.");
				router.refresh();
				router.push(`/conversations/${data.id}`);
			})
			.catch((error) => toast.error(`Ocorreu algo de errado: ${error.response.data}`))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="pb-12 border-b border-gray-900/10">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Criar conversa de grupo
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-500">
							Crie uma conversa com mais de 2 pessoas.
						</p>

						<div className="flex flex-col gap-y-8 mt-10">
							<Input
								label="Nome"
								id="name"
								placeholder="Jantar de Sábado"
								disabled={isLoading}
								errors={errors}
								register={register}
								required
							/>
							<Select
								label="Membros"
								disabled={isLoading}
								options={users.map((user) => ({
									value: user.id,
									label: user.name,
								}))}
								onChange={(value) =>
									setValue("members", value, { shouldValidate: true })
								}
								value={members}
								required
							/>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end gap-x-6 mt-6">
					<Button disabled={isLoading} onClick={onClose} secondary>
						Cancelar
					</Button>
					<Button type="submit" disabled={isLoading} onClick={onClose}>
						Guardar
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default GroupChatModal;
