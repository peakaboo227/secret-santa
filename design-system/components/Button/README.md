Button is the pill: one shape everywhere, where only fill and border colour carry meaning.

Provide a lowercase label as children. `variant="primary"` is the CTA; `variant="utility"` with a `tone` is a room pill, optionally with an `icon`.

- One primary CTA per screen. It is `action` fill, a 3px `action-dark` border and a flat `shadow-cta`; on hover it presses down 3px.
- A disabled primary is the waiting pill: same shape, sand border, `ink-disabled` label. Never a different shape.
- Utility pills share exact padding, border and label size so a row lines up, including a code pill, which is a neutral utility pill with a `code` span inside.
- Tone by meaning: `share` for share or join, `neutral` for everything else, `leave` for leaving or removing.
- The icon goes before the label, at 12px, in `action`. Never trailing.
- Borders are always solid. Labels are always lowercase.
- christmas-night: the CTA is gold with dark ink, utility pills are at least 44px tall, and the focus ring is gold (`action`).
