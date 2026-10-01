"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { apiFetch } from "@/lib/api";
import { FiSearch } from "react-icons/fi";

type CourseListItem = {
  slug: string;
  title: string;
  category: string;
  level: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  duration: string;
  image: string;
  instructor: string;
};

const categories = [
  "All",
  "Web Development",
  "Design",
  "Data Science",
  "Marketing",
  "Mobile",
  "Cloud",
  "Cybersecurity",
  "AI & Machine Learning",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const PAGE_SIZE = 8;

export default function CoursesClient() {
  const params = useSearchParams();
  const qParam = params.get("q") || "";
  const catParam = params.get("category") || "All";
  const [q, setQ] = useState(qParam);
  const [category, setCategory] = useState(catParam);
  const [level, setLevel] = useState("All");
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQ(qParam);
    setCategory(catParam);
  }, [qParam, catParam]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (category !== "All") query.set("category", category);
    if (level !== "All") query.set("level", level);
    let cancelled = false;
    setLoading(true);
    setPage(1);
    apiFetch<{ courses: CourseListItem[] }>(`/api/courses?${query.toString()}`)
      .then((data) => {
        if (!cancelled) setCourses(data.courses);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [q, category, level]);

  const pages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));
  const visible = courses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark-navy mb-3">
            Find Your Perfect Course
          </h1>
          <p className="text-gray-500">
            Browse creator-led courses and start building skills that move your career forward.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="flex items-center flex-1 bg-light-gray rounded-full px-4 h-12">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search course, topic, creator"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <select
            className="select select-bordered rounded-full"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                category === item
                  ? "bg-primary-blue text-white"
                  : "bg-light-gray text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-400">Loading courses…</div>
        ) : courses.length === 0 ? (
          <div className="py-20 text-center text-gray-400">No courses match your filters.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visible.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-full text-sm font-bold ${
                    page === n ? "bg-lime-accent text-dark-navy" : "bg-light-gray text-gray-600"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
