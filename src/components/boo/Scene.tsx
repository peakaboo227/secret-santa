// Ports of Pawker.SceneSky and Pawker.SceneGround.
// Specs: design-system/components/SceneSky/README.md and SceneGround/README.md
import type { CSSProperties } from "react";
import { cx } from "./cx";

export interface SceneProps {
  className?: string;
}

/* [kind f=flake t=sparkle, px, left %, top px, delay s, duration s, alt gold] */
type Speck = [kind: "f" | "t", size: number, left: number, top: number, delay: number, duration: number, alt: 0 | 1];
const SKY: Speck[] = [["f",4,13.8,360,-6.1,16,0],["t",14,83.3,758,1.0,0,0],["t",10,75.9,77,1.5,0,1],["t",14,56.8,666,0.1,0,0],["t",14,67.3,33,0.7,0,0],["f",6,76.4,286,-6.7,20,0],["f",4,66.3,328,-5.3,16,0],["f",6,94.5,670,-13.8,16,0],["t",14,19.1,398,0.8,0,0],["t",14,61.0,371,2.2,0,0],["f",6,26.2,502,-4.9,20,0],["f",6,72.8,212,-9.5,12,0],["f",6,37.9,616,-10.9,12,0],["f",6,88.0,396,-0.5,16,0],["t",10,27.2,761,0,0,0],["f",6,35.5,803,-5.6,12,0],["t",20,88.6,80,0.6,0,0],["f",6,9.4,541,-2.9,20,0],["f",4,64.0,607,-10.9,12,0],["t",14,67.1,235,0.3,0,0],["f",4,88.6,212,-13.7,20,0],["f",4,10.6,501,-0.9,16,0],["t",20,82.1,106,0.1,0,0],["f",6,37.1,331,-12.9,20,0],["t",14,35.3,139,2.3,0,0],["f",4,29.5,184,-3.6,16,0],["f",4,31.6,408,-4.3,20,0],["f",4,56.6,40,-5.7,20,0],["t",20,17.6,397,1.7,0,0],["f",4,51.4,342,-0.8,20,0],["t",20,79.3,288,0.3,0,1],["f",4,48.2,385,-5.9,12,0],["t",14,89.2,458,0.8,0,0],["f",6,87.7,357,-9.4,12,0],["f",4,48.0,32,-13.3,12,0],["t",10,84.2,501,2.1,0,1],["f",6,43.6,86,-6.7,20,0],["f",6,85.7,710,-9.8,20,0],["f",4,7.2,49,-1.4,20,0],["f",6,20.8,577,-6.9,20,0],["f",4,21.5,118,-10.1,16,0],["t",10,72.0,477,2.3,0,1],["t",10,76.9,779,0.4,0,1],["t",14,81.7,215,0.7,0,1],["f",4,8.0,607,-0.8,16,0],["f",4,44.5,628,-5.8,16,0],["f",6,13.3,740,-3.7,20,0],["f",6,71.4,47,-13.2,20,0]];
const FLAKE = "M0 0h1v1h-1z";
const SPARK = "M2 0h1v5h-1zM0 2h5v1h-5z";

/** Falling snow and gold sparkles. Fills its positioned parent, behind the content. christmas-night only. */
export function SceneSky({ className }: SceneProps) {
  return (
    <div className={cx("pk-sky", className)} aria-hidden="true">
      {SKY.map(([kind, size, left, top, delay, duration, alt], i) => {
        const flake = kind === "f";
        const st: CSSProperties = { left: `${left}%`, top };
        if (delay) st.animationDelay = `${delay}s`;
        if (duration) st.animationDuration = `${duration}s`;
        return (
          <svg key={i} className={flake ? "pk-fall" : "pk-twinkle"} width={size} height={size} viewBox={flake ? "0 0 1 1" : "0 0 5 5"} shapeRendering="crispEdges" style={st}>
            <path d={flake ? FLAKE : SPARK} style={{ fill: flake ? "var(--snow)" : alt ? "var(--sparkle-2)" : "var(--sparkle)" }} />
          </svg>
        );
      })}
    </div>
  );
}

type T = [x: number, y: number, w: number, h: number, token: string];
const TREE: T[] = [
  [5,0,1,1,"sparkle-2"],[4,1,3,1,"sparkle-2"],
  [4,2,3,2,"tree"],[4,3,3,1,"tree-dark"],[3,4,5,2,"tree"],[3,5,5,1,"tree-dark"],
  [2,6,7,2,"tree"],[2,7,7,1,"tree-dark"],[1,8,9,2,"tree"],[1,9,9,1,"tree-dark"],
  [0,10,11,2,"tree"],[0,11,11,1,"tree-dark"],
  [3,5,1,1,"berry"],[7,7,1,1,"sparkle-2"],[4,9,1,1,"berry"],[8,11,1,1,"berry"],[2,11,1,1,"sparkle-2"],
  [3,4,2,1,"snow"],[7,6,2,1,"snow"],[1,8,2,1,"snow"],[8,10,2,1,"snow"],
  [4,12,3,3,"trunk"],
];

function Tree({ w, h, style }: { w: number; h: number; style: CSSProperties }) {
  return (
    <svg width={w} height={h} viewBox="0 0 11 16" shapeRendering="crispEdges" style={style}>
      {TREE.map(([x, y, rw, rh, token], i) => (
        <rect key={i} x={x} y={y} width={rw} height={rh} style={{ fill: `var(--${token})` }} />
      ))}
    </svg>
  );
}

function Gift({ size, box, ribbon, style }: { size: number; box: string; ribbon: string; style: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" shapeRendering="crispEdges" style={style}>
      <path d="M1 4h8v6h-8zM0 3h10v2h-10z" style={{ fill: `var(--${box})` }} />
      <path d="M4 3h2v7h-2zM2 1h2v2h-2zM6 1h2v2h-2z" style={{ fill: `var(--${ribbon})` }} />
    </svg>
  );
}

const BANK = "M0 4h1v22h-1zM1 5h3v21h-3zM4 6h7v20h-7zM11 5h4v21h-4zM15 4h3v22h-3zM18 3h6v23h-6zM24 2h11v24h-11zM35 1h7v25h-7zM42 0h1v26h-1zM43 1h5v25h-5zM48 2h2v24h-2zM50 3h3v23h-3zM53 4h2v22h-2zM55 5h13v21h-13zM68 4h12v22h-12zM80 3h5v23h-5zM85 2h3v24h-3zM88 1h4v25h-4zM92 0h7v26h-7zM99 1h3v25h-3zM102 2h2v24h-2zM104 3h3v23h-3zM107 4h5v22h-5zM112 5h5v21h-5zM117 4h7v22h-7zM124 5h6v21h-6z";

function at(left: string, bottom: number): CSSProperties {
  return { position: "absolute", left, bottom };
}

/** Snowbank, pixel trees and gifts, 96px tall, full width, at the end of the page. christmas-night only. */
export function SceneGround({ className }: SceneProps) {
  return (
    <div className={cx("pk-ground", className)} aria-hidden="true">
      <svg width="100%" height={40} viewBox="0 0 130 26" preserveAspectRatio="none" shapeRendering="crispEdges" style={{ position: "absolute", left: 0, bottom: 0, display: "block" }}>
        <path d={BANK} style={{ fill: "var(--snow)" }} />
        <path d="M0 18h130v8h-130z" style={{ fill: "var(--snow-shade)" }} />
      </svg>
      <Tree w={39} h={58} style={at("-6px", 25)} />
      <Gift size={26} box="berry" ribbon="sparkle-2" style={at("15%", 31)} />
      <Tree w={50} h={74} style={at("23.5%", 32)} />
      <Gift size={30} box="sparkle-2" ribbon="tree" style={at("41%", 26)} />
      <Gift size={22} box="sparkle-2" ribbon="tree" style={at("53%", 28)} />
      <Gift size={26} box="berry" ribbon="sparkle-2" style={at("64.5%", 32)} />
      <Tree w={45} h={66} style={at("77%", 28)} />
      <Tree w={33} h={48} style={at("calc(100% - 50px)", 28)} />
    </div>
  );
}
