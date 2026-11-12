import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Pet, isPetSlug } from "@/components/boo";
import { Screen } from "@/components/Screen";
import { copy, fill } from "@/copy";
import { groupInfoLine } from "@/lib/format";
import { getMeetPet } from "@/server/groups";

const t = copy.meetPet;

/** meet your pet (prototype/MeetPet.dc.html): this device's own pet and pet name, right after choosing. */
export default function MeetPetPage({ params }: PageProps<"/g/[code]/meet">) {
  return (
    <Suspense>
      <Meet params={params} />
    </Suspense>
  );
}

async function Meet({ params }: Pick<PageProps<"/g/[code]/meet">, "params">) {
  const { code } = await params;
  const me = await getMeetPet(code);
  if (!me || !isPetSlug(me.pet)) notFound();
  const names = { character: me.petName };
  return (
    <Screen group={{ name: me.groupName, info: groupInfoLine(me.budget, me.giftDay) }}>
      <main className="dead-end">
        <Pet slug={me.pet} state="idle" size={120} label={t.petLabel} />
        <h1 className="headline">{fill(t.heading, names)}</h1>
        <p className="body">{fill(t.body, names)}</p>
      </main>
      <Link href={`/g/${code}/instructions`} className="pk-btn pk-btn-primary wide">
        {t.continue}
      </Link>
    </Screen>
  );
}
