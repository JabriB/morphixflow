'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, MagnifyingGlass, TrendDown, TrendUp } from '@phosphor-icons/react'
import {
  dashboardStrings as S,
  kpis,
  projects,
  serviceLabels,
  statusLabels,
  type StatusKey,
} from '@/content/dashboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/field'
import { RevenueChart } from './revenue-chart'
import { cn } from '@/lib/utils'

const EASE = [0.23, 1, 0.32, 1] as const

const statusTone: Record<StatusKey, string> = {
  active: 'bg-positive/12 text-positive',
  completed: 'bg-fill-soft text-ink-muted',
  review: 'bg-notice/12 text-notice',
  paused: 'bg-fill-soft text-ink-muted',
}

const filterKeys = ['all', 'active', 'completed', 'web', 'ai', 'ads'] as const

function KpiTile({ kpi, index }: { kpi: (typeof kpis)[number]; index: number }) {
  const reduced = useReducedMotion()
  const Icon = kpi.trend === 'up' ? TrendUp : TrendDown
  return (
    <motion.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
      className="rounded-lg border border-line bg-card p-5"
    >
      <p className="text-2xs font-medium text-ink-subtle">{kpi.label}</p>
      <p
        data-numeric
        className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink"
      >
        {kpi.value}
      </p>
      <p
        className={cn(
          'mt-1.5 flex items-center gap-1 text-2xs font-bold',
          kpi.good ? 'text-positive' : 'text-negative',
        )}
      >
        <Icon size={11} weight="bold" aria-hidden="true" />
        <span data-numeric>{kpi.change}</span>
      </p>
    </motion.li>
  )
}

export function ProjectsPanel() {
  const reduced = useReducedMotion()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof filterKeys)[number]>('all')
  const [selected, setSelected] = useState(projects[0])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q)
      const matchFilter =
        filter === 'all' || p.status === filter || p.service === filter
      return matchQuery && matchFilter
    })
  }, [query, filter])

  function reset() {
    setQuery('')
    setFilter('all')
  }

  return (
    <main id="inhalt" className="min-w-0 flex-1 p-6">
      <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl">{S.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">{S.greeting}</p>
        </div>
        <div className="relative w-full max-w-64">
          <MagnifyingGlass
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-subtle"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={S.search}
            aria-label={S.searchLabel}
            className="h-10 ps-10 text-sm"
          />
        </div>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiTile key={kpi.label} kpi={kpi} index={i} />
        ))}
      </ul>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <aside className="rounded-lg border border-line bg-card p-6">
          <h2 className="text-sm font-bold text-ink">{S.detailTitle}</h2>
          <p className="mt-4 font-display text-base font-extrabold text-ink">
            {selected.name}
          </p>
          <p className="text-xs text-ink-subtle">{selected.client}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-well p-3">
              <dt className="text-2xs text-ink-subtle">{S.revenue}</dt>
              <dd
                data-numeric
                className="mt-1 text-sm font-bold text-ink"
              >
                {selected.revenue}
              </dd>
            </div>
            <div className="rounded-md bg-well p-3">
              <dt className="text-2xs text-ink-subtle">{S.roi}</dt>
              <dd
                data-numeric
                className={cn(
                  'mt-1 text-sm font-bold',
                  selected.roi ? 'text-positive' : 'text-ink-subtle',
                )}
              >
                {selected.roi ?? S.noRoi}
              </dd>
            </div>
          </dl>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-2xs text-ink-subtle">{S.progress}</span>
              <span data-numeric className="text-2xs font-bold text-ink">
                {selected.progress}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={selected.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={S.progress}
              className="mt-2 h-1 overflow-hidden rounded-full bg-fill-soft"
            >
              <motion.div
                key={selected.name}
                initial={reduced ? { width: `${selected.progress}%` } : { width: 0 }}
                animate={{ width: `${selected.progress}%` }}
                transition={{ duration: 0.6, ease: EASE }}
                className="h-full rounded-full bg-accent"
              />
            </div>
          </div>

          <span
            className={cn(
              'mt-5 inline-block rounded-full px-2.5 py-1 text-2xs font-bold',
              statusTone[selected.status],
            )}
          >
            {statusLabels[selected.status]}
          </span>

          <Button variant="secondary" size="sm" className="mt-5 w-full">
            {S.fullReport}
            <ArrowUpRight size={13} weight="bold" />
          </Button>
        </aside>
      </div>

      <section className="mt-6 rounded-lg border border-line bg-card">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
          <h2 className="text-sm font-bold text-ink">{S.projectsTitle}</h2>
          <div role="group" aria-label="Filter" className="flex flex-wrap gap-1">
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className={cn(
                  'rounded-md px-2.5 py-1 text-2xs font-bold transition-colors duration-150',
                  filter === key
                    ? 'bg-fill-soft text-ink'
                    : 'text-ink-subtle hover:bg-fill-subtle hover:text-ink',
                )}
              >
                {S.filters[key]}
              </button>
            ))}
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="font-display text-base font-extrabold text-ink">
              {S.empty.heading}
            </p>
            <p className="measure text-sm text-ink-muted">{S.empty.body}</p>
            <Button variant="secondary" size="sm" onClick={reset} className="mt-2">
              {S.empty.action}
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-3xl border-collapse text-start">
              <thead>
                <tr className="border-b border-line">
                  {Object.values(S.columns).map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-6 py-3 text-2xs font-bold text-ink-subtle"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const isSelected = selected.name === p.name
                  return (
                    <tr
                      key={p.name}
                      onClick={() => setSelected(p)}
                      aria-selected={isSelected}
                      className={cn(
                        'cursor-pointer border-b border-line transition-colors duration-150 last:border-0',
                        isSelected ? 'bg-fill-soft' : 'hover:bg-fill-subtle',
                      )}
                    >
                      <td className="px-6 py-3.5 text-sm font-medium text-ink">
                        {p.name}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-ink-muted">
                        {p.client}
                      </td>
                      <td className="px-6 py-3.5 text-xs font-medium text-ink-muted">
                        {serviceLabels[p.service]}
                      </td>
                      <td
                        data-numeric
                        className="px-6 py-3.5 text-sm font-medium text-ink"
                      >
                        {p.revenue}
                      </td>
                      <td
                        data-numeric
                        className={cn(
                          'px-6 py-3.5 text-sm font-bold',
                          p.roi ? 'text-positive' : 'text-ink-subtle',
                        )}
                      >
                        {p.roi ?? 'k. A.'}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-16 overflow-hidden rounded-full bg-fill-soft">
                            <div
                              className="h-full rounded-full bg-ink-subtle"
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                          <span
                            data-numeric
                            className="w-8 text-2xs text-ink-muted"
                          >
                            {p.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={cn(
                            'inline-block rounded-full px-2.5 py-1 text-2xs font-bold',
                            statusTone[p.status],
                          )}
                        >
                          {statusLabels[p.status]}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
