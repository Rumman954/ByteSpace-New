import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="bg-white min-h-screen">
      <div className="relative bg-primary-blue hero-grid-pattern">
        <Navbar className="bg-transparent" />
        <section className="min-h-[calc(100vh-280px)] flex items-center justify-center text-center px-6 py-16">
          <div className="max-w-[820px]">
            <h1 className="text-[140px] md:text-[200px] leading-[0.85] font-black tracking-tight bg-gradient-to-b from-[#E8FF6A] to-[#A8E000] bg-clip-text text-transparent">
              404
            </h1>
            <p className="mt-4 text-white text-[28px] md:text-[40px] font-extrabold leading-tight">
              The page you are looking
              <br className="hidden sm:block" /> for doesn&apos;t exist
            </p>
            <p className="mt-4 text-white/70 text-[15px] md:text-[16px]">
              Try to use a correct url or go back to homepage to start again
            </p>
            <Link
              href="/"
              className="mt-8 h-12 px-8 rounded-full bg-lime-accent hover:bg-lime-dark text-dark-navy font-semibold text-[15px] inline-flex items-center justify-center"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
