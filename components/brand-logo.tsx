import Image from "next/image";
import { BRAND_NAME, BRAND_SLOGAN } from "@/lib/i18n";

type BrandLogoProps = {
  size?: "sm" | "lg";
  priority?: boolean;
};

export function BrandLogo({ size = "sm", priority = false }: BrandLogoProps) {
  const isLarge = size === "lg";

  return (
    <span
      className={`block overflow-hidden bg-[#120c09] shadow-[0_0_24px_rgba(0,0,0,0.35)] ${
        isLarge
          ? "h-40 w-40 rounded-[1.75rem] sm:h-52 sm:w-52 sm:rounded-[2.1rem]"
          : "h-12 w-12 rounded-2xl sm:h-14 sm:w-14"
      }`}
    >
      <Image
        src="/images/kut-banya-logo.png"
        alt={`${BRAND_NAME}, ${BRAND_SLOGAN}`}
        width={isLarge ? 208 : 56}
        height={isLarge ? 208 : 56}
        className="h-full w-full object-cover"
        priority={priority}
      />
    </span>
  );
}
