import { FirebaseError } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { bookingTotalSom } from "@/lib/pricing";

function parsePaymentMethod(value: unknown): PaymentMethod {
  return value === "mbank" || value === "card" ? "mbank" : "cash";
}

export const CABINS = ["cabin-1", "cabin-2"] as const;
export type CabinId = (typeof CABINS)[number];

export const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
  "01:00",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];
export type PaymentMethod = "cash" | "mbank";
export type PaymentStatus = "unpaid" | "paid";
export type BookingStatus = "active" | "cancelled";
export type BookingResult = "ok" | "taken" | "auth" | "fail";

export type Booking = {
  id: string;
  date: string;
  time: TimeSlot;
  cabin: CabinId;
  name: string;
  phone: string;
  people: number;
  adults: number;
  kids: number;
  totalSom: number;
  userId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
};

export type BookingMap = Record<string, Booking>;

export function slotKey(date: string, time: string, cabin: CabinId) {
  return `${date}T${time}T${cabin}`;
}

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function slotDateTime(dateKey: string, time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const slot = parseDateKey(dateKey);
  if (hours < 8) {
    slot.setDate(slot.getDate() + 1);
  }
  slot.setHours(hours, minutes, 0, 0);
  return slot;
}

export function isSlotInPast(dateKey: string, time: string) {
  return slotDateTime(dateKey, time).getTime() <= Date.now();
}

export function endTime(time: TimeSlot) {
  const [hours] = time.split(":").map(Number);
  const endHour = (hours + 1) % 24;
  return `${String(endHour).padStart(2, "0")}:00`;
}

export function buildCalendarDays(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const first = new Date(year, monthIndex, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, monthIndex, day));
  }
  return cells;
}

function bookingFromData(id: string, data: Record<string, unknown>): Booking {
  return {
    id,
    date: String(data.date ?? ""),
    time: data.time as TimeSlot,
    cabin: data.cabin as CabinId,
    name: String(data.name ?? ""),
    phone: String(data.phone ?? ""),
    people: Number(data.people ?? 1),
    adults: Number(data.adults ?? data.people ?? 1),
    kids: Number(data.kids ?? 0),
    totalSom: Number(data.totalSom ?? 0),
    userId: String(data.userId ?? ""),
    paymentMethod: parsePaymentMethod(data.paymentMethod),
    paymentStatus: data.paymentStatus === "paid" ? "paid" : "unpaid",
    status: data.status === "cancelled" ? "cancelled" : "active",
  };
}

export function watchOccupiedSlots(onChange: (map: BookingMap) => void) {
  return onSnapshot(collection(firestore, "slots"), (snapshot) => {
    const map: BookingMap = {};
    snapshot.forEach((item) => {
      const data = item.data();
      const cabin = data.cabin as CabinId;
      const time = data.time as TimeSlot;
      const date = String(data.date ?? "");
      map[slotKey(date, time, cabin)] = {
        id: item.id,
        date,
        time,
        cabin,
        name: "",
        phone: "",
        people: 0,
        adults: 0,
        kids: 0,
        totalSom: 0,
        userId: String(data.userId ?? ""),
        paymentMethod: "cash",
        paymentStatus: "unpaid",
        status: "active",
      };
    });
    onChange(map);
  });
}

export function watchAllBookings(onChange: (bookings: Booking[]) => void) {
  return onSnapshot(collection(firestore, "bookings"), (snapshot) => {
    const next = snapshot.docs.map((item) =>
      bookingFromData(item.id, item.data() as Record<string, unknown>),
    );
    next.sort((a, b) => {
      const aTime = slotDateTime(a.date, a.time).getTime();
      const bTime = slotDateTime(b.date, b.time).getTime();
      if (aTime !== bTime) return aTime - bTime;
      return a.cabin.localeCompare(b.cabin);
    });
    onChange(next);
  });
}

export function watchMyBookings(
  userId: string,
  onChange: (bookings: Booking[]) => void,
) {
  const bookingsQuery = query(
    collection(firestore, "bookings"),
    where("userId", "==", userId),
  );
  return onSnapshot(bookingsQuery, (snapshot) => {
    const next = snapshot.docs.map((item) =>
      bookingFromData(item.id, item.data() as Record<string, unknown>),
    );
    next.sort((a, b) => {
      const aTime = slotDateTime(a.date, a.time).getTime();
      const bTime = slotDateTime(b.date, b.time).getTime();
      return aTime - bTime;
    });
    onChange(next);
  });
}

export async function getBooking(id: string): Promise<Booking | null> {
  const snapshot = await getDoc(doc(firestore, "bookings", id));
  if (!snapshot.exists()) return null;
  return bookingFromData(
    snapshot.id,
    snapshot.data() as Record<string, unknown>,
  );
}

export async function createBooking(input: {
  date: string;
  time: TimeSlot;
  cabin: CabinId;
  name: string;
  phone: string;
  adults: number;
  kids: number;
  paymentMethod: PaymentMethod;
  userId: string;
}): Promise<BookingResult> {
  if (!input.userId) return "auth";

  const adults = Math.max(0, Math.round(Number(input.adults)));
  const kids = Math.max(0, Math.round(Number(input.kids)));
  const people = adults + kids;
  if (people < 1) return "fail";

  const totalSom = bookingTotalSom(adults, kids);
  const id = slotKey(input.date, input.time, input.cabin);
  const bookingRef = doc(firestore, "bookings", id);
  const slotRef = doc(firestore, "slots", id);

  try {
    await runTransaction(firestore, async (transaction) => {
      const existingSlot = await transaction.get(slotRef);
      if (existingSlot.exists()) {
        throw new Error("taken");
      }
      const payload = {
        date: input.date,
        time: input.time,
        cabin: input.cabin,
        name: input.name,
        phone: input.phone,
        people,
        adults,
        kids,
        totalSom,
        userId: input.userId,
        paymentMethod: input.paymentMethod,
        paymentStatus: "unpaid" as const,
        status: "active" as const,
        createdAt: serverTimestamp(),
      };
      transaction.set(bookingRef, payload);
      transaction.set(slotRef, {
        date: input.date,
        time: input.time,
        cabin: input.cabin,
        userId: input.userId,
      });
    });
    return "ok";
  } catch (error) {
    if (error instanceof Error && error.message === "taken") {
      return "taken";
    }
    if (error instanceof FirebaseError && error.code === "permission-denied") {
      console.error("Firestore blocked the booking. Publish firestore.rules.");
    } else {
      console.error("Could not save booking:", error);
    }
    return "fail";
  }
}

export async function markBookingPaid(id: string) {
  await updateDoc(doc(firestore, "bookings", id), {
    paymentStatus: "paid",
    updatedAt: serverTimestamp(),
  });
}

export async function cancelBooking(id: string) {
  await updateDoc(doc(firestore, "bookings", id), {
    status: "cancelled",
    cancelledAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  try {
    await deleteDoc(doc(firestore, "slots", id));
  } catch {
    // Slot may already be gone.
  }
}
