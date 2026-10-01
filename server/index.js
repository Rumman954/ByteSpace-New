const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { courses } = require("./data");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(express.json());

const hash = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");

const users = [
  {
    id: "demo-user",
    name: "Alex Rivera",
    email: "demo@bytespace.com",
    password: hash("demo123"),
    role: "student",
    avatar: "/images/Ellipse (2).png",
    enrolled: ["python-django-web-apps", "ui-ux-design-masterclass", "complete-web-development-bootcamp"],
  },
];

const sessions = new Map();

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    enrolled: user.enrolled,
  };
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  const userId = sessions.get(token);
  if (!userId) {
    return res.status(401).json({ message: "Please sign in to continue." });
  }
  const user = users.find((item) => item.id === userId);
  if (!user) {
    return res.status(401).json({ message: "Session expired." });
  }
  req.user = user;
  next();
}

function createSession(user) {
  const token = crypto.randomBytes(24).toString("hex");
  sessions.set(token, user.id);
  return token;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "bytespace-api" });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }
  if (users.some((user) => user.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hash(password),
    role: "student",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2B4FFF&color=fff`,
    enrolled: ["python-django-web-apps"],
  };
  users.push(user);
  const token = createSession(user);
  res.status(201).json({ token, user: publicUser(user) });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(
    (item) => item.email.toLowerCase() === String(email || "").toLowerCase()
  );
  if (!user || user.password !== hash(password)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }
  const token = createSession(user);
  res.json({ token, user: publicUser(user) });
});

app.post("/api/auth/demo", (_req, res) => {
  const user = users.find((item) => item.email === "demo@bytespace.com");
  const token = createSession(user);
  res.json({ token, user: publicUser(user) });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.get("/api/courses", (req, res) => {
  const { q, category, level } = req.query;
  let results = courses;
  if (q) {
    const needle = String(q).toLowerCase();
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
  res.json({
    courses: results.map((course) => ({
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
    })),
  });
});

app.get("/api/courses/:slug", (req, res) => {
  const course = courses.find((item) => item.slug === req.params.slug);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  const related = courses
    .filter((item) => item.slug !== course.slug && item.category === course.category)
    .slice(0, 3)
    .concat(
      courses.filter((item) => item.slug !== course.slug).slice(0, 3)
    )
    .filter((item, index, arr) => arr.findIndex((c) => c.slug === item.slug) === index)
    .slice(0, 4);
  res.json({ course, related });
});

app.get("/api/dashboard", authMiddleware, (req, res) => {
  const enrolled = courses.filter((course) =>
    req.user.enrolled.includes(course.slug)
  );
  res.json({
    user: publicUser(req.user),
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
  });
});

app.post("/api/courses/:slug/enroll", authMiddleware, (req, res) => {
  const course = courses.find((item) => item.slug === req.params.slug);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  if (!req.user.enrolled.includes(course.slug)) {
    req.user.enrolled.push(course.slug);
  }
  res.json({ user: publicUser(req.user) });
});

app.listen(PORT, () => {
  console.log(`ByteSpace API running on http://localhost:${PORT}`);
});
