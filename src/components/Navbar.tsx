"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMenu } from "react-icons/hi";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/Logo";

const Navbar = ({
  variant = "marketing",
  className = "bg-primary-blue hero-grid-pattern",
}: {
  variant?: "marketing" | "app";
  className?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const { items } = useCart();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Creators", href: "/creators" },
  ];

  return (
    <nav className={`relative z-50 ${className}`}>
      <div className={`${variant === "marketing" ? "px-12" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
        <div className="flex items-center justify-between h-[72px] gap-4">
          <Logo />

          {variant === "app" ? (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6 bg-white rounded-full px-4 h-10">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search your courses"
                className="w-full text-sm outline-none bg-transparent text-gray-700"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value;
                    router.push(`/courses?q=${encodeURIComponent(value)}`);
                  }
                }}
              />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors ${
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex items-center gap-6">
            {loading ? (
              <span className="w-8 h-8 rounded-full bg-white/20" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-lime-accent"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-box z-50 w-48 p-2 shadow mt-3"
                >
                  <li className="px-3 py-2 text-sm font-semibold text-dark-navy">{user.name}</li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Log out</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-white/85 hover:text-white text-[15px] font-medium">
                  Sign In
                </Link>
                <Link href="/signup" className="text-white/85 hover:text-white text-[15px] font-medium">
                  Join Us
                </Link>
              </>
            )}
            <Link href="/cart" className="relative text-white hover:text-white/80">
              <FiShoppingBag className="text-[20px]" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-lime-accent text-dark-navy text-[10px] font-bold flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost text-white">
                <HiOutlineMenu className="text-2xl" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 shadow-lg bg-white rounded-box w-56 mt-2"
              >
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-700 font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
                {user ? (
                  <>
                    <li>
                      <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <button onClick={logout}>Log out</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/login">Sign In</Link>
                    </li>
                    <li>
                      <Link href="/signup">Join Us</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
