import axios from "axios"
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";

async function getRoom(slug: string) {
    try {
        const respons = await axios.get(`${BACKEND_URL}/room/${encodeURIComponent(slug)}`);
        return respons.data.room.id;
    } catch (e) {
        console.error("Error fetching room:", e);
        return null;
    }
}

export default async function RoomPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const roomId = await getRoom(slug);

    if (!roomId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white">
                <h1 className="text-2xl font-bold mb-4">Room not found</h1>
                <p className="text-gray-400">The room you are looking for does not exist or an error occurred.</p>
                <a href="/" className="mt-6 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">Go Home</a>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#0a0a0f]">
            {/* Ambient glow */}
            <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none z-0 animate-float" />

            {/* Top bar */}
            <nav className="relative z-10 w-full flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-lg">Excalidraw Chat</span>
                </a>
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-gray-400 font-medium">{slug}</span>
                </div>
            </nav>

            {/* Chat area */}
            <div className="relative z-10 w-full max-w-2xl flex-1 flex flex-col px-4 py-8">
                <ChatRoom id={roomId} />
            </div>
        </div>
    );
}
