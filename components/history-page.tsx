"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageBack } from "@/components/page-back";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import {
  cancelBooking,
  endTime,
  isSlotInPast,
  watchMyBookings,
  type Booking,
} from "@/lib/bookings";

function formatVisit(booking: Booking, dateLocale: string) {
  return new Date(`${booking.date}T12:00:00`).toLocaleDateString(dateLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function HistoryPage() {
  const { t, dateLocale } = useLanguage();
  const { user, ready } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    return watchMyBookings(user.uid, setBookings);
  }, [user]);

  const groups = useMemo(() => {
    const upcoming = bookings.filter(
      (item) =>
        item.status === "active" && !isSlotInPast(item.date, item.time),
    );
    const passed = bookings.filter(
      (item) =>
        item.status === "active" && isSlotInPast(item.date, item.time),
    );
    const cancelled = bookings.filter((item) => item.status === "cancelled");
    return {
      next: upcoming[0] ?? null,
      upcoming: upcoming.slice(1),
      passed: [...passed].reverse(),
      cancelled: [...cancelled].reverse(),
    };
  }, [bookings]);

  if (!ready) {
    return (
      <main className="flex flex-1 items-center justify-center bg-background px-5 pt-24 pb-16">
        <p className="text-muted">…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-1 flex-col bg-background px-5 pt-24 pb-16 sm:px-8">
        <div className="mx-auto max-w-md text-center">
          <PageBack />
          <p className="text-muted">{t.historyNeedLogin}</p>
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

  async function onCancel(id: string) {
    if (!window.confirm(t.adminCancelConfirm)) return;
    setBusyId(id);
    await cancelBooking(id);
    setBusyId(null);
  }

  return (
    <main className="flex flex-1 flex-col bg-background px-5 pt-24 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <PageBack />
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-[#cbbba8] uppercase">
          <span className="h-px w-8 bg-accent" />
          {t.navHistory}
        </p>
        <h1 className="font-serif text-4xl text-foreground">{t.historyTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{t.historyLead}</p>

        {groups.next ? (
          <section className="mt-8 rounded-3xl border border-accent/50 bg-accent/10 p-6">
            <p className="text-[11px] tracking-[0.2em] text-accent uppercase">
              {t.historyNext}
            </p>
            <p className="mt-2 font-serif text-3xl text-foreground">
              {groups.next.cabin === "cabin-1" ? t.cabin1 : t.cabin2}
            </p>
            <p className="mt-2 text-lg text-foreground">
              {groups.next.time}–{endTime(groups.next.time)}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formatVisit(groups.next, dateLocale)}
            </p>
            <p className="mt-3 text-sm text-muted">
              {groups.next.paymentMethod === "cash" ? t.payCash : t.payCard}
              {" · "}
              {groups.next.totalSom ? `${groups.next.totalSom} сом · ` : ""}
              {groups.next.paymentStatus === "paid" ? t.adminPaid : t.adminUnpaid}
            </p>
            <button
              type="button"
              disabled={busyId === groups.next.id}
              onClick={() => onCancel(groups.next!.id)}
              className="mt-5 rounded-full border border-line px-4 py-2 text-sm text-foreground hover:border-accent disabled:opacity-60"
            >
              {t.adminCancel}
            </button>
          </section>
        ) : (
          <p className="mt-8 rounded-3xl border border-line bg-panel px-5 py-6 text-sm text-muted">
            {t.historyNoNext}
          </p>
        )}

        {bookings.length === 0 ? (
          <p className="mt-6 text-sm text-muted">{t.historyEmpty}</p>
        ) : (
          <div className="mt-10 space-y-10">
            <BookingGroup
              title={t.historyUpcomingList}
              items={groups.upcoming}
              empty={null}
              badge={t.visitUpcoming}
              badgeClass="bg-emerald-900/50 text-emerald-100"
              dateLocale={dateLocale}
              cabin1={t.cabin1}
              cabin2={t.cabin2}
              payCard={t.payCard}
              payCash={t.payCash}
              paid={t.adminPaid}
              unpaid={t.adminUnpaid}
              cancelLabel={t.adminCancel}
              busyId={busyId}
              onCancel={onCancel}
            />
            <BookingGroup
              title={t.historyPassedList}
              items={groups.passed}
              empty={null}
              badge={t.visitPassed}
              badgeClass="bg-[#2a2420] text-muted"
              dateLocale={dateLocale}
              cabin1={t.cabin1}
              cabin2={t.cabin2}
              payCard={t.payCard}
              payCash={t.payCash}
              paid={t.adminPaid}
              unpaid={t.adminUnpaid}
              cancelLabel={t.adminCancel}
              busyId={busyId}
            />
            <BookingGroup
              title={t.historyCancelledList}
              items={groups.cancelled}
              empty={null}
              badge={t.visitCancelled}
              badgeClass="bg-accent/20 text-foreground"
              dateLocale={dateLocale}
              cabin1={t.cabin1}
              cabin2={t.cabin2}
              payCard={t.payCard}
              payCash={t.payCash}
              paid={t.adminPaid}
              unpaid={t.adminUnpaid}
              cancelLabel={t.adminCancel}
              busyId={busyId}
            />
          </div>
        )}
      </div>
    </main>
  );
}

function BookingGroup({
  title,
  items,
  empty,
  badge,
  badgeClass,
  dateLocale,
  cabin1,
  cabin2,
  payCard,
  payCash,
  paid,
  unpaid,
  cancelLabel,
  busyId,
  onCancel,
}: {
  title: string;
  items: Booking[];
  empty: string | null;
  badge: string;
  badgeClass: string;
  dateLocale: string;
  cabin1: string;
  cabin2: string;
  payCard: string;
  payCash: string;
  paid: string;
  unpaid: string;
  cancelLabel: string;
  busyId: string | null;
  onCancel?: (id: string) => void;
}) {
  if (items.length === 0 && !empty) return null;

  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground">{title}</h2>
      {items.length === 0 && empty ? (
        <p className="mt-3 text-sm text-muted">{empty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((booking) => (
            <li
              key={booking.id}
              className="rounded-3xl border border-line bg-panel p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl text-foreground">
                    {booking.cabin === "cabin-1" ? cabin1 : cabin2}
                  </p>
                  <p className="mt-1 text-foreground">
                    {booking.time}–{endTime(booking.time)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {formatVisit(booking, dateLocale)}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {booking.paymentMethod === "cash" ? payCash : payCard}
                    {booking.totalSom ? ` · ${booking.totalSom} сом` : ""}
                    {" · "}
                    {booking.paymentStatus === "paid" ? paid : unpaid}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${badgeClass}`}
                >
                  {badge}
                </span>
              </div>
              {onCancel ? (
                <button
                  type="button"
                  disabled={busyId === booking.id}
                  onClick={() => onCancel(booking.id)}
                  className="mt-4 rounded-full border border-line px-4 py-2 text-sm text-foreground hover:border-accent disabled:opacity-60"
                >
                  {cancelLabel}
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
