import type { Dictionary } from '../dictionary'

/**
 * English.
 *
 * Adapted rather than translated word for word. German marketing copy leans on
 * compound nouns and the informal "du"; the same sentences rendered literally
 * read stilted in English. Structure, claims and numbers are identical, so the
 * two languages never promise different things.
 *
 * Prices use English conventions (€1,234.56) while German keeps 1.234,56 €.
 * `formatEUR` in the pricing section formats computed totals with the active
 * locale, so the builder's arithmetic matches these strings.
 */
export const en: Dictionary = {
  meta: {
    title: 'MorphixFlow. Websites, automation and ad campaigns.',
    description:
      'MorphixFlow builds websites, AI automation and ad campaigns from a single source. Personal consulting from the Aachen and Düren area. Free first call on WhatsApp.',
    ogDescription:
      'More customers. More revenue. Websites, AI automation and ad campaigns from a single source, personally handled from the Aachen area.',
  },

  navLinks: [
    { label: 'Start', href: '#start' },
    { label: 'Services', href: '#leistungen' },
    { label: 'Process', href: '#prozess' },
    { label: 'Packages', href: '#pakete' },
    { label: 'Contact', href: '#kontakt' },
  ],

  navCta: { short: 'Free consultation', long: 'Book a free consultation' },

  whatsappWidget: {
    ariaLabel: 'Open WhatsApp contact',
    heading: 'Where shall we start',
    presets: [
      {
        icon: 'Rocket',
        label: 'Modernise my website',
        message: '🚀 I would like to modernise my website.',
      },
      {
        icon: 'Lightning',
        label: 'AI automation',
        message: '⚡ I need AI automation.',
      },
      {
        icon: 'ChatCircleDots',
        label: 'General question',
        message: '💬 I have a general question.',
      },
    ],
  },

  hero: {
    headline: ['More customers.', 'More revenue.'],
    subtext:
      'Websites, automation and ad campaigns from a single source. Measurable revenue, live in 14 days.',
    subtextEmphasis: 'Measurable revenue, live in 14 days.',
    primaryCta: 'Book a free consultation',
    secondaryCta: 'See packages',
    subtextLead: 'Websites, automation and ad campaigns from a single source.',
    trustNote: 'No obligation, no sales pressure. Usually answered within 24 hours.',
    scrollLabel: 'Continue to services',
  },

  ui: {
    homeLabel: 'MorphixFlow, back to top',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    footerNav: 'Footer navigation',
    chooseSolution: 'Choose a solution',
    filterProjects: 'Filter projects by service',
    chooseDevice: 'Choose a device',
    daysEstimate: 'days estimated timeline',
    monthsToPayback: 'months to pay back',
    askQuestion: 'Ask your question directly',
    askQuestionMessage: 'Hello! I have another question about your services.',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    rangeTo: 'to',
    durationRange: 'approx. {low} to {high} days',
  },

  toolchain: {
    label: 'Built with',
    items: [
      'Next.js',
      'React',
      'TypeScript',
      'Vercel',
      'n8n',
      'Make.com',
      'HubSpot',
      'Meta Ads',
      'Google Ads',
      'TikTok Ads',
      'Stripe',
      'Figma',
    ],
  },

  figures: [
    { value: '50+', label: 'Projects delivered' },
    { value: '98%', label: 'Client satisfaction' },
    { value: '3x', label: 'Average ROI' },
    { value: '24h', label: 'Response time' },
  ],

  servicesIntro: {
    heading: 'Everything your business needs',
    subtext:
      'From the website to the ad campaign. Every service feeds directly into more revenue and less work for you.',
  },

  services: [
    {
      slug: 'web',
      name: 'Web Development',
      body: 'Professional websites, landing pages, web apps and e-commerce, built entirely around your ideas. Design, colours, logo. You decide.',
      tags: ['Website', 'Landing Page', 'Web App', 'E-Commerce'],
    },
    {
      slug: 'automation',
      name: 'AI Automation',
      body: 'Intelligent workflow automation that puts your business on autopilot. CRM, lead generation, email and more, powered by AI.',
      tags: ['n8n', 'Make.com', 'CRM sync', 'AI-powered'],
    },
    {
      slug: 'ads',
      name: 'Ad Campaigns',
      body: 'Data-driven campaigns on Meta, TikTok and Google Ads. Maximum reach, real conversions.',
      tags: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Retargeting'],
    },
  ],

  showcaseIntro: {
    heading: 'Craft you can feel immediately',
    subtext:
      'A look behind the scenes. This is how a site we built feels, on every device.',
    disclaimer:
      'Illustrative figures. Not a measurement of your current site.',
  },

  showcaseDevices: [
    { id: 'desktop', label: 'Desktop', frameWidth: 16, frameHeight: 10 },
    { id: 'tablet', label: 'Tablet', frameWidth: 4, frameHeight: 3 },
    { id: 'mobile', label: 'Mobile', frameWidth: 9, frameHeight: 19 },
  ],

  performanceComparison: [
    { metric: 'Lighthouse score', unit: '/100', wordpress: 42, morphixflow: 100, higherIsBetter: true },
    { metric: 'Load time (LCP)', unit: 's', wordpress: 4.2, morphixflow: 0.6, higherIsBetter: false },
    { metric: 'Time to interactive', unit: 's', wordpress: 6.8, morphixflow: 0.9, higherIsBetter: false },
    { metric: 'Page weight', unit: 'MB', wordpress: 4.8, morphixflow: 0.8, higherIsBetter: false },
  ],

  processIntro: {
    heading: 'How we work together',
    subtext:
      'From the first idea to the finished result. Transparent, personal, live in 14 days.',
  },

  processSteps: [
    {
      day: 'Day 1',
      dayRange: 'Days 1 to 3',
      name: 'Free consultation',
      body: 'We talk one to one on WhatsApp video or a call. You tell me your goals, I show you the best route.',
    },
    {
      day: 'Day 4',
      dayRange: 'Days 4 to 8',
      name: 'Tailored concept',
      body: 'You get a proposal made for you. No copy and paste. Every project is planned around what you actually asked for.',
    },
    {
      day: 'Day 9',
      dayRange: 'Days 9 to 13',
      name: 'Build and launch',
      body: 'I build your project to the highest standard. On time, transparent, and in regular contact with you.',
    },
    {
      day: 'Day 14',
      dayRange: 'From day 14',
      name: 'Growth and optimisation',
      body: 'After launch you are not on your own. Ongoing optimisation, support and scaling for results that last.',
    },
  ],

  processNote: {
    before: 'Every package includes a ',
    emphasis: 'one to one WhatsApp video or phone consultation',
  },

  resultsIntro: {
    heading: 'The numbers speak for themselves',
    subtext:
      'Revenue, time saved and visibility, shown in real client figures.',
    projectsHeading: 'Example projects',
    filterAll: 'All',
  },

  projects: [
    {
      name: 'Online Shop Launch',
      category: 'E-commerce, website',
      result: '+180% revenue in the first month',
      slug: 'web',
    },
    {
      name: 'Lead Automation',
      category: 'AI automation, CRM',
      result: '40 hours saved per month',
      slug: 'automation',
    },
    {
      name: 'Meta Ads Campaign',
      category: 'Facebook and Instagram ads',
      result: '4.2x ROAS achieved',
      slug: 'ads',
    },
  ],

  reviewsIntro: {
    heading: 'What clients say',
    subtext: 'Real experiences from real clients, straight from Google.',
    ctaLine: 'See for yourself and become the next success story.',
    ctaLabel: 'Start for free',
  },

  reviews: [
    {
      name: 'Lena Hoffmann',
      initials: 'LH',
      when: '2 weeks ago',
      rating: 5,
      body: 'Absolutely first class. MorphixFlow delivered our new website in no time. Modern, fast and exactly what we had in mind. Communicating over WhatsApp could not have been easier.',
    },
    {
      name: 'Marco Schneider',
      initials: 'MS',
      when: '1 month ago',
      rating: 5,
      body: 'The AI automation saves us hours every week. Lead capture, CRM sync, email follow-ups. All of it runs by itself now. The investment paid for itself in the first month.',
    },
    {
      name: 'Sophie Wagner',
      initials: 'SW',
      when: '3 weeks ago',
      rating: 5,
      body: 'Our Meta campaign hit a ROAS of 4.8x. Very professional support, fast replies and transparent reporting. A clear recommendation for anyone who wants to grow online.',
    },
    {
      name: 'Felix Bauer',
      initials: 'FB',
      when: '5 weeks ago',
      rating: 5,
      body: 'E-commerce shop rebuilt from the ground up. The design was exactly what I had pictured and the mobile version is perfect. Google Ads ROI tripled within 6 weeks.',
    },
    {
      name: 'Anna Müller',
      initials: 'AM',
      when: '2 months ago',
      rating: 5,
      body: 'We now rank on page 1 for our most important keywords. MorphixFlow explains everything in plain language and delivers measurable results. Highly recommended.',
    },
    {
      name: 'Jonas Weber',
      initials: 'JW',
      when: '6 weeks ago',
      rating: 5,
      body: 'Landing page and TikTok ad campaign live in under 2 weeks. Conversion rate is up noticeably. Really pleasant contact over WhatsApp, always reachable and helpful.',
    },
  ],

  calculatorIntro: {
    heading: 'What would it be worth to you',
    subtext: 'Pick your solution and move the slider. The numbers update instantly.',
    cta: 'Discuss the result on WhatsApp',
  },

  calculatorDisclaimer:
    'Guide figures based on previous projects. We discuss your individual quote personally on WhatsApp.',

  calculatorContent: {
    web: {
      sliderLabel: 'Roughly how many pages do you need',
      sliderMin: 1,
      sliderMax: 20,
      sliderStep: 1,
      sliderUnit: 'pages',
      sliderDefault: 5,
      baseDurationDays: 4,
      durationPerUnitDays: 0.5,
      valuePerUnit: 40,
      valueLabel: 'Estimated additional revenue per month',
      valueNote: 'Assumed value: €40 per page per month.',
      relevantPackageId: 'essential',
      waMessageTemplate:
        'Hello! I am interested in a website with roughly {value} pages. Estimated timeline from the calculator: {duration}.',
    },
    automation: {
      sliderLabel: 'How many hours of manual work per week do you want to automate',
      sliderMin: 1,
      sliderMax: 40,
      sliderStep: 1,
      sliderUnit: 'hours per week',
      sliderDefault: 10,
      baseDurationDays: 5,
      durationPerUnitDays: 0.3,
      valuePerUnit: 150,
      valueLabel: 'Estimated value of the time saved per month',
      valueNote: 'Assumed hourly rate: €35, projected over one month.',
      relevantPackageId: 'customized',
      waMessageTemplate:
        'Hello! I would like to automate roughly {value} hours per week. Estimated timeline from the calculator: {duration}.',
    },
    ads: {
      sliderLabel: 'What is your planned monthly ad budget',
      sliderMin: 300,
      sliderMax: 10000,
      sliderStep: 100,
      sliderUnit: '€ per month',
      sliderDefault: 1500,
      baseDurationDays: 6,
      durationPerUnitDays: 0.002,
      valuePerUnit: 2.2,
      valueLabel: 'Estimated additional revenue per month',
      valueNote: 'Assumed return: 3.2x the ad budget, less the spend itself.',
      relevantPackageId: 'premium',
      waMessageTemplate:
        'Hello! I am planning a monthly ad budget of roughly €{value}. Estimated timeline from the calculator: {duration}.',
    },
  },

  pricingIntro: {
    heading: 'Choose your package',
    subtext: 'Every package includes a personal one to one consultation on WhatsApp.',
    vatNote: 'All prices include 19% German VAT.',
    nudge: 'Not sure which package fits? No problem.',
    nudgeCta: 'Get free advice on WhatsApp',
  },

  packages: [
    {
      id: 'essential',
      name: 'Essential',
      tagline: 'Your digital presence',
      badge: null,
      featured: false,
      price: { main: '€299', suffix: 'one-time', note: 'plus €99 per month maintenance' },
      features: [
        { label: 'Website, landing page, web app or e-commerce', included: true },
        { label: 'Design to your brief (colours, logo, style)', included: true },
        { label: 'Mobile optimised and fast', included: true },
        { label: 'Basic SEO setup', included: true },
        { label: 'One to one WhatsApp video or phone consultation', included: true },
        { label: 'Automation workflow', included: false },
        { label: 'Ad campaign', included: false },
      ],
      cta: 'Enquire now',
    },
    {
      id: 'customized',
      name: 'Customized',
      tagline: 'Website plus automation',
      badge: null,
      featured: false,
      price: { main: '€599', suffix: 'one-time', note: 'plus €99 per month maintenance' },
      features: [
        { label: 'Website, landing page, web app or e-commerce', included: true },
        { label: 'Design to your brief', included: true },
        { label: '1 automation workflow (CRM, email, leads)', included: true },
        { label: 'Step by step delivery to your wishes', included: true },
        { label: 'Up to 3 free revisions', included: true },
        { label: 'One to one WhatsApp video or phone consultation', included: true },
        { label: 'Ad campaign', included: false },
      ],
      cta: 'Enquire now',
    },
    {
      id: 'premium',
      name: 'All-in-One Premium',
      tagline: 'The complete package',
      badge: 'Most popular',
      featured: true,
      price: { main: '€999', suffix: 'one-time', note: 'plus €99 per month maintenance' },
      features: [
        { label: 'Website, landing page, web app or e-commerce', included: true },
        { label: 'Design to your brief', included: true },
        { label: '1 automation workflow (CRM, email, leads)', included: true },
        { label: '1 ad campaign (Meta, TikTok or Google)', included: true },
        { label: 'Conversion optimisation', included: true },
        { label: 'One to one WhatsApp video or phone consultation', included: true },
      ],
      cta: 'Enquire now',
    },
    {
      id: 'vip',
      name: 'VIP',
      tagline: 'Everything, no compromises',
      badge: 'Exclusive',
      featured: false,
      price: { main: 'On request', suffix: null, note: 'Individual quote' },
      features: [
        { label: 'Everything in All-in-One Premium', included: true },
        { label: 'All ad campaigns (Meta, TikTok and Google)', included: true },
        { label: 'Unlimited revisions', included: true },
        { label: 'Prioritised conversion optimisation', included: true },
        { label: 'Priority support and ongoing care', included: true },
        { label: 'Individual full-service package', included: true },
        { label: 'One to one WhatsApp video or phone consultation', included: true },
      ],
      cta: 'Enquire about VIP',
    },
  ],

  builderIntro: {
    heading: 'Or build your own package',
    subtext: 'Pick exactly the services you need. The price updates instantly.',
  },

  builderBase: {
    label: 'Base website',
    price: 299,
    features: [
      'Website, landing page, web app or e-commerce',
      'Design to your brief',
      'Mobile optimised and fast',
      'Basic SEO setup',
      'One to one WhatsApp consultation',
    ],
  },

  builderAddons: [
    {
      id: 'automation',
      label: 'AI automation workflow',
      body: 'CRM, email and lead automation',
      price: 300,
    },
    {
      id: 'ads',
      label: 'Ad campaign',
      body: 'Meta, TikTok or Google Ads setup',
      price: 400,
    },
    {
      id: 'customizations',
      label: 'Extended revisions',
      body: 'Up to 3 additional change requests',
      price: 100,
    },
  ],

  builderMaintenance: 99,

  builderNote:
    'One-time payment, plus €99 per month maintenance. All prices include 19% German VAT.',

  builderCta: 'Request my package on WhatsApp',

  builderWaTemplate:
    'Hello! I have put together the following package: {items}. Estimated price: {price} one-time (incl. 19% VAT), plus €99 per month maintenance.',

  statement: {
    lead: 'Most agencies sell you a website.',
    emphasis: 'I sell you enquiries.',
    body: 'Design, engineering and advertising work together here because they come from one place. No handovers, no interfaces, no passing the blame. You get one point of contact and one result everything can be measured against.',
    signature: 'Brhan Jabri, founder of MorphixFlow',
  },

  faqIntro: {
    heading: 'Before you ask',
    subtext:
      'The points that come up in almost every first conversation. If something is missing, just message me.',
  },

  faqs: [
    {
      q: 'How long until my site is live?',
      a: 'Usually 14 days from the moment your copy and images are ready. The work is split into four stages, and you see and approve a checkpoint after each one.',
    },
    {
      q: 'What if I do not like the result?',
      a: 'Two full rounds of revisions are included in the price. Because you approve after every stage, big surprises at the end are almost impossible. Further changes can be booked individually at any time.',
    },
    {
      q: 'Are there hidden costs?',
      a: 'No. The package price is one-time and already includes 19% VAT. On top of that it is €99 per month for hosting, updates, backups and security. Ad budget for Meta or Google you pay directly to the platform, and I earn nothing on it.',
    },
    {
      q: 'Do I really own the site afterwards?',
      a: 'Yes. Domain, code and all access run in your name. If you end the collaboration you take the whole project with you. There is no minimum term and no lock-in to a website builder.',
    },
    {
      q: 'I already have a website. Is it still worth it?',
      a: 'Usually yes, but not always. Send me the address and I will tell you honestly whether a rework is enough or a rebuild makes more sense. If your site is performing well, I will say that too.',
    },
    {
      q: 'Do you work outside the Aachen region?',
      a: 'Yes. The whole process runs over video and WhatsApp, and my clients are spread across the German-speaking region. In and around Aachen and Düren I am happy to meet in person.',
    },
  ],

  contact: {
    heading: 'Let us get started',
    subtext: 'Write to me. I reply personally within 24 hours.',
    whatsappCta: 'Message me on WhatsApp',
    divider: 'or use the form',
    submit: 'Send enquiry',
    fields: {
      name: { label: 'Full name', placeholder: 'Jane Doe' },
      email: { label: 'Email address', placeholder: 'jane@company.com' },
      phone: { label: 'Phone number', placeholder: '+49 151 12345678' },
      paket: { label: 'Which package interests you?', placeholder: 'Choose a package' },
      message: {
        label: 'Tell me about your project',
        placeholder: 'Briefly describe your project, your goals and what you have in mind.',
      },
    },
    paketOptions: ['Essential', 'Customized', 'All-in-One Premium', 'VIP', 'Still unsure'],
    errors: {
      name: 'Please enter your name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'That email address does not look valid.',
      phone: 'Please enter your phone number.',
      message: 'Please describe your project briefly.',
      tooLong: 'This entry is too long.',
      consent: 'Please agree to the processing of your data.',
    },
    consent: {
      label:
        'I agree that my details may be stored and processed in order to handle my enquiry.',
      linkLabel: 'Privacy policy',
      linkHref: '/datenschutz',
      note: 'Consent can be withdrawn at any time by email.',
    },
    submitPending: 'Sending',
    toastInvalid: 'Please check your entries.',
    toastRateLimited:
      'Too many requests in a short time. Please try again in a few minutes, or message me directly on WhatsApp.',
    toastFailed: 'Something went wrong. Please try again or message me on WhatsApp.',
    success: {
      heading: 'Message sent',
      body: 'Thank you. I will get back to you within 24 hours.',
    },
    trust: [
      { label: 'service@morphixflow.de', icon: 'mail' },
      { label: 'Aachen, Germany', icon: 'pin' },
      { label: 'Reply within 24 hours', icon: 'clock' },
    ],
  },

  footer: {
    tagline: 'Websites, automation and ad campaigns from a single source.',
    aiNotice: 'Some imagery on this site is AI generated.',
    socials: [
      { label: 'Instagram', href: '#' },
      { label: 'TikTok', href: '#' },
      { label: 'WhatsApp', href: '#' },
    ],
    legal: [
      { label: 'Imprint', href: '/impressum' },
      { label: 'Privacy', href: '/datenschutz' },
    ],
    copyright: `© ${new Date().getFullYear()} MorphixFlow. All rights reserved.`,
  },
}
