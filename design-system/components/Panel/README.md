Panel is the cream surface every card-like block sits on: `panel` fill, a solid `border`, a flat offset shadow.

Provide children and a `size`: `room` for panels inside the room, `step` for landing steps, `door` for the create-or-join block, `overlay` for the arriving overlay.

- One cream: panels use `panel`, inner surfaces `panel-inner`. Never a third.
- Only `overlay` gets the blurred `shadow-overlay`; every other panel uses a flat shadow.
- Room-level panels float top-right and never reflow the content under them.
- Never add a coloured left border to a panel.
- christmas-night: panels are frosted glass, `panel` at 12% white with a 6px backdrop blur, and `panel-inner` a darker inset. Any other surface on `panel` or `panel-inner` (a tab bar, an inset, an avatar tile) gets the blur with the `pk-glass` class. Dialogs and sheets are never glass: they use the solid `sheet`.
