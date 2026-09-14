import Link from "next/link";
import { localizedPath, navLabels, siteConfig, type Locale } from "@/lib/i18n";

type SocialLinksProps = {
  locale: Locale;
};

export function SocialLinks({ locale }: SocialLinksProps) {
  const labels = navLabels[locale];

  return (
    <div className="flex flex-wrap gap-3">
      {siteConfig.social.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel glass-panel-hover rounded-full px-4 py-2 text-sm text-cyan-200/90"
        >
          {link.name}
        </a>
      ))}
      <span className="sr-only">{labels.socialHeading}</span>
    </div>
  );
}

export function BackLink({ locale }: { locale: Locale }) {
  const labels = navLabels[locale];

  return (
    <Link
      href={localizedPath(locale)}
      className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-300/80 transition-colors hover:text-cyan-200"
    >
      <span aria-hidden>←</span>
      {labels.backHome}
    </Link>
  );
}
