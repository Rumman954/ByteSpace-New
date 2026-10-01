import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "@/components/Logo";

const columns = {
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  Support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo wordmarkClassName="text-dark-navy" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-sm">
              Discover your passion and build skills with hundreds of courses from creators around the world.
            </p>
            <div className="flex max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered rounded-l-full rounded-r-none w-full bg-light-gray"
              />
              <button className="btn bg-lime-accent border-none text-dark-navy rounded-r-full rounded-l-none px-5">
                Subscribe
              </button>
            </div>
          </div>

          {Object.entries(columns).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-dark-navy mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 text-sm hover:text-primary-blue">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ByteSpace. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <span
                key={i}
                className="w-8 h-8 rounded-full bg-light-gray text-dark-navy flex items-center justify-center"
              >
                <Icon className="text-xs" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
