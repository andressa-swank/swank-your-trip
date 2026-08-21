import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SCREEN_PATHS } from "./constants";
import { QUIZ_RESULT_KEY, readSessionValue, writeSessionValue } from "./lib/session";
import { BangkokHotelsScreen } from "./screens/BangkokHotelsScreen";
import { ConciergeConfirmationScreen } from "./screens/ConciergeConfirmationScreen";
import { ConciergeHowScreen } from "./screens/ConciergeHowScreen";
import { ConciergeIntakeScreen } from "./screens/ConciergeIntakeScreen";
import { DestinationScreen } from "./screens/DestinationScreen";
import { FindYourPathResultScreen } from "./screens/FindYourPathResultScreen";
import { FindYourPathScreen } from "./screens/FindYourPathScreen";
import { LandingScreen } from "./screens/LandingScreen";
import type { Screen } from "./types";

/**
 * Swank Guide — Booking Hub (V2: Editorial & Immersive)
 * Shell that maps the active screen to its component and keeps the URL in sync.
 */
export default function BookingHub({ initialScreen = "gate" }: { initialScreen?: Screen }) {
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [quizAnswers, setQuizAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});
  const [quizResult, setQuizResult] = useState<{ path: "book-now" | "concierge" } | null>(() =>
    readSessionValue(QUIZ_RESULT_KEY, null),
  );

  const navigate = useNavigate();

  useEffect(() => {
    setScreen(initialScreen);
  }, [initialScreen]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [screen]);

  useEffect(() => {
    if (initialScreen === "quiz-result" && !quizResult) {
      setScreen("quiz-1");
      void navigate({ to: SCREEN_PATHS["quiz-1"] });
    }
  }, [initialScreen, navigate, quizResult]);

  function goToScreen(nextScreen: Screen) {
    setScreen(nextScreen);
    void navigate({ to: SCREEN_PATHS[nextScreen] });
  }

  function handleQuizAnswer(step: 1 | 2 | 3, value: string) {
    const next = { ...quizAnswers, [`q${step}`]: value };
    setQuizAnswers(next);
    if (step < 3) {
      goToScreen(`quiz-${step + 1}` as Screen);
      return;
    }
    const score =
      (next.q1 === "recommendations" ? 2 : 0) +
      (next.q2 === "time" ? 1 : 0) +
      (next.q3 === "quality" ? 3 : 0);
    const result = { path: score <= 2 ? "book-now" : "concierge" } as const;
    setQuizResult(result);
    writeSessionValue(QUIZ_RESULT_KEY, result);
    setQuizAnswers({});
    goToScreen("quiz-result");
  }

  const showFloatingCta = !["gate", "intake", "destination", "hotel-bangkok"].includes(screen);

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink antialiased">
      <Header onNav={goToScreen} />

      <main className="flex-1">
        {screen === "gate" && <LandingScreen onNav={goToScreen} />}
        {(screen === "quiz-1" || screen === "quiz-2" || screen === "quiz-3") && (
          <FindYourPathScreen step={Number(screen.split("-")[1]) as 1 | 2 | 3} onAnswer={handleQuizAnswer} />
        )}
        {screen === "quiz-result" && quizResult && (
          <FindYourPathResultScreen
            result={quizResult}
            onContinue={() => {
              window.sessionStorage.removeItem(QUIZ_RESULT_KEY);
              goToScreen(quizResult.path === "book-now" ? "destination" : "intake");
            }}
          />
        )}
        {screen === "how" && <ConciergeHowScreen onNav={goToScreen} />}
        {screen === "intake" && (
          <ConciergeIntakeScreen onSubmitted={() => goToScreen("confirm")} onSwitchToBookDirect={() => goToScreen("destination")} />
        )}
        {screen === "confirm" && <ConciergeConfirmationScreen onHome={() => goToScreen("gate")} />}
        {screen === "destination" && (
          <DestinationScreen onGoHotel={() => goToScreen("hotel-bangkok")} onSwitchConcierge={() => goToScreen("how")} />
        )}
        {screen === "hotel-bangkok" && (
          <BangkokHotelsScreen
            onChangeDestination={() => goToScreen("destination")}
            onSwitchConcierge={() => goToScreen("how")}
          />
        )}
      </main>

      <Footer onNav={goToScreen} />

      {showFloatingCta && (
        <button
          onClick={() => goToScreen("gate")}
          className="btn-base button-accent fixed bottom-6 right-6 z-40 shadow-[var(--shadow-subtle)]"
        >
          Plan Trip
        </button>
      )}
    </div>
  );
}
