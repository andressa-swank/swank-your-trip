import { useEffect, useRef, useState } from "react";
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
  hp: "", fname: "", email: "", cc: "+1", phone: "", dest: "", when: "",
  whenNote: "", party: "", partyNote: "", experience: "", budget: "", stage: "",
};

function ChoiceList({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="concierge-options">
      {items.map((item) => (
        <button
          type="button"
          key={item}
          className={`concierge-option ${value === item ? "is-selected" : ""}`}
          onClick={() => onChange(item)}
        >
          <span className="concierge-option-dot" aria-hidden="true" />
          {item}
        </button>
      ))}
    </div>
  );
}

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

  useEffect(() => writeSessionValue(INTAKE_DATA_KEY, data), [data]);
  useEffect(() => {
    writeSessionValue(INTAKE_STEP_KEY, step);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToRegion(formTop.current);
  }, [step]);

  const patch = (next: Partial<IntakeData>) => setData((current) => ({ ...current, ...next }));

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
    } catch (error) {
      console.error("[Swank intake] submit failed:", error);
    } finally {
      setSending(false);
      clearConciergeDraft();
      onSubmitted();
    }
  }

  const next = () => {
    if (step === 1 && (!data.email || !data.email.includes("@"))) {
      setEmailError(true);
      return;
    }
    if (step < 7) setStep((current) => current + 1);
    else void submit();
  };

  return (
    <div className="concierge-intake">
      <header className="concierge-intake-head">
        <h1>Tell us about your trip</h1>
        <p>Our job? To make sure your trip feels exactly how you imagined — and to help you avoid those “it looked better online” moments.</p>
        <p>
          Share a few details below, and we'll get right back to you. See{" "}
          <button type="button" className="concierge-intake-how" onClick={() => { window.location.href = "/concierge/how"; }}>
            How Concierge Works
          </button>{" "}
          if you're wondering what happens next.
        </p>
      </header>

      <div ref={formTop} className="concierge-intake-body" style={{ scrollMarginTop: 96 }}>
        <div className="concierge-progress" aria-label={`Step ${step} of 7`}>
          <span style={{ width: `${[14, 28, 42, 56, 70, 84, 98][step - 1]}%` }} />
        </div>

        <input
          value={data.hp}
          onChange={(event) => patch({ hp: event.target.value })}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div key={step} className="concierge-step">
          {step === 1 && (
            <>
              <h2>First, the basics.</h2>
              <div className="concierge-fields">
                <input className="concierge-control" value={data.fname} onChange={(event) => patch({ fname: event.target.value })} placeholder="First name or nickname" />
                <div>
                  <input
                    className="concierge-control"
                    value={data.email}
                    onChange={(event) => { patch({ email: event.target.value }); setEmailError(false); }}
                    type="email"
                    placeholder="Email address"
                    aria-invalid={emailError}
                  />
                  {emailError && <p className="concierge-error">We'll need a real email address to send your proposal.</p>}
                </div>
                <input className="concierge-control" value={data.phone} onChange={(event) => patch({ phone: event.target.value })} type="tel" placeholder="Phone number" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Where are you going?</h2>
              <input className="concierge-control" value={data.dest} onChange={(event) => patch({ dest: event.target.value })} placeholder="e.g. Thailand, Paris, anywhere warm..." />
            </>
          )}

          {step === 3 && (
            <>
              <h2>When are you traveling?</h2>
              <ChoiceList
                items={["I have exact dates", "I'm flexible, I have a rough timeframe", "I'm very early, just exploring"]}
                value={data.when}
                onChange={(when) => patch({ when })}
              />
              <div className="concierge-note-field">
                <label htmlFor="when-note">Timing notes</label>
                <input id="when-note" className="concierge-control" value={data.whenNote} onChange={(event) => patch({ whenNote: event.target.value })} placeholder="e.g. two weeks in October, early 2027..." />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2>How many people are traveling?</h2>
              <ChoiceList items={["Just me", "2 travelers", "3 or more, family or group trip"]} value={data.party} onChange={(party) => patch({ party })} />
              <div className="concierge-note-field">
                <label htmlFor="party-note">Group details</label>
                <input id="party-note" className="concierge-control" value={data.partyNote} onChange={(event) => patch({ partyNote: event.target.value })} placeholder="Any details on kids' ages or group makeup?" />
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2>What kind of experience are you looking for?</h2>
              <textarea className="concierge-control concierge-textarea" value={data.experience} onChange={(event) => patch({ experience: event.target.value })} placeholder="e.g. romantic anniversary, boutique and design-forward, something off the beaten path..." />
            </>
          )}

          {step === 6 && (
            <>
              <h2>Approximate nightly hotel budget?</h2>
              <ChoiceList items={["Under $200 / night", "$200 – $400 / night", "$400 – $700 / night", "$700+ / night", "Flexible, show me the best options"]} value={data.budget} onChange={(budget) => patch({ budget })} />
            </>
          )}

          {step === 7 && (
            <>
              <h2>Where are you in the planning process?</h2>
              <ChoiceList
                items={[
                  "Just starting to explore ideas",
                  "I have a rough plan, need help filling it in",
                  "My flights are booked, I need hotels and logistics",
                  "I know exactly what I want, just need someone to book it",
                ]}
                value={data.stage}
                onChange={(stage) => patch({ stage })}
              />
            </>
          )}
        </div>

        <div className="concierge-form-actions">
          <button type="button" className="concierge-pill" disabled={sending} onClick={next}>
            {sending ? "Sending…" : step === 7 ? "Submit" : "Next"}
          </button>
          {step > 1 && <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))}>← Back to previous question</button>}
        </div>
      </div>

      <div className="concierge-switch">
        <p>Prefer to book it yourself now? <button type="button" onClick={onSwitchToBookDirect}>Switch to Book Direct</button></p>
      </div>
    </div>
  );
}
