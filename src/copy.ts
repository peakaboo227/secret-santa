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
  /** app home (prototype/AppHome.dc.html). {names} is "1 name" or "3 names"; {joined} is a number. */
  home: {
    petLabel: "a member",
    create: "create a group",
    groups: "groups i manage",
    summary: "{names} · {joined} joined",
    notDrawn: "not drawn yet",
    noGroups: "no groups on this device",
    noGroupsBody:
      "made a group on another phone? open its game link and sign in with your name, pin and character. manage shows up for the host.",
  },
  /** How many names are on a group's list. {n} is the number. */
  names: { one: "{n} name", many: "{n} names" },
  /** manage page (prototype/Manage.dc.html). */
  manage: {
    myGroups: "my groups",
    eyebrow: "manage",
    done: "✓",
    names: {
      title: "names",
      sub: "{names} · {joined} joined",
      list: "names",
      you: "· you",
      joined: "joined",
      notJoined: "not joined",
      wishlist: "wishlist",
      noWishlist: "no wishlist",
    },
    rules: {
      title: "rules",
      sub: "who can’t give to whom (optional)",
      none: "no rules. anyone can draw anyone.",
    },
    link: {
      title: "game link",
      sub: "copy it any time",
      copy: "copy",
      copied: "copied",
      note: "share it in your group chat. nobody gets in without their name and pin.",
    },
    draw: {
      title: "draw names",
      sub: "once everyone has joined",
      button: "draw names",
      needThree: "add at least 3 people who are playing before you can draw.",
      waitingFor: "waiting for {names} to join.",
    },
    exchange: {
      title: "gift exchange",
      sub: "at the party",
      later: "opens after the draw.",
    },
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
        "you’ll get a character, a wishlist and a giftee like everyone. you still can’t see who has who until the gift exchange.",
      saveFailed: "couldn’t save the group. try again in a moment.",
      notPlayingNote: "your name stays on the list so you can sign in, but it’s left out of the draw: no wishlist, no giftee.",
    },
    pin: {
      eyebrow: "step 3 of 3",
      heading: "your pin",
      intro: "the app made this pin for {name}. save it now: you need it, with your character, to manage this group on another phone.",
      lostIt: "lost it later? the owner link still opens the manage page, and the pin list is there.",
      next: "saved it, choose my character",
    },
  },
  /** The group block under the wordmark. {budget} and {day} are filled in from the group. */
  group: {
    info: "budget {budget} · gift day {day}",
  },
  months: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
  /** choose your pet (prototype/ChoosePet.dc.html). {n} is the pet's number in the grid. */
  choosePet: {
    back: "back",
    heading: "choose your character",
    intro:
      "your santa only ever sees your character and character name, never your real name. remember which one you pick: it’s how you get back in on a new phone.",
    pets: "characters",
    pet: "character {n}",
    shared: "others can pick the same character. your character name tells you apart.",
    confirm: "yup, that’s me",
    pickFirst: "pick a character first",
    saveFailed: "couldn’t save your character. try again in a moment.",
  },
  /** meet your pet (prototype/MeetPet.dc.html). {pet} is the member's own pet name. */
  meetPet: {
    petLabel: "your character",
    heading: "you’re {character}",
    body: "your santa will see {character} and your wishlist, never your name.",
    continue: "continue",
  },
  /** instructions (prototype/Instructions.dc.html). The same for every group. */
  instructions: {
    heading: "how it works",
    intro: "you can open this again from the menu.",
    illustration: "[illustration]",
    steps: [
      {
        title: "write your wishlist",
        body: "add a few wishes so your santa knows what you’d like. you can change them any time.",
      },
      {
        title: "wait for the draw",
        body: "once everyone has joined, your host draws names. nobody, not even the host, sees who has who.",
      },
      {
        title: "find your giftee’s gift",
        body: "you’ll see your giftee’s character and wishlist. tap “i’m preparing the gift” so they know not to change it.",
      },
      {
        title: "bring it on gift day",
        body: "at the party, guess who your santa is before the reveal.",
      },
    ],
    toManage: "go to the manage page",
    toWishlist: "start my wishlist",
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
