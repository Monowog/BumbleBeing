# BumbleBeing

Jackson Cmelak's portfolio site: a showcase of software projects, an about page, and
a blog, under a light bumblebee/hive theme. This file is the glossary — the words
this repo uses and the ones it refuses. Design decisions live in
`docs/adr/`; the full narrative is in the Obsidian vault under
`PrimaryVault/Bumblebeing/Dev/`.

## Language

### Content

**Project**:
A piece of software Jackson built, presented with its own page. Trained models are
Projects; there is no separate concept for them (see ADR 0001).
_Avoid_: Model, app, work, piece, portfolio item

**Writeup**:
The prose body of a Project's page — what it does, how it was built, why it exists.
_Avoid_: Description, case study, README, details

**Blurb**:
The one- or two-line summary of a Project, shown on its Card and nowhere else.
Distinct from the Writeup, which is the long form.
_Avoid_: Description, summary, excerpt, tagline, subtitle

**Card**:
The compact unit representing one Project in a listing: Thumbnail, title, Blurb,
Tool chips.
_Avoid_: Tile, item, preview, entry

**Thumbnail**:
The single image standing for a Project on its Card. A Placeholder Tile when no
screenshot exists.
_Avoid_: Icon, image, cover, hero

**Placeholder Tile**:
A generated honeycomb image used as a Thumbnail when a Project has no screenshot.
Deliberately visible as a stand-in, not a broken image.
_Avoid_: Fallback, default image, dummy

**Report**:
A published PDF that serves as a Project's public artifact when its source is not
public.
_Avoid_: Paper, doc, writeup, attachment

**Post**:
A dated piece of writing published to the Beelog. A separate concept from a Project:
a Project is a thing built, a Post is a thing written.
_Avoid_: Article, entry, blog, note

**Beelog**:
The site's blog section, where Posts are published.
_Avoid_: Blog, journal, writing, news

### Classification

**Tag**:
One member of a closed set — `game`, `ml`, `systems`, `web` — naming the kind of
work a Project is. Drives the coloured chip on a Card. Closed because every member
must have a colour.
_Avoid_: Category, type, kind, topic, label, collection

**Tool**:
A named technology used to build a Project (`Godot`, `Typescript`, `SQLite3`).
Free-form, display-only, and never a Tag.
_Avoid_: Tech, stack, skill, language, framework, dependency

**Credit**:
A Project's short disclosure that the work was not solo — e.g. "Team project — UC
Davis ECS 171". One sentence, not a list of names.
_Avoid_: Context, collaborators, team, credits, attribution, authors

### Hive theme

**Hive theme**:
The collective name for the site's bumblebee motif: the Honeycomb,
the Bees, and the Buzz.
_Avoid_: Bee theme, branding, skin

**Honeycomb**:
The hexagonal texture behind all content, fixed while the page scrolls.
_Avoid_: Hexagons, hexes, pattern, background, mesh, grid

**Bees**:
The drifting particles that wander the viewport and avoid the cursor. The reader can
turn them off, and that choice persists.
_Avoid_: Particles, dots, sprites, insects, flies

**Buzz**:
The short burst of dots around a header button under hover or keyboard focus.
Belongs to the header alone and is unrelated to the Bees.
_Avoid_: Particles, dots, hover effect, sparkle, jitter

**Čmelák**:
Czech for bumblebee (*tschmeh-lahk*), and the site's namesake.
_Avoid_: Bumblebee (when referring to the name itself)
