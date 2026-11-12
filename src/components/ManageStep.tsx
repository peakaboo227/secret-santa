import type { ReactNode } from "react";
import { cx } from "@/components/boo/cx";
import { copy } from "@/copy";

/** One numbered step of the manage page's checklist: a glass panel with a number (or a tick when done). */
export function ManageStep({
  number,
  done = false,
  title,
  sub,
  children,
}: {
  number: number;
  done?: boolean;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <section className="manage-step pk-glass">
      <div className="manage-step-head">
        <span aria-hidden="true" className={cx("label", "manage-mark", done && "manage-mark-done")}>
          {done ? copy.manage.done : number}
        </span>
        <div className="manage-step-title">
          <h2 className="section">{title}</h2>
          <span className="note-lg muted">{sub}</span>
        </div>
      </div>
      {children}
    </section>
  );
}
