import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import BookingHub from "../features/booking-hub/BookingHub";

export const Route = createFileRoute("/book-direct")({
  head: () => ({
    meta: [
      { title: "Book Direct | Swank Guide" },
      {
        name: "description",
        content: "Search hotel availability with Swank or browse curated destination picks and affiliate booking links.",
      },
    ],
  }),
  component: BookDirectPage,
});

function BookDirectPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/book-direct" ? <BookingHub initialScreen="destination" /> : <Outlet />;
}
