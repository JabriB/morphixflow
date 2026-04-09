import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Users, DollarSign, MousePointerClick,
  BarChart3, Filter, Search, MoreHorizontal, ArrowUpRight,
  LayoutDashboard, Settings, Bell, LogOut, ChevronRight,
  Eye, Globe, Bot, Megaphone,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/* ─── Mock data ─────────────────────────────────────────────────── */

const kpis = [
  {
    label: 'Gesamtumsatz',
    value: '€ 24.850',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
    color: 'var(--color-primary)',
    dim: 'var(--color-primary-dim)',
  },
  {
    label: 'Neue Kunden',
    value: '142',
    change: '+9.1%',
    trend: 'up',
    icon: Users,
    color: 'var(--color-blue)',
    dim: 'var(--color-blue-dim)',
  },
  {
    label: 'Conversion Rate',
    value: '4.7%',
    change: '+1.3%',
    trend: 'up',
    icon: MousePointerClick,
    color: 'var(--color-success)',
    dim: 'var(--color-success-dim)',
  },
  {
    label: 'Absprungrate',
    value: '32.4%',
    change: '-3.8%',
    trend: 'down',
    icon: TrendingDown,
    color: 'var(--color-amber)',
    dim: 'var(--color-amber-dim)',
  },
]

const projects = [
  { name: 'Online-Shop Relaunch',  client: 'Modehaus Weber',     status: 'active',    service: 'web',  revenue: '€ 3.200', roi: '+185%', progress: 88 },
  { name: 'Lead Automation CRM',   client: 'ImmoPro GmbH',       status: 'active',    service: 'ai',   revenue: '€ 1.800', roi: '+210%', progress: 65 },
  { name: 'Meta Ads Q2',           client: 'FitCoach Munich',     status: 'active',    service: 'ads',  revenue: '€ 2.400', roi: '+4.2x', progress: 72 },
  { name: 'AI SEO Audit',          client: 'Dental Smile Berlin', status: 'completed', service: 'seo',  revenue: '€ 950',   roi: '+120%', progress: 100 },
  { name: 'TikTok Kampagne',       client: 'Beauty Brand GmbH',  status: 'active',    service: 'ads',  revenue: '€ 1.600', roi: '+3.8x', progress: 41 },
  { name: 'Web App MVP',           client: 'StartupHub DE',      status: 'review',    service: 'web',  revenue: '€ 5.400', roi: '—',     progress: 55 },
  { name: 'E-Mail Automation',     client: 'Kanzlei Bauer',      status: 'completed', service: 'ai',   revenue: '€ 1.200', roi: '+89%',  progress: 100 },
  { name: 'Google Ads Retargeting','client': 'Küchen König',      status: 'paused',    service: 'ads',  revenue: '€ 1.100', roi: '+2.1x', progress: 33 },
]

const barData = [
  { month: 'Okt', value: 14200 },
  { month: 'Nov', value: 18500 },
  { month: 'Dez', value: 22100 },
  { month: 'Jan', value: 19800 },
  { month: 'Feb', value: 21400 },
  { month: 'Mär', value: 24850 },
]

const serviceIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  web: Globe,
  ai:  Bot,
  ads: Megaphone,
  seo: BarChart3,
}

const statusConfig: Record<string, { label: string; variant: 'primary' | 'success' | 'warning' | 'danger' | 'muted' }> = {
  active:    { label: 'Aktiv',       variant: 'success' },
  completed: { label: 'Abgeschlossen', variant: 'primary' },
  review:    { label: 'In Review',   variant: 'warning' },
  paused:    { label: 'Pausiert',    variant: 'muted' },
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users,           label: 'Kunden',    active: false },
  { icon: BarChart3,       label: 'Analytics', active: false },
  { icon: Settings,        label: 'Einstellungen', active: false },
]

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
}

const maxBar = Math.max(...barData.map((d) => d.value))

/* ─── Sub-components ─────────────────────────────────────────────── */

function KPICard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon
  return (
    <motion.div custom={index} variants={itemVariants} initial="hidden" animate="visible">
      <Card className="relative overflow-hidden group hover:-translate-y-1 transition-transform duration-200">
        <div
          className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${kpi.color}18, transparent 70%)` }}
        />
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: kpi.dim, color: kpi.color }}
            >
              <Icon size={18} aria-hidden="true" />
            </div>
            <span
              className={cn(
                'flex items-center gap-1 text-xs font-semibold',
                kpi.trend === 'up' ? 'text-[var(--color-success)]' : 'text-[var(--color-amber)]'
              )}
            >
              {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {kpi.change}
            </span>
          </div>
          <div
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {kpi.value}
          </div>
          <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {kpi.label}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Umsatz — letzte 6 Monate</CardTitle>
          <Button variant="ghost" size="sm">
            <BarChart3 size={14} /> Exportieren
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3 h-36">
          {barData.map((bar, i) => {
            const pct = (bar.value / maxBar) * 100
            return (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span
                  className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {(bar.value / 1000).toFixed(1)}k
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-lg"
                  style={{
                    background: i === barData.length - 1
                      ? 'var(--gradient-primary)'
                      : 'var(--color-primary-dim)',
                    border: '1px solid var(--border-primary)',
                    minHeight: '4px',
                  }}
                />
                <span className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>{bar.month}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectDetail({ project }: { project: typeof projects[0] }) {
  const ServiceIcon = serviceIcons[project.service]
  const status = statusConfig[project.status]
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Projekt-Details</CardTitle>
          <Button variant="ghost" size="sm"><MoreHorizontal size={14} /></Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary)' }}
          >
            <ServiceIcon size={18} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{project.name}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{project.client}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Umsatz', value: project.revenue },
            { label: 'ROI', value: project.roi },
          ].map((item) => (
            <div key={item.label} className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
              <div className="font-bold text-sm" style={{ color: 'var(--color-primary)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Fortschritt</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{project.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--color-primary-dim)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: 'var(--gradient-primary)' }}
            />
          </div>
        </div>

        <Badge variant={status.variant}>{status.label}</Badge>

        <Button variant="outline" size="sm" className="w-full">
          Vollständigen Report ansehen <ArrowUpRight size={13} />
        </Button>
      </CardContent>
    </Card>
  )
}

/* ─── Main Dashboard ─────────────────────────────────────────────── */

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState(projects[0])

  const filtered = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter || p.service === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}>

      {/* ── Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 border-r py-6 px-4 gap-1"
        style={{
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border)',
          position: 'sticky', top: 0, height: '100vh',
        }}
      >
        {/* Logo */}
        <div className="mb-6 px-2">
          <span
            className="text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Morphix<span style={{ color: 'var(--color-primary)' }}>Flow</span>
          </span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left',
                item.active
                  ? 'text-[var(--text-primary)] bg-[var(--color-primary-dim)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
              )}
            >
              <Icon size={16} aria-hidden="true"
                style={{ color: item.active ? 'var(--color-primary)' : undefined }} />
              {item.label}
            </button>
          )
        })}

        <div className="mt-auto flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] w-full text-left">
            <Bell size={16} aria-hidden="true" /> Benachrichtigungen
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-red-400 w-full text-left">
            <LogOut size={16} aria-hidden="true" /> Abmelden
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-auto">
        {/* Topbar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b"
          style={{
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(14px)',
            borderColor: 'var(--border)',
          }}
        >
          <div>
            <h1
              className="font-bold text-lg"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Dashboard
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Willkommen zurück, Jabri 👋
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-subtle)' }} />
              <Input
                placeholder="Suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-52 h-9"
              />
            </div>
            <Button variant="secondary" size="sm">
              <Bell size={14} />
            </Button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary)' }}
            >
              JB
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">

          {/* KPI cards */}
          <div className="dashboard-grid">
            {kpis.map((kpi, i) => (
              <KPICard key={kpi.label} kpi={kpi} index={i} />
            ))}
          </div>

          {/* Chart + Detail panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div>
              <ProjectDetail project={selectedProject} />
            </div>
          </div>

          {/* Projects table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="text-base">Projekte</CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Filter chips */}
                  {(['all', 'active', 'completed', 'web', 'ai', 'ads'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-150',
                        filter === f
                          ? 'bg-[var(--color-primary-dim)] text-[var(--color-primary)] border border-[var(--border-primary)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                      )}
                    >
                      {f === 'all' ? 'Alle' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                  <Button variant="ghost" size="sm">
                    <Filter size={13} /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Projekt', 'Kunde', 'Service', 'Umsatz', 'ROI', 'Fortschritt', 'Status', ''].map((h) => (
                        <th
                          key={h}
                          className="text-left px-6 py-3 text-xs font-semibold"
                          style={{ color: 'var(--text-subtle)' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((project, i) => {
                      const ServiceIcon = serviceIcons[project.service]
                      const status = statusConfig[project.status]
                      const isSelected = selectedProject.name === project.name
                      return (
                        <motion.tr
                          key={project.name}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => setSelectedProject(project)}
                          className="cursor-pointer transition-colors duration-150"
                          style={{
                            borderBottom: '1px solid var(--border)',
                            background: isSelected ? 'var(--color-primary-dim)' : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'
                          }}
                        >
                          <td className="px-6 py-3.5">
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                              {project.name}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{project.client}</span>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <ServiceIcon size={13} style={{ color: 'var(--color-primary)' }} />
                              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                                {project.service.toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {project.revenue}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="text-sm font-bold" style={{ color: 'var(--color-success)' }}>
                              {project.roi}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-primary-dim)', minWidth: '60px' }}>
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${project.progress}%`,
                                    background: 'var(--gradient-primary)',
                                  }}
                                />
                              </div>
                              <span className="text-[10px] font-medium" style={{ color: 'var(--text-subtle)', width: '28px' }}>
                                {project.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </td>
                          <td className="px-6 py-3.5">
                            <button
                              className="opacity-0 group-hover:opacity-100"
                              style={{ color: 'var(--text-subtle)' }}
                            >
                              <ChevronRight size={14} />
                            </button>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
                    <Eye size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Keine Ergebnisse gefunden.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
