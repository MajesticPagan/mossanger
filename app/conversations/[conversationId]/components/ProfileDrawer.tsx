"use client";

import { Fragment, useState, useMemo } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Transition, Dialog } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";

import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/app/hooks/useOtherUser";

import Modal from "@/app/components/Modal";
import Avatar from "@/app/components/Avatar";

interface ProfileDrawerProps {
	data: Conversation & {
		users: User[];
	};
	isOpen?: boolean;
	onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data, isOpen, onClose }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const otherUser = useOtherUser(data);

	const joinedDate = useMemo(() => {
		return format(new Date(otherUser.createdAt), "PP", { locale: pt });
	}, [otherUser.createdAt]);

	const lastMessageDate = useMemo(() => {
		return format(new Date(data.lastMessageAt), "p (PP)", { locale: pt });
	}, [data.lastMessageAt]);

	const title = useMemo(() => {
		return data.name || otherUser.name;
	}, [data.name, otherUser.name]);

	const statusText = useMemo(() => {
		if (data.isGroup) {
			return `${data.users.length} membros`;
		}

		return "Ativo";
	}, [data]);

	const handleOnModalOpen = () => {
		setModalOpen(true);
	};

	const handleOnModalClose = () => {
		setModalOpen(false);
	};

	return (
		<>
			<Modal isOpen={modalOpen} onClose={handleOnModalClose}>
				<div className="p-5 bg-white">
					<p>Hello!</p>
				</div>
			</Modal>

			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={onClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-40" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<div className="h-full flex flex-col py-6 overflow-y-scroll shadow-xl bg-white">
											<div className="px-4 sm:px-6">
												<div className="flex items-start justify-end">
													<div className="h-7 flex items-center ml-3">
														<button
															type="button"
															className="rounded-md text-gray-400 hover:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
															onClick={onClose}
														>
															<span className="sr-only">Fechar</span>
															<IoClose size={24} />
														</button>
													</div>
												</div>
											</div>

											<div className="relative flex-1 px-4 sm:px-6 mt-6">
												<div className="flex flex-col items-center">
													<div className="mb-2">
														<Avatar user={otherUser} />
													</div>

													<div className="text-lg">{title}</div>

													<div className="text-sm text-gray-500">
														{statusText}
													</div>

													<div className="flex gap-10 my-8">
														<button
															type="button"
															className="flex flex-col items-center gap-3 cursor-pointer transition hover:opacity-75"
															onClick={handleOnModalOpen}
														>
															<span className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100">
																<IoTrash
																	size={20}
																	className="text-rose-500"
																/>
															</span>
															<span className="text-sm font-light text-neutral-600">
																Apagar
															</span>
														</button>
													</div>
												</div>
											</div>

											<div className="w-full py-5 sm:px-0 sm:pt-0">
												<dl className="space-y-8 sm:space-y-6 px-4 sm:px-6">
													{!data.isGroup && (
														<>
															<div>
																<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
																	Email
																</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
																	{otherUser.email}
																</dd>
															</div>

															<hr />

															<div>
																<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
																	Entrou
																</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
																	<time dateTime={joinedDate}>
																		{joinedDate}
																	</time>
																</dd>
															</div>
														</>
													)}

													<hr />

													<div>
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
															Última mensagem
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
															<time dateTime={lastMessageDate}>
																{lastMessageDate}
															</time>
														</dd>
													</div>
												</dl>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default ProfileDrawer;
