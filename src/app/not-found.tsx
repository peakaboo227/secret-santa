import { Pet } from "@/components/boo";
import { Screen } from "@/components/Screen";
import { copy } from "@/copy";

/** link not found (prototype/NotFound.dc.html). Shown for any address that doesn't lead anywhere. */
export default function NotFound() {
  return (
    <Screen>
      <main className="dead-end">
        <Pet slug="guineapig-tan" state="doze" size={84} label={copy.notFound.petLabel} />
        <h1 className="headline">{copy.notFound.heading}</h1>
        <p className="body">{copy.notFound.body}</p>
      </main>
    </Screen>
  );
}
