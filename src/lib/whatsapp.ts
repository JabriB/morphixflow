import { site } from '@/content/site'

/** Builds a wa.me link, defaulting to the site's general inquiry message. */
export function buildWhatsAppLink(message?: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message ?? site.whatsappMessage)}`
}
