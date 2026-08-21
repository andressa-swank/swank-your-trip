import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Btn } from "../components/Button";
import { FormProgress } from "../components/FormProgress";
import { OptionRow } from "../components/OptionRow";
import { PageIntro } from "../components/PageIntro";
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

  const pct = [14, 28, 42, 56, 70, 84, 98][step - 1];

  return (
    <>
      <PageIntro eyebrow="Concierge" title="Tell us about your trip.">
        {step === 1 && (
          <Link
            to="/concierge/how"
            className="concierge-how-access"
            aria-label="Learn how Concierge works"
          >
            How Concierge Works
          </Link>
        )}
      </PageIntro>
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div ref={formTop} className="mx-auto max-w-[680px]" style={{ scrollMarginTop: 96 }}>
          <FormProgress step={step} total={7} pct={pct} />

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
                  <div>
                    <label className="field-label" htmlFor="fname">
                      First name or nickname
                    </label>
                    <input
                      id="fname"
                      value={data.fname}
                      onChange={(e) => patch({ fname: e.target.value })}
                      placeholder="First name or nickname"
                      className="field-control"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      value={data.email}
                      onChange={(e) => {
                        patch({ email: e.target.value });
                        if (emailError) setEmailError(false);
                      }}
                      type="email"
                      placeholder="Email address"
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
                  <div>
                    <label className="field-label" htmlFor="phone">
                      Phone number
                    </label>
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                      <select
                        value={data.cc}
                        onChange={(e) => patch({ cc: e.target.value })}
                        aria-label="Country code"
                        className="field-control w-auto"
                      >
                        <option value="+1">US +1</option>
                        <option value="+44">UK +44</option>
                        <option value="+61">Australia +61</option>
                        <option value="+55">Brazil +55</option>
                      </select>
                      <input
                        id="phone"
                        value={data.phone}
                        onChange={(e) => patch({ phone: e.target.value })}
                        type="tel"
                        placeholder="Phone number"
                        className="field-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(2)}>
                    Next
                  </Btn>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="section-heading mb-6 text-ink">Where are you going?</h2>
                <label className="field-label" htmlFor="dest">
                  Destination
                </label>
                <input
                  id="dest"
                  value={data.dest}
                  onChange={(e) => patch({ dest: e.target.value })}
                  placeholder="e.g. Thailand, Paris, anywhere warm..."
                  className="field-control"
                />
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(3)}>
                    Next
                  </Btn>
                </div>
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
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(4)}>
                    Next
                  </Btn>
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
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(5)}>
                    Next
                  </Btn>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="section-heading mb-6 text-ink">
                  What kind of experience are you looking for?
                </h2>
                <label className="field-label" htmlFor="experience">
                  Experience
                </label>
                <textarea
                  id="experience"
                  value={data.experience}
                  onChange={(e) => patch({ experience: e.target.value })}
                  placeholder="e.g. romantic anniversary, boutique and design-forward, something off the beaten path..."
                  className="field-control"
                />
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(6)}>
                    Next
                  </Btn>
                </div>
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
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(7)}>
                    Next
                  </Btn>
                </div>
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
                <div className="mt-10">
                  <Btn full variant="accent" disabled={sending} onClick={submit}>
                    {sending ? "Sending…" : "Submit"}
                  </Btn>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 border-t border-hairline bg-background py-4 text-center">
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
