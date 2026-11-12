import type { ReactNode } from "react";
import { SceneGround, SceneSky, Wordmark } from "@/components/boo";
import { copy } from "@/copy";

/**
 * A phone screen as in the prototype: the sky behind, a 440px column with the wordmark first,
 * and the ground at the end of the page. `group` adds the group name and info line under the wordmark.
 */
export function Screen({ children, group }: { children: ReactNode; group?: { name: string; info: string } }) {
  return (
    <div className="screen">
      <SceneSky className="screen-sky" />
      <div className="col">
        {group ? (
          <div className="pk-header">
            <Wordmark word={copy.wordmark} mark="gift" href="/" />
            <div className="pk-header-sub">
              <span className="title">{group.name}</span>
              <span className="note-lg muted">{group.info}</span>
            </div>
          </div>
        ) : (
          <Wordmark word={copy.wordmark} mark="gift" href="/" />
        )}
        {children}
      </div>
      <SceneGround />
    </div>
  );
}
