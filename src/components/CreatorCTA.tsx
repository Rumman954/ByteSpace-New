import Link from "next/link";

const limeFromWhite = {
  filter:
    "brightness(0) invert(89%) sepia(64%) saturate(1800%) hue-rotate(18deg) brightness(1.08)",
} as const;

const CreatorCTA = () => {
  return (
    <section className="relative overflow-hidden bg-primary-blue hero-grid-pattern min-h-[360px] lg:min-h-[400px] pt-16 pb-14 lg:pt-20 lg:pb-16">
      <img
        src="/images/Framer.png"
        alt=""
        className="absolute -top-10 -left-16 w-[240px] h-auto pointer-events-none select-none"
      />
      <img
        src="/images/Framer (1).png"
        alt=""
        className="absolute top-6 left-[13%] w-[108px] h-auto pointer-events-none select-none -rotate-[10deg]"
      />
      <img
        src="/images/Cone (1).png"
        alt=""
        className="absolute bottom-8 -left-12 w-[130px] h-auto pointer-events-none select-none -rotate-[24deg]"
      />
      <img
        src="/images/Cone.png"
        alt=""
        style={limeFromWhite}
        className="absolute -bottom-16 left-[1%] w-[210px] h-auto pointer-events-none select-none -rotate-[16deg]"
      />
      <img
        src="/images/Cone (3).png"
        alt=""
        className="absolute top-8 right-[14%] w-[100px] h-auto pointer-events-none select-none rotate-[22deg]"
      />
      <img
        src="/images/Mask Group.png"
        alt=""
        className="absolute -top-6 -right-16 w-[190px] h-auto pointer-events-none select-none rotate-[8deg]"
      />
      <img
        src="/images/Mask Group (1).png"
        alt=""
        className="absolute -bottom-12 -right-8 w-[240px] h-auto pointer-events-none select-none rotate-[42deg] drop-shadow-[0_10px_18px_rgba(160,200,0,0.35)]"
      />

      <div className="relative z-10 max-w-[820px] mx-auto px-6 text-center">
        <h2 className="text-white text-[32px] md:text-[44px] font-extrabold leading-[1.2] tracking-tight">
          Unlock Your Potential as a
          <br />
          Creator with ByteSpace
        </h2>
        <p className="mt-5 text-white/80 text-[13px] md:text-[15px] leading-relaxed max-w-[720px] mx-auto">
          Experience the collaboration of numerous creators and an expanding selection of courses. Register now
          and become a part of a community comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest course on the ByteSpace Course
          Library.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center mt-8 bg-lime-accent hover:bg-lime-dark text-dark-navy h-10 px-7 rounded-full font-semibold text-[14px] transition-colors"
        >
          Join as Creator
        </Link>
      </div>
    </section>
  );
};

export default CreatorCTA;
