'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/admin",
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else if (res?.url) {
      router.push(res.url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100">
      <div className="bg-[#074799] p-8 shadow-lg text-center w-full text-white">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="font-bold text-1xl text-red-500">{error}</div>}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left text-lg mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-left text-lg mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full bg-white text-black font-bold py-2 px-4 rounded-lg flex justify-center items-center mb-2"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/admin" })}
            className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg flex justify-center items-center"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;