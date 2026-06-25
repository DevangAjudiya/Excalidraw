"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, { name, email, password });
      if (response.status === 201) alert("Account created successfully! Please sign in.");
      if (response.status === 200) alert("Account already exists! Please sign in.");
      router.push("/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] flex items-center justify-center p-8">
      <div className="w-full max-w-[400px] bg-[#111118] border border-white/[0.09] rounded-[20px] p-10">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#7C6FFF]" />
          <span className="text-[14px] font-semibold text-[#c4c2f0] tracking-tight">Threadline</span>
        </div>

        {/* Heading */}
        <h1 className="text-[22px] font-semibold text-[#e9e8ff] tracking-tight leading-snug mb-1.5">
          Create your account
        </h1>
        <p className="text-[13px] text-white/40 mb-8 leading-relaxed">
          Join the conversation. Free forever.
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-500/[0.08] border border-red-500/20 rounded-lg px-3 py-2.5 text-[13px] text-[#f09595] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-[1.1rem]">
          <Input label="Full name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required minLength={3} id="signup-name" />
          <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required id="signup-email" />
          <Input label="Password" type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} id="signup-password" />

          {/* Submit */}
          <Button
            type="submit"
            loading={loading}
            loadingText="Creating account…"
            color="#7C6FFF"
            className="mt-6"
          >
            Create account
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2.5 my-5">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-xs text-white/25">or</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        {/* Google */}
        <Button variant="outline" className="gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>

        {/* Footer */}
        <p className="text-center mt-6 text-[13px] text-white/30">
          Already have an account?{" "}
          <a href="/signin" className="text-[#a89fff] font-medium hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}