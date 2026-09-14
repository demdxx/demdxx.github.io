import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/SocialLinks";
import { GlassCard } from "@/components/GlassCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPageContent, getPageSlugs } from "@/lib/content";
import { isLocale, localeAlternates, locales, sitePages, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = getPageSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};

  const page = sitePages.find((item) => item.slug === slug);
  if (!page) return {};

  const locale = localeParam as Locale;
  return {
    title: page.title[locale],
    alternates: {
      canonical: `/${locale}/${slug}/`,
      languages: localeAlternates(slug),
    },
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const page = sitePages.find((item) => item.slug === slug);
  if (!page) notFound();

  const locale = localeParam as Locale;
  const content = getPageContent(locale, slug);
  const isManifest = slug === "manifest";

  return (
    <article>
      <BackLink locale={locale} />
      <GlassCard>
        <h1 className="mb-8 font-[family-name:var(--font-display)] text-2xl tracking-wide md:text-3xl">
          <span className="neon-text">{page.title[locale]}</span>
        </h1>
        <MarkdownContent content={content} className={isManifest ? "prose-manifest" : undefined} />
      </GlassCard>
    </article>
  );
}
