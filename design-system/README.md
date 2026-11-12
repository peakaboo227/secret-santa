boo is a design system for warm, cute apps: pixel-art members, one action colour, and pills that press down when you touch them. Never corporate-neutral.

Each product built on it picks one theme. The `pawker` theme belongs to pawker, the planning poker app, and stays light: cream surfaces around a cushioned bed, never dark. "Never dark" is a rule for the pawker app only, not for the system: other products choose the theme that fits them, light or dark. Secret Santa uses `christmas-night`.

## Themes

Three colour themes share every shape, type style and component.

- `pawker` is the default and the pawker app's theme: butter and teal, light only.
- `christmas` swaps only the accent roles: `action` becomes evergreen, `highlight` gold, `accent` berry red, and the danger family moves to a deeper brick so leaving never looks festive. Surfaces, ink, the bed and every pet coat stay the same.
- `christmas-night` is the dark theme, and the one Secret Santa v1 ships. An evergreen `page` under a snowy scene (`SceneSky`, `SceneGround`), frosted glass panels, cream ink, and a gold `action` with dark `on-action` ink. Dialogs and sheets are solid `sheet`, never glass. Danger is a pale coral word. The bed and pet coats stay the same.

Pick the theme on the root (`data-theme="christmas"`). Never mix themes on one screen.

## Content fundamentals

- Everything boo writes is lowercase: buttons, chips, placeholders, headlines. Names people type stay exactly as typed.
- Warm and light, never twee. Real copy: "copy the burrow link", "curl up & watch", "hop out", "sniffing…", "paws up", "zoomies!", "the burrow is dug", "what is your name", "go to the burrow".
- Rooms are burrows. People are "members" in copy, never "pets".
- Never name a member's species or coat. Not in captions, not in alt text. Not knowing is the point.
- Theme the atmosphere, never a failure. A dead end says plainly what happened ("this burrow is not available") and offers one way back.
- Numbers stay numeric and obvious. Card values are bare numerals; only `?` keeps a word under it.
- No emoji. Members carry the personality.
- No pitch copy on the landing: no tagline, no hero sentence, no how-it-works.

## Visual foundations

**Colour.** Use the tokens, never raw hexes. Pages are `page` with the `page-dots` grid (`.pk-page`). Panels, card faces and pills are `panel`: there is one cream, never a second. Inner surfaces are `panel-inner`. Text is `ink`, then `ink-2`, then `ink-muted`; `ink-faint` only for non-essential 11px notes and `ink-disabled` only for placeholders and the waiting pill, since neither reaches 4.5:1. `action` is reserved for the one primary CTA, leading pill icons, the wordmark mark and your own card. `highlight` marks passive status. `warm13-*` is the subtle warm fill for the 13 card and an empty required field. Leaving is `danger-*`, always with a word.

**christmas-night.** Panels are frosted glass: `panel` is 12% white over the scene with a 6px backdrop blur (`Panel` and the wordmark mark do it; any other surface on `panel` or `panel-inner`, such as a tab bar, an inset or an avatar tile, adds `pk-glass`), `panel-inner` and the field fill (`white`) are darker insets, and `sheet` is solid behind dialogs. Every text pair passes 4.5:1 and every field edge 3:1 on glass. Gold on a glass panel sits right at 4.5:1, so gold stays for links, labels, icons and the CTA, never small body text. The scene colours (`snow`, `sparkle`, `tree`, `berry` and the rest) are decoration only.

**The bed.** The table is a stadium (`radius-bed` on an 800×328 box), not an ellipse: `bed-rim` around `bed-cushion` with a dashed `border-ring`. Three warm steps always separate page, cushion and rim, and member coats sit two steps darker than the cushion. No outlines or backing shapes behind members. The bed's inner ring is the only dashed line in boo.

**Type.** `display` (Be Vietnam Pro, 700) for numerals, headlines, the wordmark and big statements: `hero`, `headline`, `numeral`, `wordmark`, `section`. Every face must cover Vietnamese, since names and wishes people type can land in any style; Be Vietnam Pro replaced Poppins for that reason. `sans` (Merriweather Sans, 700) for every label: `cta`, `field`, `title`, `label`, `label-sm`, `chip`. `body` (Inter) for the rare running sentence. `note` (Barlow) for captions and annotations. `mono` for burrow codes (`code`, letter-spaced 0.16em).

**Shape.** One pill (`radius-pill`) for every button and chip. Borders are always solid: `stroke-chip` on chips, `stroke-ui` on panels, fields and utility pills, `stroke-heavy` on the primary CTA, the door block, overlays and your own card. Panel radii grow with importance: `radius-panel` 16, `radius-step` 20, `radius-deck` 22, `radius-door` 24, `radius-overlay` 26.

**Depth.** Flat offset shadows, no blur: `shadow-panel`, `shadow-step`, `shadow-card`, `shadow-reaction`. The primary CTA sits on `shadow-cta` and presses down on hover (`shadow-cta-pressed` plus `translateY(3px)`). Blur appears only on real overlays (`shadow-overlay`) over the `scrim`.

**Spacing.** Lay siblings out with flex or grid and `gap`, never margins. Pages pad `space-22` top and `space-64` sides inside a 1140px centred column. Pill internals: `space-8`/`space-15` with `space-7` before the label; the CTA `space-13`/`space-26`; chips `space-4`/`space-10`.

**Motion.** Members bob, sniff, doze or get zoomies, staggered by delay. Step cards enter over 260ms ease-out. Hover lifts reaction buttons 3px and presses pills 3px. Respect reduced motion: members hold still.

**Focus.** Keyboard focus is a solid 2px `action-dark` outline, offset 3px. In christmas-night it is `action` (gold), since `action-dark` is too dim on the night page. Small buttons there are at least 44px tall.

**Layout.** Every screen carries the `Wordmark` top-left; the top-left slot is never a utility button. Room-level panels float top-right as bordered panels and never reflow what is under them. The landing is a playground: every member mills about the whole page, one per cell of an even grid, never boxed, never sorted into groups, and they walk out of whatever a card covers.

## Iconography

- Characters and reactions are pixel art drawn with SVG rects and `shape-rendering="crispEdges"`: members on a 16×16 grid, the paw pip on 16×16, reaction glyphs on 8×8. Always import them (`Pet`, `VoteCard`, `Reactions`, `Wordmark`); never redraw one inline.
- UI glyphs are `Icon`: 16 pixel icons on a 12×12 grid, one colour (`currentColor`), at 24 for tabs, the menu and sheets and 12 next to text and inside buttons. In a button they sit before the label in `action`.
- The christmas-night scene is pixel art too: `SceneSky` (snow and sparkles behind the content) and `SceneGround` (snowbank, trees on 11×16, gifts on 10×10, at the end of the page, never pinned). Never redraw them inline.
- No emoji, anywhere.

## Components

`Pet`, `VoteCard`, `Reactions`, `Button`, `Chip`, `Field`, `Panel`, `Wordmark`, `Icon`, `SceneSky` and `SceneGround`, in `components/bundle.js` as `window.Pawker`, for React 18. Read each component's guidelines before using it.
