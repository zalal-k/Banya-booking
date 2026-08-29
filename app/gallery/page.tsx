import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryRoute() {
  return <GalleryPage />;
}
