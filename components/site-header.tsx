"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButtons } from "@/components/auth-buttons";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { BRAND_NAME, BRAND_SLOGAN } from "@/lib/i18n";

export function SiteHeader() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: t.navHome },
    { href: "/gallery", label: t.navGallery },
    { href: "/book", label: t.navBook },
    { href: "/history", label: t.navHistory },
    ...(isAdmin ? [{ href: "/admin", label: t.navAdmin }] : []),
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-foreground transition hover:border-accent"
            aria-expanded={open}
            aria-label={t.navMenu}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <BrandLogo size="sm" />
            <span className="hidden leading-tight sm:block">
              <span className="block font-serif text-lg text-foreground">
                {BRAND_NAME}
              </span>
              <span className="block text-[11px] tracking-[0.18em] text-[#cbbba8] uppercase">
                {BRAND_SLOGAN}
              </span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <AuthButtons />
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label={t.navClose}
            onClick={() => setOpen(false)}
          />
          <nav className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col border-r border-line bg-[#140e0b] px-5 py-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-serif text-xl text-foreground">{t.navMenu}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-foreground"
              >
                {t.navClose}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-3 text-base transition hover:bg-white/5 ${
                    pathname === link.href ? "bg-accent/20 text-foreground" : "text-[#cbbba8]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
