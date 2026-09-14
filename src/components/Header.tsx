import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { localizedPath, slogan, type Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const tagline = slogan[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050510]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href={localizedPath(locale)}
          className="group flex items-center gap-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 text-sm font-bold text-cyan-200 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            D
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-white/90 uppercase group-hover:text-cyan-200">
              Demdxx
              {locale === "ja" && (
                <span className="ml-2 normal-case tracking-normal text-cyan-300/90">遊心</span>
              )}
            </span>
            <span className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.35em] text-fuchsia-300/60 uppercase group-hover:text-fuchsia-300/80">
              {tagline.main}
              {tagline.translation && (
                <span className="normal-case tracking-[0.15em] text-fuchsia-300/45 group-hover:text-fuchsia-300/65">
                  {" "}({tagline.translation})
                </span>
              )}
            </span>
          </span>
        </Link>
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
