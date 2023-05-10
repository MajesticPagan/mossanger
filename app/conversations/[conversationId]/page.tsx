import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface PageParams {
	conversationId: string;
}

const SingleConversationPage = async ({ params }: { params: PageParams }) => {
	const conversation = await getConversationById(params.conversationId);
	const messages = await getMessages(params.conversationId);

	if (!conversation) {
		return (
			<div className="lg:pl-80 h-full">
				<div className="flex flex-col h-full">
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className="lg:pl-80 h-full">
			<div className="flex flex-col h-full">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
};

export default SingleConversationPage;
