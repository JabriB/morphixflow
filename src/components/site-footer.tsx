import { InstagramLogo, TiktokLogo, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/content/site'
import { DEFAULT_LOCALE, getDictionary, type Locale } from '@/content/dictionary'
import { Logo } from '@/components/ui/logo'
import { CookieSettingsLink } from '@/components/cookie-consent'

const socialIcons = {
  Instagram: InstagramLogo,
  TikTok: TiktokLogo,
  WhatsApp: WhatsappLogo,
} as const

export function SiteFooter({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="measure mt-3 text-sm text-ink-subtle">{t.footer.tagline}</p>
          <p className="mt-4 text-sm text-ink-subtle">
            {site.city}, {site.country}
          </p>
        </div>

        <nav aria-label={t.ui.footerNav}>
          <ul className="flex flex-col gap-2.5">
            {t.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5">
          <ul className="flex gap-2.5">
            {/* An icon linking to "#" looks like a broken profile rather than
                a missing one, and it scrolls the visitor to the top instead.
                Each icon appears once its href is real. */}
            {t.footer.socials
              .filter((social) => social.href && social.href !== '#')
              .map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons]
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-line text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                  >
                    <Icon size={17} weight="fill" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            {site.email}
          </a>
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-4 border-t border-line py-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-ink-subtle">{t.footer.copyright}</p>
          {/* KI-Kennzeichnung nach Art. 50 AI Act. Sichtbar auf jeder Seite,
              nicht nur im Impressum, wie es die Vorschrift verlangt. */}
          <p className="text-xs text-ink-subtle">{t.footer.aiNotice}</p>
        </div>
        <ul className="flex gap-6">
          {t.footer.legal.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-xs text-ink-subtle no-underline transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          {/* Renders only while a consent-requiring service is configured.
              Art. 7 Abs. 3 DSGVO: withdrawing has to be as easy as consenting,
              which means a control on every page, not a paragraph in a policy. */}
          <li>
            <CookieSettingsLink />
          </li>
        </ul>
      </div>
    </footer>
  )
}
