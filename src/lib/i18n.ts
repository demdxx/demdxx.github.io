export const locales = ["en", "es", "ru", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  ja: "日本語",
};

export const siteConfig = {
  author: "Dmitry Ponomarev",
  domain: "https://demdxx.com",
  googleAnalytics: "UA-70463023-2",
  social: [
    { name: "LinkedIn", url: "https://linkedin.com/in/demdxx/" },
    { name: "GitHub", url: "https://github.com/demdxx" },
    { name: "Instagram", url: "https://www.instagram.com/demdxx/" },
    { name: "Facebook", url: "https://www.facebook.com/demdxx" },
  ],
};

export const slogan: Record<Locale, { main: string; translation?: string }> = {
  en: { main: "No Lie — No Cry" },
  es: { main: "No Lie — No Cry", translation: "sin mentiras — sin sufrimiento" },
  ru: { main: "No Lie — No Cry", translation: "нет лжи — нет страданий" },
  ja: { main: "No Lie — No Cry", translation: "嘘なし — 苦しみなし" },
};

export type NavLabels = {
  home: string;
  socialHeading: string;
  otherHeading: string;
  cookiesPolicy: string;
  privacyPolicy: string;
  termsOfConditions: string;
  backHome: string;
  copyright: string;
};

export const navLabels: Record<Locale, NavLabels> = {
  en: {
    home: "Home",
    socialHeading: "Social (contact)",
    otherHeading: "Other",
    cookiesPolicy: "Cookies policy",
    privacyPolicy: "Privacy policy",
    termsOfConditions: "Terms of conditions",
    backHome: "Back to home",
    copyright: "©2019 – 2026 Demdxx",
  },
  es: {
    home: "Inicio",
    socialHeading: "Social (contacto)",
    otherHeading: "Other",
    cookiesPolicy: "Cookies policy",
    privacyPolicy: "Política de Privacidad",
    termsOfConditions: "Terminos y condiciones",
    backHome: "Volver al inicio",
    copyright: "©2019 – 2026 Demdxx",
  },
  ru: {
    home: "Главная",
    socialHeading: "Соцсети (контакты)",
    otherHeading: "Прочее",
    cookiesPolicy: "Политика cookies",
    privacyPolicy: "Политика конфиденциальности",
    termsOfConditions: "Условия использования",
    backHome: "На главную",
    copyright: "©2019 – 2026 Demdxx",
  },
  ja: {
    home: "ホーム",
    socialHeading: "ソーシャル（連絡先）",
    otherHeading: "その他",
    cookiesPolicy: "クッキーポリシー",
    privacyPolicy: "プライバシーポリシー",
    termsOfConditions: "利用規約",
    backHome: "ホームに戻る",
    copyright: "©2019 – 2026 Demdxx",
  },
};

export type SitePage = {
  slug: string;
  title: Record<Locale, string>;
};

export const sitePages: SitePage[] = [
  {
    slug: "manifest",
    title: {
      en: "My Manifest",
      es: "Mi Manifiesto",
      ru: "Мой манифест",
      ja: "私のマニフェスト",
    },
  },
  {
    slug: "cookies-policy",
    title: {
      en: "Cookie Policy",
      es: "Política de cookies",
      ru: "Политика cookies",
      ja: "クッキーポリシー",
    },
  },
  {
    slug: "privacy-policy",
    title: {
      en: "Privacy Policy",
      es: "Política de Privacidad",
      ru: "Политика конфиденциальности",
      ja: "プライバシーポリシー",
    },
  },
  {
    slug: "terms-of-conditions",
    title: {
      en: "Terms and Conditions",
      es: "Términos y condiciones",
      ru: "Условия использования",
      ja: "利用規約",
    },
  },
];

export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return normalized ? `/${locale}/${normalized}/` : `/${locale}/`;
}

export function localeAlternates(path = ""): Record<string, string> {
  return Object.fromEntries(locales.map((locale) => [locale, localizedPath(locale, path)]));
}

export function switchLocalePath(currentLocale: Locale, targetLocale: Locale, pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  const joined = segments.join("/");
  return joined.endsWith("/") ? `/${joined}` : `/${joined}/`;
}
