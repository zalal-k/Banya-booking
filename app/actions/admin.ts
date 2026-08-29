"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import type { AuthResult } from "@/lib/auth";
import { canBecomeAdmin } from "@/lib/roles";

export async function claimAdminRole(adminCode: string): Promise<AuthResult> {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) return "fail";

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (user.publicMetadata.role === "admin") return "ok";

  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    "";

  if (!canBecomeAdmin(email, adminCode)) return "forbidden";

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...user.publicMetadata,
      role: "admin",
    },
  });

  return "ok";
}
