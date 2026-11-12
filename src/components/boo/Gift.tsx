// The gift pip in Secret Santa's wordmark, copied from the prototype (prototype/AppHome.dc.html):
// a gold box (action) with a berry ribbon and bow, on a 12 px pixel grid.
export function Gift({ size = 12 }: { size?: number }) {
  const box = { fill: "var(--action)" };
  const ribbon = { fill: "var(--berry)" };
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true">
      <rect x={1} y={5} width={10} height={6} style={box} />
      <rect x={0} y={3} width={12} height={2} style={box} />
      <rect x={5} y={3} width={2} height={8} style={ribbon} />
      <rect x={3} y={1} width={2} height={2} style={ribbon} />
      <rect x={7} y={1} width={2} height={2} style={ribbon} />
    </svg>
  );
}
