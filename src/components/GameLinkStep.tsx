"use client";

import { useState } from "react";
import { Button, Icon } from "@/components/boo";
import { copy } from "@/copy";
import { ManageStep } from "./ManageStep";

const t = copy.manage.link;

/** Manage step 3: the game link and its copy button. The step is ticked once the link was copied. */
export function GameLinkStep({ shown, full }: { shown: string; full: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ManageStep number={3} done={copied} title={t.title} sub={t.sub}>
      <div className="link-row">
        <span className="code link-text">{shown}</span>
        <Button variant="utility" tone="neutral" icon={<Icon name="copy" />} onClick={copyLink} className="tall">
          {copied ? t.copied : t.copy}
        </Button>
      </div>
      <span className="note-lg muted">{t.note}</span>
    </ManageStep>
  );
}
