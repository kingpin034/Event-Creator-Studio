# Empty-state illustrations

Drop the exported PNGs straight into this folder using these exact filenames.
They are served at `/illustrations/<name>.png` and picked up immediately — no
restart, no code change.

| File | Used by | Shown when |
|---|---|---|
| `co-host-idle.png` | Find Co-Host modal | search box is empty |
| `co-host-not-found.png` | Find Co-Host modal | search returns no people |
| `location-idle.png` | Find Location modal | search box is empty |
| `location-not-found.png` | Find Location modal | search returns no places |

Rendered at a fixed height of 200px with `object-contain`, so any aspect ratio
works. Export at 2x (roughly 1150×860 for the 576×432 artboards) so they stay
sharp on retina screens.

If a file is missing the `<img>` hides itself and only the caption renders —
no broken-image icon. That is why the modals still look intentional before the
assets land.
