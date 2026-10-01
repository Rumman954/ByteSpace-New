"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";

type AuthFormProps = {
  mode: "login" | "signup";
};

const avatars = ["/images/Ellipse.png", "/images/Ellipse (1).png", "/images/Ellipse (2).png"];

const limeFromWhite = {
  filter:
    "brightness(0) invert(89%) sepia(64%) saturate(1800%) hue-rotate(18deg) brightness(1.08)",
} as const;

function SignalIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
      <rect x="1" y="8" width="2.2" height="3" rx="0.6" fill="#9CA3AF" />
      <rect x="4.4" y="5.5" width="2.2" height="5.5" rx="0.6" fill="#9CA3AF" />
      <rect x="7.8" y="3" width="2.2" height="8" rx="0.6" fill="#9CA3AF" />
      <rect x="11.2" y="0.5" width="2.2" height="10.5" rx="0.6" fill="#D1D5DB" />
    </svg>
  );
}

function MiniCourseCard({
  image,
  title,
  className,
}: {
  image: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-[22px] border border-[#E6E8EC] p-3 pb-4 shadow-[0_18px_40px_rgba(15,23,42,0.16)] ${className ?? ""}`}>
      <img src={image} alt={title} className="w-full h-auto block" />
      <div className="px-1 mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-[15px] text-dark-navy leading-snug line-clamp-1">{title}</h3>
          <span className="shrink-0 text-[13px] font-semibold text-dark-navy">4.5 ★</span>
        </div>
        <p className="mt-1 text-[12px] text-primary-blue">
          by <span className="italic">purepearl studio</span>
        </p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 bg-[#F3F4F6] text-gray-500 text-[11px] font-medium rounded-full px-2.5 py-1">
            <SignalIcon />
            Beginner
          </span>
          <div className="flex items-center -space-x-2">
            {avatars.map((src, i) => (
              <img
                key={`${src}-${i}`}
                src={src}
                alt=""
                className="w-6 h-6 rounded-full object-cover border-2 border-white"
              />
            ))}
            <span className="w-6 h-6 rounded-full bg-lime-accent text-[9px] font-bold text-dark-navy inline-flex items-center justify-center border-2 border-white">
              26+
            </span>
          </div>
        </div>
        <p className="mt-2.5">
          <span className="text-[16px] font-extrabold text-primary-blue">$25</span>
          <span className="text-[11px] text-gray-400 ml-0.5">lifetime</span>
        </p>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-primary-blue hero-grid-pattern overflow-hidden relative">
      <div className="absolute top-6 left-6 z-30">
        <Logo showWordmark={false} size={40} />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 min-h-screen grid lg:grid-cols-2 gap-8 items-center py-16">
        <div className="relative hidden lg:block min-h-[560px]">
          <h1 className="text-white text-[28px] font-semibold">
            {isLogin ? "Log in and come in" : "Sign up and come in"}
          </h1>
          <p className="mt-3 text-white/80 text-[15px] leading-relaxed max-w-[420px]">
            {isLogin
              ? "Pick up where you left off. Sign in to keep learning from hundreds of creator-led courses."
              : "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"}
          </p>

          <div className="relative mt-8 h-[420px]">
            <MiniCourseCard
              image="/images/Frame (1).png"
              title="Build Digital Asset"
              className="absolute left-0 top-[72px] w-[250px] z-10"
            />
            <MiniCourseCard
              image="/images/Frame (2).png"
              title="the Power of Big Data"
              className="absolute left-[70px] top-[18px] w-[280px] z-20"
            />
            <img
              src="/images/Cone.png"
              alt=""
              style={limeFromWhite}
              className="absolute left-[-8px] top-[-6px] w-[120px] z-30 pointer-events-none -rotate-[24deg]"
            />
            <img
              src="/images/Cone (1).png"
              alt=""
              className="absolute left-[-6px] bottom-[36px] w-[110px] z-30 pointer-events-none -rotate-[22deg]"
            />
            <img
              src="/images/Framer (1).png"
              alt=""
              className="absolute right-[8px] bottom-[118px] w-[78px] z-30 pointer-events-none rotate-[22deg]"
            />
            <div className="absolute right-0 bottom-[28px] z-30 bg-lime-accent rounded-[18px] px-4 py-3.5 w-[210px] shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
              <p className="font-semibold text-dark-navy text-[14px] leading-none">Happy Students</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[12px] font-semibold text-dark-navy">4.5</span>
                <span className="text-[11px] text-dark-navy/60">(240)</span>
                <span className="text-primary-blue text-[11px]">★</span>
              </div>
              <div className="flex items-center justify-between mt-2.5">
                <div className="flex -space-x-2">
                  {avatars.map((src, i) => (
                    <img
                      key={`${src}-${i}`}
                      src={src}
                      alt=""
                      className="w-7 h-7 rounded-full border-2 border-lime-accent object-cover"
                    />
                  ))}
                </div>
                <div className="bg-dark-navy text-white text-[10px] font-bold w-8 h-8 rounded-full inline-flex items-center justify-center">
                  2K+
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[520px] mx-auto lg:ml-auto">
          <div className="lg:hidden mb-6">
            <Logo showWordmark={false} size={36} />
          </div>
          <div className="bg-white rounded-[28px] px-8 py-9 sm:px-10 sm:py-11 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
            <p className="text-primary-blue text-[14px] mb-2">
              {isLogin ? "Sign in to your Account" : "Create an Account"}
            </p>
            <h2 className="text-[32px] sm:text-[36px] font-extrabold text-dark-navy leading-[1.15] tracking-tight">
              Welcome to
              <br />
              ByteSpace
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {!isLogin && (
                <label className="block">
                  <span className="text-[13px] font-medium text-dark-navy">Full Name</span>
                  <input
                    className="mt-2 w-full h-12 rounded-xl border border-[#E6E8EC] px-4 text-[14px] text-dark-navy placeholder:text-gray-400 outline-none focus:border-primary-blue"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jamie Davis"
                    required
                  />
                </label>
              )}
              <label className="block">
                <span className="text-[13px] font-medium text-dark-navy">Email</span>
                <input
                  type="email"
                  className="mt-2 w-full h-12 rounded-xl border border-[#E6E8EC] px-4 text-[14px] text-dark-navy placeholder:text-gray-400 outline-none focus:border-primary-blue"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="designer@example.com"
                  required={isLogin}
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-dark-navy">Password</span>
                <input
                  type="password"
                  className="mt-2 w-full h-12 rounded-xl border border-[#E6E8EC] px-4 text-[14px] text-dark-navy placeholder:text-gray-400 outline-none focus:border-primary-blue"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required={isLogin}
                />
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={pending}
                  onClick={handleDemo}
                  className="h-11 px-6 rounded-full border border-[#E6E8EC] text-dark-navy font-semibold text-[14px] hover:bg-gray-50 disabled:opacity-60"
                >
                  Demo login
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="h-11 px-8 rounded-full bg-lime-accent hover:bg-lime-dark text-dark-navy font-semibold text-[14px] disabled:opacity-60"
                >
                  {pending ? "Please wait..." : "Continue"}
                </button>
              </div>
            </form>

            <p className="text-[13px] text-gray-500 mt-8 text-center">
              {isLogin ? "New here? " : "Already have an account? "}
              <Link
                href={isLogin ? "/signup" : "/login"}
                className="text-primary-blue font-medium"
              >
                {isLogin ? "Sign up" : "Login"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
