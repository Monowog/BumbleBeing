# BumbleBeing

Jackson Cmelak's portfolio site — [Bumblebeing.com](https://bumblebeing.com).
A SvelteKit + Tailwind showcase of software projects under a light bumblebee/hive
theme: a fixed honeycomb texture, drifting bees you can switch off, and a burst of
dots around hovered header buttons.

This is **v2**, a rebuild from scratch. See [`CONTEXT.md`](./CONTEXT.md) for the
project's vocabulary and [`docs/adr/`](./docs/adr) for the decisions that would
otherwise look arbitrary.

## Running it

```sh
npm install
npm run dev
```

| Script            | What it does                           |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Dev server                             |
| `npm run build`   | Prerender the whole site               |
| `npm run preview` | Serve the production build             |
| `npm run check`   | `svelte-check` against `tsconfig.json` |
| `npm run lint`    | Prettier + ESLint                      |
| `npm run format`  | Prettier, writing                      |
| `npm test`        | Vitest, once                           |

CI runs `lint`, `check`, `test` and `build` on every PR into `main`.

## Adding a project

A Project is **one file**. Create `src/content/projects/<slug>.svx` — the filename
becomes the URL — and give it frontmatter:

```yaml
---
title: Bone Fracture Detector
blurb: A ResNet classifier that flags fractures in radiographs.
tags: [ml] # game | ml | systems | web — closed set, see CONTEXT.md
tools: [Python, PyTorch, Jupyter]
date: 2025-12-07
repo: https://github.com/Monowog/ResNet-Fracture-Classifier # optional
demo: https://example.com # optional
report: /GarbageClassificationReport.pdf # optional, for work with no public repo
credit: Team project — UC Davis ECS 171 # optional, when it wasn't solo work
images: [] # optional; omit and the page shows no gallery
---
Markdown body. The first paragraph shows above the image strip, so lead with what
the project *is*.
```

Then nothing else. No route to add, no nav entry to edit — the index, the cards and
the sitemap all read from the same glob. Frontmatter is validated with Zod at build
time, so a missing field or an unknown tag **fails the build** rather than rendering
`undefined`.

A Post works the same way in `src/content/posts/`, with `title`, `date`, `blurb` and
optional `tags`.

> `credit` is the field for disclosing collaborative work. It is deliberately not
> called `context` — that name belongs to `CONTEXT.md`.

## Things that are deliberate

Do not "fix" these without reading the reasoning first.

- **Old v1 URLs 404 on purpose.** `/models`, `/models/*`, `/about-me/*` and the
  retired `/projects/{dnd-igor,multi-task-king,magic-the-glyphening}` have no
  redirects. The themed error page is the intended landing spot.
- **There is no component library.** No shadcn-svelte, no `bits-ui`. The primitives
  in `src/lib/components` are hand-rolled, which means accessibility is ours —
  see [ADR 0002](./docs/adr/0002-hand-rolled-ui-over-shadcn-svelte.md).
- **ML models are not a separate section.** They are Projects tagged `ml` —
  see [ADR 0001](./docs/adr/0001-dissolve-ml-models-into-project-tags.md).
- **`legacy-peer-deps=true` in `.npmrc`** works around an npm 10.9.x crash on
  vitest 4's peer graph. The comment in that file says when to remove it.
- **Components reference semantic tokens only** (`--surface`, `--ink`), never
  primitives (`--honey-500`). That is what keeps dark mode a one-place change.

## Where the planning lives

Design decisions, the v1 audit and the phased build plan are in the Obsidian vault
under `PrimaryVault/Bumblebeing/`, not in this repo. `CONTEXT.md` and `docs/adr/`
carry the parts a reader of the code needs.
