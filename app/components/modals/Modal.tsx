"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
	children: React.ReactNode;
	isOpen?: boolean;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="min-h-full flex items-center justify-center p-4 sm:p-0 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-300"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="w-full sm:w-full sm:max-w-lg relative overflow-hidden px-4 pb-4 sm:p-6 sm:my-8 rounded-lg shadow-xl text-left transform transition-all bg-white">
								<div className="hidden sm:block absolute right-0 top-0 z-10 pr-4 pt-4">
									<button
										type="button"
										className="rounded-md text-gray-400 hover:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
										onClick={onClose}
									>
										<span className="sr-only">Fechar</span>
										<IoClose className="w-6 h-6" />
									</button>
								</div>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
