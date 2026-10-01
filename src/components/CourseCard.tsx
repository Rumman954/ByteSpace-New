import Link from "next/link";
import Image from "next/image";

type CourseCardCourse = {
  slug: string;
  title: string;
  category: string;
  level?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews?: number;
  duration: string;
  image: string;
  instructor?: string;
};

export default function CourseCard({ course }: { course: CourseCardCourse }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 card-hover block"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-primary-blue text-white text-[11px] font-semibold px-3 py-1 rounded-full">
          {course.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-dark-navy text-sm leading-snug line-clamp-2 min-h-[40px] group-hover:text-primary-blue">
          {course.title}
        </h3>
        {course.instructor && (
          <p className="text-xs text-gray-400 mt-2">{course.instructor}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-amber-500 font-semibold">★ {course.rating}</span>
            <span>{course.duration}</span>
          </div>
          <span className="bg-lime-accent text-dark-navy text-xs font-bold px-3 py-1 rounded-full">
            ${course.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
