/* @ds-bundle: {"format":4,"namespace":"Pawker","components":[{"name":"Pet"},{"name":"VoteCard"},{"name":"Reactions"},{"name":"Button"},{"name":"Chip"},{"name":"Field"},{"name":"Panel"},{"name":"Wordmark"}]} */
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
      h("span", { className: "pk-wordmark-word" }, "pawker"));
    if (!p.burrow) return lockup;
    return h("div", { className: "pk-header" }, lockup,
      h("div", { className: "pk-header-sub" },
        h("span", { className: "pk-header-burrow" }, p.burrow),
        p.members != null ? h("span", { className: "pk-header-members" }, p.members + " members") : null));
  }

  window.Pawker = Object.assign(window.Pawker || {}, { Pet: Pet, VoteCard: VoteCard, Reactions: Reactions, Button: Button, Chip: Chip, Field: Field, Panel: Panel, Wordmark: Wordmark });
})();
