import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import type { AuthUser, ProfileInput } from "@/lib/auth";

export async function upsertUser(user: AuthUser) {
  if (!user.uid) return;
  const ref = doc(firestore, "users", user.uid);
  const snapshot = await getDoc(ref);
  await setDoc(
    ref,
    {
      uid: user.uid,
      name: user.name,
      email: user.email.toLowerCase(),
      phone: user.phone,
      village: user.village,
      address: user.address,
      role: user.role,
      updatedAt: serverTimestamp(),
      ...(snapshot.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true },
  );
}

export async function updateUserProfile(uid: string, profile: ProfileInput) {
  if (!uid) return;
  await setDoc(
    doc(firestore, "users", uid),
    {
      uid,
      name: profile.name.trim(),
      phone: profile.phone.replace(/\s+/g, "").trim(),
      village: profile.village.trim(),
      address: profile.address.trim(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function deleteUserProfile(uid: string) {
  if (!uid) return;
  try {
    await deleteDoc(doc(firestore, "users", uid));
  } catch {
    // Profile may already be gone.
  }
}
