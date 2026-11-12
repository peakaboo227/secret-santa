Icon is the ui glyph set: 16 pixel icons on a 12 by 12 grid, like the wordmark mark, the pets and the scene.

Provide a `name` and a `size`. The icon takes its colour from the parent (`currentColor`), so set `color` on the element around it.

- Two sizes only: `12` (1px pixels) next to text and inside buttons, `24` (2px pixels) for tabs, the menu and sheets. Never scale in between: the pixels stop landing on whole pixels.
- One colour per icon, no outlines or fills mixed in.
- An icon sits beside a label. Only `menu` and `close` stand alone, and then they get a `label` (their accessible name) and a 44px hit area.
- Inside a utility `Button`, pass it as `icon`; it goes before the label in `action`.
- Set: back (back links), forward (list rows), close (sheets), menu (header), plus (add buttons), check (gift handed), gift (giftee tab, empty state), wishlist (wishlist tab), link (wish links), copy (copy game link), key (pin list), info (how it works), manage (manage this group), lock (locked pin, blocked pet), calendar (gift day field), bell (nudge giftee).
- Draw a new icon only when a screen needs it, on the same grid, and add it here.
