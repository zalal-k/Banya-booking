"use client";

import { COPY, LOCALES } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex rounded-full border border-white/15 bg-background/40 p-0.5 backdrop-blur-sm"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition ${
              active
                ? "bg-accent text-foreground"
                : "text-[#cbbba8] hover:text-foreground"
            }`}
            aria-pressed={active}
            aria-label={COPY[code].langLabel}
            title={COPY[code].langLabel}
          >
            {COPY[code].langLabel === "English"
              ? "EN"
              : code === "ru"
                ? "RU"
                : "KY"}
          </button>
        );
      })}
    </div>
  );
}
