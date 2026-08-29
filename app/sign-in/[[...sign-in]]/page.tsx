import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-start justify-center bg-background px-5 pt-24 pb-16">
      <SignIn />
    </main>
  );
}
