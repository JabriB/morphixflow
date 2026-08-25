# CLAUDE.md — Token-Efficient Workflow Rules

## ⚡ Core Behavior Rules (Read Every Session)

- **Never read files you don't need.** Only read files directly related to the current task.
- **No full-codebase scans.** Ask me which files are relevant instead of exploring broadly.
- **No unsolicited refactoring.** Only change what I explicitly ask for — nothing more.
- **No long explanations unless asked.** Give short, direct responses by default.
- **No repeating context back to me.** Assume I know what I said — just act on it.
- **Confirm scope before starting.** For any task touching more than 2 files, briefly state what you'll change and wait for my "go ahead".

## 🧠 Model Selection

- Use **Haiku** for: tests, linting fixes, simple formatting, renaming
- Use **Sonnet** for: most coding tasks, refactoring, bug fixes (default)
- Use **Opus** only when I explicitly say "use Opus" or the task requires deep architectural reasoning

## 📁 Project Context

- **Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, `motion`, `@phosphor-icons/react`
- **Key entry points:** `src/app/layout.tsx`, `src/app/globals.css`, `src/content/*.ts`, `src/components/sections/`
- **Copy:** all user-facing German strings live in `src/content/{site,auth,dashboard}.ts`. Edit copy there, never inline in a component.
- **Styling:** Tailwind v4 utilities only. Design tokens are defined once in the `@theme` block of `src/app/globals.css`. No inline `style={{}}` objects, no `!important` media queries, no separate Tailwind config file.
- **Theme:** dark only, by design. The direction is "Dark Cinematic": the UI is achromatic and colour enters through photography. The single accent (`--color-accent`) is reserved for things you can act on: primary buttons, focus rings, active nav, badges. Never use it for decoration.
- **Fonts:** Cabinet Grotesk + Satoshi, self-hosted in `src/app/fonts/`, wired via `next/font/local` in `src/app/fonts.ts`.
- **Imagery:** `public/media/*.jpg`, generated via the OpenArt MCP as one cinematic shoot. Regenerate with the shared style preamble so new assets match.
- **Deployment:** Not configured yet. The Vite build is preserved on the `master` branch; this work lives on `redesign/next-cinematic`.

## 🎨 Design Floor (do not regress)

These were removed deliberately. Reintroducing any of them undoes the redesign:

- No gradient text, no glass-as-decoration, no grid-line background overlays
- No eyebrow/kicker labels above headings, no `01 / 02` section numbers
- No icon + heading + text card grids as page structure
- Elevation once per surface: a hairline **or** a shadow, never both
- Body text must clear 4.5:1. `--color-ink-subtle` is the lowest step that passes; `ink-faint` is for decorative marks only
- Em-dashes are out of the German copy; sentences are split instead

## ✅ Code Conventions

- TypeScript strict mode: always type function params and return values
- No `any` types
- Component files: PascalCase. Utility files: camelCase
- No comments in code unless logic is non-obvious
- Prefer small, single-responsibility functions

## 🔁 Session Continuity

- At the **end of each session**, update this file with:
  - What was completed
  - What's next (max 5 bullet points)
  - Any new conventions agreed upon
- Start each new session by reading only this file — not the whole repo

## 🚫 Never Do

- Don't install new packages without asking me first
- Don't create new files unless the task explicitly requires it
- Don't run long terminal commands (e.g. full test suites) without my confirmation
- Don't load `.env` files or print secrets in any output

## 📌 Current Sprint

Done (branch `redesign/next-cinematic`):

- [x] Migrated Vite → Next.js 16 App Router, TypeScript, Tailwind v4
- [x] Dark Cinematic redesign of all 7 landing sections
- [x] 8 bespoke images generated via OpenArt, 620kb total; Spline robot removed
- [x] Auth pages rebuilt: `/login`, `/registrieren`, `/passwort-vergessen`
- [x] Dashboard rebuilt, chart follows the dataviz rules, demo data labelled
- [x] Lighthouse 100 / 100 / 100 / 100 on landing, dashboard and signup
- [x] `/impressum` and `/datenschutz` scaffolded (drafts, need real data)

Next, in priority order:

- [ ] **Fill the legal pages.** They carry a draft banner and marked placeholders. Legally required before launch.
- [ ] **Replace the WhatsApp number.** `site.whatsappNumber` is a placeholder; the old build had two conflicting numbers.
- [ ] **Wire up a form backend.** Contact and all three auth forms validate and simulate only; nothing is sent.
- [ ] **Real social links.** All three footer hrefs are `#`.
- [ ] **Verify the proof figures.** `50+ / 98% / 3x / 24h` and the three case-study results are unverified claims.
- [ ] Deployment setup

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
