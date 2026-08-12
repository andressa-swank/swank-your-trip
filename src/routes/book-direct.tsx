import { createFileRoute } from "@tanstack/react-router";
import BookDirectHybrid from "../components/BookDirectHybrid";

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
  return <BookDirectHybrid />;
}
