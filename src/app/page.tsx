import { SceneGround, SceneSky, Wordmark } from "@/components/boo";
import { copy } from "@/copy";

export default function Home() {
  return (
    <div className="screen">
      <SceneSky className="screen-sky" />
      <header className="screen-header">
        <Wordmark word={copy.wordmark} mark="gift" href="/" />
      </header>
      <main className="screen-main home">
        <h1 className="headline">{copy.home.appName}</h1>
        <p className="body home-line">{copy.home.line}</p>
      </main>
      <SceneGround />
    </div>
  );
}
