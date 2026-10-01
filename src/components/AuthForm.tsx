"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register, demoLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const isLogin = mode === "login";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  async function handleDemo() {
    setError("");
    setPending(true);
    try {
      await demoLogin();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo login failed. Start the Express API.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex bg-primary-blue overflow-hidden items-center justify-center hero-grid-pattern">
        <div className="absolute -left-8 top-10 w-36 h-52 pointer-events-none">
          <Image src="/images/Frame (1).png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute right-6 bottom-16 w-24 h-24 pointer-events-none">
          <Image src="/images/Cone.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-8 left-8 z-20">
          <Logo />
        </div>
        <div className="relative z-10 text-center px-10">
          <div className="w-[280px] h-[280px] mx-auto bg-lime-accent rounded-full mb-6 relative">
            <Image
              src="/images/Image.png"
              alt="Student"
              fill
              className="object-contain object-bottom"
            />
          </div>
          <h2 className="text-white text-3xl font-extrabold mb-3">
            {isLogin ? "Welcome to ByteSpace" : "Welcome Back"}
          </h2>
          <p className="text-white/70 max-w-sm mx-auto">
            {isLogin
              ? "Sign in and continue learning from hundreds of creator-led courses."
              : "Create your account and start building skills today."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo wordmarkClassName="text-dark-navy" />
          </div>
          <h1 className="text-3xl font-extrabold text-dark-navy mb-2">
            {isLogin ? "Welcome to ByteSpace" : "Create your account"}
          </h1>
          <p className="text-gray-500 mb-8">
            {isLogin ? "Sign in to continue learning." : "Join ByteSpace in less than a minute."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Full name</span>
                <input
                  className="input input-bordered w-full rounded-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            )}
            <label className="form-control w-full">
              <span className="label-text mb-1 font-medium">Email</span>
              <input
                type="email"
                className="input input-bordered w-full rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={isLogin}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text mb-1 font-medium">Password</span>
              <input
                type="password"
                className="input input-bordered w-full rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={isLogin}
              />
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="btn w-full rounded-full bg-lime-accent border-none text-dark-navy font-bold hover:bg-lime-dark"
            >
              {pending ? "Please wait..." : isLogin ? "Login" : "Create account"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={handleDemo}
              className="btn w-full rounded-full bg-primary-blue border-none text-white font-bold"
            >
              Demo login
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <Link href={isLogin ? "/signup" : "/login"} className="text-primary-blue font-semibold">
              {isLogin ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
