// Port of Pawker.Button. Spec: design-system/components/Button/README.md
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = the one CTA per screen; utility = a room pill. Default primary. A disabled primary renders as the sand waiting pill. */
  variant?: "primary" | "utility";
  /** Utility only. share = share or join, neutral, leave = leave or remove. Default neutral. */
  tone?: "share" | "neutral" | "leave";
  /** Utility only. A 12px glyph, always before the label. */
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({ variant = "primary", tone = "neutral", icon, className, children, type = "button", ...rest }: ButtonProps) {
  const cls =
    variant === "primary"
      ? cx("pk-btn", "pk-btn-primary", className)
      : cx("pk-btn", "pk-btn-utility", `pk-tone-${tone}`, className);
  return (
    <button type={type} className={cls} {...rest}>
      {variant !== "primary" && icon ? (
        <span className="pk-btn-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
}
