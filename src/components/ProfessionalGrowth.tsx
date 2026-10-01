import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  "Industry-recognized certificates upon completion",
  "Hands-on projects to build your portfolio",
  "Learn at your own pace with lifetime access",
  "Expert instructors from top companies",
  "Interactive quizzes and assignments",
  "Community support and mentorship",
];

const ProfessionalGrowth = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-primary-blue/10 rounded-3xl" />
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=450&fit=crop"
              alt="Professional growth"
              className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-white rounded-2xl shadow-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-lime-accent/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark-navy">50K+</p>
                  <p className="text-sm text-gray-500">Graduates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-6">
              Your Path to{" "}
              <span className="text-primary-blue">Professional Growth</span>{" "}
              Starts Here!
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Whether you&apos;re starting out or leveling up, our platform provides
              everything you need to succeed in your career.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-lime-accent text-xl mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/courses" className="inline-block mt-8 bg-primary-blue hover:bg-primary-blue-dark text-white px-8 py-3.5 rounded-full font-semibold transition-colors duration-200 shadow-lg shadow-primary-blue/25">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalGrowth;
