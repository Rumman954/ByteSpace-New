import Link from "next/link";
import Logo from "@/components/Logo";

const columns = [
  [
    { name: "Featured Courses", href: "/courses" },
    { name: "Featured Categories", href: "/courses" },
    { name: "Business", href: "/courses?category=business" },
    { name: "IT", href: "/courses?category=it" },
    { name: "Design", href: "/courses?category=design" },
  ],
  [
    { name: "Development", href: "/courses?category=development" },
    { name: "Marketing", href: "/courses?category=marketing" },
    { name: "Photography", href: "/courses?category=photography" },
    { name: "Finance", href: "/courses?category=finance" },
    { name: "Sport", href: "/courses?category=sport" },
  ],
  [
    { name: "Become a Creator", href: "/signup" },
    { name: "Affiliate Program", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
    { name: "About", href: "/about" },
  ],
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo wordmarkClassName="text-dark-navy" />
            <p className="mt-4 text-[14px] text-gray-500 leading-relaxed max-w-[360px]">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>
            <form className="mt-6 flex items-center gap-3 max-w-[420px]" action="/courses">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 h-12 rounded-full border border-[#E6E8EC] px-5 text-[14px] text-dark-navy placeholder:text-gray-400 outline-none focus:border-primary-blue"
              />
              <button
                type="submit"
                className="h-12 px-7 rounded-full bg-lime-accent hover:bg-lime-dark text-dark-navy font-semibold text-[14px] shrink-0"
              >
                Search
              </button>
            </form>
            <p className="mt-4 text-[12px] text-gray-400 leading-relaxed max-w-[380px]">
              By subscribing, you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-dark-navy">
                Privacy Policy
              </Link>{" "}
              and consent to receive updates from our company.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-8">
            {columns.map((links) => (
              <ul key={links[0].name} className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-gray-500 hover:text-dark-navy"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#E8E8E8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[13px] text-gray-400">© 2023 ByteSpace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[13px] text-gray-500 hover:text-dark-navy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[13px] text-gray-500 hover:text-dark-navy">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-[13px] text-gray-500 hover:text-dark-navy">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
