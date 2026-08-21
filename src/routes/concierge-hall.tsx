import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

export const Route = createFileRoute("/concierge-hall")({
  head: () => ({
    meta: [
      { title: "Concierge Hall | Swank Guide" },
      {
        name: "description",
        content: "See how Swank Guide Concierge helps plan, advise, book, and manage the details of your trip.",
      },
    ],
  }),
  component: ConciergeHallPage,
});

function ConciergeHallPage() {
  return <BookingHub initialScreen="how" />;
}
