import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

const CONCIERGE_STEP_KEY = "swank-concierge-step";

function resetConciergeStep() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(CONCIERGE_STEP_KEY);
}

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
  resetConciergeStep();
  return <BookingHub initialScreen="intake" />;
}
