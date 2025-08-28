"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", photoUrl: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      Swal.fire("Success!", "রেজিস্ট্রেশন সম্পূর্ণ হয়েছে", "success");
      router.push("/login");
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 space-y-4 w-96">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <input
          type="text"
          placeholder="Photo URL"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
        />
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
}
