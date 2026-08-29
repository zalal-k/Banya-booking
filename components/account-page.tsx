"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageBack } from "@/components/page-back";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";

export function AccountPage() {
  const { t } = useLanguage();
  const { user, ready, updateAccount, deleteAccount } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setPhone(user.phone);
    setVillage(user.village);
    setAddress(user.address);
  }, [user]);

  const inputClass =
    "mt-1.5 w-full rounded-2xl border border-line bg-background px-4 py-3 text-foreground outline-none focus:border-accent";

  async function onSave(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError(t.authErrorMissing);
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await updateAccount({
      name: name.trim(),
      phone: phone.trim(),
      village: village.trim(),
      address: address.trim(),
    });
    setBusy(false);
    if (result !== "ok") {
      setError(t.authErrorGeneric);
      return;
    }
    setMessage(t.accountSaved);
  }

  async function onDelete() {
    if (!window.confirm(t.accountDeleteConfirm)) return;
    setBusy(true);
    setError(null);
    const result = await deleteAccount();
    setBusy(false);
    if (result === "ok") {
      router.push("/");
      return;
    }
    if (result === "recent-login") {
      setError(t.accountDeleteHint);
      return;
    }
    setError(t.authErrorGeneric);
  }

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
          <p className="text-muted">{t.accountNeedLogin}</p>
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
      <div className="mx-auto w-full max-w-md">
        <PageBack />
        <div className="rounded-3xl border border-line bg-panel p-6 sm:p-8">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-[#cbbba8] uppercase">
          <span className="h-px w-8 bg-accent" />
          {t.navAccount}
        </p>
        <h1 className="font-serif text-4xl text-foreground">{t.accountTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{t.accountLead}</p>
        <p className="mt-2 text-sm text-muted">{user.email}</p>

        <form onSubmit={onSave} className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="text-muted">{t.nameLabel}</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">{t.phoneField}</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputClass}
              autoComplete="tel"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">{t.villageLabel}</span>
            <input
              value={village}
              onChange={(event) => setVillage(event.target.value)}
              className={inputClass}
              autoComplete="address-level2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">{t.homeAddressLabel}</span>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className={inputClass}
              autoComplete="street-address"
            />
          </label>

          {message ? (
            <p className="text-sm text-emerald-400" role="status">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="text-sm text-accent" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-accent py-3.5 text-sm font-medium text-foreground transition hover:bg-accent-deep disabled:opacity-60"
          >
            {t.accountSave}
          </button>
        </form>

        <div className="mt-10 border-t border-line pt-6">
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              void onDelete();
            }}
            className="w-full rounded-full border border-accent/40 px-4 py-3 text-sm text-accent transition hover:bg-accent/10 disabled:opacity-60"
          >
            {t.accountDelete}
          </button>
          <p className="mt-3 text-xs leading-5 text-muted">
            {t.accountDeleteHint}
          </p>
        </div>
        </div>
      </div>
    </main>
  );
}
