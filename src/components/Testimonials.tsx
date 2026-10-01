const testimonials = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/images/Ellipse.png",
    text: "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/images/Ellipse (1).png",
    text: "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/images/Ellipse (2).png",
    text: "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-24">
      <div className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[420px] rounded-full bg-[#E8FF7A]/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-[420px] h-[420px] rounded-full bg-[#2B4FFF]/10 blur-3xl" />

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12 lg:mb-14">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-dark-navy leading-[1.15] tracking-tight">
            Discover What Our
            <br />
            Community Is Saying
          </h2>
          <p className="text-[15px] text-gray-500 leading-relaxed max-w-[540px] lg:ml-auto lg:pt-2">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we
            do. Hear directly from those who have experienced the transformative journey of learning
            and creating on our platform. Explore testimonials that reflect the diverse perspectives of
            enthusiastic learners and accomplished creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="bg-white rounded-[28px] p-7 lg:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-[#F0F1F4]"
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-[72px] h-[72px] rounded-full object-cover"
              />
              <h3 className="mt-5 font-bold text-[18px] text-dark-navy leading-none">{item.name}</h3>
              <p className="mt-2 text-[14px] text-primary-blue">{item.role}</p>
              <p className="mt-5 text-[14px] text-gray-500 leading-relaxed">“{item.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
