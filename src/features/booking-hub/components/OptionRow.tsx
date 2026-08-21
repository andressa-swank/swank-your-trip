export function OptionRow({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`mb-3 flex min-h-14 w-full items-center gap-3 rounded-[8px] border px-4 py-3 text-left text-[16px] leading-6 transition-all duration-[180ms] ${
        selected
          ? "border-ink bg-soft font-medium text-ink"
          : "border-line bg-background text-ink-muted hover:border-ink"
      }`}
    >
      <span
        className={`h-3 w-3 shrink-0 rounded-full border ${selected ? "border-ink bg-ink" : "border-line bg-background"}`}
      />
      {label}
    </button>
  );
}
