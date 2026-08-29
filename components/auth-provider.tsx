"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  metadataString,
  roleFromMetadata,
  splitName,
  type AuthResult,
  type AuthUser,
  type ProfileInput,
} from "@/lib/auth";
import { deleteUserProfile, updateUserProfile, upsertUser } from "@/lib/users";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  isAdmin: boolean;
  logOut: () => Promise<void>;
  updateAccount: (profile: ProfileInput) => Promise<AuthResult>;
  deleteAccount: () => Promise<AuthResult>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function mapClerkUser(user: NonNullable<ReturnType<typeof useUser>["user"]>): AuthUser {
  const metadata = user.unsafeMetadata ?? {};
  return {
    uid: user.id,
    name: user.fullName || user.firstName || "",
    email: user.primaryEmailAddress?.emailAddress ?? "",
    phone: metadataString(metadata.phone),
    village: metadataString(metadata.village),
    address: metadataString(metadata.address),
    role: roleFromMetadata(user.publicMetadata.role),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();

  const user = clerkUser ? mapClerkUser(clerkUser) : null;

  useEffect(() => {
    if (!user) return;
    void upsertUser(user).catch((error) => {
      console.error("Could not save user to Firestore:", error);
    });
  }, [
    user?.uid,
    user?.name,
    user?.email,
    user?.phone,
    user?.village,
    user?.address,
    user?.role,
  ]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready: isLoaded,
      isAdmin: user?.role === "admin",
      async logOut() {
        await signOut();
      },
      async updateAccount(profile) {
        if (!clerkUser) return "fail";
        try {
        const names = splitName(profile.name);
          await clerkUser.update({
          firstName: names.firstName,
          lastName: names.lastName,
          unsafeMetadata: {
              phone: profile.phone.replace(/\s+/g, "").trim(),
              village: profile.village.trim(),
              address: profile.address.trim(),
            },
          });
          await updateUserProfile(clerkUser.id, profile);
          return "ok";
        } catch (error) {
          console.error("Update account failed:", error);
          return "fail";
        }
      },
      async deleteAccount() {
        if (!clerkUser) return "fail";
        try {
          await deleteUserProfile(clerkUser.id);
          await clerkUser.delete();
          return "ok";
        } catch (error) {
          console.error("Delete account failed:", error);
          return "fail";
        }
      },
      async refreshUser() {
        await clerkUser?.reload();
      },
    }),
    [clerkUser, isLoaded, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
