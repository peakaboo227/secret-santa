/** One of the 20 approved coats. An unknown slug renders kitten-ginger and warns. */
export type PetSlug =
  | "kitten-ginger" | "kitten-slate" | "kitten-tuxedo" | "kitten-calico"
  | "dog-shiba" | "dog-husky" | "dog-basenji" | "dog-pharaoh"
  | "rabbit-caramel" | "rabbit-grey" | "rabbit-cinnamon" | "rabbit-white"
  | "guineapig-ginger" | "guineapig-tan" | "guineapig-tri" | "guineapig-agouti"
  | "ferret-white" | "ferret-champagne" | "ferret-silver" | "ferret-chocolate";

export interface PetProps {
  slug: PetSlug;
  /** idle bobs, sniff tilts, doze barely breathes, zoomies spins, still is frozen. Default idle. */
  state?: "idle" | "sniff" | "doze" | "zoomies" | "still";
  /** Rendered px, square. Default 62. Seated 80-88, watchers 64. */
  size?: number;
  /** Seconds of animation delay, to stagger a crowd. */
  delay?: number;
  /** Accessible name. Default "member". Never the species. */
  label?: string;
  className?: string;
}

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

export interface ReactionsProps {
  /** Adds the poke bell. Only for someone there is something to poke about. */
  canPoke?: boolean;
  onReact?: (kind: "heart" | "snack" | "scratch" | "poke") => void;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = the one CTA per screen; utility = a room pill. Default primary. A disabled primary renders as the sand waiting pill. */
  variant?: "primary" | "utility";
  /** Utility only. share = share or join, neutral, leave = leave or remove. Default neutral. */
  tone?: "share" | "neutral" | "leave";
  /** Utility only. A 12px glyph, always before the label. */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export interface ChipProps {
  /** action = active status, highlight = passive status, neutral and leave = per-member actions. Default neutral. */
  tone?: "action" | "highlight" | "neutral" | "leave";
  /** Makes the chip a button. */
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** A required field that is still empty when its CTA was pressed. */
  invalid?: boolean;
}

export interface PanelProps {
  /** room 16px radius, step 20px, door 24px with a 3px border, overlay 26px with the blurred overlay shadow. Default room. */
  size?: "room" | "step" | "door" | "overlay";
  /** Use panel-inner instead of panel. */
  inner?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export interface WordmarkProps {
  /** The product name, lowercase. Default "pawker". Secret Santa passes "secret santa". */
  word?: string;
  /** Links home. Every screen carries the wordmark top-left. */
  href?: string;
  onClick?: () => void;
  /** Adds the header block: burrow name under the lockup, flush with the word. */
  burrow?: string;
  members?: number;
}

/** The 16 ui icons, drawn on a 12x12 pixel grid. */
export type IconName =
  | "back" | "forward" | "close" | "menu" | "plus" | "check" | "gift" | "wishlist"
  | "link" | "copy" | "key" | "info" | "manage" | "lock" | "calendar" | "bell";

export interface IconProps {
  name: IconName;
  /** 12 next to text and inside buttons (1px pixels), 24 for tabs, menu and sheets (2px pixels). Default 12. */
  size?: 12 | 24;
  /** Only for an icon-only control (menu, close). Without it the icon is decorative and hidden from screen readers. */
  label?: string;
  className?: string;
}

export interface SceneProps {
  className?: string;
}
/** SceneSky: falling snow and gold sparkles. Fills its positioned parent, behind the content. christmas-night only. */
/** SceneGround: snowbank, pixel trees and gifts, 96px tall, full width, at the end of the page. christmas-night only. */
