// Port of Pawker.VoteCard. Spec: design-system/components/VoteCard/README.md
import { cx } from "./cx";
import { Paw } from "./Paw";

export interface VoteCardProps {
  /** false = this seat has not laid a card yet (greyed paw). Default true. */
  voted?: boolean;
  /** Same as voted={false}. */
  empty?: boolean;
  /** Face up: shows card instead of the paw back. */
  revealed?: boolean;
  /** The LOCAL player's own card: action paw, 3px ring, +2px. Viewer-relative, never a role. */
  mine?: boolean;
  size?: "sm" | "md";
  /** The value shown on reveal. */
  card?: string;
  bg?: string;
  border?: string;
  ink?: string;
}

const CARD = { sm: { w: 42, h: 58, num: 21, paw: 22 }, md: { w: 46, h: 64, num: 24, paw: 24 } };

export function VoteCard({ voted, empty, revealed, mine = false, size = "md", card, bg, border, ink }: VoteCardProps) {
  const s = CARD[size] ?? CARD.md;
  const hasCard = voted !== false && !empty;
  if (!hasCard) {
    return (
      <div className="pk-card pk-card-empty" style={{ width: s.w, height: s.h }} aria-label="no card yet">
        <Paw size={s.paw} fill="var(--card-empty-paw)" />
      </div>
    );
  }
  const w = mine ? s.w + 2 : s.w;
  const h = mine ? s.h + 2 : s.h;
  return (
    <div
      className={cx("pk-card", mine && "pk-card-mine")}
      style={{
        width: w,
        height: h,
        background: bg || "var(--panel)",
        borderColor: border || (mine ? "var(--action)" : "var(--border)"),
      }}
      aria-label={revealed ? `card ${card}` : "face-down card"}
    >
      {revealed ? (
        <span className="pk-card-num" style={{ fontSize: s.num, color: ink || "var(--ink)" }}>
          {card == null ? "5" : card}
        </span>
      ) : (
        <Paw size={s.paw} fill={mine ? "var(--action)" : "var(--card-paw)"} />
      )}
    </div>
  );
}
