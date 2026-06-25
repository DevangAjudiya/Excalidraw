import axios from "axios"
import { BACKEND_URL } from "../config"
import { ChatRoomClient } from "./ChatRoomClient"

async function getChats(roomId: string) {
    const respons = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return respons.data.messages;
}

export async function ChatRoom({ id }: { id: string }) {
    const messages = await getChats(id);
    return <ChatRoomClient messages={messages} id={id} />
}