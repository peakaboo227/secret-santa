import type { ReactNode } from "react";
import { SceneGround, SceneSky, Wordmark } from "@/components/boo";
import { copy } from "@/copy";

/**
 * A phone screen as in the prototype: the sky behind, a 440px column with the wordmark first,
 * and the ground at the end of the page.
 */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="screen">
      <SceneSky className="screen-sky" />
      <div className="col">
        <Wordmark word={copy.wordmark} mark="gift" href="/" />
        {children}
      </div>
      <SceneGround />
    </div>
  );
}
