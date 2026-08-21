export function Btn({
  variant = "primary",
  full,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "secondary";
  full?: boolean;
}) {
  const variants: Record<string, string> = {
    primary: "button-primary",
    accent: "button-accent",
    secondary: "button-secondary",
  };
  return (
    <button
      {...props}
      className={`btn-base ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
