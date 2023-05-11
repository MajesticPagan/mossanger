"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

import { User } from "@prisma/client";

import Modal from "./Modal";
import Input from "../inputs/Input";
import ImageInput from "../inputs/ImageInput";
import Button from "../Button";
import Loader from "../Loader";

interface SettingsModalProps {
	currentUser: User;
	isOpen?: boolean;
	onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ currentUser, isOpen, onClose }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [currentUserEmail, setCurrentUserEmail] = useState(currentUser?.email);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: currentUser?.name,
			image: currentUser?.image,
			email: currentUser?.email,
		},
	});

	const image = watch("image");

	const handleUpload = (result: any) => {
		setValue("image", result?.info?.secure_url, { shouldValidate: true });
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/settings", data)
			.then(({ data }) => {
				if (data.email !== currentUserEmail) {
					toast.error(
						"Alterou o email da sua conta, por favor inicie a sessão novamente."
					);
					setTimeout(() => {
						signOut();
					}, 2000);
				} else {
					router.refresh();
					onClose();
					toast.success("Perfil atualizado com sucesso.");
				}
			})
			.catch((error) => toast.error(`Ocorreu algo de errado: ${error.response.data}`))
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			{isLoading && <Loader />}

			<Modal isOpen={isOpen} onClose={onClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-12">
						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Perfil
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-500">
								Altere dados relacionados com o seu perfil.
							</p>

							<div className="flex flex-col gap-y-8 mt-10">
								<Input
									label="Nome"
									id="name"
									disabled={isLoading}
									errors={errors}
									register={register}
									required
								/>
								<Input
									label="Email"
									id="email"
									type="email"
									disabled={isLoading}
									errors={errors}
									register={register}
									required
								/>
								<ImageInput
									label="Foto"
									placeholder={image || currentUser?.image}
									disabled={isLoading}
									errors={errors}
									register={register}
									onUpload={handleUpload}
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
		</>
	);
};

export default SettingsModal;
