"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

import useConversation from "@/app/hooks/useConversation";

import Modal from "@/app/components/modals/Modal";
import Button from "@/app/components/Button";
import Loader from "@/app/components/Loader";

interface ConfirmModalProps {
	isOpen?: boolean;
	onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
	const router = useRouter();
	const { conversationId } = useConversation();
	const [isLoading, setIsLoading] = useState(false);

	const handleOnDelete = useCallback(() => {
		setIsLoading(true);

		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose();
				toast.success("Conversa apagada com sucesso.");
				router.push("/conversations");
				router.refresh();
			})
			.catch(() => toast.error("Ocorreu algo de errado."))
			.finally(() => setIsLoading(false));
	}, [router, conversationId, onClose]);

	return (
		<>
			{isLoading && <Loader />}

			<Modal isOpen={isOpen} onClose={onClose}>
				<div className="sm:flex sm:items-start">
					<div className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 rounded-full bg-red-100">
						<FiAlertTriangle className="w-6 h-6 text-red-600" />
					</div>
					<div className="mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
						<Dialog.Title
							as="h3"
							className="text-base font-semibold leading-6 text-gray-900"
						>
							Apagar conversa
						</Dialog.Title>
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								Tem a certeza que deseja apagar esta conversa? Esta ação não é
								reversível.
							</p>
						</div>
					</div>
				</div>
				<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<Button disabled={isLoading} onClick={handleOnDelete} danger>
						Apagar
					</Button>
					<Button disabled={isLoading} onClick={onClose} secondary>
						Cancelar
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default ConfirmModal;
