"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 h-14 bg-white border-b border-black/[0.08] dark:bg-zinc-950 dark:border-white/[0.08]">
      <Link href="/" className="flex items-center gap-2.5 font-medium text-[15px] text-zinc-900 dark:text-white">
        <div className="w-[30px] h-[30px] rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z" />
          </svg>
        </div>
        Excalidraw
      </Link>

      <div className="hidden md:flex items-center gap-6 text-[13px] text-zinc-500 dark:text-zinc-400">
        <Link href="#features" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Features</Link>
        <Link href="#rooms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Rooms</Link>
        <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Docs</Link>
      </div>

      <div className="flex items-center gap-2">
        {token ? (
          <button
            onClick={handleLogout}
            className="border border-black/[0.1] dark:border-white/[0.1] rounded-lg px-4 py-1.5 text-[13px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/[0.05] transition-colors"
          >
            Sign out
          </button>
        ) : (
          <>
            <Link href="/signin" className="border border-black/[0.1] dark:border-white/[0.1] rounded-lg px-4 py-1.5 text-[13px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/[0.05] transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-1.5 text-[13px] font-medium transition-colors">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}