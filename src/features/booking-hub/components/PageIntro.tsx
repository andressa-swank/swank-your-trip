import { Eyebrow } from "./Eyebrow";

/** Compact white internal page introduction used by every non-landing screen. */
export function PageIntro({
  eyebrow,
  title,
  sub,
  onBack,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-hairline bg-background pb-8 pt-10 md:pb-12 md:pt-16">
      <div className="page-container">
        {eyebrow &&
          (onBack ? (
            <button onClick={onBack} className="mb-3 flex min-h-11 items-center text-ink-muted transition-opacity duration-[180ms] hover:opacity-70">
              <Eyebrow>{eyebrow}</Eyebrow>
            </button>
          ) : (
            <Eyebrow className="mb-3 text-ink-muted">{eyebrow}</Eyebrow>
          ))}
        <h1 className="display-heading text-ink" style={{ scrollMarginTop: 96 }}>
          {title}
        </h1>
        {sub && <p className="mt-5 max-w-[680px] body-copy text-ink-muted">{sub}</p>}
        {children}
      </div>
    </div>
  );
}
