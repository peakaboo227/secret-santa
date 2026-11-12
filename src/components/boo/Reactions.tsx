"use client";
// Port of Pawker.Reactions. Spec: design-system/components/Reactions/README.md
import { cx } from "./cx";

export type ReactionKind = "heart" | "snack" | "scratch" | "poke";

export interface ReactionsProps {
  /** Adds the poke bell. Only for someone there is something to poke about. */
  canPoke?: boolean;
  onReact?: (kind: ReactionKind) => void;
  className?: string;
}

type G = [x: number, y: number, w: number, h: number, token: string];
const GLYPHS: Record<ReactionKind, G[]> = {
  heart: [[1,1,2,1,"react-heart"],[5,1,2,1,"react-heart"],[0,2,8,2,"react-heart"],[1,4,6,1,"react-heart"],[2,5,4,1,"react-heart"],[3,6,2,1,"react-heart"]],
  snack: [[0,2,2,4,"react-snack-dark"],[6,2,2,4,"react-snack-dark"],[2,3,4,2,"react-snack"]],
  scratch: [[1,2,1,2,"react-scratch"],[3,1,2,2,"react-scratch"],[6,2,1,2,"react-scratch"],[2,4,4,3,"react-scratch"]],
  poke: [[3,0,2,1,"react-bell-dark"],[2,1,4,1,"react-bell"],[1,2,6,3,"react-bell"],[0,5,8,1,"react-bell-dark"],[3,6,2,1,"react-bell-dark"]],
};
const RING: Record<ReactionKind, string> = {
  heart: "react-heart-ring",
  snack: "react-snack-ring",
  scratch: "react-scratch-ring",
  poke: "react-bell",
};

function ReactionButton({ kind, onReact }: { kind: ReactionKind; onReact?: (k: ReactionKind) => void }) {
  return (
    <button
      type="button"
      className={`pk-react pk-react-${kind}`}
      style={{ borderColor: `var(--${RING[kind]})` }}
      aria-label={kind}
      onClick={() => onReact?.(kind)}
    >
      <svg viewBox="0 0 8 8" width={15} height={15} shapeRendering="crispEdges" aria-hidden="true">
        {GLYPHS[kind].map(([x, y, w, h, token], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} style={{ fill: `var(--${token})` }} />
        ))}
      </svg>
    </button>
  );
}

export function Reactions({ canPoke, onReact, className }: ReactionsProps) {
  return (
    <div className={cx("pk-reactions", className)}>
      <ReactionButton kind="heart" onReact={onReact} />
      <ReactionButton kind="snack" onReact={onReact} />
      <ReactionButton kind="scratch" onReact={onReact} />
      {canPoke ? <ReactionButton kind="poke" onReact={onReact} /> : null}
    </div>
  );
}
