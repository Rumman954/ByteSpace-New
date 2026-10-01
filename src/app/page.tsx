import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoBar from "@/components/LogoBar";
import Courses from "@/components/Courses";
import LearningPaths from "@/components/LearningPaths";
import ProfessionalGrowth from "@/components/ProfessionalGrowth";
import CreateManage from "@/components/CreateManage";
import CreatorCTA from "@/components/CreatorCTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <div className="hero-shell bg-primary-blue hero-grid-pattern">
        <div className="hero-side-left">
          <Image src="/images/Framer.png" alt="" fill className="object-contain object-left-top" />
        </div>
        <div className="hero-lime-tube" aria-hidden>
          <Image src="/images/Cone (2).png" alt="" fill className="object-contain object-right" />
        </div>
        <div className="hero-side-cone">
          <Image src="/images/Cone (1).png" alt="" fill className="object-contain" />
        </div>
        <Navbar className="bg-transparent absolute top-0 inset-x-0" />
        <div className="hero-artboard">
          <div className="h-[72px]" />
          <Hero />
        </div>
      </div>
      <LogoBar />
      <Courses />
      <LearningPaths />
      <ProfessionalGrowth />
      <CreateManage />
      <CreatorCTA />
      <Testimonials />
      <Footer />
    </main>
  );
}
