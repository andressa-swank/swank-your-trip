export type Screen =
  | "gate"
  | "quiz-1"
  | "quiz-2"
  | "quiz-3"
  | "quiz-result"
  | "how"
  | "intake"
  | "confirm"
  | "destination"
  | "hotel-bangkok";

type Hotel = {
  id: string;
  name: string;
  tier: "Best Value" | "Mid-Range" | "Splurge";
  badge: "stayed" | "trusted";
  photoTag: string;
  photoBg: string;
  desc: string;
};

export type IntakeData = {
  hp: string;
  fname: string;
  email: string;
  cc: string;
  phone: string;
  dest: string;
  when: string;
  whenNote: string;
  party: string;
  partyNote: string;
  experience: string;
  budget: string;
  stage: string;
};
