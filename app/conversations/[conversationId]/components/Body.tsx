"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { FullMessageType } from "@/app/types";

import useConversation from "@/app/hooks/useConversation";

import MessageBox from "./MessageBox";

interface BodyProps {
	initialMessages?: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);
	const bottomRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className="flex-1 overflow-y-auto relative">
			{messages?.map((message, index) => (
				<MessageBox
					key={message.id}
					data={message}
					isLast={index === messages.length - 1}
				/>
			))}
			<div className="pt-8" ref={bottomRef} />
		</div>
	);
};

export default Body;
