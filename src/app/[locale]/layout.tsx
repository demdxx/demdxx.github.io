import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NeonBackground } from "@/components/NeonBackground";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;

  return (
    <>
      <NeonBackground />
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:py-16">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
