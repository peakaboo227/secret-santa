import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Chip, Icon, SceneGround, SceneSky, Wordmark } from "@/components/boo";
import { GameLinkStep } from "@/components/GameLinkStep";
import { ManageStep } from "@/components/ManageStep";
import { copy, fill } from "@/copy";
import { groupInfoLine, namesCount } from "@/lib/format";
import { getManagePage } from "@/server/manage";

const t = copy.manage;

/**
 * manage (prototype/Manage.dc.html), as the host first sees it. Only the group's host or the owner link
 * can open it; the game link alone never does. Controls that belong to later stories (adding names, the
 * pin list, rules, the draw, the gift exchange, my space) are added by those stories.
 */
export default function ManagePage({ params }: PageProps<"/manage/[groupId]">) {
  return (
    <div className="screen">
      <SceneSky className="screen-sky" />
      <Suspense>
        <Manage params={params} />
      </Suspense>
      <SceneGround />
    </div>
  );
}

async function Manage({ params }: Pick<PageProps<"/manage/[groupId]">, "params">) {
  const { groupId } = await params;
  const page = await getManagePage(groupId);
  if (!page) notFound();

  const joined = page.names.filter((n) => n.joined).length;
  const players = page.names.filter((n) => n.playing);
  const notJoined = page.names.filter((n) => !n.joined).map((n) => n.realName);

  return (
    <>
      <header className="manage-head">
        <Wordmark word={copy.wordmark} mark="gift" href="/" />
        <div className="manage-head-text">
          <Link href="/" className="label back-link manage-back">
            <Icon name="back" />
            <span>{t.myGroups}</span>
          </Link>
          <span className="eyebrow muted">{t.eyebrow}</span>
          <h1 className="headline manage-name">{page.groupName}</h1>
          <span className="note-lg muted">{groupInfoLine(page.budget, page.giftDay)}</span>
        </div>
      </header>
      <main className="manage-main">
        <ManageStep
          number={1}
          done={page.names.length >= 3}
          title={t.names.title}
          sub={fill(t.names.sub, { names: namesCount(page.names.length), joined: String(joined) })}
        >
          <ul aria-label={t.names.list} className="name-list">
            {page.names.map((n) => (
              <li key={n.id} className="name-row pk-glass">
                <span className="field">
                  {n.realName}
                  {n.you ? <span className="note-lg muted"> {t.names.you}</span> : null}
                </span>
                <div className="chip-row">
                  <Chip tone={n.joined ? "action" : "neutral"}>{n.joined ? t.names.joined : t.names.notJoined}</Chip>
                  {n.playing ? (
                    <Chip tone={n.hasWishlist ? "action" : "neutral"}>
                      {n.hasWishlist ? t.names.wishlist : t.names.noWishlist}
                    </Chip>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </ManageStep>

        <ManageStep number={2} title={t.rules.title} sub={t.rules.sub}>
          <span className="body-sm muted">{t.rules.none}</span>
        </ManageStep>

        <GameLinkStep shown={page.gameLink.shown} full={page.gameLink.full} />

        <ManageStep number={4} title={t.draw.title} sub={t.draw.sub}>
          <button type="button" className="pk-btn pk-btn-primary wide" disabled>
            {t.draw.button}
          </button>
          <span className="body-sm muted">
            {players.length < 3 ? t.draw.needThree : fill(t.draw.waitingFor, { names: notJoined.join(", ") })}
          </span>
        </ManageStep>

        <ManageStep number={5} title={t.exchange.title} sub={t.exchange.sub}>
          <span className="body-sm muted">{t.exchange.later}</span>
        </ManageStep>
      </main>
    </>
  );
}
