import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { HiOutlineCursorClick, HiOutlineChartBar, HiOutlineVideoCamera } from "react-icons/hi";

const features = [
  {
    icon: HiOutlineVideoCamera,
    title: "Upload Video Content",
    description: "Easily upload and organize your video lessons with our intuitive content manager.",
  },
  {
    icon: HiOutlineCursorClick,
    title: "Interactive Quizzes",
    description: "Create engaging quizzes and assessments to test your students' knowledge.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Track Analytics",
    description: "Monitor student progress and course performance with detailed analytics.",
  },
];

const CreateManage = () => {
  return (
    <section className="py-16 lg:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-6">
              Create & Manage{" "}
              <span className="text-primary-blue">Courses Easily</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Our powerful course builder makes it simple to create, manage, and
              sell your courses online. No technical skills required.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-primary-blue text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-navy mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/signup" className="inline-block mt-8 bg-lime-accent hover:bg-lime-dark text-dark-navy px-8 py-3.5 rounded-full font-semibold transition-colors duration-200">
              Start Creating
            </Link>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="bg-light-gray rounded-2xl p-4">
                {/* Mock Dashboard Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-4 h-6 bg-white rounded-full flex-1" />
                </div>
                {/* Mock Dashboard Content */}
                <div className="space-y-3">
                  <div className="h-8 bg-primary-blue/5 rounded-lg w-3/4" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-blue-50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary-blue">125</p>
                        <p className="text-xs text-gray-500">Courses</p>
                      </div>
                    </div>
                    <div className="h-20 bg-green-50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">8.5K</p>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>
                    </div>
                    <div className="h-20 bg-yellow-50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg font-bold text-yellow-500">4.9</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white rounded w-full" />
                    <div className="h-4 bg-white rounded w-5/6" />
                    <div className="h-4 bg-white rounded w-4/6" />
                  </div>
                  <div className="h-32 bg-gradient-to-r from-primary-blue/10 to-lime-accent/20 rounded-xl" />
                </div>
              </div>
            </div>
            {/* Floating checkmark */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-lime-accent rounded-full flex items-center justify-center shadow-lg">
              <FaCheck className="text-dark-navy text-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateManage;
