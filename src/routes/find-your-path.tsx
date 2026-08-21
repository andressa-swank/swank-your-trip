import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../features/booking-hub/BookingHub";

export const Route = createFileRoute("/find-your-path")({
  head: () => ({
    meta: [
      { title: "Find Your Booking Path | Swank Guide" },
      {
        name: "description",
        content: "Answer three quick questions to find the right way to plan and book your trip with Swank Guide.",
      },
    ],
  }),
  component: FindYourPathPage,
});

function FindYourPathPage() {
  return <BookingHub initialScreen="quiz-1" />;
}
