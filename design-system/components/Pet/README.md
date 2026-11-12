Pet renders one member as a 16x16 pixel-art animal, the only avatar boo has.

Provide `slug` (one of the 20 approved coats), and optionally `state`, `size` and `delay`.

- Deal coats at random. There is no picker, and the UI never names the species or coat to the user: not in a caption, not in alt text. User-facing copy says "members", never "pets".
- Pets are art, not chrome. Their coats are fixed colours and do not change with the theme.
- No outline, frame or backing shape behind a pet. On the bed, coats sit two steps darker than `bed-cushion`.
- Sizes in use: 80-88px seated, 64px for a watcher off the bed, 62px default, smaller in the playground.
- States: `idle` for present, `sniff` while choosing, `doze` for watching or not voting yet, `zoomies` for celebration, `still` when motion would distract. Stagger a crowd with `delay`.
- Never redraw a pet inline. Import it.
