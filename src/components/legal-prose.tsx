/**
 * Shared typography for the legal pages, plus a loud marker for the fields
 * only the business owner can supply. The marker is deliberately impossible
 * to miss: shipping an Impressum with placeholders in it is worse than
 * shipping none at all.
 */

export function LegalProse({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 [&_h2]:mt-8 [&_h2]:text-lg [&_h3]:mt-4 [&_h3]:text-base [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-ink-muted [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-ink-muted [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
      {children}
    </div>
  )
}

export function DraftBanner() {
  return (
    <p className="mb-10 rounded-lg border border-notice/40 bg-notice/10 px-5 py-4 text-sm leading-relaxed text-notice">
      <strong className="font-bold">Entwurf, noch nicht rechtsgültig.</strong>{' '}
      Diese Seite ist eine Vorlage. Alle mit <Fill>Platzhalter</Fill> markierten
      Angaben müssen ersetzt und der Text muss vor dem Livegang anwaltlich
      geprüft werden.
    </p>
  )
}

/** Inline placeholder the owner must replace. */
export function Fill({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-notice/20 px-1.5 py-0.5 font-bold text-notice">
      {children}
    </mark>
  )
}
