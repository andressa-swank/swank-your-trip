import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: "Concierge Trip Planning | Swank Guide" },
      {
        name: "description",
        content: "See how Swank Guide Concierge helps plan, advise, book, and manage the details of your trip.",
      },
    ],
  }),
  component: ConciergePage,
});

function ConciergePage() {
  return <BookingHub initialScreen="how" />;
}
