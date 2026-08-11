import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

export const Route = createFileRoute("/book-direct")({
  head: () => ({
    meta: [
      { title: "Book Direct | Swank Guide" },
      {
        name: "description",
        content: "Browse Swank Guide destinations and handpicked hotels, then choose the booking option that works for you.",
      },
    ],
  }),
  component: BookDirectPage,
});

function BookDirectPage() {
  return <BookingHub initialScreen="destination" />;
}
