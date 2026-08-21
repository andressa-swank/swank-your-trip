import type { Screen } from "./types";

export const INTAKE_ENDPOINT = "";

export const SCREEN_PATHS: Record<Screen, string> = {
  gate: "/",
  "quiz-1": "/find-your-path",
  "quiz-2": "/find-your-path",
  "quiz-3": "/find-your-path",
  "quiz-result": "/find-your-path/result",
  how: "/concierge/how",
  intake: "/concierge",
  confirm: "/concierge/confirmation",
  destination: "/book-direct",
  "hotel-bangkok": "/book-direct/bangkok",
};
