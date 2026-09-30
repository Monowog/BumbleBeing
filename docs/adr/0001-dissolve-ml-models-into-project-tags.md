---
status: accepted
date: 2026-09-30
---

# Dissolve ML Models into Project tags

v1 treated `/projects` and `/models` as sibling sections with their own page
templates, nav entries and data shapes. A trained model that was built, evaluated
and written up is a software project, so v2 has exactly one `Project` entity and
classifies by `Tag` instead — the former models carry `ml`. `/models` ceases to
exist.

## Considered options

**Two entities, as v1 had.** Rejected: it doubles the page templates and data
shapes for one kind of thing, and the only fields that would have justified the
split — dataset, metrics, training curves — are not fields we are choosing to
render (see the `metrics` omission below).

**One entity, two visual groups on one page.** Rejected as the worst of both: the
split survives in the UI without earning a separate model.

## Consequences

Tags become the axis of classification, so they scale to `game`, `systems`, `web`
without new routes — adding a Project is one file and no route work.

`/models` and `/models/*` 404 in v2. Those child URLs were *already* 404ing in
production (v1's flower linked to `/models/fracture-detector` and two siblings,
none of which existed), and per the rebuild's no-redirect decision no rewrite is
added. This is the part that is hard to reverse: `/projects/garbage-classifier` is
the canonical URL from launch.

`metrics` is deliberately not in the schema. If ML Projects later need accuracy
figures rendered as structured data rather than prose, that is the argument for
revisiting this ADR — it is the one thing a `Model` entity would have given us.
