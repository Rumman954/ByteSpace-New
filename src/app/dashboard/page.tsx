"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

type DashCourse = {
  slug: string;
  title: string;
  image: string;
  instructor: string;
  progress: number;
  category?: string;
  price?: number;
  rating?: number;
  duration?: string;
};

type DashboardData = {
  stats: { courses: number; completed: number; hours: number; certificates: number };
  courses: DashCourse[];
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    apiFetch<DashboardData>("/api/dashboard")
      .then(setData)
      .catch(() => setData(null));
  }, [user]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-light-gray">
        <Navbar variant="app" />
        <div className="py-24 text-center text-gray-400">Loading dashboard…</div>
      </main>
    );
  }

  return (
    <main className="bg-light-gray min-h-screen">
      <Navbar variant="app" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-sm text-primary-blue font-semibold mb-1">Student dashboard</p>
          <h1 className="text-3xl font-extrabold text-dark-navy">Welcome back, {user.name}</h1>
          <p className="text-gray-500 mt-1">Continue where you left off and keep your streak going.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "My courses", value: data?.stats.courses ?? user.enrolled.length },
            { label: "Completed", value: data?.stats.completed ?? 0 },
            { label: "Hours learned", value: data?.stats.hours ?? 0 },
            { label: "Certificates", value: data?.stats.certificates ?? 0 },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-3xl font-extrabold text-dark-navy mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-dark-navy">Continue learning</h2>
          <Link href="/courses" className="text-sm font-semibold text-primary-blue">
            Browse more
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.courses || []).map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
                {course.category && (
                  <span className="absolute top-3 left-3 bg-primary-blue text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-dark-navy line-clamp-2">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{course.instructor}</p>
                <progress className="progress progress-primary w-full mt-4" value={course.progress} max="100" />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">{course.progress}% complete</p>
                  {course.price != null && (
                    <span className="bg-lime-accent text-dark-navy text-xs font-bold px-3 py-1 rounded-full">
                      ${course.price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {data && data.courses.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center">
            <p className="text-gray-500 mb-4">You have not enrolled in a course yet.</p>
            <Link href="/courses" className="btn rounded-full bg-lime-accent border-none text-dark-navy font-bold">
              Find a course
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
