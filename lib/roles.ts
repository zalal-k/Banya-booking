export type UserRole = "customer" | "admin";

export function adminEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string) {
  const list = adminEmails();
  if (list.length === 0) return false;
  return list.includes(email.trim().toLowerCase());
}

export function expectedAdminCode() {
  return (process.env.NEXT_PUBLIC_ADMIN_CODE || "KutBanyaAdmin").trim();
}

export function isValidAdminCode(code: string) {
  return code.trim() === expectedAdminCode();
}

export function canBecomeAdmin(email: string, adminCode: string) {
  return isAdminEmail(email) || isValidAdminCode(adminCode);
}
