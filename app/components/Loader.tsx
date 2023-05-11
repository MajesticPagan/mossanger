"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BarLoader } from "react-spinners";

const Loader = () => {
	return (
		<Transition.Root show as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={() => {}}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity bg-gray-100 bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-auto">
					<div className="min-h-full flex items-center justify-center p-4 text-center">
						<Dialog.Panel>
							<BarLoader color="#0284c7" />
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Loader;
