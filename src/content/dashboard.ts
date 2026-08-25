/**
 * Dashboard content.
 *
 * Every figure below is ILLUSTRATIVE DEMO DATA, not a real account. The UI
 * labels it as such rather than presenting invented numbers as truth.
 */

export const demoNotice = 'Demodaten. Diese Ansicht zeigt Beispielwerte.'

export type Trend = 'up' | 'down'

export const kpis: ReadonlyArray<{
  label: string
  value: string
  change: string
  trend: Trend
  /** Whether the trend direction is good news for this metric. */
  good: boolean
}> = [
  { label: 'Gesamtumsatz', value: '24.850 €', change: '+18,2%', trend: 'up', good: true },
  { label: 'Neue Kunden', value: '142', change: '+9,1%', trend: 'up', good: true },
  { label: 'Conversion Rate', value: '4,7%', change: '+1,3%', trend: 'up', good: true },
  { label: 'Absprungrate', value: '32,4%', change: '-3,8%', trend: 'down', good: true },
]

export const revenueSeries = [
  { month: 'Okt', value: 14200 },
  { month: 'Nov', value: 18500 },
  { month: 'Dez', value: 22100 },
  { month: 'Jan', value: 19800 },
  { month: 'Feb', value: 21400 },
  { month: 'Mär', value: 24850 },
] as const

export const revenueChart = {
  title: 'Umsatz der letzten 6 Monate',
  export: 'Exportieren',
  unit: '€',
} as const

export type ServiceKey = 'web' | 'ai' | 'ads' | 'seo'
export type StatusKey = 'active' | 'completed' | 'review' | 'paused'

export const serviceLabels: Record<ServiceKey, string> = {
  web: 'Web',
  ai: 'AI',
  ads: 'Ads',
  seo: 'SEO',
}

export const statusLabels: Record<StatusKey, string> = {
  active: 'Aktiv',
  completed: 'Abgeschlossen',
  review: 'In Review',
  paused: 'Pausiert',
}

export const projects: ReadonlyArray<{
  name: string
  client: string
  status: StatusKey
  service: ServiceKey
  revenue: string
  roi: string | null
  progress: number
}> = [
  { name: 'Online-Shop Relaunch', client: 'Modehaus Weber', status: 'active', service: 'web', revenue: '3.200 €', roi: '+185%', progress: 88 },
  { name: 'Lead Automation CRM', client: 'ImmoPro GmbH', status: 'active', service: 'ai', revenue: '1.800 €', roi: '+210%', progress: 65 },
  { name: 'Meta Ads Q2', client: 'FitCoach Munich', status: 'active', service: 'ads', revenue: '2.400 €', roi: '+4,2x', progress: 72 },
  { name: 'AI SEO Audit', client: 'Dental Smile Berlin', status: 'completed', service: 'seo', revenue: '950 €', roi: '+120%', progress: 100 },
  { name: 'TikTok Kampagne', client: 'Beauty Brand GmbH', status: 'active', service: 'ads', revenue: '1.600 €', roi: '+3,8x', progress: 41 },
  { name: 'Web App MVP', client: 'StartupHub DE', status: 'review', service: 'web', revenue: '5.400 €', roi: null, progress: 55 },
  { name: 'E-Mail Automation', client: 'Kanzlei Bauer', status: 'completed', service: 'ai', revenue: '1.200 €', roi: '+89%', progress: 100 },
  { name: 'Google Ads Retargeting', client: 'Küchen König', status: 'paused', service: 'ads', revenue: '1.100 €', roi: '+2,1x', progress: 33 },
]

export const dashboardNav = [
  { label: 'Übersicht', href: '/dashboard', key: 'overview' },
  { label: 'Kunden', href: '/dashboard/kunden', key: 'clients' },
  { label: 'Analytics', href: '/dashboard/analytics', key: 'analytics' },
  { label: 'Einstellungen', href: '/dashboard/einstellungen', key: 'settings' },
] as const

export const dashboardStrings = {
  title: 'Übersicht',
  greeting: 'Willkommen zurück',
  search: 'Projekte durchsuchen',
  searchLabel: 'Projekte durchsuchen',
  notifications: 'Benachrichtigungen',
  signOut: 'Abmelden',
  projectsTitle: 'Projekte',
  detailTitle: 'Projekt-Details',
  fullReport: 'Vollständigen Report ansehen',
  progress: 'Fortschritt',
  revenue: 'Umsatz',
  roi: 'ROI',
  noRoi: 'Noch keine Daten',
  empty: {
    heading: 'Keine Projekte gefunden',
    body: 'Für diese Suche und Filterkombination gibt es keine Treffer.',
    action: 'Filter zurücksetzen',
  },
  filters: {
    all: 'Alle',
    active: 'Aktiv',
    completed: 'Abgeschlossen',
    web: 'Web',
    ai: 'AI',
    ads: 'Ads',
  },
  columns: {
    project: 'Projekt',
    client: 'Kunde',
    service: 'Service',
    revenue: 'Umsatz',
    roi: 'ROI',
    progress: 'Fortschritt',
    status: 'Status',
  },
} as const
