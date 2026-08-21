/** Step counter + progress bar used by the Concierge intake form. */
export function FormProgress({
  step,
  total,
  pct,
}: {
  step: number;
  total: number;
  pct: number;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="mb-2 flex items-center justify-between text-[12px] uppercase tracking-[0.14em] text-ink-muted">
        <span>
          {step} of {total}
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden bg-hairline">
        <div
          className="h-full bg-ink transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
