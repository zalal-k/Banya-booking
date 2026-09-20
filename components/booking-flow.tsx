"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageBack } from "@/components/page-back";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { MbankPayPanel } from "@/components/mbank-pay-panel";
import { MBANK_NAME, MBANK_NUMBER } from "@/lib/contact";
import { bookingTotalSom, formatSom } from "@/lib/pricing";
import {
  CABINS,
  createBooking,
  endTime,
  isSlotInPast,
  parseDateKey,
  slotKey,
  TIME_SLOTS,
  toDateKey,
  watchOccupiedSlots,
  type BookingMap,
  type CabinId,
  type PaymentMethod,
  type TimeSlot,
} from "@/lib/bookings";

export function BookingFlow() {
  const { t, dateLocale } = useLanguage();
  const { user, ready: authReady } = useAuth();
  const todayKey = toDateKey(new Date());
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [selectedCabin, setSelectedCabin] = useState<CabinId | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [bookings, setBookings] = useState<BookingMap>({});
  const [slotsReady, setSlotsReady] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState("1");
  const [kids, setKids] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{
    date: string;
    time: TimeSlot;
    cabin: CabinId;
    paymentMethod: PaymentMethod;
    totalSom: number;
  } | null>(null);

  useEffect(() => {
    return watchOccupiedSlots((map) => {
      setBookings(map);
      setSlotsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    setName((value) => value || user.name);
    setPhone((value) => value || user.phone);
  }, [user]);

  const days = useMemo(() => buildCalendarDays(month), [month]);
  const adultCount = Math.max(0, Number(adults) || 0);
  const kidCount = Math.max(0, Number(kids) || 0);
  const totalSom = bookingTotalSom(adultCount, kidCount);
  const selectedLabel = formatLongDate(parseDateKey(selectedDate), dateLocale);

  function cabinName(cabin: CabinId) {
    return cabin === "cabin-1" ? t.cabin1 : t.cabin2;
  }

  function selectDate(dateKey: string) {
    setSelectedDate(dateKey);
    setSelectedTime(null);
    setConfirmed(null);
    setFormError(null);
  }

  function selectCabin(cabin: CabinId) {
    setSelectedCabin(cabin);
    setSelectedTime(null);
    setConfirmed(null);
    setFormError(null);
  }

  async function onConfirm(event: FormEvent) {
    event.preventDefault();
    if (!selectedTime || !selectedCabin) return;
    setBusy(true);
    setFormError(null);
    const result = await createBooking({
      date: selectedDate,
      time: selectedTime,
      cabin: selectedCabin,
      name: name.trim(),
      phone: phone.trim(),
      adults: adultCount,
      kids: kidCount,
      paymentMethod,
      userId: user?.uid ?? "",
    });
    setBusy(false);
    if (result === "auth") {
      setFormError(t.bookNeedLogin);
      return;
    }
    if (result === "taken") {
      setFormError(t.bookTaken);
      return;
    }
    if (result !== "ok") {
      setFormError(t.authErrorGeneric);
      return;
    }
    setConfirmed({
      date: selectedDate,
      time: selectedTime,
      cabin: selectedCabin,
      paymentMethod,
      totalSom,
    });
    setSelectedTime(null);
    setAdults("1");
    setKids("0");
    setPaymentMethod("cash");
  }

  return (
    <main className="flex flex-1 flex-col bg-background px-5 pt-24 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <PageBack />
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-[#cbbba8] uppercase">
          <span className="h-px w-8 bg-accent" />
          {t.bookEyebrow}
        </p>
        <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {t.bookTitleBefore}{" "}
          <span className="text-accent">{t.bookTitleAccent}</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">{t.bookIntro}</p>

        {!authReady ? (
          <p className="mt-10 text-muted">…</p>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <section className="rounded-3xl border border-line bg-panel p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
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
                      setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
                    }
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground transition hover:border-accent"
                    aria-label={t.prevMonth}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
                    }
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground transition hover:border-accent"
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
                  const isPastDay = key < todayKey;
                  const isSelected = key === selectedDate;
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={isPastDay}
                      onClick={() => selectDate(key)}
                      className={`aspect-square rounded-2xl text-sm transition ${
                        isPastDay
                          ? "cursor-not-allowed text-muted/40"
                          : isSelected
                            ? "bg-accent text-foreground"
                            : "text-foreground hover:bg-white/5"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-panel p-5 sm:p-7">
              <h2 className="font-serif text-2xl text-foreground">{selectedLabel}</h2>
              <p className="mt-1 text-sm text-muted">{t.cabinHint}</p>
              <p className="mt-6 text-sm text-muted">{t.pickCabin}</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {CABINS.map((cabin) => {
                  const active = selectedCabin === cabin;
                  return (
                    <button
                      key={cabin}
                      type="button"
                      onClick={() => selectCabin(cabin)}
                      className={`rounded-2xl border px-3 py-4 text-sm font-medium transition ${
                        active
                          ? "border-accent bg-accent text-foreground"
                          : "border-line bg-background text-foreground hover:border-accent"
                      }`}
                    >
                      {cabinName(cabin)}
                    </button>
                  );
                })}
              </div>

              {selectedCabin ? (
                <>
                  <p className="mt-6 text-sm text-muted">
                    {slotsReady ? t.pickSlot : t.loadingSlots}
                  </p>
                  <div className="mt-3 grid max-h-[22rem] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                    {TIME_SLOTS.map((time) => {
                      const booked = Boolean(
                        bookings[slotKey(selectedDate, time, selectedCabin)],
                      );
                      const past = isSlotInPast(selectedDate, time);
                      const unavailable = !slotsReady || booked || past;
                      const active = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={unavailable}
                          onClick={() => {
                            setSelectedTime(time);
                            setConfirmed(null);
                            setFormError(null);
                          }}
                          className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                            unavailable
                              ? "cursor-not-allowed border-transparent bg-[#3a342f] text-[#9a938c]"
                              : active
                                ? "border-accent bg-accent text-foreground"
                                : "border-emerald-800/40 bg-emerald-700/80 text-emerald-50 hover:bg-emerald-600"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {confirmed ? (
                <div
                  role="status"
                  className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-4 text-sm leading-6 text-foreground"
                >
                  <p>{t.success}</p>
                  <p className="mt-1 text-muted">
                    {cabinName(confirmed.cabin)} ·{" "}
                    {formatLongDate(parseDateKey(confirmed.date), dateLocale)} ·{" "}
                    {confirmed.time} · {formatSom(confirmed.totalSom)} ·{" "}
                    {confirmed.paymentMethod === "cash" ? t.payCash : t.payCard}
                  </p>
                  {confirmed.paymentMethod === "mbank" ? (
                    <div className="mt-4">
                      <p className="mb-3 text-muted">{t.successMbank}</p>
                      <MbankPayPanel amountSom={confirmed.totalSom} />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {selectedCabin && selectedTime ? (
                <form onSubmit={onConfirm} className="mt-8 space-y-4">
                  <p className="text-sm text-muted">
                    {t.session}: {cabinName(selectedCabin)}, {selectedLabel},{" "}
                    {selectedTime}–{endTime(selectedTime)}
                  </p>
                  <label className="block text-sm">
                    <span className="text-muted">{t.nameLabel}</span>
                    <input
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-line bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                      autoComplete="name"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="text-muted">{t.phoneField}</span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-line bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                      autoComplete="tel"
                      placeholder="+996"
                    />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="text-muted">{t.adultsLabel}</span>
                      <input
                        required
                        type="number"
                        min={0}
                        max={12}
                        value={adults}
                        onChange={(event) => setAdults(event.target.value)}
                        className="mt-1.5 w-full rounded-2xl border border-line bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-muted">{t.kidsLabel}</span>
                      <input
                        required
                        type="number"
                        min={0}
                        max={12}
                        value={kids}
                        onChange={(event) => setKids(event.target.value)}
                        className="mt-1.5 w-full rounded-2xl border border-line bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-muted">{t.priceRates}</p>
                  <p className="rounded-2xl bg-background px-4 py-3 text-sm text-foreground">
                    {t.priceTotal}:{" "}
                    <span className="font-medium">{formatSom(totalSom)}</span>
                  </p>
                  <fieldset>
                    <legend className="text-sm text-muted">{t.payLabel}</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <label
                        className={`cursor-pointer rounded-2xl border px-3 py-3 text-sm ${
                          paymentMethod === "cash"
                            ? "border-accent bg-accent/15"
                            : "border-line"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="sr-only"
                          checked={paymentMethod === "cash"}
                          onChange={() => setPaymentMethod("cash")}
                        />
                        <span className="block font-medium">{t.payCash}</span>
                        <span className="mt-1 block text-xs leading-5 text-muted">
                          {t.payCashHint}
                        </span>
                      </label>
                      <label
                        className={`cursor-pointer rounded-2xl border px-3 py-3 text-sm ${
                          paymentMethod === "mbank"
                            ? "border-accent bg-accent/15"
                            : "border-line"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="sr-only"
                          checked={paymentMethod === "mbank"}
                          onChange={() => setPaymentMethod("mbank")}
                        />
                        <span className="block font-medium">{t.payCard}</span>
                        <span className="mt-1 block text-sm font-medium text-foreground">
                          {MBANK_NAME} · {MBANK_NUMBER}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted">
                          {t.payCardHint}
                        </span>
                      </label>
                    </div>
                  </fieldset>
                  {paymentMethod === "mbank" ? (
                    <MbankPayPanel amountSom={totalSom} />
                  ) : null}
                  {formError ? (
                    <p className="text-sm text-accent" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  {user ? (
                    <button
                      type="submit"
                      disabled={busy || totalSom < 1}
                      className="w-full rounded-full bg-accent py-3.5 text-sm font-medium text-foreground shadow-[0_0_28px_rgba(200,16,46,0.35)] transition hover:bg-accent-deep disabled:opacity-60"
                    >
                      {t.confirm}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm leading-6 text-muted">{t.bookNeedLogin}</p>
                      <Link
                        href="/sign-in"
                        className="flex w-full items-center justify-center rounded-full bg-accent py-3.5 text-sm font-medium text-foreground shadow-[0_0_28px_rgba(200,16,46,0.35)]"
                      >
                        {t.navLogin}
                      </Link>
                    </div>
                  )}
                </form>
              ) : null}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function formatLongDate(date: Date, dateLocale: string) {
  return date.toLocaleDateString(dateLocale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function buildCalendarDays(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const first = new Date(year, monthIndex, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, monthIndex, day));
  }
  return cells;
}
