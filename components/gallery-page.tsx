"use client";

import Image from "next/image";
import { PageBack } from "@/components/page-back";
import { useLanguage } from "@/components/language-provider";

export function GalleryPage() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-1 flex-col bg-background px-5 pt-24 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <PageBack />
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-[#cbbba8] uppercase">
          <span className="h-px w-8 bg-accent" />
          {t.galleryEyebrow}
        </p>
        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {t.galleryTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          {t.galleryIntro}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {t.photos.map((photo) => (
            <article
              key={photo.src}
              className="overflow-hidden rounded-3xl border border-line bg-panel"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={
                    photo.src.includes("gallery-street")
                      ? "object-cover object-[center_28%]"
                      : "object-cover"
                  }
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="font-serif text-2xl text-foreground">
                  {photo.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted">{photo.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
