import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: "Concierge Trip Planning | Swank Guide" },
      {
        name: "description",
        content: "Tell Swank Guide the essentials of your trip so we can prepare your personalized proposal.",
      },
    ],
  }),
  component: ConciergePage,
});

function ConciergePage() {
  return <BookingHub initialScreen="intake" />;
}
