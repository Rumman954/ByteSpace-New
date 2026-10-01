const avatars = [
  "/images/Ellipse.png",
  "/images/Ellipse (1).png",
  "/images/Ellipse (2).png",
  "/images/Ellipse.png",
  "/images/Ellipse (1).png",
];

const points = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.2 6.2L4.6 8.6L9.8 3.4"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CreateManage = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-8 lg:pb-24">
      <div className="pointer-events-none absolute -bottom-28 -left-20 w-[460px] h-[460px] rounded-full bg-[#E8FF7A]/65 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 w-[380px] h-[380px] rounded-full bg-[#2B4FFF]/8 blur-3xl" />
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          <div className="relative h-[520px] lg:h-[560px] max-w-[520px] mx-auto lg:mx-0 order-2 lg:order-1">
            <div className="absolute left-0 top-[68px] z-10 w-[176px] rounded-[20px] bg-primary-blue text-white px-5 py-4 shadow-[0_18px_36px_rgba(43,79,255,0.28)]">
              <p className="text-[13px] font-medium text-white leading-tight">Total Revenue</p>
              <p className="text-[11px] text-white/55 mt-0.5">July 1-28</p>
              <p className="mt-2 text-[26px] font-extrabold leading-none tracking-tight">$120.29</p>
              <div className="mt-3 h-[6px] rounded-full bg-white/20 overflow-hidden">
                <div className="h-full w-[62%] bg-lime-accent rounded-full" />
              </div>
            </div>

            <div className="absolute left-0 top-[228px] z-10 w-[176px] rounded-[20px] bg-[#3B63FF] text-white px-5 py-4 shadow-[0_18px_36px_rgba(43,79,255,0.22)]">
              <p className="text-[13px] font-medium text-white leading-tight">Year to Date</p>
              <p className="text-[11px] text-white/55 mt-0.5">2023</p>
              <p className="mt-2 text-[24px] font-extrabold leading-none tracking-tight">$1,200.38</p>
              <span className="mt-3 inline-flex items-center rounded-full bg-lime-accent text-dark-navy text-[11px] font-bold px-2.5 py-0.5">
                +12%
              </span>
            </div>

            <img
              src="/images/creator.png"
              alt="Creator with tablet"
              className="absolute left-[86px] bottom-2 z-20 h-[520px] w-auto object-contain object-bottom pointer-events-none drop-shadow-[0_28px_40px_rgba(15,23,42,0.16)]"
            />

            <img
              src="/images/Mask Group (2).png"
              alt=""
              className="absolute left-[384px] top-[132px] z-20 w-[102px] h-auto pointer-events-none drop-shadow-[4px_12px_16px_rgba(160,200,0,0.4)]"
            />

            <div className="absolute left-[244px] bottom-[72px] z-30 bg-white rounded-[20px] pl-5 pr-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)] w-[248px]">
              <p className="font-semibold text-dark-navy text-[15px] leading-none">Happy Students</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[13px] font-semibold text-dark-navy">4.5</span>
                <span className="text-[12px] text-gray-400">(240)</span>
                <span className="text-amber-400 text-[12px]">★</span>
              </div>
              <div className="flex items-center justify-between mt-3">
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
                <div className="bg-lime-accent text-dark-navy text-[11px] font-bold w-9 h-9 rounded-full inline-flex items-center justify-center">
                  2K+
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 max-w-[480px] lg:ml-auto">
            <h2 className="text-[36px] md:text-[44px] font-extrabold text-dark-navy leading-[1.15] tracking-tight">
              Create &amp; Manage
              <br />
              Courses Easily.
            </h2>
            <p className="mt-5 text-[15px] text-gray-500 leading-relaxed">
              <span className="font-semibold text-dark-navy">ByteSpace</span> supports individuals or
              entities in the creation, publication, and administration of educational courses.
            </p>
            <ul className="mt-8 space-y-4">
              {points.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary-blue inline-flex items-center justify-center shrink-0">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateManage;
