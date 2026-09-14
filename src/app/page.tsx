"use client";

import { useEffect } from "react";
import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  useEffect(() => {
    window.location.replace(`/${defaultLocale}/`);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-slate-400">Redirecting…</p>
    </div>
  );
}
