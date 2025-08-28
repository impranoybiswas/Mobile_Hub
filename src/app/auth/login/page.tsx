"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login successful");
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 space-y-4 w-96">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
}
