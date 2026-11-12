// Port of Pawker.Chip. Spec: design-system/components/Chip/README.md
import type { ReactNode } from "react";
import { cx } from "./cx";

export interface ChipProps {
  /** action = active status, highlight = passive status, neutral and leave = per-member actions. Default neutral. */
  tone?: "action" | "highlight" | "neutral" | "leave";
  /** Makes the chip a button. */
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function Chip({ tone = "neutral", onClick, children, className }: ChipProps) {
  const cls = cx("pk-chip", `pk-chip-${tone}`, onClick && "pk-chip-button", className);
  return onClick ? (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  ) : (
    <span className={cls}>{children}</span>
  );
}
