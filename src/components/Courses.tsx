"use client";

import { useState } from "react";
import Link from "next/link";

const avatars = ["/images/Ellipse.png", "/images/Ellipse (1).png", "/images/Ellipse (2).png"];

export const featuredCourses = [
  {
    id: 1,
    slug: "figma-to-tailwind",
    title: "Learn Figma from Basic",
    category: "UI/UX Design",
    image: "/images/Frame.png",
  },
  {
    id: 2,
    slug: "ui-ux-design-masterclass",
    title: "Build Digital Asset",
    category: "Graphic Design",
    image: "/images/Frame (1).png",
  },
  {
    id: 3,
    slug: "data-science-machine-learning",
    title: "the Power of Big Data",
    category: "Data Science",
    image: "/images/Frame (2).png",
  },
  {
    id: 4,
    slug: "digital-marketing-growth",
    title: "Balancing Productivity and Time",
    category: "Productivity",
    image: "/images/Frame (3).png",
  },
  {
    id: 5,
    slug: "sql-for-analysts",
    title: "Mastering Money Management",
    category: "Freelance & Entrepreneurship",
    image: "/images/Frame (4).png",
  },
  {
    id: 6,
    slug: "ai-prompt-engineering",
    title: "From Idea to Startup Success",
    category: "Freelance & Entrepreneurship",
    image: "/images/Frame (5).png",
  },
];

const categories = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
];

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

const Courses = () => {
  const [active, setActive] = useState("Featured");

  const visibleCourses =
    active === "Featured"
      ? featuredCourses
      : featuredCourses.filter((course) => course.category === active);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[720px] mx-auto mb-8">
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-dark-navy leading-[1.15] tracking-tight">
            Discover Your Passion,
            <br />
            Build Your Skills
          </h2>
          <p className="mt-4 text-[15px] md:text-base text-gray-500 leading-relaxed">
            At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of
            courses across different fields, from technology to the arts, and make a difference in your
            career and life.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 max-w-5xl mx-auto">
          {categories.map((item) => {
            const selected = active === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setActive(item)}
                className={`px-[18px] py-2 rounded-full text-[13px] font-medium transition-colors ${
                  selected
                    ? "bg-lime-accent text-dark-navy"
                    : "bg-[#F1F2F4] text-gray-500 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            );
          })}
          <Link
            href="/courses"
            className="px-2 py-2 text-[13px] font-semibold text-primary-blue hover:underline"
          >
            + More
          </Link>
        </div>

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
                      26+
                    </span>
                  </div>
                </div>

                <p className="mt-4">
                  <span className="text-[20px] font-extrabold text-primary-blue">$25</span>
                  <span className="text-[13px] text-gray-400 ml-0.5">lifetime</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        {visibleCourses.length === 0 && (
          <p className="text-center text-gray-400 mb-6">
            No courses in this category yet. Browse all courses to explore more.
          </p>
        )}
        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="bg-primary-blue hover:bg-primary-blue-dark text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 inline-block"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
