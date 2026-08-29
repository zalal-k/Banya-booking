"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { clerkAppearance } from "@/lib/clerk-appearance";

export function AuthButtons() {
  const { t } = useLanguage();
  const { ready, isAdmin } = useAuth();

  if (!ready) {
    return <div className="h-8 w-20" />;
  }

  return (
    <>
      <Show when="signed-out">
        <div className="flex items-center gap-2">
          <SignInButton mode="modal">
            <button
              type="button"
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-foreground transition hover:border-accent"
            >
              {t.navLogin}
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              type="button"
              className="hidden rounded-full bg-accent px-3 py-1.5 text-xs text-foreground transition hover:bg-accent-deep sm:inline"
            >
              {t.navSignup}
            </button>
          </SignUpButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="flex items-center gap-2">
          <Link
            href="/history"
            className="hidden rounded-full border border-white/15 px-3 py-1.5 text-xs text-foreground transition hover:border-accent sm:inline"
          >
            {t.navHistory}
          </Link>
          {isAdmin ? (
            <Link
              href="/admin"
              className="hidden rounded-full border border-white/15 px-3 py-1.5 text-xs text-foreground transition hover:border-accent sm:inline"
            >
              {t.navAdmin}
            </Link>
          ) : null}
          <UserButton
            appearance={{
              ...clerkAppearance,
              elements: {
                ...clerkAppearance.elements,
                avatarBox: "h-8 w-8",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label={t.navAccount}
                href="/account"
                labelIcon={<span className="text-[10px]">A</span>}
              />
              <UserButton.Link
                label={t.navHistory}
                href="/history"
                labelIcon={<span className="text-[10px]">H</span>}
              />
              {isAdmin ? (
                <UserButton.Link
                  label={t.navAdmin}
                  href="/admin"
                  labelIcon={<span className="text-[10px]">★</span>}
                />
              ) : null}
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </Show>
    </>
  );
}
