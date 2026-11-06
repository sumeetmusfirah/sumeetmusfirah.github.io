# Design drafts (not published)

Standalone HTML prototypes from the 2026-11-02 to 2026-11-04 redesign sessions. Nothing here is deployed;
the site is built from `src/` and `public/` only.

Open one with a local server so the browser loads it properly:

    cd drafts && python3 -m http.server 4177
    # then visit http://localhost:4177/neuro.html

- `neuro.html` (latest, in progress): the particles reshape into Field, Brain, Spine, Neuron and Connectome.
  Add `?shape=Brain` (or Spine, Neuron, Connectome) to jump straight to one. It uses classic three.js r128 so
  it works in Safari; errors print on the page. Sumeet said the earlier module version "doesn't load at all" in
  Safari, and this fix has not been confirmed by her yet.
- `attractors.html`: the first particle-field prototype, which became the live home page.
- `quirky.html`: four rejected directions (Second thoughts, Brainwave, My desk, Toss my name).
- `index.html`: three rejected "designer" directions (Dôen, Zimmermann, Sézane).

## journal-route/
The Journal pages, taken off the site on 2026-11-06 until Sumeet writes her own entries.
To restore: `git mv drafts/journal-route src/app/journal`, and add the Journal link back in `src/components/Nav.tsx`.
Entries are still in `src/content/journal.ts`.
