import Link from "next/link";
import { localizedPath, navLabels, siteConfig, sitePages, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const labels = navLabels[locale];

  return (
    <footer className="mt-auto border-t border-white/5">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-2">
        <section>
          <h3 className="mb-4 font-[family-name:var(--font-display)] text-xs tracking-[0.25em] text-fuchsia-300/80 uppercase">
            {labels.socialHeading}
          </h3>
          <ul className="space-y-2">
            {siteConfig.social.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-link text-sm"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-4 font-[family-name:var(--font-display)] text-xs tracking-[0.25em] text-fuchsia-300/80 uppercase">
            {labels.otherHeading}
          </h3>
          <ul className="space-y-2">
            {sitePages.map((page) => (
              <li key={page.slug}>
                <Link href={localizedPath(locale, page.slug)} className="neon-link text-sm">
                  {page.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        {labels.copyright}
      </div>
    </footer>
  );
}
