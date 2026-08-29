import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking-flow";

export const metadata: Metadata = {
  title: "Book a time",
};

export default function BookPage() {
  return <BookingFlow />;
}
