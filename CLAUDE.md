# Noosa — Create Event

A responsive **Create Event** screen for Noosa (a ticketing platform), built from a Figma export for
usability testing. React 18 + Vite 6 + Tailwind v4 + TypeScript. No backend and no router — screens
are swapped via a `page` value in context, so the in-memory form survives navigation.

Original design: https://www.figma.com/design/IPlCD7d5FTdEvVwh7QUZjf/Create-Event

## Commands

```bash
npm install     # deps are NOT installed yet — run this first
npm run dev     # Vite dev server (http://localhost:5173)
npm run build   # production build
```

There is no test, lint, or typecheck script. `npx tsc --noEmit` is not configured either (no
`tsconfig.json`) — type errors only surface in the editor.

Package manager: `pnpm-workspace.yaml` exists but there is no lockfile and `pnpm` is not installed
on this machine. Use `npm`.

## Architecture

```
src/main.tsx            → mounts <App/>
src/app/App.tsx         → <EventProvider><CreateEvent/></EventProvider>
src/app/components/
  event-context.tsx     → ALL form state (React context, plain useState)
  create-event.tsx      → app shell (nav + footer) + page switch; Create Event's two-column layout
  nav-bar.tsx           → nav; tabs set `page`, "Create Event" returns to the form
  left-column.tsx       → ImageCoverCard, GalleryCard
  right-column.tsx      → EventName, Slug, DateTime, About, Tickets, EventSettings,
                          Location, Hosts, AgreementBar, ActionButtons, BottomActions
  date-time-picker.tsx  → custom calendar + iOS-style time wheel
  create-ticket-modal.tsx → 2-step ticket create/edit modal
  primitives.tsx        → Toggle, Checkbox, Dropdown, RoundButton, SectionCard, UploadZone
  ui/                   → full shadcn/ui set (mostly unused; keep for reference)
  figma/ImageWithFallback.tsx
src/imports/<Frame>/    → READ-ONLY Figma exports (SmallPhone, LargePhone, Tablet, Laptop,
                          Desktop, CreateEvent, EventDate, TicketConfiguration, …)
plans/                  → the original build plan; useful context, not a spec to re-run
```

**State**: every field lives in `event-context.tsx` via `useEvent()`. Add new fields there (state +
setter in the `EventState` type + the `value` object) rather than introducing local component state
for anything a user can edit — state must survive breakpoint changes.

**`src/imports/` is the source of truth for styling, and must not be edited.** Those files are
static Figma exports (placeholder text, dead controls). When building or fixing a section, copy the
exact Tailwind class strings, hex colors, radii, and spacing from the matching import, then wire the
interaction in the `src/app/components/` version. Don't import the `svg-*.ts` files — the icons are
standard lucide glyphs, use `lucide-react`.

## Design system

Values are written as **literal hex in Tailwind arbitrary values** (`bg-[#fbfbfb]`), matching the
Figma export — not via the shadcn CSS variables in `src/styles/theme.css`. Follow the literal-hex
convention in this codebase; the shadcn tokens exist only for the unused `ui/` components.

- Primary `#d8444b` (alt `#d53940`) · text `#131313` · secondary text `#414141` · muted `#9e9e9e`
- Page bg `#f4f4f4` · surface `#fbfbfb` · border `#d9d9d9` · tertiary btn `#e4e4e4` · light red `#f7e9e9`
- Radius: cards `16px` · inputs/small buttons `12px` · pills `999px`
- Font: **Plus Jakarta Sans** 400/500/600

### Breakpoints (custom, defined in `src/styles/theme.css` `@theme`)

| Variant | Min width | Layout |
|---|---|---|
| *(base)* | 320 | single column, `px-[16px]` |
| `phone:` | 480 | single column, `px-[20px]` |
| `tablet:` | 768 | **two columns**, gap 16, `px-[32px]` |
| `laptop:` | 1024 | two columns, gap 32 |
| `desktop:` | 1440 | two columns, gap 32 |

Below `tablet`, the order flips: right-column content comes first, Cover/Gallery/Location move to
the bottom, and agreement + action buttons render last via `<BottomActions>`. This is done with
`order-*` classes in `create-event.tsx` — keep it CSS-only, don't branch on JS width.

## Working notes

- Verify changes by screenshotting at **375, 600, 834, 1280, 1512** and comparing against the
  matching `src/imports/` frame.
- Discover / Tickets / My Events are blank placeholder screens awaiting designs; the tab bar is
  `hidden laptop:flex`, so they're only reachable at ≥1024px. Footer links stay decorative.
- Uploads use `URL.createObjectURL` previews only; nothing is persisted or sent anywhere.
