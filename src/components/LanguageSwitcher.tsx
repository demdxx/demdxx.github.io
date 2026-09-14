"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, switchLocalePath, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
      {locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={switchLocalePath(locale, item, pathname)}
            className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
              active
                ? "bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-cyan-200 shadow-[0_0_20px_rgba(0,245,255,0.15)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {item}
          </Link>
        );
      })}
      <span className="sr-only">{localeNames[locale]}</span>
    </div>
  );
}
