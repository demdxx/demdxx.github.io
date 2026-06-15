import fs from "fs";
import path from "path";
import type { Locale } from "./i18n";

const contentDir = path.join(process.cwd(), "content");
const pageSlugs = ["manifest", "cookies-policy", "privacy-policy", "terms-of-conditions"] as const;

export type HomePageContent = {
  title: string;
  tagline: string;
  description: string;
  body: string;
};

function parseMarkdownFile(filePath: string): { meta: Record<string, string>; body: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return { meta: {}, body: raw.trim() };
  }

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    meta[key] = value;
  }

  return { meta, body: match[2].trim() };
}

export function getHomeContent(locale: Locale): HomePageContent {
  const filePath = path.join(contentDir, locale, "home.md");
  const { meta, body } = parseMarkdownFile(filePath);

  return {
    title: meta.title ?? "Demdxx",
    tagline: meta.tagline ?? "",
    description: meta.description ?? "Demdxx — Personal site of Dmitry Ponomarev",
    body,
  };
}

export function getPageContent(locale: Locale, slug: string): string {
  const filePath = path.join(contentDir, locale, `${slug}.md`);
  return parseMarkdownFile(filePath).body;
}

export function getPageSlugs(): string[] {
  return [...pageSlugs];
}
