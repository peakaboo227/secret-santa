# prototype

The product owner's approved design for every screen. **This is the spec: build each screen to match it
exactly.** Same text, layout, spacing, colours, icons and states. Don't redesign, reword or "improve" it.
If something can't be built as designed, stop and ask the product owner.

## What's in here

- Each `*.dc.html` file is one screen, copied byte for byte from the design canvas "secret santa mockup"
  (page "prototype · pass 2", plus the "night kit" page). The older "explorations" page was left out on purpose.
- These files are **reference only**. The app never loads them, and they aren't edited here. To update them,
  re-copy from the canvas (see "Updating" below).
- `canvas.json` is the canvas layout (screen titles and positions). `night.css` and `ds/pawker/` are the
  styles the mockup used. Its colours match the app's `christmas-night` theme in `design-system/tokens.css`.

## How to read a screen file

- The markup inside `<x-dc>` is the screen. Inline `style="…"` holds the exact spacing and sizes.
- `{{name}}` is filled in by the `renderVals()` script at the bottom of the file. Read it for the text that
  changes (for example error messages, counts, the "i'm playing too" note).
- `<sc-if>` shows a part only in some states; `<sc-for>` repeats a part for each item in a list.
- `data-props` at the bottom lists the screen's **states** (the table below names them). Build every state.
- `<x-import component-from-global-scope="Pawker.Pet">` (and `Pawker.Field`, `Pawker.Panel`) are design system
  components: use the typed ones in `src/components/boo`. `<dc-import name="SceneSky">` and `SceneGround` are
  the scene pieces (`SceneSky`, `SceneGround` in `src/components/boo`).
- Links between screens (`href="CreateGroup.dc.html"`) show where each button goes.
- Example data (names like lan, thảo, "christmas 2026", the pin 4827) is placeholder. Real data comes from the database.

## How to build from it, in the app

- Text goes into `src/copy.ts`, word for word (it's already lowercase).
- Colours, spacing, radius and type through the design system tokens and type classes, never raw values.
  The mockup's raw values (`#1C4F31`, `#F5CF6E`, `#D6455A`, …) are the theme's tokens: use the token.
- The mockup loads Google Fonts. The app doesn't: fonts come from Fontsource (already set up).
- Check your screen at phone width (390 px wide) against the file.

## Screens

### joining for the first time

| screen | file | states to check |
|---|---|---|
| pick your name | `PickName.dc.html` | state: names / no names yet |
| enter pin | `EnterPin.dc.html` | state: default / wrong pin / locked 15 min; scenario: first time / new device |
| choose your pet | `ChoosePet.dc.html` | flow: participant / host playing / host not playing |
| meet your pet | `MeetPet.dc.html` | flow: participant / host playing |
| instructions · first time | `Instructions.dc.html` | mode: first time / reopened; flow: participant / host playing |

### my space: wishlist and giftee

| screen | file | states to check |
|---|---|---|
| my space · my wishlist | `MySpace.dc.html` | startTab: wishlist / giftee; mySantaStatus: not viewed yet / viewed / preparing; notice: none / re-draw / wrong pet warning / nudged by santa |
| my space · my giftee | `MyGiftee.dc.html` | same as MySpace.dc.html, with start-tab="giftee" |
| my space · first visit after the draw | `MySpaceAfterDraw.dc.html` | same as MySpace.dc.html, with start-tab="wishlist" first-after-draw="{{true}}" |
| my giftee · before the draw | `MyGifteeBeforeDraw.dc.html` | same as MySpace.dc.html, with start-tab="giftee" draw-done="{{false}}" |
| my giftee · giftee has no wishes | `MyGifteeNoWishes.dc.html` | same as MySpace.dc.html, with start-tab="giftee" giftee-has-wishes="{{false}}" |
| my wishlist · nudged by santa | `MySpaceNudged.dc.html` | same as MySpace.dc.html, with start-tab="wishlist" notice="nudged by santa" |
| instructions · reopened from menu | `InstructionsAgain.dc.html` | same as Instructions.dc.html, with mode="reopened" |

### returning and dead ends

| screen | file | states to check |
|---|---|---|
| new device · prove it’s you | `ProvePet.dc.html` | who: participant / host |
| link not found | `NotFound.dc.html` | · |

### host flow

| screen | file | states to check |
|---|---|---|
| app home | `AppHome.dc.html` | groups: one group / none on this device |
| create group | `CreateGroup.dc.html` | · |
| host · choose your pet | `HostChoosePet.dc.html` | same as ChoosePet.dc.html, with flow="host playing" |
| host · meet your pet (playing) | `HostMeetPet.dc.html` | same as MeetPet.dc.html, with flow="host playing" |
| host · instructions (playing) | `HostInstructions.dc.html` | same as Instructions.dc.html, with flow="host playing" |
| manage · just created | `ManageNew.dc.html` | same as Manage.dc.html, with phase="just created" |
| manage · setting up | `Manage.dc.html` | phase: just created / setting up / everyone joined / drawn / exchange started |
| manage · everyone joined, ready to draw | `ManageReady.dc.html` | same as Manage.dc.html, with phase="everyone joined" |
| manage · after the draw | `ManageDrawn.dc.html` | same as Manage.dc.html, with phase="drawn" |
| exchange board | `ExchangeBoard.dc.html` | start: fresh / ready to reveal |
| reveal | `HostReveal.dc.html` | · |

### night kit (shared pieces)

| screen | file | states to check |
|---|---|---|
| dark panel options · contrast (frosted glass chosen) | `Palette.dc.html` | · |
| ui icons | `Icons.dc.html` | · |
| scene · sky (snow, sparkles) | `SceneSky.dc.html` | · |
| scene · ground (snowbank, trees, gifts) | `SceneGround.dc.html` | · |

## Updating

When the design changes on the canvas, re-copy the changed screen files here byte for byte (and `canvas.json`
if screens were added or renamed), update the table above, and open a pull request.
