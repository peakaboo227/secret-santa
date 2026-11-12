SceneGround is the christmas-night ground: a pixel snowbank with four pixel trees and four gifts, 96px tall and full width.

Provide nothing; place it as the last block of the page's scrolling content (`margin-top: auto` in a column), so it sits at the end of the page.

- christmas-night only.
- At the end of the page, never pinned to the screen: pinned, the trees would cover buttons and tabs on a phone. On tab screens it sits above the tab bar, at the end of scrolling.
- Trees are drawn on an 11 by 16 grid, gifts on 10 by 10, the snowbank on 130 by 26 stretched to the full width.
- Decoration only: hidden from screen readers, never a button.
- Colours come from `snow`, `snow-shade`, `tree`, `tree-dark`, `trunk`, `berry` and `sparkle-2`. Berry and green never carry meaning. Never redraw a tree or gift inline.
