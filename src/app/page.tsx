import Link from "next/link";
import { Suspense } from "react";
import { Icon, Pet } from "@/components/boo";
import { Screen } from "@/components/Screen";
import { copy, fill } from "@/copy";
import { namesCount } from "@/lib/format";
import { getHome } from "@/server/manage";

const t = copy.home;

/** app home (prototype/AppHome.dc.html): create a group, and the groups this device manages. */
export default function HomePage() {
  return (
    <Screen>
      <div className="home-pets">
        <Pet slug="kitten-ginger" state="idle" size={52} label={t.petLabel} />
        <Pet slug="rabbit-white" state="sniff" size={62} label={t.petLabel} delay={0.4} />
        <Pet slug="dog-shiba" state="idle" size={52} label={t.petLabel} delay={0.8} />
      </div>
      <Suspense>
        <Groups />
      </Suspense>
    </Screen>
  );
}

async function Groups() {
  const home = await getHome();
  return (
    <>
      {home.canCreate ? (
        <Link href="/new" className="pk-btn pk-btn-primary wide">
          {t.create}
        </Link>
      ) : null}
      <div className="home-groups">
        <h2 className="section">{t.groups}</h2>
        {home.groups.map((g) => {
          const summary = fill(t.summary, { names: namesCount(g.names), joined: String(g.joined) });
          return (
            <Link key={g.id} href={`/manage/${g.id}`} className="group-row pk-glass">
              <div className="group-row-text">
                <span className="field">{g.name}</span>
                <span className="note-lg muted">{g.drawn ? summary : `${summary} · ${t.notDrawn}`}</span>
              </div>
              <span className="group-row-icon">
                <Icon name="forward" />
              </span>
            </Link>
          );
        })}
        {home.groups.length === 0 ? (
          <div className="no-groups">
            <span className="field">{t.noGroups}</span>
            <span className="body-sm muted">{t.noGroupsBody}</span>
          </div>
        ) : null}
      </div>
    </>
  );
}
