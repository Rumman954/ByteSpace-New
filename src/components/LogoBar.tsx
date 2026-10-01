import Image from "next/image";

function SunIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden>
      <circle cx="16" cy="16" r="3.2" />
      {Array.from({ length: 8 }).map((_, s) => (
        <rect
          key={s}
          x="14.6"
          y="2.5"
          width="2.8"
          height="8.2"
          rx="1.4"
          transform={`rotate(${s * 45} 16 16)`}
        />
      ))}
    </svg>
  );
}

export default function LogoBar() {
  const logos = [
    { name: "Logoipsum", src: "/images/Vector (2).png" },
    { name: "Logoipsum", sun: true },
    { name: "Logoipsum", src: "/images/Vector (3).png" },
    { name: "Logoipsum", src: "/images/Vector (4).png" },
    { name: "Logoipsum", src: "/images/Vector (5).png" },
  ];

  return (
    <section className="bg-[#F4F6F8] py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 text-[#9AA3AF]">
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {"sun" in logo && logo.sun ? (
              <SunIcon />
            ) : (
              <Image
                src={logo.src!}
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            )}
            <span className="text-[17px] font-semibold tracking-tight">{logo.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
