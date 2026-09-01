export function ConciergeConfirmationScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="concierge-confirmation">
      <header className="concierge-simple-header">
        <h1>Your request is in!</h1>
      </header>
      <div className="concierge-confirmation-body">
        <p>We'll be in touch if we need any additional information. Your personalized proposal will be ready within 1–3 business days, depending on the complexity of your trip.</p>
        <section>
          <h2>Want to talk it through?</h2>
          <p>If you'd like one-on-one advice in the meantime, you can book an optional consultation with Don or one of our Travel Specialists.</p>
          <a href="https://calendly.com/book-swankguide" target="_blank" rel="noopener noreferrer" className="concierge-pill">Book a Consultation</a>
          <p className="concierge-credit">Your consultation fee will be credited toward your planning fee.</p>
        </section>
        <button type="button" onClick={onHome} className="concierge-back-start">Back to start</button>
      </div>
    </div>
  );
}
