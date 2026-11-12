// The paw pip shared by VoteCard and Wordmark (design-system/components/bundle.js).
export function Paw({ size, fill }: { size: number; fill: string }) {
  const s = { fill };
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true">
      <rect x={5} y={8} width={6} height={5} style={s} />
      <rect x={2} y={6} width={2} height={3} style={s} />
      <rect x={5} y={4} width={2} height={3} style={s} />
      <rect x={9} y={4} width={2} height={3} style={s} />
      <rect x={12} y={6} width={2} height={3} style={s} />
    </svg>
  );
}
