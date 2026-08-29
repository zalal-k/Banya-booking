"use client";

import { BRAND_NAME } from "@/lib/i18n";
import { CONTACT_PHONE_DISPLAY } from "@/lib/contact";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line bg-background px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {BRAND_NAME} · {t.brandSlogan}
        </p>
        <p>
          {CONTACT_PHONE_DISPLAY} · {t.footerNote} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
