import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="bg-primary-blue min-h-[70vh] flex items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute -right-10 top-10 w-40 h-40 bg-lime-accent rounded-3xl rotate-12 opacity-80" />
        <div className="absolute left-8 bottom-16 w-24 h-24 bg-lime-accent rounded-full opacity-70" />
        <div className="relative z-10">
          <h1 className="text-[120px] md:text-[160px] leading-none font-black text-lime-accent">404</h1>
          <p className="text-white text-xl md:text-2xl font-semibold max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist
          </p>
          <Link
            href="/"
            className="btn mt-8 rounded-full bg-lime-accent border-none text-dark-navy font-bold px-8"
          >
            Back to home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
