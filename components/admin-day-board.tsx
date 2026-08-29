"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import {
  CABINS,
  TIME_SLOTS,
  buildCalendarDays,
  cancelBooking,
  endTime,
  isSlotInPast,
  markBookingPaid,
  toDateKey,
  watchAllBookings,
  type Booking,
  type CabinId,
} from "@/lib/bookings";

function upcomingDays(count: number) {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  return Array.from({ length: count }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

export function AdminDayBoard() {
  const { t, dateLocale } = useLanguage();
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    return watchAllBookings(setBookings);
  }, []);

  const days = useMemo(() => buildCalendarDays(month), [month]);
  const strip = useMemo(() => upcomingDays(21), []);
  const todayKey = toDateKey(new Date());
  const dayBookings = bookings.filter(
    (item) => item.date === selectedDate && item.status === "active",
  );
  const selected = dayBookings.find((item) => item.id === openId) ?? null;
  const selectedLabel = new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
    dateLocale,
    { weekday: "long", day: "numeric", month: "long" },
  );

  function bookingFor(cabin: CabinId, time: string) {
    return dayBookings.find(
      (item) => item.cabin === cabin && item.time === time,
    );
  }

  function pickDate(key: string) {
    setSelectedDate(key);
    setOpenId(null);
    const nextMonth = new Date(`${key}T12:00:00`);
    setMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1));
  }

  return (
    <div className="mt-8 space-y-6">
      <section className="overflow-hidden rounded-3xl border border-line bg-panel">
        <div className="border-b border-line px-5 py-4 sm:px-7">
          <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
            {t.adminPickDay}
          </p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {strip.map((day) => {
              const key = toDateKey(day);
              const isSelected = key === selectedDate;
              const hasBusy = bookings.some(
                (item) => item.date === key && item.status === "active",
              );
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => pickDate(key)}
                  className={`min-w-[4.5rem] shrink-0 rounded-2xl px-3 py-2.5 text-center transition ${
                    isSelected
                      ? "bg-accent text-foreground"
                      : "bg-background text-foreground hover:bg-white/5"
                  }`}
                >
                  <span className="block text-[10px] tracking-wide uppercase opacity-80">
                    {day.toLocaleDateString(dateLocale, { weekday: "short" })}
                  </span>
                  <span className="mt-0.5 block font-serif text-xl leading-none">
                    {day.getDate()}
                  </span>
                  {hasBusy ? (
                    <span
                      className={`mx-auto mt-1.5 block h-1.5 w-1.5 rounded-full ${
                        isSelected ? "bg-foreground" : "bg-accent"
                      }`}
                    />
                  ) : (
                    <span className="mt-1.5 block h-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-5 sm:px-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-foreground">
              {month.toLocaleDateString(dateLocale, {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() - 1, 1),
                  )
                }
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground hover:border-accent"
                aria-label={t.prevMonth}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() + 1, 1),
                  )
                }
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground hover:border-accent"
                aria-label={t.nextMonth}
              >
                ›
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs tracking-wide text-muted uppercase">
            {t.weekdays.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) return <div key={`pad-${index}`} />;
              const key = toDateKey(day);
              const isSelected = key === selectedDate;
              const isToday = key === todayKey;
              const hasBusy = bookings.some(
                (item) => item.date === key && item.status === "active",
              );
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => pickDate(key)}
                  className={`aspect-square rounded-2xl text-sm transition ${
                    isSelected
                      ? "bg-accent text-foreground"
                      : isToday
                        ? "ring-1 ring-accent/70 text-foreground hover:bg-white/5"
                        : "text-foreground hover:bg-white/5"
                  }`}
                >
                  <span className="block">{day.getDate()}</span>
                  {hasBusy ? (
                    <span
                      className={`mx-auto mt-0.5 block h-1 w-1 rounded-full ${
                        isSelected ? "bg-foreground" : "bg-accent"
                      }`}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="rounded-3xl border border-line bg-panel px-5 py-4 sm:px-7">
        <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
          {selectedLabel}
        </p>
        <h2 className="mt-1 font-serif text-3xl text-foreground">
          08:00 — 01:00
        </h2>
        <p className="mt-2 text-sm text-muted">{t.adminClickBusy}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {CABINS.map((cabin) => (
          <section
            key={cabin}
            className="overflow-hidden rounded-3xl border border-line bg-panel"
          >
            <div className="border-b border-line bg-background/40 px-5 py-4">
              <h3 className="font-serif text-2xl text-foreground">
                {cabin === "cabin-1" ? t.cabin1 : t.cabin2}
              </h3>
            </div>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-[11px] tracking-[0.16em] text-muted uppercase">
                  <th className="w-24 px-5 py-3 font-medium">
                    {t.adminColTime}
                  </th>
                  <th className="px-3 py-3 font-medium">{t.adminColStatus}</th>
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((time) => {
                  const booking = bookingFor(cabin, time);
                  const busy = Boolean(booking);
                  const past = isSlotInPast(selectedDate, time);
                  const active = booking?.id === openId;
                  return (
                    <tr key={`${cabin}-${time}`} className="border-t border-line">
                      <td className="px-5 py-2 align-middle font-medium text-foreground">
                        <span className="block">{time}</span>
                        <span className="text-[11px] font-normal text-muted">
                          – {endTime(time)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        {busy && booking ? (
                          <button
                            type="button"
                            onClick={() =>
                              setOpenId(active ? null : booking.id)
                            }
                            className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                              active
                                ? "bg-accent text-foreground"
                                : "bg-accent/20 text-foreground hover:bg-accent/30"
                            }`}
                          >
                            <span>
                              <span className="block font-medium">
                                {t.slotBusy}
                                {past ? ` · ${t.visitPassed}` : ""}
                              </span>
                              <span className="mt-0.5 block text-xs opacity-80">
                                {booking.name}
                              </span>
                            </span>
                            <span className="text-xs opacity-80">›</span>
                          </button>
                        ) : (
                          <div
                            className={`rounded-xl px-3 py-2.5 ${
                              past
                                ? "bg-[#2a2420] text-muted"
                                : "bg-emerald-900/40 text-emerald-100"
                            }`}
                          >
                            {past ? t.visitPassed : t.slotFree}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 p-4 sm:items-center"
          onClick={() => setOpenId(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-line bg-panel p-5 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-accent uppercase">
                  {t.adminGuestTitle}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-foreground">
                  {selected.cabin === "cabin-1" ? t.cabin1 : t.cabin2}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {selectedLabel} · {selected.time}–{endTime(selected.time)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="rounded-full border border-line px-3 py-1.5 text-xs text-foreground hover:border-accent"
              >
                {t.adminCloseGuest}
              </button>
            </div>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-2xl bg-background px-4 py-3">
                <dt className="text-muted">{t.adminName}</dt>
                <dd className="mt-1 text-foreground">{selected.name}</dd>
              </div>
              <div className="rounded-2xl bg-background px-4 py-3">
                <dt className="text-muted">{t.adminPhone}</dt>
                <dd className="mt-1 text-foreground">{selected.phone}</dd>
              </div>
              <div className="rounded-2xl bg-background px-4 py-3">
                <dt className="text-muted">{t.adminPeople}</dt>
                <dd className="mt-1 text-foreground">
                  {selected.adults} + {selected.kids} · {selected.totalSom || "—"}{" "}
                  сом
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted">
              {selected.paymentMethod === "cash" ? t.payCash : t.payCard}
              {" · "}
              {selected.totalSom ? `${selected.totalSom} сом · ` : ""}
              {selected.paymentStatus === "paid" ? t.adminPaid : t.adminUnpaid}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {selected.paymentStatus !== "paid" ? (
                <button
                  type="button"
                  disabled={busyId === selected.id}
                  onClick={async () => {
                    setBusyId(selected.id);
                    await markBookingPaid(selected.id);
                    setBusyId(null);
                  }}
                  className="rounded-full bg-accent px-4 py-2 text-sm text-foreground disabled:opacity-60"
                >
                  {t.adminMarkPaid}
                </button>
              ) : null}
              <button
                type="button"
                disabled={busyId === selected.id}
                onClick={async () => {
                  if (!window.confirm(t.adminCancelConfirm)) return;
                  setBusyId(selected.id);
                  await cancelBooking(selected.id);
                  setOpenId(null);
                  setBusyId(null);
                }}
                className="rounded-full border border-line px-4 py-2 text-sm text-foreground hover:border-accent disabled:opacity-60"
              >
                {t.adminCancel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
