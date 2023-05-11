"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { find } from "lodash";

import { FullMessageType } from "@/app/types";

import useConversation from "@/app/hooks/useConversation";

import { pusherClient } from "@/app/libs/pusher";

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

	useEffect(() => {
		// Subscribe client to the channel conversation
		pusherClient.subscribe(conversationId);
		bottomRef?.current?.scrollIntoView();

		const newMessageHandler = (newMessage: FullMessageType) => {
			axios.post(`/api/conversations/${conversationId}/seen`);

			setMessages((currentState: any) => {
				if (find(currentState, { id: newMessage.id })) {
					return currentState;
				}

				return [...currentState, newMessage];
			});

			bottomRef?.current?.scrollIntoView();
		};

		const updateMessageHandler = (newMessage: FullMessageType) => {
			setMessages((currentState: any) =>
				currentState.map((currentMessage: FullMessageType) => {
					if (currentMessage.id === newMessage.id) {
						return newMessage;
					}

					return currentMessage;
				})
			);
		};

		// Everytime the conversation channel updates, Pusher calls the function above
		pusherClient.bind("messages:new", newMessageHandler);
		pusherClient.bind("messages:update", updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind("messages:new", newMessageHandler);
			pusherClient.unbind("messages:update", updateMessageHandler);
		};
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
			<div className="pt-24" ref={bottomRef} />
		</div>
	);
};

export default Body;
