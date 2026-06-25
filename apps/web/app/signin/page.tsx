"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/signin`, { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0f]">
      {/* Ambient glow orbs */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none z-0 animate-float" />
      <div className="fixed top-1/4 -left-32 w-64 h-64 rounded-full opacity-20 bg-[radial-gradient(circle,rgba(99,102,241,0.3),transparent)]" />
      <div className="fixed bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15 bg-[radial-gradient(circle,rgba(168,85,247,0.3),transparent)]" />

      <div className="relative z-10 w-full max-w-md px-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_8px_25px_rgba(99,102,241,0.3)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-400">Sign in to continue to your chat rooms.</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 transition-colors duration-300 hover:border-white/[0.15]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg px-4 py-3 text-sm bg-red-500/10 border border-red-500/20 text-red-400 animate-[fadeIn_0.3s_ease-out]">
                {error}
              </div>
            )}

            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required id="signin-email" />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} id="signin-password" />

            <Button
              id="signin-submit"
              type="submit"
              loading={loading}
              loadingText="Signing in..."
              gradient="linear-gradient(to right, #4f46e5, #9333ea)"
              className="rounded-xl py-3 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)]"
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
