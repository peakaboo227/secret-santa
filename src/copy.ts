// Every piece of UI text lives here, referenced by key: labels, buttons, headings,
// messages, placeholders, errors. All lowercase (names people type stay as typed).
// No translation library. Add keys grouped by screen.
export const copy = {
  meta: {
    title: "secret santa",
    description: "a secret santa for friends",
  },
  /** The product name in the wordmark, top-left on every screen. */
  wordmark: "secret santa",
  home: {
    appName: "secret santa",
    line: "open the game link your host sent you",
  },
  /** create group (prototype/CreateGroup.dc.html). {name} is filled in with the host's name as typed. */
  createGroup: {
    cancel: "cancel",
    back: "back",
    continue: "continue",
    details: {
      eyebrow: "step 1 of 3",
      heading: "create a group",
      intro: "everyone sees these from the moment they join.",
      groupName: "group name",
      groupNamePlaceholder: "christmas 2026",
      groupNameError: "give the group a name",
      budget: "budget",
      budgetPlaceholder: "300k",
      budgetError: "add a budget",
      giftDay: "gift day",
      giftDayEmpty: "pick a gift day",
      giftDayPast: "gift day can’t be in the past",
    },
    host: {
      eyebrow: "step 2 of 3",
      heading: "what’s your name?",
      intro: "it goes on the name list. you sign in with it, like everyone else.",
      yourName: "your name",
      yourNamePlaceholder: "thảo",
      yourNameError: "add your name",
      playing: "i’m playing too",
      playingNote:
        "you’ll get a pet, a wishlist and a giftee like everyone. you still can’t see who has who until the gift exchange.",
      notPlayingNote: "your name stays on the list so you can sign in, but it’s left out of the draw: no wishlist, no giftee.",
    },
    pin: {
      eyebrow: "step 3 of 3",
      heading: "your pin",
      intro: "the app made this pin for {name}. save it now: you need it, with your pet, to manage this group on another phone.",
      lostIt: "lost it later? the owner link still opens the manage page, and the pin list is there.",
      next: "saved it, choose my pet",
    },
  },
  /** link not found (prototype/NotFound.dc.html) */
  notFound: {
    petLabel: "a sleepy member",
    heading: "this game link doesn’t work",
    body: "it may be mistyped or the group may be gone. ask your host to send the link again.",
  },
} as const;

export type Copy = typeof copy;

/** Fills {key} placeholders in a copy string, e.g. fill(copy.createGroup.pin.intro, { name }). */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
