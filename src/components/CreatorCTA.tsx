import { FaGraduationCap, FaDollarSign, FaGlobe, FaHeadset } from "react-icons/fa";
import Link from "next/link";

const benefits = [
  {
    icon: FaGraduationCap,
    title: "Share Your Knowledge",
    description: "Create courses on topics you're passionate about and help others learn.",
  },
  {
    icon: FaDollarSign,
    title: "Earn Revenue",
    description: "Monetize your expertise and earn income from your course sales.",
  },
  {
    icon: FaGlobe,
    title: "Global Reach",
    description: "Reach students from around the world with our global platform.",
  },
  {
    icon: FaHeadset,
    title: "Creator Support",
    description: "Get dedicated support to help you create and grow your courses.",
  },
];

const CreatorCTA = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary-blue relative overflow-hidden hero-grid-pattern">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-lime-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-lime-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unlock Your Potential as a{" "}
            <span className="text-lime-accent">Creator</span> with ByteSpace
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join thousands of instructors who are already sharing their expertise
            and earning on ByteSpace.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-lime-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-lime-accent/30 transition-colors">
                  <IconComponent className="text-lime-accent text-2xl" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/signup" className="inline-block bg-lime-accent hover:bg-lime-dark text-dark-navy px-10 py-4 rounded-full font-bold text-lg transition-colors duration-200 shadow-lg">
            Become an Instructor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreatorCTA;
