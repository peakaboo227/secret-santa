// Port of Pawker.Pet from design-system/components/bundle.js. Spec: design-system/components/Pet/README.md
import type { CSSProperties } from "react";
import { cx } from "./cx";

export const PET_SLUGS = [
  "kitten-ginger", "kitten-slate", "kitten-tuxedo", "kitten-calico",
  "dog-shiba", "dog-husky", "dog-basenji", "dog-pharaoh",
  "rabbit-caramel", "rabbit-grey", "rabbit-cinnamon", "rabbit-white",
  "guineapig-ginger", "guineapig-tan", "guineapig-tri", "guineapig-agouti",
  "ferret-white", "ferret-champagne", "ferret-silver", "ferret-chocolate",
] as const;

/** One of the 20 approved coats. An unknown slug renders kitten-ginger and warns. */
export type PetSlug = (typeof PET_SLUGS)[number];
export type PetState = "idle" | "sniff" | "doze" | "zoomies" | "still";

export interface PetProps {
  slug: PetSlug;
  /** idle bobs, sniff tilts, doze barely breathes, zoomies spins, still is frozen. Default idle. */
  state?: PetState;
  /** Rendered px, square. Default 62. Seated 80-88, watchers 64. */
  size?: number;
  /** Seconds of animation delay, to stagger a crowd. */
  delay?: number;
  /** Accessible name. Default "member". Never the species. */
  label?: string;
  className?: string;
}

type Part = "dark" | "accent" | "base" | "patch" | "eye" | "shine" | "nose" | "light" | "nose2";
type R = [x: number, y: number, w: number, h: number, part: Part];

const SHAPES: Record<string, R[]> = {
  kitten: [
    [3,2,3,3,"dark"],[10,2,3,3,"dark"],[4,3,1,2,"accent"],[11,3,1,2,"accent"],
    [3,4,10,8,"base"],[3,4,4,3,"patch"],[6,4,1,2,"dark"],[9,4,1,2,"dark"],
    [5,7,2,2,"eye"],[9,7,2,2,"eye"],[5,7,1,1,"shine"],[9,7,1,1,"shine"],
    [7,9,2,1,"nose"],[4,9,1,1,"accent"],[11,9,1,1,"accent"],
    [5,12,6,4,"base"],[8,12,3,4,"patch"],[5,15,2,1,"light"],[9,15,2,1,"light"],
  ],
  // dogs are per-breed: all four are prick-eared, so ear height and face markings tell them apart.
  "dog-shiba": [
    [2,1,3,3,"dark"],[11,1,3,3,"dark"],[3,2,1,2,"accent"],[12,2,1,2,"accent"],
    [3,3,10,8,"base"],
    [5,5,2,1,"light"],[9,5,2,1,"light"],
    [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
    [4,8,8,3,"light"],[7,8,2,2,"eye"],
    [5,11,6,5,"base"],[6,12,4,4,"light"],
    [5,15,1,1,"light"],[10,15,1,1,"light"],
  ],
  "dog-husky": [
    [2,1,3,3,"dark"],[11,1,3,3,"dark"],[3,2,1,2,"accent"],[12,2,1,2,"accent"],
    [3,3,10,8,"dark"],[7,3,2,4,"light"],
    [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
    [4,8,8,3,"light"],[7,8,2,2,"nose2"],
    [5,11,6,5,"base"],[6,12,4,4,"light"],
    [5,15,1,1,"light"],[10,15,1,1,"light"],
  ],
  "dog-basenji": [
    [2,0,3,4,"dark"],[11,0,3,4,"dark"],[3,1,1,2,"accent"],[12,1,1,2,"accent"],
    [3,3,10,8,"base"],[7,3,2,3,"light"],
    [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
    [4,8,8,3,"light"],[7,8,2,2,"eye"],
    [5,11,6,5,"base"],[6,12,4,4,"light"],
    [5,15,1,1,"light"],[10,15,1,1,"light"],
  ],
  "dog-pharaoh": [
    [1,0,4,5,"base"],[11,0,4,5,"base"],[2,1,2,3,"accent"],[12,1,2,3,"accent"],
    [3,4,10,7,"base"],[7,4,2,3,"light"],
    [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
    [6,8,4,3,"light"],[7,8,2,2,"nose2"],
    [5,11,6,5,"base"],[6,12,4,4,"light"],
    [5,15,1,1,"light"],[10,15,1,1,"light"],
  ],
  rabbit: [
    [4,0,2,6,"base"],[10,0,2,6,"base"],[4,1,1,4,"accent"],[11,1,1,4,"accent"],
    [3,5,10,7,"base"],
    [5,8,2,2,"eye"],[9,8,2,2,"eye"],[5,8,1,1,"shine"],[9,8,1,1,"shine"],
    [7,10,2,1,"nose"],[4,10,1,1,"accent"],[11,10,1,1,"accent"],
    [4,12,8,4,"base"],[5,15,2,1,"light"],[9,15,2,1,"light"],
  ],
  guineapig: [
    [6,3,4,1,"dark"],[2,4,12,10,"base"],[8,4,6,10,"light"],
    [3,5,2,2,"dark"],[11,5,2,2,"dark"],
    [5,8,2,2,"eye"],[10,8,2,2,"eye"],[5,8,1,1,"shine"],[10,8,1,1,"shine"],
    [7,11,2,1,"nose"],[4,14,2,1,"light"],[10,14,2,1,"dark"],
  ],
  // front-facing like the rest of the cast: big head, body beneath.
  ferret: [
    [3,2,3,2,"dark"],[10,2,3,2,"dark"],[4,2,1,1,"accent"],[11,2,1,1,"accent"],
    [3,3,10,8,"light"],[4,3,8,2,"dark"],
    [4,6,3,2,"dark"],[9,6,3,2,"dark"],
    [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
    [7,9,2,1,"nose"],
    [13,8,2,4,"dark"],[12,11,3,2,"dark"],
    [4,11,8,5,"base"],[6,11,4,3,"light"],
    [4,15,2,1,"dark"],[10,15,2,1,"dark"],
  ],
};

type Coat = { base: string; dark: string; light: string } & Partial<Record<Part, string>>;

// Pet coats are art, not chrome: fixed colours that do not change with the theme (Pet README).
const COATS: Record<PetSlug, Coat> = {
  "kitten-ginger":    { base: "#DE9040", dark: "#C87E30", light: "#EBD9B8" },
  "kitten-slate":     { base: "#9AA5B2", dark: "#79848F", light: "#DDE2E8" },
  "kitten-tuxedo":    { base: "#3E3A36", dark: "#26241F", light: "#F0E6D2", eye: "#F0E6D2", shine: "#151310" },
  "kitten-calico":    { base: "#F4EBDA", dark: "#4A423A", light: "#FBF6EC", patch: "#D98A3C" },
  "dog-shiba":        { base: "#D98A3C", dark: "#A85F22", light: "#F7EFDF" },
  "dog-husky":        { base: "#5A626E", dark: "#3C424C", light: "#F4F2EC", eye: "#3F7BAE", nose2: "#23262B" },
  "dog-basenji":      { base: "#B4642A", dark: "#8A4A1C", light: "#F7EFDF" },
  "dog-pharaoh":      { base: "#C9843F", dark: "#A8672C", light: "#F7EFDF", nose2: "#8A5330" },
  "rabbit-caramel":   { base: "#C99055", dark: "#A3702F", light: "#EBD9B8" },
  "rabbit-grey":      { base: "#96908A", dark: "#6E6862", light: "#DDD8D2" },
  "rabbit-cinnamon":  { base: "#B5723F", dark: "#8A5324", light: "#EBD9B8" },
  "rabbit-white":     { base: "#F5EFE3", dark: "#E4DACA", light: "#FDFAF3", eye: "#A8524C", nose: "#EFAFAF", accent: "#F3CFCA" },
  "guineapig-ginger": { base: "#B87A34", dark: "#5E3A1C", light: "#EBD9B8" },
  "guineapig-tan":    { base: "#D9A15F", dark: "#8E5A24", light: "#F0E6D2" },
  "guineapig-tri":    { base: "#8C8478", dark: "#5E5850", light: "#C9C2B4" },
  "guineapig-agouti": { base: "#8A6E42", dark: "#5A4529", light: "#D8C4A0" },
  "ferret-white":     { base: "#F0E9DA", dark: "#DCD2BF", light: "#FCF8EE", eye: "#A8524C", nose: "#EFAFAF", accent: "#F3CFCA" },
  "ferret-champagne": { base: "#A57E4E", dark: "#8A755E", light: "#D8C4A0" },
  "ferret-silver":    { base: "#9A968E", dark: "#7A756E", light: "#DDD8D0" },
  "ferret-chocolate": { base: "#7A5638", dark: "#5E4430", light: "#C9B091" },
};

const STATE_ANIM: Record<PetState, string> = {
  idle: "pk-bob 3.4s ease-in-out infinite",
  sniff: "pk-sniff 2.9s ease-in-out infinite",
  doze: "pk-doze 4.6s ease-in-out infinite",
  zoomies: "pk-zoom 0.9s ease-in-out infinite",
  still: "none",
};

export function isPetSlug(value: unknown): value is PetSlug {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(COATS, value);
}

const cache = new Map<PetSlug, { x: number; y: number; w: number; h: number; f: string }[]>();
function rectsFor(slug: PetSlug) {
  const hit = cache.get(slug);
  if (hit) return hit;
  const src = COATS[slug];
  const coat: Record<Part, string> = {
    accent: "#F3AFC1", eye: "#2B2118", nose: "#EE8FA6", shine: "#FFFFFF", patch: src.base, nose2: "#2B2118",
    ...src,
  } as Record<Part, string>;
  const shape = SHAPES[slug] ?? SHAPES[slug.split("-")[0]] ?? SHAPES.kitten;
  const rects = shape.map(([x, y, w, h, part]) => ({ x, y, w, h, f: coat[part] }));
  cache.set(slug, rects);
  return rects;
}

export function Pet({ slug, state = "idle", size = 62, delay, label, className }: PetProps) {
  let safe: PetSlug = slug;
  if (!isPetSlug(slug)) {
    console.warn("[Pet] unknown slug:", slug, "- rendering kitten-ginger");
    safe = "kitten-ginger";
  }
  const s: PetState = STATE_ANIM[state] ? state : "idle";
  const animation = STATE_ANIM[s] + (s !== "still" && delay ? ` ${delay}s` : "");
  const box: CSSProperties = { width: size, height: size };
  return (
    <div className={cx("pk-pet", className)} style={box} role="img" aria-label={label || "member"}>
      <div className="pk-pet-shadow" />
      <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" className="pk-pet-art" style={{ animation }}>
        {rectsFor(safe).map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.f} />
        ))}
      </svg>
    </div>
  );
}
