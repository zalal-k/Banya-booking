"use client";

import Link from "next/link";
import { AdminDayBoard } from "@/components/admin-day-board";
import { PageBack } from "@/components/page-back";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";

export function AdminPage() {
  const { t } = useLanguage();
  const { user, ready, isAdmin } = useAuth();

  if (!ready) {
    return (
      <main className="flex flex-1 items-center justify-center bg-background px-5 pt-24 pb-16">
        <p className="text-muted">…</p>
      </main>
    );
  }

  if (!user || !isAdmin) {
    return (
      <main className="flex flex-1 flex-col bg-background px-5 pt-24 pb-16 sm:px-8">
        <div className="mx-auto max-w-md text-center">
          <PageBack />
          <p className="text-muted">{t.adminNeedLogin}</p>
          <Link
            href="/sign-in"
            className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm text-foreground"
          >
            {t.navLogin}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-background px-5 pt-24 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <PageBack />
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-[#cbbba8] uppercase">
          <span className="h-px w-8 bg-accent" />
          {t.navAdmin}
        </p>
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
          {t.adminTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{t.adminLead}</p>
        <AdminDayBoard />
      </div>
    </main>
  );
}
