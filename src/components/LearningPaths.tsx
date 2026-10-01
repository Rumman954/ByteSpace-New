import Link from "next/link";
import { FaCode, FaDatabase, FaBrain, FaMobileAlt, FaPaintBrush, FaChartLine, FaShieldAlt, FaCloud } from "react-icons/fa";

const paths = [
  { name: "Web Development", href: "/courses?category=Web%20Development", icon: FaCode, color: "bg-blue-50 text-primary-blue" },
  { name: "Data Science", href: "/courses?category=Data%20Science", icon: FaDatabase, color: "bg-green-50 text-green-600" },
  { name: "AI & Machine Learning", href: "/courses?category=AI%20%26%20Machine%20Learning", icon: FaBrain, color: "bg-purple-50 text-purple-600" },
  { name: "Mobile Development", href: "/courses?category=Mobile", icon: FaMobileAlt, color: "bg-orange-50 text-orange-600" },
  { name: "UI/UX Design", href: "/courses?category=Design", icon: FaPaintBrush, color: "bg-pink-50 text-pink-600" },
  { name: "Digital Marketing", href: "/courses?category=Marketing", icon: FaChartLine, color: "bg-cyan-50 text-cyan-600" },
  { name: "Cybersecurity", href: "/courses?category=Cybersecurity", icon: FaShieldAlt, color: "bg-red-50 text-red-600" },
  { name: "Cloud Computing", href: "/courses?category=Cloud", icon: FaCloud, color: "bg-indigo-50 text-indigo-600" },
];

const LearningPaths = () => {
  return (
    <section className="py-16 lg:py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
            Explore Diverse Learning Paths at{" "}
            <span className="text-primary-blue">ByteSpace</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Choose from a variety of learning paths tailored to your career goals
            and interests.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {paths.map((path) => {
            const IconComponent = path.icon;
            return (
              <Link
                key={path.name}
                href={path.href}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group card-hover"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="text-2xl" />
                </div>
                <span className="font-semibold text-dark-navy text-sm text-center">
                  {path.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
