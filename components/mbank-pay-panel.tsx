"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { MBANK_NAME, MBANK_NUMBER, MBANK_QR_SRC } from "@/lib/contact";
import { formatSom } from "@/lib/pricing";

export function MbankPayPanel({ amountSom }: { amountSom: number }) {
  const { t } = useLanguage();

  async function saveQr() {
    const response = await fetch(MBANK_QR_SRC);
    const blob = await response.blob();
    const file = new File([blob], "kut-banya-mbank-qr.png", { type: "image/png" });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: t.paySaveQr });
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kut-banya-mbank-qr.png";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-line bg-background px-4 py-4">
      <p className="text-sm font-medium text-foreground">
        {MBANK_NAME} · {MBANK_NUMBER}
      </p>
      <p className="mt-2 font-serif text-3xl text-foreground">
        {formatSom(amountSom)}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">{t.payScanQr}</p>
      <div className="mt-4 overflow-hidden rounded-2xl bg-white p-3">
        <Image
          src={MBANK_QR_SRC}
          alt={t.mbankQrAlt}
          width={280}
          height={360}
          className="mx-auto h-auto w-full max-w-[240px]"
        />
      </div>
      <button
        type="button"
        onClick={saveQr}
        className="mt-3 w-full rounded-full bg-accent py-2.5 text-sm text-foreground"
      >
        {t.paySaveQr}
      </button>
    </div>
  );
}
