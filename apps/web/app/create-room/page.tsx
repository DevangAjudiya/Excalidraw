"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!roomName.trim()) return;
    const token = localStorage.getItem("token");
    if (!token) { router.push("/signin"); return; }
    
    setCreating(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/room`,
        { name: roomName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push(`/room/${res.data.slug}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create room.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0f]">
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none z-0 animate-float" />
      
      <div className="relative z-10 w-full max-w-[400px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Create a new room</h1>
        <p className="text-sm text-gray-400 mb-8">Start a fresh canvas and invite your team.</p>

        {error && (
          <div className="bg-red-500/[0.08] border border-red-500/20 rounded-lg px-3 py-2.5 text-[13px] text-[#f09595] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-5">
          <Input 
            label="Room name" 
            type="text" 
            placeholder="e.g. Brainstorming" 
            value={roomName} 
            onChange={(e) => setRoomName(e.target.value)} 
            required 
            id="create-room-name" 
          />

          <Button
            type="submit"
            loading={creating}
            loadingText="Creating…"
            gradient="linear-gradient(to right, #4f46e5, #9333ea)"
            className="rounded-xl py-3 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)]"
          >
            Create room
          </Button>
        </form>

        <p className="text-center mt-6 text-[13px] text-white/30">
          Want to join an existing room?{" "}
          <a href="/join-room" className="text-[#a89fff] font-medium hover:underline">
            Join room
          </a>
        </p>
      </div>
    </div>
  );
}
