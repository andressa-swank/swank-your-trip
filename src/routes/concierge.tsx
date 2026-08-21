import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import BookingHub from "../BookingHub";
import "../concierge-flow.css";

const CONCIERGE_STEP_KEY = "swank-concierge-step";

function resetConciergeStep() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(CONCIERGE_STEP_KEY);
}

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
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/concierge") {
    return <Outlet />;
  }

  resetConciergeStep();

  return <BookingHub initialScreen="intake" />;
}
