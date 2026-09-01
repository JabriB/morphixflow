import type { Dictionary } from '../dictionary'

/**
 * Arabic (Modern Standard).
 *
 * Written for an RTL layout: `dir="rtl"` is set from the locale, and the
 * components use logical properties so padding and margins mirror rather than
 * being hardcoded left and right.
 *
 * Two deliberate choices:
 *  - Western Arabic numerals (1,234.56) rather than Eastern Arabic-Indic
 *    (١٬٤٨٦٫٣١). Prices, dates and metrics on a European B2B site are read
 *    against invoices and ad dashboards that all use Western digits, and
 *    mixing the two inside one page is harder to scan, not more authentic.
 *  - Brand and product names (MorphixFlow, Next.js, Meta Ads) stay in Latin
 *    script, which is normal practice in Arabic technical writing.
 *
 * TODO(owner): have a native speaker review the marketing copy before this
 * locale is promoted. The structure and the claims are correct, but persuasive
 * copy is exactly the kind of writing that benefits from a native ear.
 */
export const ar: Dictionary = {
  meta: {
    title: 'MorphixFlow. مواقع إلكترونية وأتمتة وحملات إعلانية.',
    description:
      'يبني MorphixFlow مواقع إلكترونية وأتمتة بالذكاء الاصطناعي وحملات إعلانية من مصدر واحد. استشارة شخصية من منطقة آخن ودورن. استشارة أولى مجانية عبر واتساب.',
    ogDescription:
      'عملاء أكثر. إيرادات أعلى. مواقع إلكترونية وأتمتة وحملات إعلانية من مصدر واحد، بإشراف شخصي من منطقة آخن.',
  },

  navLinks: [
    { label: 'البداية', href: '#start' },
    { label: 'الخدمات', href: '#leistungen' },
    { label: 'آلية العمل', href: '#prozess' },
    { label: 'الباقات', href: '#pakete' },
    { label: 'تواصل', href: '#kontakt' },
  ],

  navCta: { short: 'استشارة مجانية', long: 'احجز استشارة مجانية' },

  whatsappWidget: {
    ariaLabel: 'فتح التواصل عبر واتساب',
    heading: 'من أين نبدأ',
    presets: [
      {
        icon: 'Rocket',
        label: 'تحديث موقعي',
        message: '🚀 أرغب في تحديث موقعي الإلكتروني.',
      },
      {
        icon: 'Lightning',
        label: 'أتمتة بالذكاء الاصطناعي',
        message: '⚡ أحتاج إلى أتمتة بالذكاء الاصطناعي.',
      },
      {
        icon: 'ChatCircleDots',
        label: 'سؤال عام',
        message: '💬 لدي سؤال عام.',
      },
    ],
  },

  hero: {
    headline: ['عملاء أكثر.', 'إيرادات أعلى.'],
    subtext:
      'مواقع إلكترونية وأتمتة وحملات إعلانية من مصدر واحد. نتائج قابلة للقياس، وجاهزية خلال 14 يوماً.',
    subtextEmphasis: 'نتائج قابلة للقياس، وجاهزية خلال 14 يوماً.',
    primaryCta: 'احجز استشارة مجانية',
    secondaryCta: 'اطّلع على الباقات',
    subtextLead: 'مواقع إلكترونية وأتمتة وحملات إعلانية من مصدر واحد.',
    trustNote: 'بلا التزام وبلا ضغط بيعي. الرد عادة خلال أقل من 24 ساعة.',
    scrollLabel: 'انتقل إلى الخدمات',
  },

  ui: {
    homeLabel: 'MorphixFlow، العودة إلى الأعلى',
    mainNav: 'التنقل الرئيسي',
    mobileNav: 'تنقل الهاتف',
    footerNav: 'تنقل التذييل',
    chooseSolution: 'اختر الحل',
    filterProjects: 'تصفية المشاريع حسب الخدمة',
    chooseDevice: 'اختر الجهاز',
    daysEstimate: 'يوماً مدة تقديرية',
    monthsToPayback: 'شهراً حتى استرداد التكلفة',
    askQuestion: 'اطرح سؤالك مباشرة',
    askQuestionMessage: 'مرحباً! لدي سؤال آخر عن خدماتكم.',
    menuOpen: 'فتح القائمة',
    menuClose: 'إغلاق القائمة',
    rangeTo: 'إلى',
    durationRange: 'من {low} إلى {high} يوماً تقريباً',
  },

  toolchain: {
    label: 'مبني باستخدام',
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
    { value: '50+', label: 'مشروعاً منجزاً' },
    { value: '98%', label: 'رضا العملاء' },
    { value: '3x', label: 'متوسط العائد' },
    { value: '24h', label: 'زمن الاستجابة' },
  ],

  servicesIntro: {
    heading: 'كل ما يحتاجه عملك',
    subtext:
      'من الموقع الإلكتروني إلى الحملة الإعلانية. كل خدمة تصبّ مباشرة في زيادة الإيرادات وتقليل الجهد عليك.',
  },

  services: [
    {
      slug: 'web',
      name: 'تطوير المواقع',
      body: 'مواقع احترافية وصفحات هبوط وتطبيقات ويب ومتاجر إلكترونية، مبنية بالكامل وفق تصورك. التصميم والألوان والشعار. القرار لك.',
      tags: ['موقع إلكتروني', 'صفحة هبوط', 'تطبيق ويب', 'متجر إلكتروني'],
    },
    {
      slug: 'automation',
      name: 'أتمتة بالذكاء الاصطناعي',
      body: 'أتمتة ذكية لسير العمل تضع عملك على الطيار الآلي. إدارة العملاء وتوليد الفرص والبريد الإلكتروني وأكثر، مدعومة بالذكاء الاصطناعي.',
      tags: ['n8n', 'Make.com', 'مزامنة CRM', 'ذكاء اصطناعي'],
    },
    {
      slug: 'ads',
      name: 'الحملات الإعلانية',
      body: 'حملات قائمة على البيانات على Meta وTikTok وGoogle Ads. أقصى انتشار، وتحويلات حقيقية.',
      tags: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'إعادة الاستهداف'],
    },
  ],

  showcaseIntro: {
    heading: 'حرفية تُلمس من أول نظرة',
    subtext: 'نظرة خلف الكواليس. هكذا يبدو موقع بنيناه، على كل جهاز.',
    disclaimer: 'قيم توضيحية للمثال. ليست قياساً لموقعك الحالي.',
  },

  showcaseDevices: [
    { id: 'desktop', label: 'سطح المكتب', frameWidth: 16, frameHeight: 10 },
    { id: 'tablet', label: 'لوحي', frameWidth: 4, frameHeight: 3 },
    { id: 'mobile', label: 'هاتف', frameWidth: 9, frameHeight: 19 },
  ],

  performanceComparison: [
    { metric: 'تقييم Lighthouse', unit: '/100', wordpress: 42, morphixflow: 100, higherIsBetter: true },
    { metric: 'زمن التحميل (LCP)', unit: 'ث', wordpress: 4.2, morphixflow: 0.6, higherIsBetter: false },
    { metric: 'الجاهزية للتفاعل', unit: 'ث', wordpress: 6.8, morphixflow: 0.9, higherIsBetter: false },
    { metric: 'حجم الصفحة', unit: 'MB', wordpress: 4.8, morphixflow: 0.8, higherIsBetter: false },
  ],

  processIntro: {
    heading: 'كيف نعمل معاً',
    subtext: 'من الفكرة الأولى إلى النتيجة النهائية. بشفافية وتواصل شخصي، وإطلاق خلال 14 يوماً.',
  },

  processSteps: [
    {
      day: 'اليوم 1',
      dayRange: 'الأيام 1 إلى 3',
      name: 'استشارة مجانية',
      body: 'نتحدث مباشرة عبر مكالمة فيديو أو صوت على واتساب. تخبرني بأهدافك، وأعرض عليك أفضل طريق.',
    },
    {
      day: 'اليوم 4',
      dayRange: 'الأيام 4 إلى 8',
      name: 'تصور مخصص',
      body: 'تحصل على عرض مصمم لك. بلا نسخ ولصق. كل مشروع يُخطط وفق ما طلبته بالضبط.',
    },
    {
      day: 'اليوم 9',
      dayRange: 'الأيام 9 إلى 13',
      name: 'التنفيذ والإطلاق',
      body: 'أطوّر مشروعك بأعلى جودة. في الموعد، وبشفافية، وبتواصل منتظم معك.',
    },
    {
      day: 'اليوم 14',
      dayRange: 'من اليوم 14',
      name: 'النمو والتحسين',
      body: 'بعد الإطلاق لن تكون وحدك. تحسين مستمر ودعم وتوسّع لنتائج تدوم.',
    },
  ],

  processNote: {
    before: 'كل باقة تشمل ',
    emphasis: 'استشارة فردية عبر فيديو أو مكالمة واتساب',
  },

  resultsIntro: {
    heading: 'الأرقام تتحدث عن نفسها',
    subtext: 'إيرادات ووقت موفَّر وظهور أوسع، تظهر في أرقام عملاء حقيقيين.',
    projectsHeading: 'مشاريع نموذجية',
    filterAll: 'الكل',
  },

  projects: [
    {
      name: 'إطلاق متجر إلكتروني',
      category: 'تجارة إلكترونية، موقع',
      result: 'زيادة 180% في الإيرادات خلال الشهر الأول',
      slug: 'web',
    },
    {
      name: 'أتمتة العملاء المحتملين',
      category: 'أتمتة ذكية، CRM',
      result: 'توفير 40 ساعة شهرياً',
      slug: 'automation',
    },
    {
      name: 'حملة Meta Ads',
      category: 'إعلانات فيسبوك وإنستغرام',
      result: 'تحقيق عائد إعلاني 4.2x',
      slug: 'ads',
    },
  ],

  reviewsIntro: {
    heading: 'ماذا يقول العملاء',
    subtext: 'تجارب حقيقية لعملاء حقيقيين، مباشرة من Google.',
    ctaLine: 'اختبر النتيجة بنفسك وكن قصة النجاح التالية.',
    ctaLabel: 'ابدأ مجاناً',
  },

  reviews: [
    {
      name: 'Lena Hoffmann',
      initials: 'LH',
      when: 'قبل أسبوعين',
      rating: 5,
      body: 'ممتاز تماماً. أنجز MorphixFlow موقعنا الجديد في وقت قصير جداً. عصري وسريع ومطابق لما تصورناه. التواصل عبر واتساب كان في غاية السهولة.',
    },
    {
      name: 'Marco Schneider',
      initials: 'MS',
      when: 'قبل شهر',
      rating: 5,
      body: 'وفّرت الأتمتة الذكية علينا ساعات كل أسبوع. جمع العملاء ومزامنة CRM ورسائل المتابعة. كل ذلك يعمل تلقائياً الآن. الاستثمار عاد علينا في الشهر الأول.',
    },
    {
      name: 'Sophie Wagner',
      initials: 'SW',
      when: 'قبل ثلاثة أسابيع',
      rating: 5,
      body: 'حققت حملتنا على Meta عائداً إعلانياً قدره 4.8x. متابعة احترافية واستجابة سريعة وتقارير شفافة. أنصح به بوضوح لكل من يريد النمو رقمياً.',
    },
    {
      name: 'Felix Bauer',
      initials: 'FB',
      when: 'قبل خمسة أسابيع',
      rating: 5,
      body: 'أعيد بناء المتجر الإلكتروني من الصفر. التصميم كان تماماً كما تخيلته، ونسخة الهاتف مثالية. تضاعف عائد Google Ads ثلاث مرات خلال 6 أسابيع.',
    },
    {
      name: 'Anna Müller',
      initials: 'AM',
      when: 'قبل شهرين',
      rating: 5,
      body: 'صرنا نتصدر الصفحة الأولى لأهم كلماتنا المفتاحية. يشرح MorphixFlow كل شيء بلغة واضحة ويقدم نتائج قابلة للقياس. أنصح به بشدة.',
    },
    {
      name: 'Jonas Weber',
      initials: 'JW',
      when: 'قبل ستة أسابيع',
      rating: 5,
      body: 'صفحة هبوط وحملة على TikTok خلال أقل من أسبوعين. ارتفع معدل التحويل بوضوح. تواصل لطيف عبر واتساب، متاح دائماً ومتعاون.',
    },
  ],

  calculatorIntro: {
    heading: 'ما الذي يستحق ذلك بالنسبة لك',
    subtext: 'اختر الحل وحرّك المؤشر. تتحدث الأرقام فوراً.',
    cta: 'ناقش النتيجة عبر واتساب',
  },

  calculatorDisclaimer:
    'قيم استرشادية مبنية على مشاريع سابقة. نناقش عرضك الخاص شخصياً عبر واتساب.',

  calculatorContent: {
    web: {
      sliderLabel: 'كم صفحة فرعية تحتاج تقريباً',
      sliderMin: 1,
      sliderMax: 20,
      sliderStep: 1,
      sliderUnit: 'صفحة',
      sliderDefault: 5,
      baseDurationDays: 4,
      durationPerUnitDays: 0.5,
      valuePerUnit: 40,
      valueLabel: 'الإيراد الإضافي المقدّر شهرياً',
      valueNote: 'القيمة المفترضة: 40 € لكل صفحة شهرياً.',
      relevantPackageId: 'essential',
      waMessageTemplate:
        'مرحباً! أهتم بموقع يضم نحو {value} صفحة. المدة المقدّرة حسب الحاسبة: {duration}.',
    },
    automation: {
      sliderLabel: 'كم ساعة عمل يدوي أسبوعياً تريد أتمتتها',
      sliderMin: 1,
      sliderMax: 40,
      sliderStep: 1,
      sliderUnit: 'ساعة أسبوعياً',
      sliderDefault: 10,
      baseDurationDays: 5,
      durationPerUnitDays: 0.3,
      valuePerUnit: 150,
      valueLabel: 'القيمة المقدّرة للوقت الموفَّر شهرياً',
      valueNote: 'الأجر المفترض للساعة: 35 €، محسوباً على شهر كامل.',
      relevantPackageId: 'customized',
      waMessageTemplate:
        'مرحباً! أرغب في أتمتة نحو {value} ساعة أسبوعياً. المدة المقدّرة حسب الحاسبة: {duration}.',
    },
    ads: {
      sliderLabel: 'ما ميزانيتك الإعلانية الشهرية المخططة',
      sliderMin: 300,
      sliderMax: 10000,
      sliderStep: 100,
      sliderUnit: '€ شهرياً',
      sliderDefault: 1500,
      baseDurationDays: 6,
      durationPerUnitDays: 0.002,
      valuePerUnit: 2.2,
      valueLabel: 'الإيراد الإضافي المقدّر شهرياً',
      valueNote: 'العائد المفترض: 3.2 ضعف الميزانية الإعلانية، بعد خصم الإنفاق.',
      relevantPackageId: 'premium',
      waMessageTemplate:
        'مرحباً! أخطط لميزانية إعلانية شهرية تبلغ نحو {value} €. المدة المقدّرة حسب الحاسبة: {duration}.',
    },
  },

  pricingIntro: {
    heading: 'اختر باقتك',
    subtext: 'كل باقة تشمل استشارة فردية شخصية عبر واتساب.',
    vatNote: 'جميع الأسعار تشمل ضريبة القيمة المضافة الألمانية بنسبة 19%.',
    nudge: 'غير متأكد أي باقة تناسبك؟ لا مشكلة.',
    nudgeCta: 'احصل على استشارة مجانية عبر واتساب',
  },

  packages: [
    {
      id: 'essential',
      name: 'Essential',
      tagline: 'حضورك الرقمي',
      badge: null,
      featured: false,
      price: { main: '299 €', suffix: 'دفعة واحدة', note: 'إضافة إلى 99 € شهرياً للصيانة' },
      features: [
        { label: 'موقع أو صفحة هبوط أو تطبيق ويب أو متجر إلكتروني', included: true },
        { label: 'تصميم وفق طلبك (ألوان، شعار، أسلوب)', included: true },
        { label: 'محسّن للهاتف وسريع', included: true },
        { label: 'تحسين أساسي لمحركات البحث', included: true },
        { label: 'استشارة فردية عبر فيديو أو مكالمة واتساب', included: true },
        { label: 'سير عمل مؤتمت', included: false },
        { label: 'حملة إعلانية', included: false },
      ],
      cta: 'اطلب الآن',
    },
    {
      id: 'customized',
      name: 'Customized',
      tagline: 'موقع مع أتمتة',
      badge: null,
      featured: false,
      price: { main: '599 €', suffix: 'دفعة واحدة', note: 'إضافة إلى 99 € شهرياً للصيانة' },
      features: [
        { label: 'موقع أو صفحة هبوط أو تطبيق ويب أو متجر إلكتروني', included: true },
        { label: 'تصميم وفق طلبك', included: true },
        { label: 'سير عمل مؤتمت واحد (CRM، بريد، عملاء محتملون)', included: true },
        { label: 'تنفيذ تدريجي حسب رغبتك', included: true },
        { label: 'حتى 3 تعديلات مجانية', included: true },
        { label: 'استشارة فردية عبر فيديو أو مكالمة واتساب', included: true },
        { label: 'حملة إعلانية', included: false },
      ],
      cta: 'اطلب الآن',
    },
    {
      id: 'premium',
      name: 'All-in-One Premium',
      tagline: 'الباقة الكاملة',
      badge: 'الأكثر اختياراً',
      featured: true,
      price: { main: '999 €', suffix: 'دفعة واحدة', note: 'إضافة إلى 99 € شهرياً للصيانة' },
      features: [
        { label: 'موقع أو صفحة هبوط أو تطبيق ويب أو متجر إلكتروني', included: true },
        { label: 'تصميم وفق طلبك', included: true },
        { label: 'سير عمل مؤتمت واحد (CRM، بريد، عملاء محتملون)', included: true },
        { label: 'حملة إعلانية واحدة (Meta أو TikTok أو Google)', included: true },
        { label: 'تحسين معدل التحويل', included: true },
        { label: 'استشارة فردية عبر فيديو أو مكالمة واتساب', included: true },
      ],
      cta: 'اطلب الآن',
    },
    {
      id: 'vip',
      name: 'VIP',
      tagline: 'كل شيء بلا تنازلات',
      badge: 'حصري',
      featured: false,
      price: { main: 'عند الطلب', suffix: null, note: 'عرض مخصص' },
      features: [
        { label: 'كل ما في باقة All-in-One Premium', included: true },
        { label: 'كل الحملات الإعلانية (Meta وTikTok وGoogle)', included: true },
        { label: 'تعديلات غير محدودة', included: true },
        { label: 'أولوية في تحسين معدل التحويل', included: true },
        { label: 'دعم بأولوية ومتابعة مستمرة', included: true },
        { label: 'باقة خدمة كاملة مخصصة', included: true },
        { label: 'استشارة فردية عبر فيديو أو مكالمة واتساب', included: true },
      ],
      cta: 'اطلب باقة VIP',
    },
  ],

  builderIntro: {
    heading: 'أو كوّن باقتك الخاصة',
    subtext: 'اختر الخدمات التي تحتاجها بالضبط. يتغير السعر فوراً.',
  },

  builderBase: {
    label: 'موقع أساسي',
    price: 299,
    features: [
      'موقع أو صفحة هبوط أو تطبيق ويب أو متجر إلكتروني',
      'تصميم وفق طلبك',
      'محسّن للهاتف وسريع',
      'تحسين أساسي لمحركات البحث',
      'استشارة فردية عبر واتساب',
    ],
  },

  builderAddons: [
    {
      id: 'automation',
      label: 'سير عمل مؤتمت بالذكاء الاصطناعي',
      body: 'أتمتة CRM والبريد والعملاء المحتملين',
      price: 300,
    },
    {
      id: 'ads',
      label: 'حملة إعلانية',
      body: 'إعداد Meta أو TikTok أو Google Ads',
      price: 400,
    },
    {
      id: 'customizations',
      label: 'تعديلات موسّعة',
      body: 'حتى 3 طلبات تعديل إضافية',
      price: 100,
    },
  ],

  builderMaintenance: 99,

  builderNote:
    'دفعة واحدة، إضافة إلى 99 € شهرياً للصيانة. جميع الأسعار تشمل ضريبة القيمة المضافة بنسبة 19%.',

  builderCta: 'اطلب باقتي عبر واتساب',

  builderWaTemplate:
    'مرحباً! جمّعت الباقة التالية: {items}. السعر المقدّر: {price} دفعة واحدة (شاملة 19% ضريبة القيمة المضافة)، إضافة إلى 99 € شهرياً للصيانة.',

  statement: {
    lead: 'معظم الوكالات تبيعك موقعاً إلكترونياً.',
    emphasis: 'أنا أبيعك طلبات عملاء.',
    body: 'التصميم والتقنية والإعلان تتشابك هنا لأنها تأتي من مصدر واحد. بلا تسليمات بين فرق، وبلا وسطاء، وبلا تبادل للمسؤولية. لديك جهة تواصل واحدة ونتيجة واحدة يُقاس عليها كل شيء.',
    signature: 'برهان جابري، مؤسس MorphixFlow',
  },

  faqIntro: {
    heading: 'قبل أن تسأل',
    subtext:
      'النقاط التي تتكرر في كل محادثة أولى تقريباً. إن نقص شيء، راسلني ببساطة.',
  },

  faqs: [
    {
      q: 'كم يستغرق حتى يصبح موقعي جاهزاً؟',
      a: 'عادة 14 يوماً من لحظة توفر النصوص والصور. ينقسم العمل إلى أربع مراحل، وترى نتيجة مرحلية بعد كل مرحلة وتعتمدها.',
    },
    {
      q: 'ماذا لو لم تعجبني النتيجة؟',
      a: 'يشمل السعر جولتي تعديل كاملتين. ولأنك تعتمد بعد كل مرحلة، تكاد المفاجآت الكبيرة في النهاية تكون معدومة. ويمكن حجز تعديلات إضافية منفردة في أي وقت.',
    },
    {
      q: 'هل هناك تكاليف خفية؟',
      a: 'لا. سعر الباقة يُدفع مرة واحدة ويشمل ضريبة القيمة المضافة 19%. يضاف إليه 99 € شهرياً للاستضافة والتحديثات والنسخ الاحتياطي والأمان. أما ميزانية الإعلانات على Meta أو Google فتدفعها مباشرة للمنصة، ولا أربح منها شيئاً.',
    },
    {
      q: 'هل يصبح الموقع ملكي فعلاً؟',
      a: 'نعم. النطاق والشيفرة وكل الصلاحيات باسمك. وإن أنهيت التعاون تأخذ المشروع كاملاً معك. لا حد أدنى للمدة ولا ارتباط بمنصة جاهزة.',
    },
    {
      q: 'لدي موقع بالفعل. هل يستحق الأمر؟',
      a: 'غالباً نعم، لكن ليس دائماً. أرسل لي العنوان وسأخبرك بصراحة إن كان التحديث كافياً أم أن إعادة البناء أجدى. وإن كان موقعك يؤدي جيداً فسأقول لك ذلك أيضاً.',
    },
    {
      q: 'هل تعمل خارج منطقة آخن؟',
      a: 'نعم. تجري العملية بالكامل عبر الفيديو وواتساب، وعملائي منتشرون في المنطقة الناطقة بالألمانية. وفي آخن ودورن وما حولهما يسعدني اللقاء شخصياً.',
    },
  ],

  contact: {
    heading: 'لنبدأ معاً',
    subtext: 'راسلني. أرد شخصياً خلال 24 ساعة.',
    whatsappCta: 'راسلني على واتساب',
    divider: 'أو استخدم النموذج',
    submit: 'إرسال الطلب',
    fields: {
      name: { label: 'الاسم الكامل', placeholder: 'محمد أحمد' },
      email: { label: 'البريد الإلكتروني', placeholder: 'name@company.com' },
      phone: { label: 'رقم الهاتف', placeholder: '+49 151 12345678' },
      paket: { label: 'أي باقة تهمك؟', placeholder: 'اختر باقة' },
      message: {
        label: 'حدثني عن مشروعك',
        placeholder: 'صف باختصار مشروعك وأهدافك وما تتصوره.',
      },
    },
    paketOptions: ['Essential', 'Customized', 'All-in-One Premium', 'VIP', 'ما زلت متردداً'],
    errors: {
      name: 'يرجى إدخال اسمك.',
      emailRequired: 'يرجى إدخال بريدك الإلكتروني.',
      emailInvalid: 'هذا البريد الإلكتروني لا يبدو صحيحاً.',
      phone: 'يرجى إدخال رقم هاتفك.',
      message: 'يرجى وصف مشروعك باختصار.',
      tooLong: 'هذا الإدخال طويل جداً.',
      consent: 'يرجى الموافقة على معالجة بياناتك.',
    },
    consent: {
      label: 'أوافق على تخزين بياناتي ومعالجتها بغرض الرد على طلبي.',
      linkLabel: 'سياسة الخصوصية',
      linkHref: '/datenschutz',
      note: 'يمكن سحب الموافقة في أي وقت عبر البريد الإلكتروني.',
    },
    submitPending: 'جارٍ الإرسال',
    toastInvalid: 'يرجى مراجعة بياناتك.',
    toastRateLimited:
      'طلبات كثيرة خلال وقت قصير. حاول مجدداً بعد بضع دقائق أو راسلني مباشرة على واتساب.',
    toastFailed: 'حدث خطأ ما. حاول مجدداً أو راسلني على واتساب.',
    success: {
      heading: 'تم إرسال الرسالة',
      body: 'شكراً لك. سأعود إليك خلال 24 ساعة.',
    },
    trust: [
      { label: 'service@morphixflow.de', icon: 'mail' },
      { label: 'آخن، ألمانيا', icon: 'pin' },
      { label: 'الرد خلال 24 ساعة', icon: 'clock' },
    ],
  },

  footer: {
    tagline: 'مواقع إلكترونية وأتمتة وحملات إعلانية من مصدر واحد.',
    aiNotice: 'بعض الصور في هذا الموقع مولّدة بالذكاء الاصطناعي.',
    socials: [
      { label: 'Instagram', href: '#' },
      { label: 'TikTok', href: '#' },
      { label: 'WhatsApp', href: '#' },
    ],
    legal: [
      { label: 'بيانات الناشر', href: '/impressum' },
      { label: 'الخصوصية', href: '/datenschutz' },
    ],
    copyright: `© ${new Date().getFullYear()} MorphixFlow. جميع الحقوق محفوظة.`,
  },
}
