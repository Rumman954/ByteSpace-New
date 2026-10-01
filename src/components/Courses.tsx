import Link from "next/link";
import { FaStar, FaClock, FaUserGraduate } from "react-icons/fa";

const courses = [
  {
    id: 1,
    slug: "complete-web-development-bootcamp",
    title: "Complete Web Development Bootcamp",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    rating: 4.8,
    reviews: 2450,
    price: 49.99,
    originalPrice: 99.99,
    instructor: "John Smith",
    duration: "42 hours",
    students: 12500,
    level: "Beginner",
  },
  {
    id: 2,
    slug: "data-science-machine-learning",
    title: "Data Science & Machine Learning A-Z",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    rating: 4.9,
    reviews: 1820,
    price: 59.99,
    originalPrice: 119.99,
    instructor: "Sarah Johnson",
    duration: "56 hours",
    students: 9800,
    level: "Intermediate",
  },
  {
    id: 3,
    slug: "ui-ux-design-masterclass",
    title: "UI/UX Design Masterclass",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    rating: 4.7,
    reviews: 1340,
    price: 39.99,
    originalPrice: 79.99,
    instructor: "Emily Chen",
    duration: "38 hours",
    students: 7600,
    level: "Beginner",
  },
  {
    id: 4,
    slug: "advanced-react-nextjs",
    title: "Advanced React & Next.js Development",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    rating: 4.9,
    reviews: 980,
    price: 54.99,
    originalPrice: 109.99,
    instructor: "Mike Wilson",
    duration: "48 hours",
    students: 5200,
    level: "Advanced",
  },
];

const Courses = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
            Discover Your Passion,{" "}
            <span className="text-primary-blue">Build Your Skills</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore our wide range of courses designed to help you achieve your
            learning goals and advance your career.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link
              href={`/courses/${course.slug}`}
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group card-hover"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-dark-navy mb-2 line-clamp-2 group-hover:text-primary-blue transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-sm font-semibold text-dark-navy">
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    ({course.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-xs" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUserGraduate className="text-xs" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary-blue">
                      ${course.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${course.originalPrice}
                    </span>
                  </div>
                  <span className="text-xs bg-lime-accent/30 text-dark-navy font-semibold px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link href="/courses" className="bg-primary-blue hover:bg-primary-blue-dark text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 inline-block">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
