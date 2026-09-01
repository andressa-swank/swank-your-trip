import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { OptionRow } from "../components/OptionRow";
import { INTAKE_ENDPOINT } from "../constants";
import {
  INTAKE_DATA_KEY,
  INTAKE_STEP_KEY,
  clearConciergeDraft,
  readSessionValue,
  scrollToRegion,
  writeSessionValue,
} from "../lib/session";
import type { IntakeData } from "../types";

const emptyIntake: IntakeData = {
  hp: "",
  fname: "",
  email: "",
  cc: "+1",
  phone: "",
  dest: "",
  when: "",
  whenNote: "",
  party: "",
  partyNote: "",
  experience: "",
  budget: "",
  stage: "",
};

const TOTAL_STEPS = 7;

export function ConciergeIntakeScreen({
  onSubmitted,
  onSwitchToBookDirect,
}: {
  onSubmitted: () => void;
  onSwitchToBookDirect: () => void;
}) {
  const [step, setStep] = useState(() => readSessionValue(INTAKE_STEP_KEY, 1));
  const [data, setData] = useState<IntakeData>(() => readSessionValue(INTAKE_DATA_KEY, emptyIntake));
  const [emailError, setEmailError] = useState(false);
  const [sending, setSending] = useState(false);
  const formTop = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    writeSessionValue(INTAKE_DATA_KEY, data);
  }, [data]);

  useEffect(() => {
    writeSessionValue(INTAKE_STEP_KEY, step);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToRegion(formTop.current);
  }, [step]);

  const patch = (p: Partial<IntakeData>) => setData((d) => ({ ...d, ...p }));

  async function submit() {
    if (sending) return;
    if (!data.email || !data.email.includes("@")) {
      setStep(1);
      setEmailError(true);
      return;
    }
    setSending(true);
    const payload = {
      source: "Booking Hub — Concierge",
      lane: "Concierge",
      hp: data.hp,
      firstName: data.fname,
      email: data.email,
      phone: data.phone ? `${data.cc} ${data.phone}`.trim() : "",
      destination: data.dest,
      travelWhen: [data.when, data.whenNote].filter(Boolean).join(" — "),
      partySize: [data.party, data.partyNote].filter(Boolean).join(" — "),
      experience: data.experience,
      budget: data.budget,
      planningStage: data.stage,
    };
    if (!INTAKE_ENDPOINT) {
      console.log("[Swank intake] would POST:", payload);
      setSending(false);
      clearConciergeDraft();
      onSubmitted();
      return;
    }
    try {
      await fetch(INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[Swank intake] submit failed:", err);
    } finally {
      setSending(false);
      clearConciergeDraft();
      onSubmitted();
    }
  }

  function handleNext() {
    if (step === 1) {
      if (!data.email || !data.email.includes("@")) {
        setEmailError(true);
        return;
      }
      setEmailError(false);
    }
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }
    void submit();
  }

  const pct = [14, 28, 42, 56, 70, 84, 98][step - 1];

  return (
    <>
      <div className="bg-background pb-8 pt-10">
        <div className="page-container text-center">
          <h1 className="display-heading text-ink" style={{ scrollMarginTop: 96 }}>
            Tell us about your trip
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[26px] text-ink">
            Our job? To make sure your trip feels exactly how you imagined — and to help you avoid
            those "it looked better online" moments.
          </p>

        </div>
      </div>

      <div className="page-container pb-12 pt-12">
        <div ref={formTop} className="mx-auto max-w-[680px]" style={{ scrollMarginTop: 96 }}>
          <div className="mb-9 h-[3px] w-full overflow-hidden bg-hairline">
            <div
              className="h-full bg-brand transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div key={step} className="animate-step">
            {step === 1 && (
              <>
                <h2 className="section-heading mb-6 text-ink">First, the basics.</h2>
                <input
                  value={data.hp}
                  onChange={(e) => patch({ hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="flex flex-col gap-5">
                  <input
                    id="fname"
                    value={data.fname}
                    onChange={(e) => patch({ fname: e.target.value })}
                    placeholder="First name or nickname"
                    aria-label="First name or nickname"
                    className="field-control"
                  />
                  <div>
                    <input
                      id="email"
                      value={data.email}
                      onChange={(e) => {
                        patch({ email: e.target.value });
                        if (emailError) setEmailError(false);
                      }}
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                      aria-invalid={emailError}
                      aria-describedby="email-error"
                      className="field-control"
                    />
                    {emailError && (
                      <p id="email-error" className="field-error">
                        We'll need a real email address to send your proposal.
                      </p>
                    )}
                  </div>
                  <input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => patch({ phone: e.target.value })}
                    type="tel"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    className="field-control"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="section-heading mb-6 text-ink">Where are you going?</h2>
                <input
                  id="dest"
                  value={data.dest}
                  onChange={(e) => patch({ dest: e.target.value })}
                  placeholder="e.g. Thailand, Paris, anywhere warm..."
                  aria-label="Destination"
                  className="field-control"
                />
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="section-heading mb-6 text-ink">When are you traveling?</h2>
                {["I have exact dates", "I'm flexible, I have a rough timeframe", "I'm very early, just exploring"].map(
                  (o) => (
                    <OptionRow key={o} label={o} selected={data.when === o} onClick={() => patch({ when: o })} />
                  ),
                )}
                <div className="mt-5">
                  <label className="field-label" htmlFor="whenNote">
                    Timing notes
                  </label>
                  <input
                    id="whenNote"
                    value={data.whenNote}
                    onChange={(e) => patch({ whenNote: e.target.value })}
                    placeholder="e.g. two weeks in October, early 2027..."
                    className="field-control"
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="section-heading mb-6 text-ink">How many people are traveling?</h2>
                {["Just me", "2 travelers", "3 or more, family or group trip"].map((o) => (
                  <OptionRow key={o} label={o} selected={data.party === o} onClick={() => patch({ party: o })} />
                ))}
                <div className="mt-5">
                  <label className="field-label" htmlFor="partyNote">
                    Group details
                  </label>
                  <input
                    id="partyNote"
                    value={data.partyNote}
                    onChange={(e) => patch({ partyNote: e.target.value })}
                    placeholder="Any details on kids' ages or group makeup?"
                    className="field-control"
                  />
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="section-heading mb-6 text-ink">
                  What kind of experience are you looking for?
                </h2>
                <textarea
                  id="experience"
                  value={data.experience}
                  onChange={(e) => patch({ experience: e.target.value })}
                  placeholder="e.g. romantic anniversary, boutique and design-forward, something off the beaten path..."
                  aria-label="Experience"
                  className="field-control"
                />
              </>
            )}

            {step === 6 && (
              <>
                <h2 className="section-heading mb-6 text-ink">Approximate nightly hotel budget?</h2>
                {["Under $200 / night", "$200 – $400 / night", "$400 – $700 / night", "$700+ / night", "Flexible, show me the best options"].map(
                  (o) => (
                    <OptionRow key={o} label={o} selected={data.budget === o} onClick={() => patch({ budget: o })} />
                  ),
                )}
              </>
            )}

            {step === 7 && (
              <>
                <h2 className="section-heading mb-6 text-ink">Where are you in the planning process?</h2>
                {[
                  "Just starting to explore ideas",
                  "I have a rough plan, need help filling it in",
                  "My flights are booked, I need hotels and logistics",
                  "I know exactly what I want, just need someone to book it",
                ].map((o) => (
                  <OptionRow key={o} label={o} selected={data.stage === o} onClick={() => patch({ stage: o })} />
                ))}
              </>
            )}
          </div>

          <div className="mt-9">
            <button
              type="button"
              disabled={sending}
              onClick={handleNext}
              className="rounded-[24px] bg-brand px-10 py-[10px] text-[14px] font-normal text-ink disabled:opacity-60"
            >
              {step === TOTAL_STEPS ? (sending ? "Sending…" : "Submit") : "Next"}
            </button>
            {step > 1 && (
              <div className="mt-4 text-left">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-[14px] text-ink underline-offset-[3px] hover:underline"
                >
                  ← Back to previous question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 border-t border-hairline bg-background py-9 text-center">
        <p className="text-[15px] leading-6 text-ink-muted">
          Prefer to book it yourself now?{" "}
          <button onClick={onSwitchToBookDirect} className="text-link font-medium">
            Switch to Book Direct
          </button>
        </p>
      </div>
    </>
  );
}
