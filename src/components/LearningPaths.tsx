import Link from "next/link";

const paths = [
  {
    name: "Design",
    href: "/courses?category=Design",
    icon: "/images/Frame 4.png",
  },
  {
    name: "Development",
    href: "/courses?category=Web%20Development",
    icon: "/images/Frame 4 (1).png",
  },
  {
    name: "IT & Software",
    href: "/courses?category=Cloud",
    icon: "/images/Frame 4 (2).png",
  },
  {
    name: "Business",
    href: "/courses?category=Marketing",
    icon: "/images/Frame 4 (3).png",
  },
  {
    name: "Marketing",
    href: "/courses?category=Marketing",
    icon: "/images/Frame 4 (4).png",
  },
  {
    name: "Photography",
    href: "/courses",
    icon: "/images/Frame 4 (5).png",
  },
];

const LearningPaths = () => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-dark-navy leading-[1.2] tracking-tight whitespace-nowrap">
            Explore Diverse Learning Paths at Bytespace
          </h2>
          <p className="mt-4 max-w-[760px] mx-auto text-[14px] md:text-[15px] text-gray-400 leading-relaxed">
            At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of
            courses spans various fields, ensuring there&apos;s something for everyone. Unleash your
            potential and explore our carefully curated categories.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {paths.map((path) => (
            <Link
              key={path.name}
              href={path.href}
              className="w-[150px] h-[150px] rounded-[22px] border border-[#E6E8EC] bg-white flex flex-col items-center justify-center gap-4 hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-shadow"
            >
              <img src={path.icon} alt="" className="w-[52px] h-[52px]" />
              <span className="text-[15px] font-semibold text-dark-navy">{path.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
