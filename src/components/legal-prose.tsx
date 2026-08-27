/**
 * Shared typography for the legal pages, plus a loud marker for the fields
 * only the business owner can supply. The marker is deliberately impossible
 * to miss: shipping an Impressum with placeholders in it is worse than
 * shipping none at all.
 */

import { missingLegalFields, vatStatusUndeclared } from '@/content/site'

/**
 * Legal body copy, set to the same type system as the landing page rather than
 * browser defaults.
 *
 * Three things carry it: h2s get a hairline rule above them so the document has
 * visible chapters at a glance, body copy sits at the site's `measure` instead
 * of running the full container width, and the first paragraph after each
 * heading loses its top margin so heading and text read as one block.
 */
export function LegalProse({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        'flex flex-col gap-5',
        // Chapters. The rule is what turns a wall of text into a document.
        '[&_h2]:mt-14 [&_h2]:border-t [&_h2]:border-line [&_h2]:pt-8',
        '[&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-ink',
        '[&_h2:first-child]:mt-0 [&_h2:first-child]:border-t-0 [&_h2:first-child]:pt-0',
        '[&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-ink',
        // Body copy at a readable measure, not the full 3xl container.
        '[&_p]:measure [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-ink-muted',
        '[&_li]:measure [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-ink-muted',
        '[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:ps-5',
        // Links inherit the site's accent, not the browser's blue.
        '[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4',
        '[&_code]:rounded-sm [&_code]:bg-fill-soft [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-2xs [&_code]:text-ink',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

/**
 * Page masthead for a legal document. Matches the landing page's heading scale
 * so the two do not look like different sites, and carries the last-reviewed
 * date, which is the first thing anyone checking a legal page looks for.
 */
export function LegalMasthead({
  title,
  updated,
}: {
  title: string
  updated: string
}) {
  return (
    <div className="mb-12 flex flex-col gap-4 border-b border-line pb-10">
      <h1 className="text-3xl">{title}</h1>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-subtle">
        Stand: {updated}
      </p>
    </div>
  )
}

/**
 * Shown only while `legal` in site.ts still has blanks. Once every mandatory
 * §5 DDG detail is filled the banner disappears on its own, so it can never be
 * left behind on a live page, and it can never be removed while the page is
 * still incomplete.
 */
export function DraftBanner() {
  const missing = missingLegalFields()
  if (missing.length === 0) return null

  return (
    <p className="mb-10 rounded-lg border border-notice/40 bg-notice/10 px-5 py-4 text-sm leading-relaxed text-notice">
      <strong className="font-bold">Noch unvollständig.</strong> Es{' '}
      {missing.length === 1 ? 'fehlt noch folgende Angabe' : 'fehlen noch folgende Angaben'}
      : {missing.join(', ')}. Bis dahin ist diese Seite rechtlich nicht
      vollständig und die Website bleibt von Suchmaschinen ausgenommen.
    </p>
  )
}

/**
 * Development-only reminder that the tax section is undeclared.
 *
 * Not rendered in production, and deliberately so. A blank USt-IdNr is lawful
 * for a business that has none, so publishing a warning about it would
 * advertise a defect that may not exist. But a business that *does* have one
 * must state it, and only the owner knows which case applies, so the reminder
 * lives where the owner will see it and visitors will not.
 */
export function VatReminder() {
  if (process.env.NODE_ENV === 'production' || !vatStatusUndeclared()) return null

  return (
    <p className="mt-8 rounded-lg border border-notice/40 bg-notice/10 px-5 py-4 text-sm leading-relaxed text-notice">
      <strong className="font-bold">Nur im Entwicklungsmodus sichtbar.</strong>{' '}
      Die Umsatzsteuer-Angabe ist noch nicht festgelegt. Falls eine USt-IdNr.
      vorhanden ist, muss sie nach § 5 Abs. 1 Nr. 6 DDG angegeben werden: dann{' '}
      <code>legal.vatId</code> in <code>src/content/site.ts</code> setzen. Greift
      die Kleinunternehmerregelung nach § 19 UStG, stattdessen{' '}
      <code>kleinunternehmer: true</code> setzen. Ohne USt-IdNr. darf der
      Abschnitt entfallen.
    </p>
  )
}

/**
 * Renders a legal detail, or a loud placeholder while it is still missing.
 *
 * Passing the value through here rather than hardcoding it means a blank field
 * is visible on the page instead of silently rendering as an empty gap that
 * reads as complete.
 */
export function Detail({ value, label }: { value: string; label: string }) {
  return value ? <>{value}</> : <Fill>{label}</Fill>
}

/** Inline placeholder the owner must replace. */
export function Fill({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-notice/20 px-1.5 py-0.5 font-bold text-notice">
      {children}
    </mark>
  )
}
