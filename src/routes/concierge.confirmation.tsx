import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../BookingHub";

export const Route = createFileRoute("/concierge/confirmation")({
  head: () => ({
    meta: [
      { title: "Your Request Is In | Swank Guide" },
      {
        name: "description",
        content: "Your Swank Guide Concierge request has been received.",
      },
    ],
  }),
  component: ConciergeConfirmationPage,
});

function ConciergeConfirmationPage() {
  return <BookingHub initialScreen="confirm" />;
}
