import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Screen } from "@/components/Screen";
import { copy } from "@/copy";
import { groupInfoLine } from "@/lib/format";
import { getInstructionsPage } from "@/server/groups";

const t = copy.instructions;

/**
 * instructions · first time (prototype/Instructions.dc.html), shown once after meeting your character.
 * The host goes on to the manage page; everyone else to their wishlist (built with the joining story).
 */
export default function InstructionsPage({ params }: PageProps<"/g/[code]/instructions">) {
  return (
    <Suspense>
      <Instructions params={params} />
    </Suspense>
  );
}

async function Instructions({ params }: Pick<PageProps<"/g/[code]/instructions">, "params">) {
  const { code } = await params;
  const page = await getInstructionsPage(code);
  if (!page) notFound();
  return (
    <Screen group={{ name: page.groupName, info: groupInfoLine(page.budget, page.giftDay) }}>
      <div className="intro">
        <h1 className="headline">{t.heading}</h1>
        <span className="body-sm">{t.intro}</span>
      </div>
      <div aria-hidden="true" className="note-lg how-art">
        {t.illustration}
      </div>
      <ol className="how-steps">
        {t.steps.map((step, i) => (
          <li key={step.title}>
            <span className="numeral how-number pk-glass">{i + 1}</span>
            <div className="how-text">
              <span className="field">{step.title}</span>
              <span className="body-sm muted">{step.body}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="grow" />
      <Link href={page.next.href} className="pk-btn pk-btn-primary wide">
        {page.next.kind === "manage" ? t.toManage : t.toWishlist}
      </Link>
    </Screen>
  );
}
