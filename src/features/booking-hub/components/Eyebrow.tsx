export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.14em] ${className}`}>{children}</p>
  );
}
