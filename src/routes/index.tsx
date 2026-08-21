import { createFileRoute } from "@tanstack/react-router";
import BookingHub from "../features/booking-hub/BookingHub";

const title = "Swank Guide Booking Hub — Concierge or Book Direct";
const description =
  "Two ways to book with Swank Guide: full-service concierge trip planning, or instantly bookable hand-vetted hotels with perks.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookingHub,
});
