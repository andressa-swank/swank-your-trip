import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import BookingHub from "../BookingHub";
import "../concierge-flow.css";

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

  return (
    <div className="concierge-flow-shell">
      <BookingHub initialScreen="intake" />
      <Link to="/concierge/how" className="concierge-how-access">
        How Concierge Works
      </Link>
    </div>
  );
}
