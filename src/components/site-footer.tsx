import { InstagramLogo, TiktokLogo, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { footer, navLinks, site } from '@/content/site'

const socialIcons = {
  Instagram: InstagramLogo,
  TikTok: TiktokLogo,
  WhatsApp: WhatsappLogo,
} as const

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-extrabold tracking-tight text-ink">
            {site.name}
          </p>
          <p className="measure mt-3 text-sm text-ink-subtle">{footer.tagline}</p>
          <p className="mt-4 text-sm text-ink-subtle">
            {site.city}, {site.country}
          </p>
        </div>

        <nav aria-label="Footer Navigation">
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
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
            {footer.socials.map((social) => {
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
        <p className="text-xs text-ink-subtle">{footer.copyright}</p>
        <ul className="flex gap-6">
          {footer.legal.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-xs text-ink-subtle no-underline transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
