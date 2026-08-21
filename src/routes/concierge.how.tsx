import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../features/booking-hub/BookingHub";

export const Route = createFileRoute("/concierge/how")({
  head: () => ({
    meta: [
      { title: "How Concierge Works | Swank Guide" },
      {
        name: "description",
        content: "See how Swank Guide Concierge helps plan, advise, book, and manage the details of your trip.",
      },
    ],
  }),
  component: ConciergeHowPage,
});

function ConciergeHowPage() {
  return <BookingHub initialScreen="how" />;
}
