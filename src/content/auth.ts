/** Copy for the auth surfaces. Same rules as site.ts: no dashes, no eyebrows. */

export const auth = {
  login: {
    title: 'Anmelden',
    heading: 'Willkommen zurück',
    sub: 'Melde dich an, um fortzufahren.',
    submit: 'Anmelden',
    google: 'Mit Google anmelden',
    divider: 'oder',
    forgot: 'Passwort vergessen?',
    footerText: 'Noch kein Konto?',
    footerLink: 'Registrieren',
  },
  signup: {
    title: 'Registrieren',
    heading: 'Konto erstellen',
    sub: 'Starte in weniger als einer Minute.',
    submit: 'Kostenlos registrieren',
    divider: 'oder',
    google: 'Mit Google registrieren',
    footerText: 'Bereits ein Konto?',
    footerLink: 'Anmelden',
    consentBefore: 'Mit der Registrierung stimmst du der ',
    consentLink: 'Datenschutzerklärung',
    consentAfter: ' zu.',
    success: {
      heading: 'Konto erstellt',
      body: 'Wir haben dir eine Bestätigungsmail gesendet. Bitte überprüfe dein Postfach.',
      cta: 'Zum Login',
    },
    strengthLabels: ['Schwach', 'Mittelmäßig', 'Gut', 'Stark'],
  },
  reset: {
    title: 'Passwort zurücksetzen',
    heading: 'Passwort zurücksetzen',
    sub: 'Wir senden dir einen Link, mit dem du ein neues Passwort vergeben kannst.',
    submit: 'Link senden',
    back: 'Zurück zum Login',
    success: {
      heading: 'E-Mail gesendet',
      bodyBefore: 'Wir haben einen Reset-Link an ',
      bodyAfter: ' gesendet. Bitte überprüfe dein Postfach.',
    },
  },
  fields: {
    name: { label: 'Vollständiger Name', placeholder: 'Max Mustermann' },
    email: { label: 'E-Mail-Adresse', placeholder: 'dein@email.de' },
    password: { label: 'Passwort', placeholder: 'Mindestens 8 Zeichen' },
  },
  errors: {
    required: 'Bitte fülle alle Felder aus.',
    emailInvalid: 'Diese E-Mail-Adresse sieht nicht gültig aus.',
    weakPassword: 'Bitte wähle ein stärkeres Passwort.',
    credentials: 'Diese Anmeldedaten stimmen nicht. Bitte prüfe E-Mail und Passwort.',
  },
  showPassword: 'Passwort anzeigen',
  hidePassword: 'Passwort verbergen',
} as const

export const routes = {
  login: '/login',
  signup: '/registrieren',
  reset: '/passwort-vergessen',
  dashboard: '/dashboard',
  home: '/',
} as const
