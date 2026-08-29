import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-start justify-center bg-background px-5 pt-24 pb-16">
      <SignIn />
    </main>
  );
}
