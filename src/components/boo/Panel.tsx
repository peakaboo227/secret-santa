// Port of Pawker.Panel. Spec: design-system/components/Panel/README.md
import type { CSSProperties, ReactNode } from "react";
import { cx } from "./cx";

export interface PanelProps {
  /** room 16px radius, step 20px, door 24px with a 3px border, overlay 26px with the blurred overlay shadow. Default room. */
  size?: "room" | "step" | "door" | "overlay";
  /** Use panel-inner instead of panel. */
  inner?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const PANEL = {
  room: { r: "var(--radius-panel)", b: "var(--stroke-ui)", s: "var(--shadow-panel)" },
  step: { r: "var(--radius-step)", b: "var(--stroke-ui)", s: "var(--shadow-step)" },
  door: { r: "var(--radius-door)", b: "var(--stroke-heavy)", s: "var(--shadow-step)" },
  overlay: { r: "var(--radius-overlay)", b: "var(--stroke-heavy)", s: "var(--shadow-overlay)" },
} as const;

export function Panel({ size = "room", inner, style, className, children }: PanelProps) {
  const k = PANEL[size] ?? PANEL.room;
  return (
    <div
      className={cx("pk-panel", className)}
      style={{
        borderRadius: k.r,
        borderWidth: k.b,
        boxShadow: k.s,
        background: inner ? "var(--panel-inner)" : "var(--panel)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
