import { copy } from "@/copy";

/** The footer line at the end of every screen, just above the snowbank. */
export function ScreenFooter() {
  return (
    <footer className="screen-footer">
      <p className="note-lg">{copy.footer}</p>
    </footer>
  );
}
