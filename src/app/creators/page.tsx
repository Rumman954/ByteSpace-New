"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { featuredCourses } from "@/components/Courses";
import { FiFilter } from "react-icons/fi";
import { HiOutlineChevronDown, HiOutlineUserGroup } from "react-icons/hi";

const avatars = ["/images/Ellipse.png", "/images/Ellipse (1).png", "/images/Ellipse (2).png"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const sorts = ["Most relevant", "Newest", "Highest rated"];
const categories = ["All", ...Array.from(new Set(featuredCourses.map((course) => course.category)))];

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

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M8 1.4l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.36 4.48 12.21l.67-3.91L2.31 5.53l3.93-.57L8 1.4z"
        fill="#C5CAD3"
      />
    </svg>
  );
}

export default function CreatorProfilePage() {
  const [following, setFollowing] = useState(false);
  const [openFilter, setOpenFilter] = useState<"level" | "category" | "sort" | null>(null);
  const [level, setLevel] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Most relevant");

  const visibleCourses = useMemo(() => {
    return featuredCourses.filter((course) => {
      if (category !== "All" && course.category !== category) return false;
      if (level !== "All" && level !== "Beginner") return false;
      return true;
    });
  }, [category, level]);

  return (
    <main className="bg-white min-h-screen">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-primary-blue hero-grid-pattern" />
        <div className="relative">
          <Navbar className="bg-transparent" />
          <section className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            <div className="flex items-start gap-5">
              <img
                src="/images/Image (2).png"
                alt="PurePearl Studio"
                className="w-[88px] h-[88px] rounded-[22px] object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-[32px] md:text-[36px] font-extrabold text-white leading-none">
                    PurePearl Studio
                  </h1>
                  <span className="h-8 px-3 rounded-full bg-lime-accent text-dark-navy text-[13px] font-bold inline-flex items-center">
                    Creator
                  </span>
                </div>
                <p className="mt-3 text-[15px] text-white/90">Passionate UI/UX, Web designer</p>
              </div>
            </div>

            <div className="mt-7 max-w-[760px] space-y-4 text-[15px] text-white/85 leading-relaxed">
              <p>
                Welcome to the creative world of PurePearl Studio. Here, you&apos;ll discover the passion,
                expertise, and inspiration that drive my creative journey. Let&apos;s explore and learn together!
              </p>
              <p>
                Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital
                designs to multimedia projects, each piece tells a unique story. Explore the world of creativity
                with me.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2.5">
                <span className="h-10 px-4 rounded-full bg-white/10 text-white text-[14px] font-medium inline-flex items-center">
                  3 Products
                </span>
                <span className="h-10 px-4 rounded-full bg-white/10 text-white text-[14px] font-medium inline-flex items-center">
                  {following ? "13 Followers" : "12 Followers"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFollowing((value) => !value)}
                className={`h-11 px-8 rounded-full font-semibold text-[15px] ${
                  following
                    ? "bg-white text-dark-navy"
                    : "bg-lime-accent hover:bg-lime-dark text-dark-navy"
                }`}
              >
                {following ? "Following" : "Follow"}
              </button>
            </div>
          </section>
        </div>
      </div>

      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2.5">
            <span className="h-10 px-4 rounded-full bg-[#F3F4F6] text-gray-500 text-[14px] font-medium inline-flex items-center gap-2">
              <FiFilter />
              Filter
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenFilter(openFilter === "level" ? null : "level")}
                className="h-10 px-4 rounded-full bg-[#F3F4F6] text-gray-500 text-[14px] font-medium inline-flex items-center gap-2"
              >
                <SignalIcon />
                {level === "All" ? "Level" : level}
                <HiOutlineChevronDown className="text-[16px]" />
              </button>
              {openFilter === "level" && (
                <div className="absolute z-20 mt-2 w-44 bg-white rounded-2xl shadow-lg border border-gray-100 py-2">
                  {levels.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setLevel(item);
                        setOpenFilter(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenFilter(openFilter === "category" ? null : "category")}
                className="h-10 px-4 rounded-full bg-[#F3F4F6] text-gray-500 text-[14px] font-medium inline-flex items-center gap-2"
              >
                <HiOutlineUserGroup className="text-[16px]" />
                {category === "All" ? "Category" : category}
                <HiOutlineChevronDown className="text-[16px]" />
              </button>
              {openFilter === "category" && (
                <div className="absolute z-20 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCategory(item);
                        setOpenFilter(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenFilter(openFilter === "sort" ? null : "sort")}
              className="h-10 px-4 rounded-full border border-[#E6E8EC] text-gray-500 text-[14px] font-medium inline-flex items-center gap-2"
            >
              {sort}
              <HiOutlineChevronDown className="text-[16px]" />
            </button>
            {openFilter === "sort" && (
              <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2">
                {sorts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSort(item);
                      setOpenFilter(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {visibleCourses.length === 0 ? (
          <p className="py-16 text-center text-gray-400">No products match these filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCourses.map((course) => (
              <Link
                href={`/courses/${course.slug}`}
                key={course.id}
                className="bg-white rounded-[22px] border border-[#E6E8EC] p-3.5 pb-5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition-shadow"
              >
                <img src={course.image} alt={course.title} className="w-full h-auto block" />
                <div className="px-1.5 mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-[17px] leading-snug text-dark-navy line-clamp-1">
                      {course.title}
                    </h3>
                    <span className="shrink-0 flex items-center gap-1 text-[14px] font-semibold text-dark-navy pt-0.5">
                      4.5
                      <StarIcon />
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-primary-blue">
                    by <span className="italic">purepearl studio</span>
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-[#F3F4F6] text-gray-500 text-[12px] font-medium rounded-full px-3 py-1.5">
                      <SignalIcon />
                      Beginner
                    </span>
                    <div className="flex items-center -space-x-2">
                      {avatars.map((src, index) => (
                        <img
                          key={`${src}-${index}`}
                          src={src}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover border-2 border-white"
                        />
                      ))}
                      <span className="w-7 h-7 rounded-full bg-lime-accent text-[10px] font-bold text-dark-navy inline-flex items-center justify-center border-2 border-white">
                        25+
                      </span>
                    </div>
                  </div>
                  <p className="mt-4">
                    <span className="text-[20px] font-extrabold text-primary-blue">$25</span>
                    <span className="text-[13px] text-gray-400 ml-0.5">/lifetime</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
