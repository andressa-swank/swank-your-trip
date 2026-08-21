import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../features/booking-hub/BookingHub";

export const Route = createFileRoute("/book-direct/bangkok")({
  head: () => ({
    meta: [
      { title: "Where to Stay in Bangkok | Swank Guide" },
      {
        name: "description",
        content: "Explore Swank Guide's independent hotel recommendations for Bangkok.",
      },
    ],
  }),
  component: BangkokPage,
});

function BangkokPage() {
  return <BookingHub initialScreen="hotel-bangkok" />;
}
