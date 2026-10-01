---
status: accepted
date: 2026-09-30
---

# Hand-rolled UI primitives instead of shadcn-svelte

v1 vendored 18 shadcn-svelte component directories on top of `bits-ui`; after
dropping the sidebar, flower layout, carousel and search form, only five were
load-bearing. v2 writes its own minimal primitives instead and removes `bits-ui`
and `mode-watcher` entirely, so the Hive theme is the only thing decorating the
page and the component layer stays small enough to read in one sitting.

## Considered options

**Keep shadcn-svelte.** Rejected: ~18 directories of vendored code to maintain for
five components we actually use, and its styling conventions fight a bespoke
beige/amber token system.

**Keep `bits-ui` for the two accessible primitives only** (mobile nav disclosure,
theme toggle). Rejected, but this is the closest call. With four nav links and no
submenus there is no focus-trap requirement — a focus trap is for modal dialogs,
and the mobile nav is not one. A `<button aria-expanded aria-controls>` toggling a
list, and a `<button aria-pressed>` for the theme, cover it.

## Consequences

**Accessibility is now ours to get right.** Nothing supplies focus management,
escape-to-close or ARIA wiring for us. The mobile nav and theme toggle are the two
places where a regression would be invisible in a screenshot — check them by
keyboard, not by eye.

`clsx` + `tailwind-merge` are kept for `cn()`: without class merging, a `class`
prop passed to a component that hardcodes a competing utility resolves by source
order, which is a coin flip. `tailwind-variants` and `tw-animate-css` are dropped;
keyframes are hand-written.

This ADR is what makes "why isn't this using a component library?" answerable.
Reintroducing shadcn-svelte later means re-theming against the two-layer token
system, which is the real cost of reversing it.
