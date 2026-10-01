"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { apiFetch, type AuthUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { FaPlay, FaStar, FaCheck } from "react-icons/fa";
import { HiOutlineClock, HiOutlineGlobeAlt, HiOutlineDocumentText } from "react-icons/hi";

type Lesson = { title: string; duration: string; preview: boolean };
type Section = { title: string; lectures: number; duration: string; lessons: Lesson[] };
type Course = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lectures: number;
  language: string;
  lastUpdated: string;
  image: string;
  overview: string;
  learn: string[];
  includes: string[];
  curriculum: Section[];
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
    courses: number;
    students: number;
    rating: number;
  };
};

type Related = {
  slug: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  duration: string;
  image: string;
  instructor: { name: string };
};

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, demoLogin, setUser } = useAuth();
  const { add, items } = useCart();
  const [tab, setTab] = useState<"overview" | "curriculum" | "instructor">("overview");
  const [course, setCourse] = useState<Course | null>(null);
  const [related, setRelated] = useState<Related[]>([]);
  const [open, setOpen] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const [missing, setMissing] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    apiFetch<{ course: Course; related: Related[] }>(`/api/courses/${slug}`)
      .then((data) => {
        setCourse(data.course);
        setRelated(data.related);
        setMissing(false);
      })
      .catch(() => {
        setCourse(null);
        setMissing(true);
      });
  }, [slug]);

  useEffect(() => {
    if (user && course) {
      setEnrolled(user.enrolled?.includes(course.slug));
    }
  }, [user, course]);

  if (missing) {
    return (
      <main>
        <Navbar />
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold text-dark-navy mb-3">Course not found</h1>
          <Link href="/courses" className="text-primary-blue font-semibold">
            Back to courses
          </Link>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main>
        <Navbar />
        <div className="py-24 text-center text-gray-400">Loading course…</div>
      </main>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" },
  ] as const;

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <section className="bg-primary-blue relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-lime-accent/90 rounded-l-[80px] hidden md:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div>
            <p className="text-lime-accent text-sm font-semibold mb-3">{course.category}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
              {course.title}
            </h1>
            <p className="text-white/70 mb-5 max-w-xl">{course.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <FaStar className="text-lime-accent" /> {course.rating} ({course.reviews.toLocaleString()})
              </span>
              <span>{course.students.toLocaleString()} students</span>
              <span>Updated {course.lastUpdated}</span>
            </div>
          </div>
          <div className="relative justify-self-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <Image src={course.instructor.avatar} alt={course.instructor.name} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1fr_340px] gap-10">
        <div>
          <div className="flex gap-6 border-b border-gray-100 mb-8">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`pb-3 text-sm font-semibold ${
                  tab === item.id
                    ? "text-primary-blue border-b-2 border-primary-blue"
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div>
              <h2 className="text-xl font-bold text-dark-navy mb-3">About this course</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{course.overview}</p>
              <h3 className="text-lg font-bold text-dark-navy mb-4">What you will learn</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {course.learn.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-gray-700">
                    <FaCheck className="text-primary-blue mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-bold text-dark-navy mb-4">Related courses</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((item) => (
                  <CourseCard
                    key={item.slug}
                    course={{
                      slug: item.slug,
                      title: item.title,
                      category: item.category,
                      price: item.price,
                      rating: item.rating,
                      duration: item.duration,
                      image: item.image,
                      instructor:
                        typeof item.instructor === "string"
                          ? item.instructor
                          : item.instructor?.name,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {tab === "curriculum" && (
            <div className="space-y-3">
              {course.curriculum.map((section, index) => (
                <div key={section.title} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 bg-light-gray"
                    onClick={() => setOpen(index === open ? -1 : index)}
                  >
                    <span className="font-semibold text-dark-navy">{section.title}</span>
                    <span className="text-xs text-gray-400">
                      {section.lectures} lectures · {section.duration}
                    </span>
                  </button>
                  {open === index && (
                    <ul className="divide-y divide-gray-50">
                      {section.lessons.map((lesson) => (
                        <li key={lesson.title} className="px-5 py-3 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-gray-700">
                            <FaPlay className="text-primary-blue text-[10px]" />
                            {lesson.title}
                          </span>
                          <span className="text-gray-400">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === "instructor" && (
            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-28 h-28 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-dark-navy">{course.instructor.name}</h2>
                <p className="text-primary-blue text-sm mb-3">{course.instructor.title}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span>★ {course.instructor.rating} rating</span>
                  <span>{course.instructor.students.toLocaleString()} students</span>
                  <span>{course.instructor.courses} courses</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{course.instructor.bio}</p>
              </div>
            </div>
          )}
        </div>

        <aside className="lg:-mt-40">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden sticky top-6">
            <div className="relative h-40">
              <Image src={course.image} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-lime-accent flex items-center justify-center">
                  <FaPlay className="text-dark-navy ml-0.5" />
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-extrabold text-dark-navy">${course.price}</span>
                <span className="text-gray-400 line-through mb-1">${course.originalPrice}</span>
              </div>
              {enrolled ? (
                <Link href="/dashboard" className="btn w-full rounded-full bg-lime-accent border-none text-dark-navy font-bold">
                  Go to dashboard
                </Link>
              ) : (
                <button
                  disabled={enrolling}
                  onClick={async () => {
                    setEnrolling(true);
                    try {
                      if (!user) await demoLogin();
                      const data = await apiFetch<{ user: AuthUser }>(`/api/courses/${course.slug}/enroll`, {
                        method: "POST",
                      });
                      setUser(data.user);
                      setEnrolled(true);
                    } finally {
                      setEnrolling(false);
                    }
                  }}
                  className="btn w-full rounded-full bg-lime-accent border-none text-dark-navy font-bold"
                >
                  {enrolling ? "Enrolling..." : "Enroll now"}
                </button>
              )}
              <button
                onClick={() =>
                  add({
                    slug: course.slug,
                    title: course.title,
                    price: course.price,
                    image: course.image,
                    instructor: course.instructor.name,
                  })
                }
                className="btn w-full rounded-full mt-2 bg-primary-blue border-none text-white font-bold"
              >
                {items.some((item) => item.slug === course.slug) ? "Added to cart" : "Add to cart"}
              </button>
              <ul className="mt-5 space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <HiOutlineClock /> {course.duration} of video
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineDocumentText /> {course.lectures} lectures
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> {course.language}
                </li>
                {course.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <FaCheck className="text-primary-blue" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>
      <Footer />
    </main>
  );
}
