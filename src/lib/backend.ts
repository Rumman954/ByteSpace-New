import { createHash, randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(join(process.cwd(), "server/index.js"));
const { courses } = require("./data.js") as { courses: CourseRecord[] };

export type CourseRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  image: string;
  instructor: { name: string };
  [key: string]: unknown;
};

type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  enrolled: string[];
};

type Store = {
  users: UserRecord[];
  sessions: Map<string, string>;
};

const hash = (value: string) => createHash("sha256").update(String(value)).digest("hex");

function getStore(): Store {
  const globalRef = globalThis as typeof globalThis & { __bytespaceStore?: Store };
  if (!globalRef.__bytespaceStore) {
    globalRef.__bytespaceStore = {
      users: [
        {
          id: "demo-user",
          name: "Alex Rivera",
          email: "demo@bytespace.com",
          password: hash("demo123"),
          role: "student",
          avatar: "/images/Ellipse (2).png",
          enrolled: [
            "python-django-web-apps",
            "ui-ux-design-masterclass",
            "complete-web-development-bootcamp",
          ],
        },
      ],
      sessions: new Map(),
    };
  }
  return globalRef.__bytespaceStore;
}

export function publicUser(user: UserRecord) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    enrolled: user.enrolled,
  };
}

export function listCourses(q?: string, category?: string, level?: string) {
  let results = courses;
  if (q) {
    const needle = q.toLowerCase();
    results = results.filter(
      (course) =>
        course.title.toLowerCase().includes(needle) ||
        course.category.toLowerCase().includes(needle) ||
        course.instructor.name.toLowerCase().includes(needle)
    );
  }
  if (category && category !== "All") {
    results = results.filter((course) => course.category === category);
  }
  if (level && level !== "All") {
    results = results.filter((course) => course.level === level);
  }
  return results.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    level: course.level,
    price: course.price,
    originalPrice: course.originalPrice,
    rating: course.rating,
    reviews: course.reviews,
    students: course.students,
    duration: course.duration,
    image: course.image,
    instructor: course.instructor.name,
  }));
}

export function getCourse(slug: string) {
  const course = courses.find((item) => item.slug === slug);
  if (!course) return null;
  const related = courses
    .filter((item) => item.slug !== course.slug && item.category === course.category)
    .slice(0, 3)
    .concat(courses.filter((item) => item.slug !== course.slug).slice(0, 3))
    .filter((item, index, arr) => arr.findIndex((c) => c.slug === item.slug) === index)
    .slice(0, 4);
  return { course, related };
}

export function createSession(user: UserRecord) {
  const token = randomBytes(24).toString("hex");
  getStore().sessions.set(token, user.id);
  return token;
}

export function getUserByToken(header?: string | null) {
  const token = (header || "").replace("Bearer ", "");
  const userId = getStore().sessions.get(token);
  if (!userId) return null;
  return getStore().users.find((item) => item.id === userId) || null;
}

export function registerUser(name: string, email: string, password: string) {
  const store = getStore();
  if (store.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return { error: "An account with this email already exists.", status: 409 as const };
  }
  const user: UserRecord = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hash(password),
    role: "student",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2B4FFF&color=fff`,
    enrolled: ["python-django-web-apps"],
  };
  store.users.push(user);
  return { user, token: createSession(user) };
}

export function loginUser(email: string, password: string) {
  const user = getStore().users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== hash(password)) return null;
  return { user, token: createSession(user) };
}

export function demoUser() {
  const user = getStore().users.find((item) => item.email === "demo@bytespace.com");
  if (!user) return null;
  return { user, token: createSession(user) };
}

export function enrollUser(user: UserRecord, slug: string) {
  const course = courses.find((item) => item.slug === slug);
  if (!course) return null;
  if (!user.enrolled.includes(course.slug)) user.enrolled.push(course.slug);
  return user;
}

export function dashboardFor(user: UserRecord) {
  const enrolled = courses.filter((course) => user.enrolled.includes(course.slug));
  return {
    user: publicUser(user),
    stats: {
      courses: enrolled.length,
      completed: Math.min(1, enrolled.length),
      hours: enrolled.length * 6,
      certificates: Math.min(1, enrolled.length),
    },
    courses: enrolled.map((course, index) => ({
      slug: course.slug,
      title: course.title,
      category: course.category,
      price: course.price,
      rating: course.rating,
      duration: course.duration,
      image: course.image,
      instructor: course.instructor.name,
      progress: [72, 41, 18, 12][index] ?? 8,
    })),
  };
}
