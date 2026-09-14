import Link from "next/link";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-6xl font-bold">
        <span className="neon-text">404</span>
      </h1>
      <p className="text-slate-400">Page not found</p>
      <Link href={`/${defaultLocale}/`} className="neon-link text-sm">
        Go home
      </Link>
    </div>
  );
}
