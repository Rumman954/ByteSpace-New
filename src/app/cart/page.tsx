"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiFetch, type AuthUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const total = items.reduce((sum, item) => sum + item.price, 0);

  async function checkout() {
    if (!user) {
      router.push("/login");
      return;
    }
    setPending(true);
    setError("");
    try {
      let latest = user;
      for (const item of items) {
        const data = await apiFetch<{ user: AuthUser }>(`/api/courses/${item.slug}/enroll`, {
          method: "POST",
        });
        latest = data.user;
      }
      setUser(latest);
      clear();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-dark-navy mb-8">Cart</h1>
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">Your cart is empty.</p>
            <Link href="/courses" className="btn rounded-full bg-lime-accent border-none text-dark-navy font-bold">
              Browse courses
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4 items-center border border-gray-100 rounded-2xl p-4">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/courses/${item.slug}`} className="font-bold text-dark-navy">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-400">{item.instructor}</p>
                  </div>
                  <p className="font-bold text-dark-navy">${item.price}</p>
                  <button className="btn btn-ghost btn-sm" onClick={() => remove(item.slug)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
              <p className="text-xl font-extrabold text-dark-navy">Total ${total}</p>
              <button
                disabled={pending}
                onClick={checkout}
                className="btn rounded-full bg-lime-accent border-none text-dark-navy font-bold px-8"
              >
                {pending ? "Enrolling..." : user ? "Checkout & enroll" : "Sign in to checkout"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
