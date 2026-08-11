import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

export const Route = createFileRoute("/find-your-path/result")({
  head: () => ({
    meta: [
      { title: "Your Recommended Booking Path | Swank Guide" },
      {
        name: "description",
        content: "See which Swank Guide booking path is the best fit for your trip.",
      },
    ],
  }),
  component: FindYourPathResultPage,
});

function FindYourPathResultPage() {
  return <BookingHub initialScreen="quiz-result" />;
}
