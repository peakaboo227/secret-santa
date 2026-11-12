// Port of Pawker.Wordmark. Spec: design-system/components/Wordmark/README.md
// Secret Santa passes word={copy.wordmark} ("secret santa") and mark="gift", top-left on every screen,
// as in the prototype (prototype/AppHome.dc.html).
import { Gift } from "./Gift";
import { Paw } from "./Paw";

export interface WordmarkProps {
  /** The product name, lowercase. Default "pawker". Secret Santa passes "secret santa". */
  word?: string;
  /** The pip on the card: the design system's paw (default), or Secret Santa's gift. */
  mark?: "paw" | "gift";
  /** Links home. Every screen carries the wordmark top-left. */
  href?: string;
  onClick?: () => void;
  /** Adds the header block: burrow name under the lockup, flush with the word. */
  burrow?: string;
  members?: number;
}

export function Wordmark({ word = "pawker", mark = "paw", href, onClick, burrow, members }: WordmarkProps) {
  const inner = (
    <>
      <span className="pk-wordmark-mark">
        {mark === "gift" ? <Gift size={12} /> : <Paw size={14} fill="var(--action)" />}
      </span>
      <span className="pk-wordmark-word">{word}</span>
    </>
  );
  const lockup = href ? (
    <a className="pk-wordmark" href={href} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <div className="pk-wordmark" onClick={onClick}>
      {inner}
    </div>
  );
  if (!burrow) return lockup;
  return (
    <div className="pk-header">
      {lockup}
      <div className="pk-header-sub">
        <span className="pk-header-burrow">{burrow}</span>
        {members != null ? <span className="pk-header-members">{members} members</span> : null}
      </div>
    </div>
  );
}
