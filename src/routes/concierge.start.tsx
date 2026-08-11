import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

export const Route = createFileRoute("/concierge/start")({
  head: () => ({
    meta: [
      { title: "Start Planning Your Trip | Swank Guide" },
      {
        name: "description",
        content: "Tell Swank Guide the essentials of your trip so we can prepare your personalized proposal.",
      },
    ],
  }),
  component: ConciergeStartPage,
});

function ConciergeStartPage() {
  return <BookingHub initialScreen="intake" />;
}
