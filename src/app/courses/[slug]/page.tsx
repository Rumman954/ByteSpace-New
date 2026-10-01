"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiFetch, type AuthUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { FaPlay, FaStar, FaShare, FaCheck } from "react-icons/fa";
import { HiOutlineUserGroup, HiOutlineBookOpen, HiOutlinePlay, HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi";

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

const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
];

function pickVideo(slug: string) {
  const total = [...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return SAMPLE_VIDEOS[total % SAMPLE_VIDEOS.length];
}

function SignalIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
      <rect x="1" y="8" width="2.2" height="3" rx="0.6" fill="white" />
      <rect x="4.4" y="5.5" width="2.2" height="5.5" rx="0.6" fill="white" />
      <rect x="7.8" y="3" width="2.2" height="8" rx="0.6" fill="white" />
      <rect x="11.2" y="0.5" width="2.2" height="10.5" rx="0.6" fill="white" fillOpacity="0.55" />
    </svg>
  );
}

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, demoLogin, setUser } = useAuth();
  const [tab, setTab] = useState<"about" | "lessons" | "reviews">("about");
  const [reviewFilter, setReviewFilter] = useState<"all" | 5 | 4 | 3 | 2 | 1>("all");
  const [course, setCourse] = useState<Course | null>(null);
  const [related, setRelated] = useState<Related[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [missing, setMissing] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = useMemo(() => pickVideo(slug || "course"), [slug]);

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
    { id: "about", label: "About" },
    { id: "lessons", label: "Lesson" },
    { id: "reviews", label: "Reviews" },
  ] as const;

  const previewLessons = course.curriculum.flatMap((section) => section.lessons).slice(0, 3);
  const includes = [
    { label: "Learning Resources", icon: HiOutlineBookOpen },
    { label: "Quality Lesson Videos", icon: HiOutlinePlay },
    { label: "Certificate of Completion", icon: HiOutlineAcademicCap },
    { label: "Private Consultation", icon: HiOutlineSparkles },
  ];
  const sneakPeaks = [
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400&h=300&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&h=300&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=300&q=80",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&h=300&q=80",
  ];
  const keyPoints = [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ];
  const modules = [
    {
      title: "Module 1: Introduction to Digital Assets",
      body: "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
    },
    {
      title: "Module 2: Design Principles for Impact",
      body: "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
    },
    {
      title: "Module 4: User-Centric Design Strategies",
      body: "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
    },
    {
      title: "Module 5: Interactive Media and Engagement",
      body: "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
    },
    {
      title: "Module 6: Project Showcase and Critique",
      body: "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
    },
    {
      title: "Module 7: Optimizing Digital Assets for Various Platforms",
      body: "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
    },
  ];
  const ratingBars = [
    { stars: 5, count: 720 },
    { stars: 4, count: 120 },
    { stars: 3, count: 21 },
    { stars: 2, count: 12 },
    { stars: 1, count: 16 },
  ];
  const maxRatingCount = 720;
  const reviews = [
    {
      name: "PurePearl Studio",
      role: "UI/UX Designer",
      avatar: "/images/Ellipse (1).png",
      rating: 5,
      ago: "a year ago",
      text: "This course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
    },
    {
      name: "Albert Flores",
      role: "UI/UX Designer",
      avatar: "/images/Ellipse (3).png",
      rating: 5,
      ago: "a year ago",
      text: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
    },
    {
      name: "Cody Fisher",
      role: "UI/UX Designer",
      avatar: "/images/Ellipse (4).png",
      rating: 5,
      ago: "a year ago",
      text: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
    },
    {
      name: "Brooklyn Simmons",
      role: "UI/UX Designer",
      avatar: "/images/Ellipse (5).png",
      rating: 5,
      ago: "a year ago",
      text: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
    },
  ];
  const visibleReviews =
    reviewFilter === "all" ? reviews : reviews.filter((item) => item.rating === reviewFilter);

  async function handleEnroll() {
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
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: course.title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      await navigator.clipboard.writeText(url);
    }
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-primary-blue hero-grid-pattern" />
        <div className="relative">
          <Navbar className="bg-transparent" />
          <section className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="max-w-[720px]">
                <h1 className="text-[32px] md:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight">
                  {course.title}
                </h1>
                <p className="mt-3 text-white text-[16px] md:text-[18px] font-medium">
                  {course.subtitle}
                </p>
                <p className="mt-4 text-[14px] text-white">
                  by <span className="text-lime-accent italic">{course.instructor.name}</span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white/10 text-white text-[13px] font-medium">
                    <SignalIcon />
                    {course.level}
                  </span>
                  <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white/10 text-white text-[13px] font-medium">
                    <FaStar className="text-[11px]" />
                    {course.rating} ({course.reviews} reviews)
                  </span>
                  <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white/10 text-white text-[13px] font-medium">
                    <HiOutlineUserGroup className="text-[15px]" />
                    {course.students} Students
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="hidden sm:inline-flex items-center gap-2 h-11 px-5 rounded-full bg-lime-accent hover:bg-lime-dark text-dark-navy font-semibold text-[14px] shrink-0"
              >
                <FaShare className="text-[12px]" />
                Share
              </button>
            </div>

            <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
              <div>
                <div className="relative rounded-[24px] overflow-hidden bg-black aspect-[16/10] min-h-[280px]">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={course.image}
                    className="w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    onEnded={() => setPlaying(false)}
                  />
                  {!playing && (
                    <button
                      type="button"
                      aria-label="Play preview"
                      onClick={() => {
                        setPlaying(true);
                        const node = videoRef.current;
                        if (node) {
                          node.controls = true;
                          void node.play();
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/10"
                    >
                      <span className="w-[72px] h-[72px] rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <FaPlay className="text-dark-navy text-xl ml-1" />
                      </span>
                    </button>
                  )}
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-8">
                    {tabs.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={`h-10 px-5 rounded-full text-[14px] font-semibold ${
                          tab === item.id
                            ? "bg-lime-accent text-dark-navy"
                            : "bg-[#F3F4F6] text-gray-500"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {tab === "about" && (
                    <div>
                      <h2 className="text-[22px] font-extrabold text-dark-navy mb-4">Description</h2>
                      <div className="space-y-5 text-[15px] text-gray-500 leading-relaxed">
                        {course.overview.split("\n\n").map((para) => (
                          <p key={para.slice(0, 40)}>{para}</p>
                        ))}
                      </div>
                      <h2 className="text-[22px] font-extrabold text-dark-navy mt-10 mb-4">Sneak Peak</h2>
                      <div className="grid grid-cols-4 gap-3">
                        {sneakPeaks.map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt=""
                            className="h-[110px] w-full rounded-2xl object-cover"
                          />
                        ))}
                      </div>
                      <h2 className="text-[22px] font-extrabold text-dark-navy mt-10 mb-4">Key Points</h2>
                      <ul className="space-y-3">
                        {keyPoints.map((point) => (
                          <li key={point} className="flex items-center gap-3 text-[15px] text-gray-600">
                            <span className="w-6 h-6 rounded-full bg-primary-blue text-white flex items-center justify-center shrink-0">
                              <FaCheck className="text-[10px]" />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tab === "lessons" && (
                    <div>
                      <h2 className="text-[22px] font-extrabold text-dark-navy">Explore the Modules</h2>
                      <p className="mt-2 text-[15px] text-gray-500 leading-relaxed max-w-[640px]">
                        Immerse yourself in the course content as we break down each module into comprehensive lessons,
                        providing practical insights and hands-on experiences.
                      </p>
                      <h3 className="text-[18px] font-extrabold text-dark-navy mt-8 mb-4">Lesson List</h3>
                      <div className="space-y-5">
                        {modules.map((module) => (
                          <div key={module.title} className="flex items-start gap-4">
                            <span className="w-14 h-14 rounded-2xl bg-[#D4FF2E] text-dark-navy flex items-center justify-center shrink-0">
                              <FaPlay className="text-[18px] ml-0.5" />
                            </span>
                            <div>
                              <p className="font-bold text-dark-navy">{module.title}</p>
                              <p className="mt-1 text-[14px] text-gray-500 leading-relaxed">{module.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-[18px] font-extrabold text-dark-navy mt-10">Lesson Content</h3>
                      <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
                        Engage with each lesson through captivating video content, detailed textual explanations, and
                        interactive elements. Download resources, complete assignments, and test your understanding with
                        quizzes.
                      </p>
                      <h3 className="text-[18px] font-extrabold text-dark-navy mt-8">Lesson Progress Tracking</h3>
                      <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
                        Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you
                        through your learning journey.
                      </p>
                      <div className="mt-6 rounded-2xl border border-gray-100 px-6 py-5">
                        <p className="text-[13px] text-gray-500">Learning Progress</p>
                        <p className="text-[42px] font-extrabold text-dark-navy leading-none mt-1">55%</p>
                        <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full w-[55%] rounded-full bg-[#D4FF2E]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "reviews" && (
                    <div>
                      <h2 className="text-[22px] font-extrabold text-dark-navy">What Learners Are Saying</h2>
                      <p className="mt-2 text-[15px] text-gray-500 leading-relaxed max-w-[640px]">
                        Discover what our learners have to say about their experience with &apos;Build Digital Assets: A
                        Comprehensive Guide.&apos; Read reviews and ratings from individuals who have embarked on the
                        transformative journey of mastering digital asset creation.
                      </p>
                      <div className="mt-6 rounded-2xl border border-gray-100 p-5 flex gap-6 items-center">
                        <div className="w-[140px] h-[140px] rounded-2xl bg-[#D4FF2E] flex flex-col items-center justify-center shrink-0">
                          <p className="text-[13px] text-dark-navy">Ratings</p>
                          <p className="text-[42px] font-extrabold text-dark-navy leading-none">4.7</p>
                        </div>
                        <div className="flex-1 space-y-2">
                          {ratingBars.map((bar) => (
                            <div key={bar.stars} className="flex items-center gap-3">
                              <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-[#D4FF2E]"
                                  style={{ width: `${(bar.count / maxRatingCount) * 100}%` }}
                                />
                              </div>
                              <span className="flex items-center gap-0.5 text-[#F5B301] text-[11px] w-[90px]">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={i < bar.stars ? "text-[#F5B301]" : "text-gray-200"}
                                  />
                                ))}
                              </span>
                              <span className="w-8 text-right text-[13px] text-gray-400">{bar.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-[18px] font-extrabold text-dark-navy mt-8 mb-4">Individual Reviews:</h3>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {(["all", 5, 4, 3, 2, 1] as const).map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setReviewFilter(value)}
                            className={`h-8 px-3 rounded-full text-[13px] font-semibold ${
                              reviewFilter === value
                                ? "bg-[#D4FF2E] text-dark-navy"
                                : "bg-[#F3F4F6] text-gray-500"
                            }`}
                          >
                            {value === "all" ? (
                              "All rating"
                            ) : (
                              <span className="inline-flex items-center gap-1">
                                <FaStar className="text-[10px]" /> {value}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {visibleReviews.length === 0 && (
                          <p className="text-[14px] text-gray-400">No reviews for this rating yet.</p>
                        )}
                        {visibleReviews.map((item) => (
                          <article key={item.name} className="rounded-2xl border border-gray-100 p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <img src={item.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                                <div>
                                  <p className="font-bold text-dark-navy">{item.name}</p>
                                  <p className="text-[13px] text-gray-400">{item.role}</p>
                                </div>
                              </div>
                              <p className="text-[12px] text-gray-400">{item.ago}</p>
                            </div>
                            <div className="mt-3 flex gap-0.5 text-[#F5B301] text-[12px]">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar key={i} />
                              ))}
                            </div>
                            <p className="mt-3 text-[14px] text-gray-500 leading-relaxed">{item.text}</p>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <aside className="bg-white rounded-[24px] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                <h2 className="text-[20px] font-extrabold text-dark-navy">
                  {course.lectures} Lessons ({course.duration})
                </h2>
                <ul className="mt-5 space-y-4">
                  {previewLessons.map((lesson, index) => (
                    <li key={lesson.title} className="flex items-start justify-between gap-3">
                      <p className="text-[14px] text-dark-navy leading-snug">
                        <span className="text-gray-400 mr-1">{String(index + 1).padStart(2, "0")}</span>
                        {lesson.title}
                      </p>
                      <span className="text-[13px] text-primary-blue whitespace-nowrap">
                        {lesson.duration}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-gray-400">99 more videos</p>
                <p className="mt-6 text-[13px] text-gray-500 leading-relaxed">
                  Ready to Dive In? Enroll Now and Start Building Your Digital Future!
                </p>
                <p className="mt-5">
                  <span className="text-[32px] font-extrabold text-dark-navy">${course.price}</span>
                  <span className="text-[14px] text-gray-400 ml-0.5">/lifetime</span>
                </p>
                {enrolled ? (
                  <Link
                    href="/dashboard"
                    className="mt-4 h-12 rounded-full bg-lime-accent hover:bg-lime-dark text-dark-navy font-semibold text-[15px] w-full inline-flex items-center justify-center"
                  >
                    Go to dashboard
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled={enrolling}
                    onClick={handleEnroll}
                    className="mt-4 h-12 rounded-full bg-lime-accent hover:bg-lime-dark text-dark-navy font-semibold text-[15px] w-full"
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </button>
                )}

                <h3 className="mt-8 font-extrabold text-[16px] text-dark-navy">This course include</h3>
                <ul className="mt-4 space-y-3">
                  {includes.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-[14px] text-gray-500">
                      <item.icon className="text-primary-blue text-[18px] shrink-0" />
                      {item.label}
                    </li>
                  ))}
                </ul>

                <hr className="my-6 border-[#EEE]" />

                <div className="flex items-center gap-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-extrabold text-dark-navy leading-tight">{course.instructor.name}</p>
                    <p className="text-[13px] text-gray-400">{course.instructor.title}</p>
                  </div>
                </div>
                <p className="mt-4 text-[13px] text-gray-500 leading-relaxed">
                  Ready to Dive In? Enroll Now and Start Building Your Digital Future!
                </p>
                <Link
                  href="/creators"
                  className="mt-5 h-11 px-5 rounded-full border border-[#E6E8EC] text-dark-navy font-semibold text-[14px] inline-flex items-center justify-center"
                >
                  See Full Profile
                </Link>
              </aside>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
