# Noosa — "Create Event" Responsive Web App

## Context

The user finished a Figma design for **Noosa**, a ticketing platform, and needs it running as a live website for **usability testing tomorrow**. They exported the same **"Create Event" screen** at five breakpoints (Small Phone, Large Phone, Tablet, Laptop, Desktop), each delivered as a read-only file in `src/imports/<Breakpoint>/index.tsx`.

Goal: a single live, responsive site that reproduces the design **1:1 at every breakpoint** and supports **key interactions** (typing in fields, toggles, tabs, checkbox, upload buttons). Per the user, the **nav is decorative** (active tab highlight only) — no routing to other pages.

### What the imports tell us (source of truth for styling)

The five frames are ~95% identical in content; they differ systematically in **layout, ordering, nav density, and spacing**:

| Breakpoint | Width band | Layout |
|---|---|---|
| SmallPhone | 320–479 | single column, 16px padding |
| LargePhone | 480–767 | single column, 20px padding |
| Tablet | 768–1023 | **two columns**, gap 16, 32px padding |
| Laptop | 1024–1439 | **two columns**, gap 32, 32px padding |
| Desktop | 1440+ | **two columns**, gap 32, 32px padding |

- **Two-column (≥768):** left sidebar = `Container2` (Image Cover, Gallery, Location), right = `Container9` (Event Name, URL, Date, About, Tickets, Event Setting, Additional Setting, Hosts, Agreement, Action buttons).
- **Single column (<768):** everything stacks in one column and the **order changes** — the right-column content comes first, then Image Cover / Gallery / Location move to the **bottom**.
- Each frame's root is fluid (`w-full` + `min-w`/`max-w` + flex-wrap), so a CSS responsive build reproduces all five bands naturally.

### Design tokens (read off the imports)
- Colors: primary `#D8444B` (alt `#D53940`), text `#131313`, secondary text `#414141`, muted `#9E9E9E`, page bg `#F4F4F4`, surface `#FBFBFB`, border `#D9D9D9`, tertiary-button bg `#E4E4E4`, light-red bg `#F7E9E9`.
- Radius: cards `16px`, inputs/small buttons `12px`, pills `999px`.
- Font: **Plus Jakarta Sans** at Regular 400 / Medium 500 / SemiBold 600.
- Icons in the imports are standard **lucide** glyphs (compass, ticket, calendar-check, plus, search, bell, image, images, map-pin, upload, link, square-pen, globe, newspaper, bold, italic, underline, list, list-ordered, ticket-plus, trash-2, etc.).

## Approach

Build **one interactive, responsive Create Event app** from shared section components that copy the imports' exact Tailwind classes/colors/spacing, composed via a responsive layout that reproduces each of the five frames. This is preferred over rendering the read-only imports directly because those frames are static (placeholder text, non-working controls) and cannot support the requested interactions.

**Fidelity rule:** copy class strings, colors, radii, and spacing verbatim from the matching import section. Validate each breakpoint visually against the corresponding attachment.

**Icons:** use `lucide-react` (already installed) — the import icons are lucide glyphs, so this is faithful and keeps components clean. Do not wire the `svg-*.ts` files.

**Avatar images:** import the two PNGs from `src/imports/Desktop/` (`70e45f...png`, `17ceb0...png`) as ES modules and render via `<ImageWithFallback>`.

## Files

### Styles
- `src/styles/fonts.css` — add Plus Jakarta Sans at top (Google Fonts `@import`, weights 400/500/600).
- `src/styles/theme.css` — in `@theme`, set `--font-family` (Plus Jakarta Sans) and add custom breakpoints matching the bands: `--breakpoint-phone: 480px; --breakpoint-tablet: 768px; --breakpoint-laptop: 1024px; --breakpoint-desktop: 1440px;`. Set `body` font-family to Plus Jakarta Sans. Do not disturb existing shadcn tokens.

### App shell
- `src/app/App.tsx` (edit existing, default export) — holds all form state via a single `useReducer`/`useState` object (event name, slug, start/end date+time, description, toggles, category, payment, language, agreement, cover/gallery previews, expanded accordion). Renders `<NavBar/>` + main `<CreateEvent/>` + `<Footer/>` inside the page background. Lifting state to App means switching breakpoints preserves entered data.

### Components (`src/app/components/`)
Shared primitives (styled to match imports):
- `ui-bits/Toggle.tsx` — pill switch with on/off label (Registration Status "Open", Need Verification "No", Make Event Private "Public").
- `ui-bits/UploadButton.tsx` — hidden `<input type="file">`; on select, store object URL and show preview inside the dashed drop zone.
- `ui-bits/Dropdown.tsx` — styled select (Automatic payment, Event Category).
- `ui-bits/Checkbox.tsx` — agreement checkbox.
- `ui-bits/SectionCard.tsx` — `bg-[#fbfbfb] rounded-[16px] border border-[#d9d9d9] p-[16px]` wrapper with the icon + title + subtitle header used by every card.

Sections (each copies its import's exact classes; converts placeholders to controlled inputs):
- `NavBar.tsx` — responsive: full pill nav + "Create Event"/search/bell/avatar on ≥1024; condensed on tablet/phone per the frames. Tabs highlight active only (Discover active by default), decorative.
- `ImageCoverCard.tsx`, `GalleryCard.tsx` (4 slots; horizontal scroll on phone), `LocationCard.tsx`.
- `EventNameField.tsx` (large editable heading), `SlugField.tsx` (`mynoosa.id/<slug>` + edit button), `DateTimeCard.tsx` (Start/End with date + time inputs, timezone box), `AboutEventCard.tsx` (formatting toolbar buttons toggle active state, textarea with `n/500` counter), `TicketsCard.tsx` (payment dropdown, default ticket row, add `+`), `EventSettingsCard.tsx` (category dropdown + 3 toggles), `AdditionalSettingsCard.tsx` (accordion expand/collapse), `HostsCard.tsx` (host rows, remove `x`), `AgreementBar.tsx` (checkbox + T&C/Privacy links), `ActionButtons.tsx` (Save as Draft / Publish — Publish disabled until agreement checked).
- `Footer.tsx` — language switcher (Bahasa/English active toggle), links, copyright; stacks on phone/tablet per frames.
- `CreateEvent.tsx` — composes the sections with the responsive layout:
  - `flex flex-col tablet:flex-row tablet:gap-[16px] laptop:gap-[32px]`, `max-w-[1440px]`, `px` per band, `py-[64px]`.
  - Sidebar group (Cover/Gallery/Location): `order-last tablet:order-first` so it sits at the bottom on phones and becomes the left column on ≥768.
  - Use the existing `src/app/components/figma/ImageWithFallback.tsx` for any images.

## Interactions to wire (per "key interactions work")
Editable Event Name + slug; Start/End date & time inputs; description textarea with live char counter + toolbar active states; payment & category dropdowns; 3 working toggles with label swap; Additional Settings accordion; remove host; agreement checkbox gating Publish; Cover/Gallery upload with image preview; language switcher; nav tab active highlight (decorative). All state lives in App and persists across breakpoint changes.

## Verification
1. Dev server is already running — do not start it. Use the preview/run tooling to load the app.
2. Screenshot at widths **375, 600, 834, 1280, 1512** (one per band) and compare side-by-side with `image-0..4` attachments for 1:1 layout, ordering, spacing, colors, and typography.
3. Manually exercise each interaction: type name/slug, pick dates, type description (watch counter), flip all toggles, open Additional Settings, remove a host, check agreement (Publish enables), upload a cover and a gallery image (previews show), switch language.
4. Confirm no console errors and that resizing the window moves Cover/Gallery/Location between bottom (phone) and left column (≥768) cleanly.
