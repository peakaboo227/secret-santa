VoteCard is the played card at a seat: a paw back while hidden, the number on reveal, and a greyed paw for a seat that has not voted.

Provide `voted`, `revealed`, `mine` and `card`; `size` is `md` at the table and `sm` in tight rows.

- `mine` is viewer-relative and that is the point: every player sees exactly one action-coloured card, their own. It is not a role, a host marker, or a colour anyone else sees. Do not unify it.
- Your own card is `action` paw, a 3px ring and 2px larger. Everyone else's is `panel` face, `border` ring and `card-paw`.
- Card values are bare numerals. The `?` card is the only one with a word under it.
- `bg`, `border` and `ink` exist for one-off overrides; leave them unset so the theme applies.
