/* @ds-bundle: {"format":4,"namespace":"Pawker","components":[{"name":"Pet"},{"name":"VoteCard"},{"name":"Reactions"},{"name":"Button"},{"name":"Chip"},{"name":"Field"},{"name":"Panel"},{"name":"Wordmark"},{"name":"Icon"},{"name":"SceneSky"},{"name":"SceneGround"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function px(n) { return n + "px"; }

  /* ---------- Pet: 16x16 pixel art, five species x four coats ---------- */
  var SHAPES = {
    kitten: [
      [3,2,3,3,"dark"],[10,2,3,3,"dark"],[4,3,1,2,"accent"],[11,3,1,2,"accent"],
      [3,4,10,8,"base"],[3,4,4,3,"patch"],[6,4,1,2,"dark"],[9,4,1,2,"dark"],
      [5,7,2,2,"eye"],[9,7,2,2,"eye"],[5,7,1,1,"shine"],[9,7,1,1,"shine"],
      [7,9,2,1,"nose"],[4,9,1,1,"accent"],[11,9,1,1,"accent"],
      [5,12,6,4,"base"],[8,12,3,4,"patch"],[5,15,2,1,"light"],[9,15,2,1,"light"]
    ],
  
    /* dogs are per-breed: all four are prick-eared, so ear height and face
       markings are what tell them apart. */
    "dog-shiba": [
      [2,1,3,3,"dark"],[11,1,3,3,"dark"],[3,2,1,2,"accent"],[12,2,1,2,"accent"],
      [3,3,10,8,"base"],
      [5,5,2,1,"light"],[9,5,2,1,"light"],
      [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
      [4,8,8,3,"light"],[7,8,2,2,"eye"],
      [5,11,6,5,"base"],[6,12,4,4,"light"],
      [5,15,1,1,"light"],[10,15,1,1,"light"]
    ],
    "dog-husky": [
      [2,1,3,3,"dark"],[11,1,3,3,"dark"],[3,2,1,2,"accent"],[12,2,1,2,"accent"],
      [3,3,10,8,"dark"],[7,3,2,4,"light"],
      [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
      [4,8,8,3,"light"],[7,8,2,2,"nose2"],
      [5,11,6,5,"base"],[6,12,4,4,"light"],
      [5,15,1,1,"light"],[10,15,1,1,"light"]
    ],
    "dog-basenji": [
      [2,0,3,4,"dark"],[11,0,3,4,"dark"],[3,1,1,2,"accent"],[12,1,1,2,"accent"],
      [3,3,10,8,"base"],[7,3,2,3,"light"],
      [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
      [4,8,8,3,"light"],[7,8,2,2,"eye"],
      [5,11,6,5,"base"],[6,12,4,4,"light"],
      [5,15,1,1,"light"],[10,15,1,1,"light"]
    ],
    "dog-pharaoh": [
      [1,0,4,5,"base"],[11,0,4,5,"base"],[2,1,2,3,"accent"],[12,1,2,3,"accent"],
      [3,4,10,7,"base"],[7,4,2,3,"light"],
      [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
      [6,8,4,3,"light"],[7,8,2,2,"nose2"],
      [5,11,6,5,"base"],[6,12,4,4,"light"],
      [5,15,1,1,"light"],[10,15,1,1,"light"]
    ],
    rabbit: [
      [4,0,2,6,"base"],[10,0,2,6,"base"],[4,1,1,4,"accent"],[11,1,1,4,"accent"],
      [3,5,10,7,"base"],
      [5,8,2,2,"eye"],[9,8,2,2,"eye"],[5,8,1,1,"shine"],[9,8,1,1,"shine"],
      [7,10,2,1,"nose"],[4,10,1,1,"accent"],[11,10,1,1,"accent"],
      [4,12,8,4,"base"],[5,15,2,1,"light"],[9,15,2,1,"light"]
    ],
    guineapig: [
      [6,3,4,1,"dark"],[2,4,12,10,"base"],[8,4,6,10,"light"],
      [3,5,2,2,"dark"],[11,5,2,2,"dark"],
      [5,8,2,2,"eye"],[10,8,2,2,"eye"],[5,8,1,1,"shine"],[10,8,1,1,"shine"],
      [7,11,2,1,"nose"],[4,14,2,1,"light"],[10,14,2,1,"dark"]
    ],
    /* front-facing like the rest of the cast: big head, body beneath.
       ears sit high on the top corners (per reference), pale face, dark eye patches. */
    ferret: [
      [3,2,3,2,"dark"],[10,2,3,2,"dark"],[4,2,1,1,"accent"],[11,2,1,1,"accent"],
      [3,3,10,8,"light"],[4,3,8,2,"dark"],
      [4,6,3,2,"dark"],[9,6,3,2,"dark"],
      [5,6,2,2,"eye"],[9,6,2,2,"eye"],[5,6,1,1,"shine"],[9,6,1,1,"shine"],
      [7,9,2,1,"nose"],
      [13,8,2,4,"dark"],[12,11,3,2,"dark"],
      [4,11,8,5,"base"],[6,11,4,3,"light"],
      [4,15,2,1,"dark"],[10,15,2,1,"dark"]
    ]
  };
  var COATS = {
    "kitten-ginger":     { base:"#DE9040", dark:"#C87E30", light:"#EBD9B8" },
    "kitten-slate":      { base:"#9AA5B2", dark:"#79848F", light:"#DDE2E8" },
    "kitten-tuxedo":     { base:"#3E3A36", dark:"#26241F", light:"#F0E6D2", eye:"#F0E6D2", shine:"#151310" },
    "kitten-calico":     { base:"#F4EBDA", dark:"#4A423A", light:"#FBF6EC", patch:"#D98A3C" },
    "dog-shiba":         { base:"#D98A3C", dark:"#A85F22", light:"#F7EFDF" },
    "dog-husky":         { base:"#5A626E", dark:"#3C424C", light:"#F4F2EC", eye:"#3F7BAE", nose2:"#23262B" },
    "dog-basenji":       { base:"#B4642A", dark:"#8A4A1C", light:"#F7EFDF" },
    "dog-pharaoh":       { base:"#C9843F", dark:"#A8672C", light:"#F7EFDF", nose2:"#8A5330" },
    "rabbit-caramel":    { base:"#C99055", dark:"#A3702F", light:"#EBD9B8" },
    "rabbit-grey":       { base:"#96908A", dark:"#6E6862", light:"#DDD8D2" },
    "rabbit-cinnamon":   { base:"#B5723F", dark:"#8A5324", light:"#EBD9B8" },
    "rabbit-white":      { base:"#F5EFE3", dark:"#E4DACA", light:"#FDFAF3", eye:"#A8524C", nose:"#EFAFAF", accent:"#F3CFCA" },
    "guineapig-ginger":  { base:"#B87A34", dark:"#5E3A1C", light:"#EBD9B8" },
    "guineapig-tan":     { base:"#D9A15F", dark:"#8E5A24", light:"#F0E6D2" },
    "guineapig-tri":     { base:"#8C8478", dark:"#5E5850", light:"#C9C2B4" },
    "guineapig-agouti":  { base:"#8A6E42", dark:"#5A4529", light:"#D8C4A0" },
    "ferret-white":      { base:"#F0E9DA", dark:"#DCD2BF", light:"#FCF8EE", eye:"#A8524C", nose:"#EFAFAF", accent:"#F3CFCA" },
    "ferret-champagne":  { base:"#A57E4E", dark:"#8A755E", light:"#D8C4A0" },
    "ferret-silver":     { base:"#9A968E", dark:"#7A756E", light:"#DDD8D0" },
    "ferret-chocolate":  { base:"#7A5638", dark:"#5E4430", light:"#C9B091" }
  };
  var SLUGS = Object.keys(COATS);
  var STATE_ANIM = {
    idle: "pk-bob 3.4s ease-in-out infinite",
    sniff: "pk-sniff 2.9s ease-in-out infinite",
    doze: "pk-doze 4.6s ease-in-out infinite",
    zoomies: "pk-zoom 0.9s ease-in-out infinite",
    still: "none"
  };
  var CACHE = {};
  function rectsFor(slug) {
    if (CACHE[slug]) return CACHE[slug];
    var src = COATS[slug] || COATS["kitten-ginger"];
    var coat = Object.assign({ accent: "#F3AFC1", eye: "#2B2118", nose: "#EE8FA6", shine: "#FFFFFF", patch: src.base, nose2: "#2B2118" }, src);
    var shape = SHAPES[slug] || SHAPES[slug.split("-")[0]] || SHAPES.kitten;
    CACHE[slug] = shape.map(function (r, i) { return { key: i, x: r[0], y: r[1], w: r[2], h: r[3], f: coat[r[4]] }; });
    return CACHE[slug];
  }
  function Pet(p) {
    if (p.slug && !COATS[p.slug]) console.warn("[Pet] unknown slug:", p.slug, "- rendering kitten-ginger");
    var slug = COATS[p.slug] ? p.slug : "kitten-ginger";
    var state = STATE_ANIM[p.state] ? p.state : "idle";
    var size = p.size || 62;
    var anim = STATE_ANIM[state] + (state !== "still" && p.delay ? " " + p.delay + "s" : "");
    return h("div", { className: cx("pk-pet", p.className), style: { width: px(size), height: px(size) }, role: "img", "aria-label": p.label || "member" },
      h("div", { className: "pk-pet-shadow" }),
      h("svg", { viewBox: "0 0 16 16", width: size, height: size, shapeRendering: "crispEdges", className: "pk-pet-art", style: { animation: anim } },
        rectsFor(slug).map(function (r) { return h("rect", { key: r.key, x: r.x, y: r.y, width: r.w, height: r.h, fill: r.f }); })));
  }
  Pet.slugs = SLUGS;

  /* ---------- the paw pip, shared by VoteCard and Wordmark ---------- */
  function Paw(p) {
    var s = { fill: p.fill };
    return h("svg", { viewBox: "0 0 16 16", width: p.size, height: p.size, shapeRendering: "crispEdges", "aria-hidden": "true" },
      h("rect", { x: 5, y: 8, width: 6, height: 5, style: s }),
      h("rect", { x: 2, y: 6, width: 2, height: 3, style: s }),
      h("rect", { x: 5, y: 4, width: 2, height: 3, style: s }),
      h("rect", { x: 9, y: 4, width: 2, height: 3, style: s }),
      h("rect", { x: 12, y: 6, width: 2, height: 3, style: s }));
  }

  /* ---------- VoteCard ---------- */
  var CARD = { sm: { w: 42, h: 58, num: 21, paw: 22 }, md: { w: 46, h: 64, num: 24, paw: 24 } };
  function VoteCard(p) {
    var s = CARD[p.size] || CARD.md;
    var mine = !!p.mine;
    var voted = p.voted !== false && !p.empty;
    var w = mine ? s.w + 2 : s.w, hh = mine ? s.h + 2 : s.h;
    if (!voted) {
      return h("div", { className: "pk-card pk-card-empty", style: { width: px(s.w), height: px(s.h) }, "aria-label": "no card yet" },
        h(Paw, { size: s.paw, fill: "var(--card-empty-paw)" }));
    }
    return h("div", {
      className: cx("pk-card", mine && "pk-card-mine"),
      style: { width: px(w), height: px(hh), background: p.bg || "var(--panel)", borderColor: p.border || (mine ? "var(--action)" : "var(--border)") },
      "aria-label": p.revealed ? "card " + p.card : "face-down card"
    }, p.revealed
      ? h("span", { className: "pk-card-num", style: { fontSize: px(s.num), color: p.ink || "var(--ink)" } }, p.card == null ? "5" : p.card)
      : h(Paw, { size: s.paw, fill: mine ? "var(--action)" : "var(--card-paw)" }));
  }

  /* ---------- Reactions ---------- */
  var GLYPHS = {
    heart: [[1,1,2,1,"react-heart"],[5,1,2,1,"react-heart"],[0,2,8,2,"react-heart"],[1,4,6,1,"react-heart"],[2,5,4,1,"react-heart"],[3,6,2,1,"react-heart"]],
    snack: [[0,2,2,4,"react-snack-dark"],[6,2,2,4,"react-snack-dark"],[2,3,4,2,"react-snack"]],
    scratch: [[1,2,1,2,"react-scratch"],[3,1,2,2,"react-scratch"],[6,2,1,2,"react-scratch"],[2,4,4,3,"react-scratch"]],
    poke: [[3,0,2,1,"react-bell-dark"],[2,1,4,1,"react-bell"],[1,2,6,3,"react-bell"],[0,5,8,1,"react-bell-dark"],[3,6,2,1,"react-bell-dark"]]
  };
  var RING = { heart: "react-heart-ring", snack: "react-snack-ring", scratch: "react-scratch-ring", poke: "react-bell" };
  function ReactionButton(p) {
    return h("button", { type: "button", className: "pk-react pk-react-" + p.kind, style: { borderColor: "var(--" + RING[p.kind] + ")" }, "aria-label": p.kind, onClick: function () { p.onReact && p.onReact(p.kind); } },
      h("svg", { viewBox: "0 0 8 8", width: 15, height: 15, shapeRendering: "crispEdges", "aria-hidden": "true" },
        GLYPHS[p.kind].map(function (r, i) { return h("rect", { key: i, x: r[0], y: r[1], width: r[2], height: r[3], style: { fill: "var(--" + r[4] + ")" } }); })));
  }
  function Reactions(p) {
    return h("div", { className: cx("pk-reactions", p.className) },
      h(ReactionButton, { kind: "heart", onReact: p.onReact }),
      h(ReactionButton, { kind: "snack", onReact: p.onReact }),
      h(ReactionButton, { kind: "scratch", onReact: p.onReact }),
      p.canPoke ? h(ReactionButton, { kind: "poke", onReact: p.onReact }) : null);
  }

  /* ---------- Button: the pill ---------- */
  function Button(p) {
    var variant = p.variant || "primary";
    var rest = Object.assign({}, p);
    ["variant", "tone", "icon", "className", "children"].forEach(function (k) { delete rest[k]; });
    var cls = variant === "primary"
      ? cx("pk-btn", "pk-btn-primary", p.className)
      : cx("pk-btn", "pk-btn-utility", "pk-tone-" + (p.tone || "neutral"), p.className);
    return h("button", Object.assign({ type: "button", className: cls }, rest),
      variant !== "primary" && p.icon ? h("span", { className: "pk-btn-icon", "aria-hidden": "true" }, p.icon) : null,
      p.children);
  }

  /* ---------- Chip ---------- */
  function Chip(p) {
    var cls = cx("pk-chip", "pk-chip-" + (p.tone || "neutral"), p.onClick && "pk-chip-button", p.className);
    return p.onClick
      ? h("button", { type: "button", className: cls, onClick: p.onClick }, p.children)
      : h("span", { className: cls }, p.children);
  }

  /* ---------- Field ---------- */
  function Field(p) {
    var rest = Object.assign({}, p);
    delete rest.invalid; delete rest.className;
    return h("input", Object.assign({ type: "text", className: cx("pk-field", p.invalid && "pk-field-invalid", p.className), "aria-invalid": p.invalid ? "true" : undefined }, rest));
  }

  /* ---------- Panel ---------- */
  var PANEL = {
    room:    { r: "var(--radius-panel)",   b: "var(--stroke-ui)",    s: "var(--shadow-panel)" },
    step:    { r: "var(--radius-step)",    b: "var(--stroke-ui)",    s: "var(--shadow-step)" },
    door:    { r: "var(--radius-door)",    b: "var(--stroke-heavy)", s: "var(--shadow-step)" },
    overlay: { r: "var(--radius-overlay)", b: "var(--stroke-heavy)", s: "var(--shadow-overlay)" }
  };
  function Panel(p) {
    var k = PANEL[p.size] || PANEL.room;
    return h("div", {
      className: cx("pk-panel", p.className),
      style: Object.assign({ borderRadius: k.r, borderWidth: k.b, boxShadow: k.s, background: p.inner ? "var(--panel-inner)" : "var(--panel)" }, p.style)
    }, p.children);
  }

  /* ---------- Wordmark ---------- */
  function Wordmark(p) {
    var lockup = h(p.href ? "a" : "div", { className: "pk-wordmark", href: p.href, onClick: p.onClick },
      h("span", { className: "pk-wordmark-mark" }, h(Paw, { size: 14, fill: "var(--action)" })),
      h("span", { className: "pk-wordmark-word" }, p.word || "pawker"));
    if (!p.burrow) return lockup;
    return h("div", { className: "pk-header" }, lockup,
      h("div", { className: "pk-header-sub" },
        h("span", { className: "pk-header-burrow" }, p.burrow),
        p.members != null ? h("span", { className: "pk-header-members" }, p.members + " members") : null));
  }

  /* ---------- Icon: the ui set, 12x12 pixel grid, one colour ---------- */
  var ICONS = {
    back: "M6 2h2v1h-2zM5 3h2v1h-2zM4 4h2v1h-2zM3 5h2v1h-2zM3 6h2v1h-2zM4 7h2v1h-2zM5 8h2v1h-2zM6 9h2v1h-2z",
    forward: "M3 2h2v1h-2zM4 3h2v1h-2zM5 4h2v1h-2zM6 5h2v1h-2zM6 6h2v1h-2zM5 7h2v1h-2zM4 8h2v1h-2zM3 9h2v1h-2z",
    close: "M1 1h2v1h-2zM9 1h2v1h-2zM2 2h2v1h-2zM8 2h2v1h-2zM3 3h2v1h-2zM7 3h2v1h-2zM4 4h4v1h-4zM5 5h2v1h-2zM4 6h4v1h-4zM3 7h2v1h-2zM7 7h2v1h-2zM2 8h2v1h-2zM8 8h2v1h-2zM1 9h2v1h-2zM9 9h2v1h-2z",
    menu: "M1 2h10v1h-10zM1 3h10v1h-10zM1 5h10v1h-10zM1 6h10v1h-10zM1 8h10v1h-10zM1 9h10v1h-10z",
    plus: "M5 1h2v1h-2zM5 2h2v1h-2zM5 3h2v1h-2zM5 4h2v1h-2zM1 5h10v1h-10zM1 6h10v1h-10zM5 7h2v1h-2zM5 8h2v1h-2zM5 9h2v1h-2zM5 10h2v1h-2z",
    check: "M9 2h2v1h-2zM8 3h2v1h-2zM7 4h2v1h-2zM0 5h2v1h-2zM6 5h2v1h-2zM1 6h2v1h-2zM5 6h2v1h-2zM2 7h4v1h-4zM3 8h2v1h-2z",
    gift: "M2 1h2v1h-2zM8 1h2v1h-2zM3 2h2v1h-2zM7 2h2v1h-2zM1 3h10v1h-10zM1 4h1v1h-1zM5 4h2v1h-2zM10 4h1v1h-1zM1 5h10v1h-10zM2 6h1v1h-1zM5 6h2v1h-2zM9 6h1v1h-1zM2 7h1v1h-1zM5 7h2v1h-2zM9 7h1v1h-1zM2 8h1v1h-1zM5 8h2v1h-2zM9 8h1v1h-1zM2 9h1v1h-1zM5 9h2v1h-2zM9 9h1v1h-1zM2 10h8v1h-8z",
    wishlist: "M1 2h2v1h-2zM4 2h7v1h-7zM1 3h2v1h-2zM4 3h7v1h-7zM1 5h2v1h-2zM4 5h7v1h-7zM1 6h2v1h-2zM4 6h7v1h-7zM1 8h2v1h-2zM4 8h7v1h-7zM1 9h2v1h-2zM4 9h7v1h-7z",
    link: "M1 3h4v1h-4zM7 3h4v1h-4zM0 4h2v1h-2zM4 4h1v1h-1zM7 4h1v1h-1zM10 4h2v1h-2zM0 5h1v1h-1zM3 5h6v1h-6zM11 5h1v1h-1zM0 6h2v1h-2zM4 6h1v1h-1zM7 6h1v1h-1zM10 6h2v1h-2zM1 7h4v1h-4zM7 7h4v1h-4z",
    copy: "M4 1h7v1h-7zM4 2h1v1h-1zM10 2h1v1h-1zM1 3h7v1h-7zM10 3h1v1h-1zM1 4h1v1h-1zM7 4h1v1h-1zM10 4h1v1h-1zM1 5h1v1h-1zM7 5h1v1h-1zM10 5h1v1h-1zM1 6h1v1h-1zM7 6h4v1h-4zM1 7h1v1h-1zM7 7h1v1h-1zM1 8h1v1h-1zM7 8h1v1h-1zM1 9h7v1h-7z",
    key: "M1 3h4v1h-4zM0 4h1v1h-1zM5 4h1v1h-1zM0 5h1v1h-1zM2 5h2v1h-2zM5 5h7v1h-7zM0 6h1v1h-1zM2 6h2v1h-2zM5 6h2v1h-2zM8 6h1v1h-1zM10 6h1v1h-1zM0 7h1v1h-1zM5 7h1v1h-1zM8 7h1v1h-1zM10 7h1v1h-1zM1 8h4v1h-4z",
    info: "M3 1h6v1h-6zM2 2h1v1h-1zM9 2h1v1h-1zM1 3h1v1h-1zM5 3h2v1h-2zM10 3h1v1h-1zM1 4h1v1h-1zM10 4h1v1h-1zM1 5h1v1h-1zM5 5h2v1h-2zM10 5h1v1h-1zM1 6h1v1h-1zM5 6h2v1h-2zM10 6h1v1h-1zM1 7h1v1h-1zM5 7h2v1h-2zM10 7h1v1h-1zM2 8h1v1h-1zM9 8h1v1h-1zM3 9h6v1h-6z",
    manage: "M1 2h5v1h-5zM7 2h4v1h-4zM1 3h5v1h-5zM7 3h4v1h-4zM1 5h2v1h-2zM4 5h7v1h-7zM1 6h2v1h-2zM4 6h7v1h-7zM1 8h7v1h-7zM9 8h2v1h-2zM1 9h7v1h-7zM9 9h2v1h-2z",
    lock: "M4 1h4v1h-4zM3 2h1v1h-1zM8 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM2 4h8v1h-8zM2 5h8v1h-8zM2 6h3v1h-3zM7 6h3v1h-3zM2 7h3v1h-3zM7 7h3v1h-3zM2 8h8v1h-8zM2 9h8v1h-8z",
    calendar: "M3 1h1v1h-1zM8 1h1v1h-1zM1 2h10v1h-10zM1 3h1v1h-1zM10 3h1v1h-1zM1 4h10v1h-10zM1 5h1v1h-1zM10 5h1v1h-1zM1 6h1v1h-1zM3 6h2v1h-2zM7 6h2v1h-2zM10 6h1v1h-1zM1 7h1v1h-1zM10 7h1v1h-1zM1 8h1v1h-1zM3 8h2v1h-2zM7 8h2v1h-2zM10 8h1v1h-1zM1 9h1v1h-1zM10 9h1v1h-1zM1 10h10v1h-10z",
    bell: "M5 1h2v1h-2zM4 2h1v1h-1zM7 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM3 4h1v1h-1zM8 4h1v1h-1zM3 5h1v1h-1zM8 5h1v1h-1zM2 6h1v1h-1zM9 6h1v1h-1zM1 7h10v1h-10zM5 9h2v1h-2z"
  };
  function Icon(p) {
    var d = ICONS[p.name];
    if (!d) { if (window.console) console.warn("Pawker.Icon: unknown icon " + p.name); return null; }
    var size = p.size === 24 ? 24 : 12;
    var a11y = p.label ? { role: "img", "aria-label": p.label } : { "aria-hidden": "true" };
    return h("svg", Object.assign({ className: cx("pk-icon", p.className), width: size, height: size, viewBox: "0 0 12 12", shapeRendering: "crispEdges", fill: "currentColor", focusable: "false" }, a11y),
      h("path", { d: d }));
  }

  /* ---------- SceneSky: falling snow and gold sparkles behind the content ---------- */
  /* [kind f=flake t=sparkle, px, left %, top px, delay s, duration s, alt gold] */
  var SKY = [["f",4,13.8,360,-6.1,16,0],["t",14,83.3,758,1.0,0,0],["t",10,75.9,77,1.5,0,1],["t",14,56.8,666,0.1,0,0],["t",14,67.3,33,0.7,0,0],["f",6,76.4,286,-6.7,20,0],["f",4,66.3,328,-5.3,16,0],["f",6,94.5,670,-13.8,16,0],["t",14,19.1,398,0.8,0,0],["t",14,61.0,371,2.2,0,0],["f",6,26.2,502,-4.9,20,0],["f",6,72.8,212,-9.5,12,0],["f",6,37.9,616,-10.9,12,0],["f",6,88.0,396,-0.5,16,0],["t",10,27.2,761,0,0,0],["f",6,35.5,803,-5.6,12,0],["t",20,88.6,80,0.6,0,0],["f",6,9.4,541,-2.9,20,0],["f",4,64.0,607,-10.9,12,0],["t",14,67.1,235,0.3,0,0],["f",4,88.6,212,-13.7,20,0],["f",4,10.6,501,-0.9,16,0],["t",20,82.1,106,0.1,0,0],["f",6,37.1,331,-12.9,20,0],["t",14,35.3,139,2.3,0,0],["f",4,29.5,184,-3.6,16,0],["f",4,31.6,408,-4.3,20,0],["f",4,56.6,40,-5.7,20,0],["t",20,17.6,397,1.7,0,0],["f",4,51.4,342,-0.8,20,0],["t",20,79.3,288,0.3,0,1],["f",4,48.2,385,-5.9,12,0],["t",14,89.2,458,0.8,0,0],["f",6,87.7,357,-9.4,12,0],["f",4,48.0,32,-13.3,12,0],["t",10,84.2,501,2.1,0,1],["f",6,43.6,86,-6.7,20,0],["f",6,85.7,710,-9.8,20,0],["f",4,7.2,49,-1.4,20,0],["f",6,20.8,577,-6.9,20,0],["f",4,21.5,118,-10.1,16,0],["t",10,72.0,477,2.3,0,1],["t",10,76.9,779,0.4,0,1],["t",14,81.7,215,0.7,0,1],["f",4,8.0,607,-0.8,16,0],["f",4,44.5,628,-5.8,16,0],["f",6,13.3,740,-3.7,20,0],["f",6,71.4,47,-13.2,20,0]];
  var FLAKE = "M0 0h1v1h-1z", SPARK = "M2 0h1v5h-1zM0 2h5v1h-5z";
  function SceneSky(p) {
    return h("div", { className: cx("pk-sky", p.className), "aria-hidden": "true" },
      SKY.map(function (s, i) {
        var flake = s[0] === "f";
        var st = { left: s[2] + "%", top: px(s[3]) };
        if (s[4]) st.animationDelay = s[4] + "s";
        if (s[5]) st.animationDuration = s[5] + "s";
        return h("svg", { key: i, className: flake ? "pk-fall" : "pk-twinkle", width: s[1], height: s[1], viewBox: flake ? "0 0 1 1" : "0 0 5 5", shapeRendering: "crispEdges", style: st },
          h("path", { d: flake ? FLAKE : SPARK, style: { fill: flake ? "var(--snow)" : (s[6] ? "var(--sparkle-2)" : "var(--sparkle)") } }));
      }));
  }

  /* ---------- SceneGround: snowbank, pixel trees and gifts at the end of a page ---------- */
  var TREE = [
    [5,0,1,1,"sparkle-2"],[4,1,3,1,"sparkle-2"],
    [4,2,3,2,"tree"],[4,3,3,1,"tree-dark"],[3,4,5,2,"tree"],[3,5,5,1,"tree-dark"],
    [2,6,7,2,"tree"],[2,7,7,1,"tree-dark"],[1,8,9,2,"tree"],[1,9,9,1,"tree-dark"],
    [0,10,11,2,"tree"],[0,11,11,1,"tree-dark"],
    [3,5,1,1,"berry"],[7,7,1,1,"sparkle-2"],[4,9,1,1,"berry"],[8,11,1,1,"berry"],[2,11,1,1,"sparkle-2"],
    [3,4,2,1,"snow"],[7,6,2,1,"snow"],[1,8,2,1,"snow"],[8,10,2,1,"snow"],
    [4,12,3,3,"trunk"]
  ];
  function Tree(p) {
    return h("svg", { width: p.w, height: p.h, viewBox: "0 0 11 16", shapeRendering: "crispEdges", style: p.style },
      TREE.map(function (r, i) { return h("rect", { key: i, x: r[0], y: r[1], width: r[2], height: r[3], style: { fill: "var(--" + r[4] + ")" } }); }));
  }
  function Gift(p) {
    return h("svg", { width: p.size, height: p.size, viewBox: "0 0 10 10", shapeRendering: "crispEdges", style: p.style },
      h("path", { d: "M1 4h8v6h-8zM0 3h10v2h-10z", style: { fill: "var(--" + p.box + ")" } }),
      h("path", { d: "M4 3h2v7h-2zM2 1h2v2h-2zM6 1h2v2h-2z", style: { fill: "var(--" + p.ribbon + ")" } }));
  }
  var BANK = "M0 4h1v22h-1zM1 5h3v21h-3zM4 6h7v20h-7zM11 5h4v21h-4zM15 4h3v22h-3zM18 3h6v23h-6zM24 2h11v24h-11zM35 1h7v25h-7zM42 0h1v26h-1zM43 1h5v25h-5zM48 2h2v24h-2zM50 3h3v23h-3zM53 4h2v22h-2zM55 5h13v21h-13zM68 4h12v22h-12zM80 3h5v23h-5zM85 2h3v24h-3zM88 1h4v25h-4zM92 0h7v26h-7zM99 1h3v25h-3zM102 2h2v24h-2zM104 3h3v23h-3zM107 4h5v22h-5zM112 5h5v21h-5zM117 4h7v22h-7zM124 5h6v21h-6z";
  function at(left, bottom) { return { position: "absolute", left: left, bottom: px(bottom) }; }
  function SceneGround(p) {
    return h("div", { className: cx("pk-ground", p.className), "aria-hidden": "true" },
      h("svg", { width: "100%", height: 40, viewBox: "0 0 130 26", preserveAspectRatio: "none", shapeRendering: "crispEdges", style: { position: "absolute", left: 0, bottom: 0, display: "block" } },
        h("path", { d: BANK, style: { fill: "var(--snow)" } }),
        h("path", { d: "M0 18h130v8h-130z", style: { fill: "var(--snow-shade)" } })),
      h(Tree, { w: 39, h: 58, style: at("-6px", 25) }),
      h(Gift, { size: 26, box: "berry", ribbon: "sparkle-2", style: at("15%", 31) }),
      h(Tree, { w: 50, h: 74, style: at("23.5%", 32) }),
      h(Gift, { size: 30, box: "sparkle-2", ribbon: "tree", style: at("41%", 26) }),
      h(Gift, { size: 22, box: "sparkle-2", ribbon: "tree", style: at("53%", 28) }),
      h(Gift, { size: 26, box: "berry", ribbon: "sparkle-2", style: at("64.5%", 32) }),
      h(Tree, { w: 45, h: 66, style: at("77%", 28) }),
      h(Tree, { w: 33, h: 48, style: at("calc(100% - 50px)", 28) }));
  }

  window.Pawker = Object.assign(window.Pawker || {}, { Pet: Pet, VoteCard: VoteCard, Reactions: Reactions, Button: Button, Chip: Chip, Field: Field, Panel: Panel, Wordmark: Wordmark, Icon: Icon, SceneSky: SceneSky, SceneGround: SceneGround });
})();
