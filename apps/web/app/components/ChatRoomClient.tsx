"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: { message: string }[],
    id: string
}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    const { socket, loading } = useSocket(token);
    const [currentMessage, setCurrentMessage] = useState("");
    const [chats, setChats] = useState(messages);

    useEffect(() => {
        if (socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));

            socket.onmessage = (event) => {
                const parseData = JSON.parse(event.data);
                if (parseData.type === "chat") {
                    setChats(c => [...c, { message: parseData.message }])
                }
            }
        }
    }, [socket, loading, id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-gray-400 text-sm">Connecting to chat...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-[60vh] p-4">
                {chats.map((chat, index) => (
                    <div
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl text-sm text-gray-200"
                        key={index}
                    >
                        {chat.message}
                    </div>
                ))}
                {chats.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-8">
                        No messages yet. Start the conversation!
                    </div>
                )}
            </div>
            <div className="flex gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <input
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    type="text"
                    placeholder="Type a message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && currentMessage.trim()) {
                            if (socket && !loading) {
                                socket.send(JSON.stringify({
                                    type: "chat",
                                    roomId: id,
                                    message: currentMessage
                                }));
                                setCurrentMessage("");
                            }
                        }
                    }}
                />
                <button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!currentMessage.trim() || !socket || loading}
                    onClick={() => {
                        if (socket && !loading && currentMessage.trim()) {
                            socket.send(JSON.stringify({
                                type: "chat",
                                roomId: id,
                                message: currentMessage
                            }));
                            setCurrentMessage("");
                        }
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}