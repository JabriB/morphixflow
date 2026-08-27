import { ButtonLink } from '@/components/ui/button'

/**
 * Honest placeholder for dashboard sections that exist in the navigation
 * but have no implementation yet. Better than a link that 404s.
 */
export function NotBuiltYet({ title }: { title: string }) {
  return (
    <main id="inhalt" className="flex min-w-0 flex-1 flex-col p-6">
      <h1 className="text-xl">{title}</h1>

      <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-line bg-card px-6 py-20 text-center">
        <p className="font-display text-lg font-extrabold text-ink">
          Dieser Bereich wird gerade gebaut
        </p>
        <p className="measure text-sm text-ink-muted">
          {title} ist noch nicht verfügbar. Melde dich, wenn du diesen Bereich
          zuerst brauchst, dann ziehen wir ihn vor.
        </p>
        <ButtonLink href="/dashboard" variant="secondary" size="sm" className="mt-2">
          Zurück zur Übersicht
        </ButtonLink>
      </div>
    </main>
  )
}
