"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function JoinRoomPage() {
  const [roomSlug, setRoomSlug] = useState("");
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomSlug.trim()) router.push(`/room/${roomSlug.trim()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0f]">
      {/* Ambient glow orbs */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none z-0 animate-float" />
      
      <div className="relative z-10 w-full max-w-[400px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Join a room</h1>
        <p className="text-sm text-gray-400 mb-8">Enter the room slug to jump into an existing canvas.</p>

        <form onSubmit={handleJoin} className="space-y-5">
          <Input 
            label="Room slug" 
            type="text" 
            placeholder="e.g. project-x" 
            value={roomSlug} 
            onChange={(e) => setRoomSlug(e.target.value)} 
            required 
            id="join-room-slug" 
          />

          <Button
            type="submit"
            gradient="linear-gradient(to right, #4f46e5, #9333ea)"
            className="rounded-xl py-3 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)]"
          >
            Join
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Want to start your own?{" "}
          <a href="/create-room" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
            Create room
          </a>
        </p>
      </div>
    </div>
  );
}
