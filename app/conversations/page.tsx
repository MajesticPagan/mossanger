"use client";

import clsx from "clsx";

import useConversation from "../hooks/useConversation";

import EmptyState from "../components/EmptyState";

const ConversationsPage = () => {
	const { isOpen } = useConversation();

	const pageClasses = clsx("lg:block lg:pl-80 h-full", isOpen ? "block" : "hidden");

	return (
		<div className={pageClasses}>
			<EmptyState />
		</div>
	);
};

export default ConversationsPage;
