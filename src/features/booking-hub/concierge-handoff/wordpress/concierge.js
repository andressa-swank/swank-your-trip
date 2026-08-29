(() => {
  "use strict";

  const root = document.getElementById("swank-concierge");
  if (!root) return;

  const endpoint = root.dataset.endpoint || "";
  const bookDirectUrl = root.dataset.bookDirectUrl || "/book-direct";
  const consultationUrl = root.dataset.consultationUrl || "https://calendly.com/book-swankguide";
  const draftKey = "swank-concierge-handoff-draft";
  const stepKey = "swank-concierge-handoff-step";

  const emptyData = {
    hp: "", firstName: "", email: "", countryCode: "+1", phone: "",
    destination: "", travelWhen: "", timingNotes: "", partySize: "",
    partyNotes: "", experience: "", budget: "", planningStage: ""
  };

  let data = read(draftKey, emptyData);
  let step = Math.min(7, Math.max(1, Number(read(stepKey, 1))));
  let view = "how";
  let sending = false;
  let error = "";

  function read(key, fallback) {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_) { return fallback; }
  }

  function save() {
    sessionStorage.setItem(draftKey, JSON.stringify(data));
    sessionStorage.setItem(stepKey, JSON.stringify(step));
  }

  function clearDraft() {
    sessionStorage.removeItem(draftKey);
    sessionStorage.removeItem(stepKey);
  }

  function esc(value) {
    return String(value || "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[c]);
  }

  function field(name, label, type = "text", placeholder = "") {
    return `<label class="sg-field"><span>${label}</span><input data-field="${name}" type="${type}" value="${esc(data[name])}" placeholder="${placeholder}"></label>`;
  }

  function choices(name, items) {
    return `<div class="sg-options">${items.map(item => `
      <button type="button" class="sg-option ${data[name] === item ? "is-selected" : ""}" data-choice="${name}" data-value="${esc(item)}">
        <span>${item}</span><span aria-hidden="true">${data[name] === item ? "✓" : ""}</span>
      </button>`).join("")}</div>`;
  }

  function shell(content) {
    root.innerHTML = `<section class="sg-concierge"><div class="sg-wrap">${content}</div></section>`;
    bind();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderHow() {
    view = "how";
    shell(`
      <header class="sg-intro"><p class="sg-eyebrow">Concierge</p><h1>How Concierge Works</h1>
      <p>A guided way to book, minus the hours of research.</p>
      <button class="sg-primary" data-action="start">Plan my trip</button></header>
      <div class="sg-content">
        <p class="sg-label">The process</p>
        <ol class="sg-process">
          <li><b>01</b><span>Tell us the basics of your trip</span></li>
          <li><b>02</b><span>We go deeper, by email or on a consultation call, until it’s right</span></li>
          <li><b>03</b><span>We handle the details. You show up and enjoy.</span></li>
        </ol>
        <p class="sg-label">Why this lane</p>
        <ul class="sg-benefits">
          <li>Save hours of research, planning, and logistics</li>
          <li>VIP perks you can’t book yourself</li>
          <li>One expert, start to finish</li>
          <li>Your call on how much help you want</li>
        </ul>
        <div class="sg-levels"><article><h2>Hotel only + perks</h2><p>Free</p></article>
        <article><h2>Every detail handled</h2><p>From $30/day</p></article></div>
      </div>`);
  }

  function stepContent() {
    if (step === 1) return `<h2>First, the basics.</h2>
      <input data-field="hp" class="sg-hp" tabindex="-1" autocomplete="off">
      ${field("firstName", "First name or nickname", "text", "First name or nickname")}
      ${field("email", "Email address", "email", "Email address")}
      <div class="sg-phone"><label class="sg-field"><span>Country code</span><select data-field="countryCode">
        <option value="+1">US +1</option><option value="+44">UK +44</option>
        <option value="+61">Australia +61</option><option value="+55">Brazil +55</option>
      </select></label>${field("phone", "Phone number", "tel", "Phone number")}</div>
      ${error ? `<p class="sg-error">${error}</p>` : ""}`;
    if (step === 2) return `<h2>Where are you going?</h2>${field("destination", "Destination", "text", "e.g. Thailand, Paris, anywhere warm…")}`;
    if (step === 3) return `<h2>When are you traveling?</h2>${choices("travelWhen", ["I have exact dates", "I’m flexible, I have a rough timeframe", "I’m very early, just exploring"])}${field("timingNotes", "Timing notes", "text", "e.g. two weeks in October")}`;
    if (step === 4) return `<h2>How many people are traveling?</h2>${choices("partySize", ["Just me", "2 travelers", "3 or more, family or group trip"])}${field("partyNotes", "Group details", "text", "Kids’ ages or group makeup")}`;
    if (step === 5) return `<h2>What kind of experience are you looking for?</h2><label class="sg-field"><span>Experience</span><textarea data-field="experience" placeholder="Romantic anniversary, boutique and design-forward…">${esc(data.experience)}</textarea></label>`;
    if (step === 6) return `<h2>Approximate nightly hotel budget?</h2>${choices("budget", ["Under $200 / night", "$200 – $400 / night", "$400 – $700 / night", "$700+ / night", "Flexible, show me the best options"])}`;
    return `<h2>Where are you in the planning process?</h2>${choices("planningStage", ["Just starting to explore ideas", "I have a rough plan, need help filling it in", "My flights are booked, I need hotels and logistics", "I know exactly what I want, just need someone to book it"])}`;
  }

  function renderForm() {
    view = "form";
    shell(`
      <header class="sg-intro sg-intro-small"><p class="sg-eyebrow">Concierge</p><h1>Tell us about your trip.</h1>
      <button class="sg-text-link" data-action="how">How Concierge Works</button></header>
      <div class="sg-form">
        <div class="sg-progress"><span>Step ${step} of 7</span><span>${Math.round(step / 7 * 100)}%</span>
        <div><i style="width:${step / 7 * 100}%"></i></div></div>
        <div class="sg-step">${stepContent()}</div>
        <div class="sg-actions">
          ${step > 1 ? '<button class="sg-secondary" data-action="back">Back</button>' : '<span></span>'}
          <button class="sg-primary" data-action="${step === 7 ? "submit" : "next"}" ${sending ? "disabled" : ""}>${sending ? "Sending…" : step === 7 ? "Submit" : "Next"}</button>
        </div>
      </div>
      <div class="sg-switch">Prefer to book it yourself now? <a href="${esc(bookDirectUrl)}">Switch to Book Direct</a></div>`);
    const select = root.querySelector('[data-field="countryCode"]');
    if (select) select.value = data.countryCode;
  }

  function renderConfirmation() {
    view = "confirmation";
    shell(`
      <header class="sg-intro sg-intro-small"><h1>Your request is in!</h1></header>
      <div class="sg-content sg-confirm">
        <p>We’ll be in touch if we need any additional information. Your personalized proposal will be ready within 1–3 business days, depending on the complexity of your trip.</p>
        <article><h2>Want to talk it through?</h2>
        <p>You can book an optional consultation with Don or one of our Travel Specialists.</p>
        <a class="sg-primary" href="${esc(consultationUrl)}" target="_blank" rel="noopener">Book a Consultation</a>
        <small>Your consultation fee will be credited toward your planning fee.</small></article>
        <button class="sg-text-link" data-action="home">Back to start</button>
      </div>`);
  }

  async function submit() {
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      step = 1; error = "Please enter a valid email address."; save(); renderForm(); return;
    }
    if (data.hp) return;
    const payload = {
      source: "Swank Website — Concierge", lane: "Concierge",
      firstName: data.firstName, email: data.email,
      phone: data.phone ? `${data.countryCode} ${data.phone}`.trim() : "",
      destination: data.destination,
      travelWhen: [data.travelWhen, data.timingNotes].filter(Boolean).join(" — "),
      partySize: [data.partySize, data.partyNotes].filter(Boolean).join(" — "),
      experience: data.experience, budget: data.budget, planningStage: data.planningStage
    };
    sending = true; renderForm();
    try {
      if (!endpoint) throw new Error("Concierge API endpoint is not configured.");
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`Submission failed (${response.status}).`);
      clearDraft(); renderConfirmation();
    } catch (err) {
      console.error(err); error = "We couldn’t send your request. Please try again or contact book@swankguide.com.";
      sending = false; renderForm();
    }
  }

  function bind() {
    root.querySelectorAll("[data-field]").forEach(el => {
      el.addEventListener("input", event => { data[event.target.dataset.field] = event.target.value; error = ""; save(); });
    });
    root.querySelectorAll("[data-choice]").forEach(el => {
      el.addEventListener("click", () => { data[el.dataset.choice] = el.dataset.value; save(); renderForm(); });
    });
    root.querySelectorAll("[data-action]").forEach(el => el.addEventListener("click", () => {
      const action = el.dataset.action;
      if (action === "start") { step = 1; renderForm(); }
      if (action === "how") renderHow();
      if (action === "back") { step--; save(); renderForm(); }
      if (action === "next") { step++; save(); renderForm(); }
      if (action === "submit") submit();
      if (action === "home") renderHow();
    }));
  }

  renderHow();
})();
