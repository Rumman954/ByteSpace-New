import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Frontend Developer",
    avatar: "A",
    avatarBg: "bg-primary-blue",
    rating: 5,
    text: "ByteSpace completely transformed my career. The web development course was incredibly well-structured and the hands-on projects helped me land my dream job.",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Data Analyst",
    avatar: "M",
    avatarBg: "bg-lime-accent",
    rating: 5,
    text: "The data science courses are top-notch. I went from knowing nothing about Python to building machine learning models in just 3 months. Highly recommended!",
  },
  {
    id: 3,
    name: "David Kim",
    role: "UX Designer",
    avatar: "D",
    avatarBg: "bg-purple-500",
    rating: 5,
    text: "Amazing platform with great instructors. The UI/UX design course gave me practical skills that I use every day. The community is also super supportive.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
            Discover What Our{" "}
            <span className="text-primary-blue">Community</span> is Saying
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Hear from our students who have transformed their careers through our
            platform.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-light-gray rounded-2xl p-8 hover:shadow-xl transition-all duration-300 card-hover"
            >
              <FaQuoteLeft className="text-primary-blue/20 text-3xl mb-4" />
              <p className="text-gray-600 leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div
                  className={`w-11 h-11 rounded-full ${testimonial.avatarBg} flex items-center justify-center text-white font-bold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-dark-navy">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
