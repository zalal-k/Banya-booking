"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { useLanguage } from "@/components/language-provider";
import { CONTACT_PHONE_DISPLAY, telHref } from "@/lib/contact";

export function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/images/banya-hero.jpg"
          alt={t.heroImageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a07] via-[#0f0a07]/88 to-[#0f0a07]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a07] via-transparent to-[#0f0a07]/50" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:justify-center sm:px-8 sm:pb-24 sm:pt-24">
          <div className="max-w-xl">
            <div className="mb-4">
              <BrandLogo size="lg" priority />
            </div>
            <p className="mb-2 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-[#cbbba8] uppercase">
              <span className="h-px w-8 bg-accent" />
              {t.brandSlogan}
            </p>
            <p className="mb-6 text-[11px] tracking-[0.18em] text-accent uppercase">
              {t.yearsLine}
            </p>
            <h1 className="font-serif text-[2.75rem] leading-[1.05] font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Kut <span className="text-accent">Banya</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">
              {t.heroLead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-foreground shadow-[0_0_32px_rgba(200,16,46,0.45)] transition hover:bg-accent-deep"
              >
                <CalendarIcon />
                {t.bookCta}
                <ArrowIcon />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-accent/15"
              >
                {t.galleryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.24em] text-accent uppercase">
            {t.whyEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-5xl">
            {t.whyTitle}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {t.whyItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-line bg-background/40 p-5"
              >
                <h3 className="font-serif text-2xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-background px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.24em] text-accent uppercase">
            {t.roomsEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-5xl">
            {t.roomsTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {t.roomsLead}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {t.rooms.map((room) => (
              <div
                key={room.title}
                className="rounded-3xl border border-line bg-panel p-6"
              >
                <h3 className="font-serif text-2xl text-foreground">
                  {room.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{room.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacts"
        className="border-t border-line bg-background px-5 py-14 sm:px-8"
      >
        <div className="mx-auto mb-10 max-w-6xl">
          <p className="text-[11px] tracking-[0.24em] text-accent uppercase">
            {t.contactEyebrow}
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-accent uppercase">
              {t.addressLabel}
            </p>
            <p className="mt-3 font-serif text-2xl text-foreground">
              {t.addressTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{t.addressText}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.24em] text-accent uppercase">
              {t.phoneLabel}
            </p>
            <a
              href={telHref()}
              className="mt-3 block font-serif text-2xl text-foreground hover:text-accent"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
            <p className="mt-2 text-sm leading-6 text-muted">{t.phoneText}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.24em] text-accent uppercase">
              {t.hoursLabel}
            </p>
            <p className="mt-3 font-serif text-2xl text-foreground">
              {t.hoursTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{t.hoursText}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 3.5v4M16 3.5v4M3.5 10h17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
