import Link from "next/link";
import { useId } from "react";

type LogoProps = {
  href?: string;
  wordmarkClassName?: string;
  size?: number;
  showWordmark?: boolean;
};

export default function Logo({
  href = "/",
  wordmarkClassName = "text-white",
  size = 36,
  showWordmark = true,
}: LogoProps) {
  const maskId = useId();

  const mark = (
    <span className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId}>
            <rect width="36" height="36" fill="white" />
            <circle cx="22.5" cy="20" r="6.1" fill="black" />
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          <rect x="3.2" y="2.4" width="13.2" height="31.2" rx="6.6" fill="#C8FF00" />
          <circle cx="22.5" cy="20" r="13.2" fill="#C8FF00" />
        </g>
      </svg>
      {showWordmark && (
        <span className={`text-[20px] font-bold tracking-tight leading-none ${wordmarkClassName}`}>
          ByteSpace
        </span>
      )}
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className="inline-flex items-center shrink-0">
      {mark}
    </Link>
  );
}
