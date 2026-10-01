import Link from "next/link";

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

const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

const ProfessionalGrowth = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-6 lg:pt-12 lg:pb-8">
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#E8FF7A]/70 blur-3xl" />
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          <div className="max-w-[520px]">
            <h2 className="text-[36px] md:text-[44px] font-extrabold text-dark-navy leading-[1.15] tracking-tight">
              Your Path to Professional
              <br />
              Growth Starts Here!
            </h2>
            <p className="mt-5 text-[15px] text-gray-500 leading-relaxed">
              Explore our curated selection of courses tailored to enhance your capabilities and
              accelerate your career journey. Whether you are looking to sharpen specific skills, gain
              industry expertise, or embark on a new career path entirely, we have the resources you
              need.
            </p>
            <div className="mt-10 flex items-start gap-10">
              {stats.map((item) => (
                <div key={item.label}>
                  <p className="text-[32px] font-extrabold text-primary-blue leading-none">{item.value}</p>
                  <p className="mt-2 text-[14px] text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-[540px] h-[400px] sm:h-[430px] mx-auto lg:ml-auto">
            <Link
              href="/courses/figma-to-tailwind"
              className="absolute left-0 top-2 z-10 w-[250px] bg-white rounded-[22px] border border-[#E6E8EC] p-3 pb-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
            >
              <img src="/images/Frame.png" alt="Learn Figma from Basic" className="w-full h-auto block" />
              <div className="px-1 mt-3">
                <h3 className="font-bold text-[15px] text-dark-navy leading-snug line-clamp-1">
                  Learn Figma from Basic
                </h3>
                <p className="mt-1 text-[12px] text-primary-blue">
                  by <span className="italic">purepearl studio</span>
                </p>
                <div className="mt-2.5">
                  <span className="inline-flex items-center gap-1.5 bg-[#F3F4F6] text-gray-500 text-[11px] font-medium rounded-full px-2.5 py-1">
                    <SignalIcon />
                    Beginner
                  </span>
                </div>
                <p className="mt-3">
                  <span className="text-[18px] font-extrabold text-primary-blue">$25</span>
                  <span className="text-[12px] text-gray-400 ml-0.5">lifetime</span>
                </p>
              </div>
            </Link>

            <img
              src="/images/Image.png"
              alt="Student with headphones"
              className="absolute left-[48px] top-[78px] z-20 w-[420px] h-auto pointer-events-none drop-shadow-[0_24px_36px_rgba(15,23,42,0.16)]"
            />

            <div className="absolute left-[300px] top-[40px] z-30 w-[230px] h-[220px]">
              <div className="absolute left-0 top-[62px] z-30 w-[172px] bg-white rounded-[20px] px-5 pt-3.5 pb-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                <p className="text-[12px] text-gray-400 leading-none">Learning Progress</p>
                <p className="mt-1.5 text-[36px] leading-none font-extrabold text-dark-navy tracking-tight">55%</p>
                <div className="mt-3 h-[6px] rounded-full bg-[#EDEFF2] overflow-hidden">
                  <div className="h-full w-[55%] bg-lime-accent rounded-full" />
                </div>
              </div>
              <img
                src="/images/Mask Group (1).png"
                alt=""
                className="absolute left-[92px] top-[6px] z-40 w-[94px] h-auto pointer-events-none drop-shadow-[4px_10px_14px_rgba(160,200,0,0.38)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalGrowth;
