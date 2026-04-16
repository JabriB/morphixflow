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

- **Stack:** React + Vite, JSX (`allowJs: true`), Framer Motion, `@splinetool/react-spline`
- **Key entry points:** `src/App.jsx`, `src/index.css`, `src/components/sections/`, `src/components/Navbar.jsx`
- **Styling:** Tailwind CSS + CSS custom properties in `src/index.css`. Responsive layout via explicit CSS classes (`.hero-robot`, `.nav-links`, etc.) with `!important` media queries — Tailwind breakpoints are unreliable in this project
- **State management:** Custom `ThemeContext` (dark/light). No Redux/Zustand
- **Deployment:** Not configured yet

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

- [x] Multi-color palette across all sections
- [x] Hero gradient heading fix
- [x] GradientDots site-wide background
- [x] Full responsive layout (tablet + mobile) incl. robot visible on mobile
- [x] Light mode as proper opposite of dark mode
- [x] Google Reviews section (hardcoded)
- [x] Hamburger navbar on tablet/mobile (CSS `!important` media queries)
- [x] Samsung Galaxy Z Fold 5 (260px) support
- [x] Sticky navbar on mobile (`overflow-x: clip` on html)
- [x] Sticky WhatsApp button bottom-right
- [x] Robot sizing fix (switched `min-height` → `height` so Spline canvas fills container)
- [ ] Deployment setup
