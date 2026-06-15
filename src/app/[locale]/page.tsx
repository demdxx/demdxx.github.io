import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassCard } from "@/components/GlassCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SocialLinks } from "@/components/SocialLinks";
import { getHomeContent } from "@/lib/content";
import { isLocale, localeAlternates, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const content = getHomeContent(locale);

  return (
    <div className="space-y-8">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative space-y-6">
          <div className="space-y-2">
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-cyan-400/70 uppercase">
              {content.tagline}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-wide md:text-5xl">
              <span className="neon-text">{content.title}</span>
            </h1>
          </div>

          <MarkdownContent content={content.body} />

          <SocialLinks locale={locale} />
        </div>
      </GlassCard>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const locale = localeParam as Locale;
  const content = getHomeContent(locale);

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: localeAlternates(),
    },
  };
}
