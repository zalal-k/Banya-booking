import type { UserRole } from "@/lib/roles";

export type AuthUser = {
  uid: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  address: string;
  role: UserRole;
};

export type ProfileInput = {
  name: string;
  phone: string;
  village: string;
  address: string;
};

export type AuthResult =
  | "ok"
  | "exists"
  | "wrong"
  | "fail"
  | "recent-login"
  | "forbidden"
  | "verify";

export type ProfileMetadata = {
  phone: string;
  village: string;
  address: string;
};

export function roleFromMetadata(value: unknown): UserRole {
  return value === "admin" ? "admin" : "customer";
}

export function metadataString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || name.trim(),
    lastName: parts.slice(1).join(" "),
  };
}
