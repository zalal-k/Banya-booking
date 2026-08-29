"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";

export function PageBack() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }
        router.push("/");
      }}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-foreground transition hover:border-accent"
    >
      <span aria-hidden="true">‹</span>
      {t.navBack}
    </button>
  );
}
