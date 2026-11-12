"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Icon, Pet, PET_SLUGS, type PetSlug } from "@/components/boo";
import { cx } from "@/components/boo/cx";
import { Screen } from "@/components/Screen";
import { copy, fill } from "@/copy";

const t = copy.choosePet;

/**
 * choose your pet (prototype/ChoosePet.dc.html): the 20 pets in a grid, one to pick.
 * `action` saves the pet on the server and moves on; it only comes back here if saving failed.
 */
export function ChoosePet({
  group,
  backHref,
  action,
}: {
  group: { name: string; info: string };
  backHref: string;
  action: (pet: string) => Promise<void>;
}) {
  const [picked, setPicked] = useState<PetSlug | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  function confirm() {
    if (!picked || pending) return;
    setFailed(false);
    startTransition(async () => {
      try {
        await action(picked);
      } catch (error) {
        console.error(error);
        setFailed(true);
      }
    });
  }

  return (
    <Screen group={group}>
      <Link href={backHref} className="label back-link">
        <Icon name="back" />
        <span>{t.back}</span>
      </Link>
      <div className="intro">
        <h1 className="headline">{t.heading}</h1>
        <span className="body-sm">{t.intro}</span>
      </div>
      <div role="radiogroup" aria-label={t.pets} className="pet-grid">
        {PET_SLUGS.map((slug, i) => {
          const label = fill(t.pet, { n: String(i + 1) });
          const on = picked === slug;
          return (
            <button
              key={slug}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={label}
              onClick={() => setPicked(slug)}
              className={cx("pet-tile", "pk-glass", on && "pet-tile-on")}
            >
              <Pet slug={slug} state={on ? "idle" : "still"} size={48} label={label} />
            </button>
          );
        })}
      </div>
      <span className="note-lg muted centred">{t.shared}</span>
      {picked ? (
        <button type="button" className="pk-btn pk-btn-primary wide" onClick={confirm}>
          {t.confirm}
        </button>
      ) : (
        <button type="button" className="pk-btn pk-btn-primary wide" disabled>
          {t.pickFirst}
        </button>
      )}
      {failed ? (
        <span role="alert" className="label field-error">
          {t.saveFailed}
        </span>
      ) : null}
    </Screen>
  );
}
