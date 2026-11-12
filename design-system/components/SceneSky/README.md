SceneSky is the christmas-night sky: falling pixel snow and twinkling gold sparkles behind every screen.

Provide a positioned parent. The sky fills it (`position: absolute; inset: 0`), clips to it and never takes pointer events; put it first in the screen with `z-index: -1` on a root that has `isolation: isolate`.

- christmas-night only. pawker and christmas have no scene.
- Always behind the content, never over a panel, field or button. Panels are frosted glass, so the sky shows softly through them.
- Positions are fixed so every screen shows the same sky; it is drawn for a phone screen (390 by 844) and spreads across wider ones by percentage.
- Decoration only: it is hidden from screen readers. With reduced motion the snow and sparkles hold still.
- Colours come from `snow`, `sparkle` and `sparkle-2`. Never redraw it inline.
