import Image from "next/image";
import { FaStar, FaSearch } from "react-icons/fa";

const avatars = [
  "/images/Ellipse.png",
  "/images/Ellipse (1).png",
  "/images/Ellipse (2).png",
  "/images/Ellipse.png",
  "/images/Ellipse (1).png",
];

export default function Hero() {
  return (
    <div className="relative h-[728px]">
      <div className="relative z-30 pt-2 px-16 text-center">
        <h1 className="text-[60px] font-extrabold text-white leading-[1.08] tracking-tight mb-4">
          Get Access to Hundreds
          <br />
          Courses Available
        </h1>
        <p className="text-[16px] font-normal text-white/70 leading-none mb-7 whitespace-nowrap">
          Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
        </p>
        <form action="/courses" className="flex items-center justify-center gap-3">
          <div className="flex items-center bg-white rounded-full h-12 w-[420px] px-5">
            <FaSearch className="text-gray-400 mr-3 shrink-0 text-sm" />
            <input
              type="text"
              name="q"
              placeholder="Course, topic, creator"
              className="w-full h-full text-gray-500 bg-transparent outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-8 rounded-full bg-lime-accent hover:bg-lime-dark text-dark-navy font-semibold text-sm"
          >
            Search
          </button>
        </form>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[430px] overflow-hidden">
        <div className="absolute top-3 left-[110px] w-[130px] h-[130px] z-10 pointer-events-none -rotate-[18deg]">
          <Image src="/images/Framer (1).png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute -bottom-8 left-[70px] w-[250px] h-[210px] z-20 pointer-events-none">
          <Image src="/images/Cone.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute -bottom-6 right-[50px] w-[190px] h-[220px] z-20 pointer-events-none rotate-[8deg]">
          <Image src="/images/Framer (1).png" alt="" fill className="object-contain" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[28px] w-[780px] h-[780px] bg-lime-accent rounded-full" />

        <div className="absolute left-1/2 -translate-x-[48%] bottom-[-40px] z-10 w-[540px] h-[580px]">
          <Image
            src="/images/Image.png"
            alt="Student with headphones and laptop"
            fill
            className="object-contain object-bottom scale-[1.15] origin-bottom"
            priority
          />
        </div>

        <div className="absolute left-[348px] top-[88px] z-20 bg-white rounded-[18px] px-6 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <p className="font-semibold text-dark-navy text-[17px] leading-none">UI/UX Design</p>
          <p className="text-[12px] text-gray-400 mt-2">200 Courses &nbsp;•&nbsp; 1000+ Students</p>
        </div>

        <div className="absolute right-[300px] top-[70px] z-20 bg-white rounded-[18px] px-7 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] min-w-[188px]">
          <p className="text-[13px] text-gray-400 mb-1">Learning Progress</p>
          <p className="text-[44px] leading-none font-extrabold text-dark-navy tracking-tight">55%</p>
          <div className="mt-4 h-[6px] rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full w-[55%] bg-lime-accent rounded-full" />
          </div>
        </div>

        <div className="absolute left-[240px] bottom-[42px] z-20 bg-white rounded-[18px] px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <p className="font-semibold text-dark-navy text-[15px] leading-none">Happy Students</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[13px] font-semibold text-dark-navy">4.5</span>
            <span className="text-[12px] text-gray-400">(240)</span>
            <FaStar className="text-amber-400 text-[11px]" />
          </div>
          <div className="flex items-center mt-3">
            <div className="flex -space-x-2.5">
              {avatars.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="ml-2 bg-lime-accent text-dark-navy text-[11px] font-bold px-2.5 py-1 rounded-full">
              2K+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
