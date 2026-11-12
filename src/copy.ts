// Every piece of UI text lives here, referenced by key: labels, buttons, headings,
// messages, placeholders, errors. All lowercase (names people type stay as typed).
// No translation library. Add keys grouped by screen.
export const copy = {
  meta: {
    title: "secret santa",
    description: "a secret santa for friends",
  },
  home: {
    appName: "secret santa",
    line: "open the game link your host sent you",
  },
} as const;

export type Copy = typeof copy;
