import type { Lang } from "../seo/site";

type ArticleSection = {
  title: string;
  body: string[];
};

export type ArticleContent = {
  kicker: string;
  readTime: string;
  intro: string;
  lead: string;
  thesis: string;
  checklist: string[];
  sections: ArticleSection[];
  pullquote: string;
};

export type DetailCopy = {
  industriesCrumb: string;
  blogCrumb: string;
  servicesCrumb: string;
  backToBlog: string;
  articleMove: string;
  allIndustries: string;
  allServices: string;
  metaFormat: string;
  metaService: string;
  metaSprint: string;
  metaSprintValue: string;
  metaTeam: string;
  metaTeamValue: string;
  metaHandoff: string;
  metaHandoffValue: string;
  blueprintTitle: string;
  blueprintText: string;
  blueprintFormatDetail: string;
  blueprintSprintDetail: string;
  blueprintTeamDetail: string;
  blueprintHandoffDetail: string;
  industryLedgerTitle: string;
  industryLedgerText: string;
  industryProblemLabel: string;
  industryResponseLabel: string;
  industryRunwayTitle: string;
  industryRunwayText: string;
  rhythmLabel: string;
  systemTitle: string;
  systemAccent: string;
  systemLayers: [string, string, string];
  workIntro: string;
  specificValue: string;
  crmBound: string;
  structuredSeo: string;
  maintainedSystem: string;
  connectionsLabel: string;
  faqTitle: string;
  bottomTitle: string;
  bottomText: string;
  articleCtaTitle: string;
  articleCtaText: string;
  articleCore?: string;
  articleCheck?: string;
};

export function formatArticleDate(dateStr: string | undefined, lang: Lang) {
  if (!dateStr) return "";
  const localeMap: Record<Lang, string> = { en: "en-US", es: "es-ES", ru: "ru-RU", zh: "zh-CN" };
  return new Intl.DateTimeFormat(localeMap[lang], { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(dateStr),
  );
}

export const articleContent: Record<string, Record<Lang, ArticleContent>> = {
  "why-landing-pages-fail": {
    ru: {
      kicker: "Конверсия",
      readTime: "5 мин",
      intro:
        "Первый экран не должен быть красивой заставкой. Он должен быстро объяснить, кому вы помогаете, какую боль закрываете и что человеку делать дальше.",
      lead: "Большинство лендингов проигрывают не из-за плохого шрифта или недостатка анимации. Они проигрывают потому, что пользователь не успевает понять смысл страницы до первого сомнения.",
      thesis: "У первого экрана есть одна задача: снять неопределенность быстрее, чем человек уйдет.",
      checklist: [
        "Понятно, для кого страница",
        "Оффер читается без расшифровки",
        "CTA говорит о следующем действии",
        "Доказательства стоят рядом с обещанием",
      ],
      sections: [
        {
          title: "Пользователь не читает, он сверяет",
          body: [
            "Когда человек попадает на страницу, он не изучает ее как презентацию. Он ищет совпадение: это про меня, это решает мою задачу, этим можно доверять.",
            "Если первый экран требует расшифровки, страница уже тратит внимание. А внимание на холодном трафике почти всегда дороже дизайна.",
          ],
        },
        {
          title: "Слабый оффер выглядит как общее описание",
          body: [
            "Фразы вроде «создаем современные решения» звучат безопасно, но не продают. В них нет конкретики: кому, какой результат, за счет чего.",
            "Хороший оффер не обязан быть длинным. Он обязан быть точным. Чем быстрее человек узнает свою ситуацию, тем легче ему сделать следующий шаг.",
          ],
        },
        {
          title: "CTA должен продолжать мысль",
          body: [
            "Кнопка «оставить заявку» часто висит отдельно от смысла страницы. Пользователь еще не понял, зачем ему заявка, а его уже просят действовать.",
            "Лучше работает CTA, который объясняет действие: обсудить задачу, получить аудит, разобрать страницу, рассчитать запуск. Это не украшение, а часть маршрута.",
          ],
        },
        {
          title: "Дизайн усиливает структуру, а не заменяет ее",
          body: [
            "Визуал может сделать страницу дороже, спокойнее и увереннее. Но он не спасает пустой смысл.",
            "Сначала фиксируются ценность, аудитория, доказательства и путь. Потом дизайн превращает это в экран, который читается за несколько секунд.",
          ],
        },
      ],
      pullquote:
        "Если первый экран нельзя пересказать одним предложением, пользователь тоже не сможет понять его быстро.",
    },
    en: {
      kicker: "Conversion",
      readTime: "5 min",
      intro:
        "The first screen is not a decoration. It has to explain who the page is for, what pain it removes and what the next step is.",
      lead: "Most landing pages do not fail because of typography or missing animation. They fail because the visitor cannot understand the page before the first doubt appears.",
      thesis: "The first screen has one job: remove uncertainty before the visitor leaves.",
      checklist: [
        "The audience is clear",
        "The offer is specific",
        "The CTA explains the next step",
        "Proof sits close to the promise",
      ],
      sections: [
        {
          title: "Users do not read. They match.",
          body: [
            "A visitor looks for a match: this is about me, this solves my problem, this feels trustworthy.",
            "If the first screen needs decoding, the page is already spending attention it may not get back.",
          ],
        },
        {
          title: "A weak offer sounds generic",
          body: [
            "Lines like “we build modern solutions” feel safe, but they do not sell. They do not say who, what outcome or why now.",
            "A good offer can be short. It just has to be precise.",
          ],
        },
        {
          title: "The CTA continues the thought",
          body: [
            "A generic “send request” button often appears before the user understands why they should act.",
            "A stronger CTA names the action: discuss the project, audit the page, estimate the launch.",
          ],
        },
        {
          title: "Design amplifies structure",
          body: [
            "Visual language can make a page feel sharper and more expensive. It cannot replace meaning.",
            "Value, audience, proof and path come first. Design makes them readable fast.",
          ],
        },
      ],
      pullquote:
        "If the first screen cannot be retold in one sentence, the visitor will not understand it fast either.",
    },
    es: {
      kicker: "Conversion",
      readTime: "5 min",
      intro:
        "La primera pantalla no es decoracion. Debe explicar para quien es la pagina, que problema resuelve y cual es el siguiente paso.",
      lead: "Muchas landing pages no fallan por tipografia o animacion. Fallan porque el visitante no entiende la pagina antes de que aparezca la primera duda.",
      thesis: "La primera pantalla debe quitar incertidumbre antes de que el usuario se vaya.",
      checklist: ["Audiencia clara", "Oferta especifica", "CTA con siguiente paso", "Prueba cerca de la promesa"],
      sections: [
        {
          title: "El usuario no lee, compara",
          body: [
            "Busca una coincidencia: esto es para mi, resuelve mi problema, puedo confiar.",
            "Si la primera pantalla necesita explicacion, ya esta gastando atencion.",
          ],
        },
        {
          title: "Una oferta debil suena generica",
          body: [
            "Frases como “soluciones modernas” no venden porque no dicen para quien ni que resultado.",
            "Una buena oferta puede ser corta, pero debe ser precisa.",
          ],
        },
        {
          title: "El CTA continua la idea",
          body: [
            "Un boton generico aparece demasiado pronto si el usuario aun no entiende por que actuar.",
            "Funciona mejor nombrar la accion: auditar, discutir, estimar, lanzar.",
          ],
        },
        {
          title: "El diseno amplifica estructura",
          body: [
            "El visual puede elevar la pagina, pero no reemplaza el sentido.",
            "Primero valor, audiencia, prueba y ruta. Despues diseno.",
          ],
        },
      ],
      pullquote: "Si la primera pantalla no cabe en una frase, el usuario tampoco la entendera rapido.",
    },
    zh: {
      kicker: "转化",
      readTime: "5 分钟",
      intro: "首屏不是装饰。它必须快速说明页面面向谁、解决什么问题，以及下一步是什么。",
      lead: "多数落地页失败不是因为字体或动画，而是用户在产生第一个疑问前没有理解页面。",
      thesis: "首屏的任务是在用户离开前消除不确定性。",
      checklist: ["受众清晰", "报价具体", "CTA 说明下一步", "证明靠近承诺"],
      sections: [
        {
          title: "用户不是阅读，而是匹配",
          body: ["用户寻找匹配：这是否关于我，是否解决问题，是否可信。", "如果首屏需要解码，注意力已经被浪费。"],
        },
        {
          title: "弱报价听起来很泛",
          body: ["“现代解决方案”很安全，但不销售，因为它没有说明对象和结果。", "好的报价可以很短，但必须准确。"],
        },
        {
          title: "CTA 延续思路",
          body: ["如果用户还不知道为什么行动，普通按钮就太早了。", "更好的 CTA 会命名动作：审计、讨论、估算、启动。"],
        },
        {
          title: "设计放大结构",
          body: ["视觉可以让页面更高级，但不能替代意义。", "先确定价值、受众、证明和路径，再设计。"],
        },
      ],
      pullquote: "如果首屏不能用一句话复述，用户也无法快速理解。",
    },
  },
  "crm-that-actually-works": {
    ru: {
      kicker: "Автоматизация",
      readTime: "7 мин",
      intro:
        "Рабочая CRM не просто хранит заявки. Она показывает, что происходит с каждым лидом, кто отвечает за следующий шаг и где бизнес теряет деньги.",
      lead: "CRM часто покупают как склад контактов. Потом в ней появляются хаотичные статусы, дубли, потерянные заявки и отчеты, которым никто не верит.",
      thesis: "CRM начинает работать, когда у каждого лида есть маршрут, владелец и следующее действие.",
      checklist: [
        "Источник заявки сохраняется",
        "Статусы отражают реальный процесс",
        "Ответственный видит следующий шаг",
        "Руководитель видит узкие места",
      ],
      sections: [
        {
          title: "Сначала процесс, потом поля",
          body: [
            "Ошибка начинается с вопроса «какие поля добавить». Правильный вопрос другой: какой путь проходит заявка от формы до оплаты.",
            "Поля нужны только там, где они помогают принять решение, сегментировать лид или запустить действие.",
          ],
        },
        {
          title: "Статус должен означать действие",
          body: [
            "Если статус называется «в работе», он почти ничего не говорит. В работе что именно: ждем ответа, готовим КП, назначаем встречу, потеряли контакт?",
            "Хорошая воронка делает следующий шаг очевидным без созвона с менеджером.",
          ],
        },
        {
          title: "Автоматизация не должна прятать хаос",
          body: [
            "Автосообщения, роботы и интеграции не исправляют плохой процесс. Они просто быстрее разносят хаос по системе.",
            "Сначала фиксируется логика: когда создается сделка, кто получает уведомление, что считается конверсией, где нужен контроль.",
          ],
        },
        {
          title: "Отчетность строится на событиях",
          body: [
            "Если сайт, реклама и CRM не передают события друг другу, аналитика превращается в догадки.",
            "Нужно видеть не только количество заявок, но и качество: источник, этап, скорость ответа, причину отказа и финальный результат.",
          ],
        },
      ],
      pullquote: "CRM без маршрута лида — это не система продаж, а дорогая таблица.",
    },
    en: {
      kicker: "Automation",
      readTime: "7 min",
      intro:
        "A working CRM does not just store leads. It shows what happens next, who owns the step and where revenue leaks.",
      lead: "Many companies buy CRM as a contact storage tool. Then statuses become chaotic, duplicates appear and reports lose trust.",
      thesis: "CRM works when every lead has a route, an owner and a next action.",
      checklist: [
        "Lead source is saved",
        "Statuses mirror the real process",
        "Owner sees the next step",
        "Management sees bottlenecks",
      ],
      sections: [
        {
          title: "Process before fields",
          body: [
            "The wrong start is asking what fields to add. The right start is mapping the lead path from form to payment.",
            "Fields matter only when they help decide, segment or trigger an action.",
          ],
        },
        {
          title: "A status should imply action",
          body: [
            "A status called “in progress” says almost nothing. Waiting for reply? Preparing proposal? Booking a meeting?",
            "A good pipeline makes the next step obvious.",
          ],
        },
        {
          title: "Automation cannot hide chaos",
          body: [
            "Messages, bots and integrations do not fix a broken process. They spread it faster.",
            "Logic comes first: deal creation, notifications, conversion events and control points.",
          ],
        },
        {
          title: "Reports are built on events",
          body: [
            "When site, ads and CRM do not share events, analytics becomes guessing.",
            "You need source, stage, response time, refusal reason and final result.",
          ],
        },
      ],
      pullquote: "A CRM without a lead route is not a sales system. It is an expensive spreadsheet.",
    },
    es: {
      kicker: "Automatizacion",
      readTime: "7 min",
      intro:
        "Un CRM funcional no solo guarda leads. Muestra que pasa despues, quien responde y donde se pierde dinero.",
      lead: "Muchas empresas compran CRM como almacen de contactos. Luego aparecen estados caoticos, duplicados e informes poco fiables.",
      thesis: "El CRM funciona cuando cada lead tiene ruta, responsable y siguiente accion.",
      checklist: ["Fuente guardada", "Estados reales", "Responsable claro", "Cuellos de botella visibles"],
      sections: [
        {
          title: "Proceso antes que campos",
          body: [
            "No empieza por campos. Empieza por la ruta del lead desde formulario hasta pago.",
            "Un campo importa si ayuda a decidir, segmentar o activar algo.",
          ],
        },
        {
          title: "Un estado implica accion",
          body: [
            "“En proceso” no dice suficiente. Espera respuesta, propuesta, reunion?",
            "Una buena pipeline deja claro el siguiente paso.",
          ],
        },
        {
          title: "Automatizar no oculta caos",
          body: [
            "Bots e integraciones no arreglan un mal proceso, lo aceleran.",
            "Primero va la logica: creacion, avisos, eventos y control.",
          ],
        },
        {
          title: "Los reportes salen de eventos",
          body: [
            "Sin eventos entre web, ads y CRM, la analitica es suposicion.",
            "Hay que ver fuente, etapa, tiempo de respuesta, motivo de rechazo y resultado.",
          ],
        },
      ],
      pullquote: "Un CRM sin ruta de lead es una hoja de calculo cara.",
    },
    zh: {
      kicker: "自动化",
      readTime: "7 分钟",
      intro: "有效的 CRM 不只是保存线索。它说明下一步是什么、谁负责，以及收入在哪里流失。",
      lead: "很多公司把 CRM 当联系人仓库购买，之后状态混乱、重复线索和不可信报表都会出现。",
      thesis: "当每个线索都有路径、负责人和下一步行动时，CRM 才工作。",
      checklist: ["保存来源", "状态反映真实流程", "负责人看到下一步", "管理层看到瓶颈"],
      sections: [
        {
          title: "先流程，后字段",
          body: [
            "错误起点是问加哪些字段。正确起点是梳理线索从表单到付款的路径。",
            "字段只有在帮助决策、分组或触发动作时才有价值。",
          ],
        },
        {
          title: "状态应代表动作",
          body: ["“处理中”几乎没有信息。是在等回复、准备报价还是预约会议？", "好的漏斗让下一步清晰。"],
        },
        {
          title: "自动化不能隐藏混乱",
          body: ["机器人和集成不能修复坏流程，只会更快扩散。", "先确定逻辑：创建、通知、转化事件和控制点。"],
        },
        {
          title: "报表来自事件",
          body: ["网站、广告和 CRM 不共享事件时，分析只是猜测。", "需要看到来源、阶段、响应时间、拒绝原因和最终结果。"],
        },
      ],
      pullquote: "没有线索路径的 CRM 不是销售系统，而是昂贵表格。",
    },
  },
  "revenue-machine-blueprint": {
    ru: {
      kicker: "Стратегия",
      readTime: "9 мин",
      intro:
        "Система выручки появляется не из одного лендинга и не из одной рекламы. Она появляется, когда трафик, страница, CRM и повторные касания работают как единый маршрут.",
      lead: "У бизнеса может быть трафик, заявки и менеджеры, но все равно не быть системы. Причина простая: элементы существуют отдельно и не передают друг другу смысл.",
      thesis: "Предсказуемость начинается там, где каждый шаг после клика заранее спроектирован.",
      checklist: [
        "Трафик ведет на релевантный экран",
        "Страница собирает правильное действие",
        "CRM не теряет контекст",
        "Догрев продолжает оффер",
      ],
      sections: [
        {
          title: "Трафик без маршрута быстро сгорает",
          body: [
            "Реклама может привести нужного человека, но она не обязана объяснять весь продукт. Это задача страницы.",
            "Если страница не продолжает обещание объявления, пользователь чувствует разрыв и уходит сравнивать дальше.",
          ],
        },
        {
          title: "Страница должна собирать контекст",
          body: [
            "Заявка без контекста заставляет менеджера начинать разговор с нуля. Это медленно и дорого.",
            "Форма, CTA и микрокопирайт должны передавать в CRM не просто контакт, а задачу, интерес, источник и ожидание.",
          ],
        },
        {
          title: "CRM превращает интерес в процесс",
          body: [
            "После заявки начинается самая дорогая часть: скорость ответа, квалификация, предложение, повторное касание.",
            "Если это не зафиксировано, результат зависит от настроения конкретного менеджера, а не от системы.",
          ],
        },
        {
          title: "Догрев закрывает длинное решение",
          body: [
            "Не каждый клиент готов купить сразу. Но это не значит, что он потерян.",
            "Письма, ретаргетинг, полезные материалы и повторные касания должны продолжать тот же оффер, а не начинать новую случайную коммуникацию.",
          ],
        },
      ],
      pullquote: "Машина выручки — это не набор инструментов. Это один маршрут от первого клика до повторной продажи.",
    },
    en: {
      kicker: "Strategy",
      readTime: "9 min",
      intro:
        "A revenue system is not one landing page or one ad campaign. It appears when traffic, page, CRM and follow-up work as one route.",
      lead: "A company can have traffic, leads and managers, but still lack a system. The parts exist separately and do not pass meaning to each other.",
      thesis: "Predictability starts when every step after the click is designed.",
      checklist: [
        "Traffic lands on a relevant screen",
        "The page captures the right action",
        "CRM keeps context",
        "Follow-up continues the offer",
      ],
      sections: [
        {
          title: "Traffic burns without a route",
          body: [
            "Ads can bring the right person, but they do not explain the whole product. The page does.",
            "If the page does not continue the ad promise, the user feels a break.",
          ],
        },
        {
          title: "The page captures context",
          body: [
            "A lead without context forces the manager to restart the conversation.",
            "Form, CTA and microcopy should pass task, source and expectation into CRM.",
          ],
        },
        {
          title: "CRM turns interest into process",
          body: [
            "After the request comes response speed, qualification, offer and follow-up.",
            "If this is not fixed, results depend on a manager, not the system.",
          ],
        },
        {
          title: "Follow-up closes long decisions",
          body: [
            "Not every client buys immediately. That does not mean they are lost.",
            "Emails, retargeting and materials should continue the same offer.",
          ],
        },
      ],
      pullquote: "A revenue machine is not a tool stack. It is one route from first click to repeat sale.",
    },
    es: {
      kicker: "Estrategia",
      readTime: "9 min",
      intro:
        "Un sistema de ingresos no es una landing ni una campana. Aparece cuando trafico, pagina, CRM y seguimiento trabajan como una ruta.",
      lead: "Una empresa puede tener trafico y leads, pero no sistema. Las partes existen separadas y no pasan contexto.",
      thesis: "La predictibilidad empieza cuando cada paso despues del clic esta disenado.",
      checklist: [
        "Trafico relevante",
        "Pagina captura accion correcta",
        "CRM conserva contexto",
        "Seguimiento continua oferta",
      ],
      sections: [
        {
          title: "El trafico se quema sin ruta",
          body: [
            "La publicidad trae a la persona, pero la pagina explica el producto.",
            "Si la pagina no continua la promesa del anuncio, aparece ruptura.",
          ],
        },
        {
          title: "La pagina captura contexto",
          body: [
            "Un lead sin contexto obliga a empezar de cero.",
            "Formulario, CTA y microcopy deben enviar tarea, fuente y expectativa al CRM.",
          ],
        },
        {
          title: "CRM convierte interes en proceso",
          body: [
            "Despues de la solicitud vienen respuesta, calificacion, oferta y seguimiento.",
            "Si no esta fijado, depende del manager y no del sistema.",
          ],
        },
        {
          title: "El seguimiento cierra decisiones largas",
          body: ["No todos compran de inmediato.", "Emails, retargeting y materiales deben continuar la misma oferta."],
        },
      ],
      pullquote: "Una maquina de ingresos no es un stack: es una ruta del primer clic a la recompra.",
    },
    zh: {
      kicker: "策略",
      readTime: "9 分钟",
      intro: "营收系统不是一个落地页或一个广告活动。它来自流量、页面、CRM 和跟进作为同一路径运行。",
      lead: "公司可能有流量、线索和销售，但仍没有系统。原因是各部分独立存在，不传递上下文。",
      thesis: "当点击后的每一步都被设计好，可预测性才开始。",
      checklist: ["流量进入相关页面", "页面捕获正确动作", "CRM 保留上下文", "跟进延续报价"],
      sections: [
        {
          title: "没有路径，流量会燃尽",
          body: ["广告带来正确的人，但页面负责解释产品。", "如果页面不延续广告承诺，用户会感到断裂。"],
        },
        {
          title: "页面捕获上下文",
          body: ["没有上下文的线索让销售从零开始。", "表单、CTA 和微文案应把任务、来源和预期传入 CRM。"],
        },
        {
          title: "CRM 把兴趣变流程",
          body: ["请求之后是响应速度、资格判断、报价和跟进。", "如果没有固定，结果依赖个人而不是系统。"],
        },
        { title: "跟进关闭长决策", body: ["不是每个客户都会立即购买。", "邮件、再营销和材料应延续同一个报价。"] },
      ],
      pullquote: "营收机器不是工具堆栈，而是从第一次点击到复购的一条路径。",
    },
  },
};

export const detailCopy: Record<Lang, DetailCopy> = {
  en: {
    industriesCrumb: "Industries",
    blogCrumb: "Blog",
    servicesCrumb: "Services",
    backToBlog: "All articles",
    articleMove: "Move",
    allIndustries: "All industries",
    allServices: "All services",
    metaFormat: "Format",
    metaService: "Conversion page",
    metaSprint: "Sprint",
    metaSprintValue: "2 – 6 weeks",
    metaTeam: "Team",
    metaTeamValue: "Strategy · UX · Code",
    metaHandoff: "Handoff",
    metaHandoffValue: "CRM + analytics",
    blueprintTitle: "What we lock before design",
    blueprintText: "A compact frame: format, sprint, team and handoff. Enough structure to move fast.",
    blueprintFormatDetail: "Offer, proof, objections and action in one route.",
    blueprintSprintDetail: "Short enough to launch. Clear enough to avoid chaos.",
    blueprintTeamDetail: "Strategy sets the path. UX and code turn it into a system.",
    blueprintHandoffDetail: "Leads, events and maintenance logic stay readable after release.",
    industryLedgerTitle: "What the page must remove",
    industryLedgerText:
      "Each industry page starts from the same simple question: what stops the visitor from trusting, understanding and contacting the business.",
    industryProblemLabel: "Friction",
    industryResponseLabel: "Page response",
    industryRunwayTitle: "A route that can be launched",
    industryRunwayText:
      "We keep the page lean: enough structure for traffic, CRM and analytics, without turning it into a heavy presentation.",
    rhythmLabel: "Rhythm",
    systemTitle: "Page system",
    systemAccent: "without extra noise",
    systemLayers: ["Foundation", "Interface", "Handoff"],
    workIntro: "First we lock the foundation. Then we turn it into a page your team can actually use.",
    specificValue: "Specific value, specific audience",
    crmBound: "CRM-bound with event tracking",
    structuredSeo: "Canonical, hreflang, structured data",
    maintainedSystem: "Maintained system with checklist",
    connectionsLabel: "Connections",
    faqTitle: "Questions before the first call",
    bottomTitle: "Turn the page into a working funnel.",
    bottomText: "Start with a brief. We check the offer, path and integrations before production.",
    articleCtaTitle: "Run the same logic on your page.",
    articleCtaText:
      "If the article matches a real situation, request an audit — LORA will respond with structure, not advice.",
  },
  es: {
    industriesCrumb: "Industrias",
    blogCrumb: "Blog",
    servicesCrumb: "Servicios",
    backToBlog: "Todos los articulos",
    articleMove: "Paso",
    allIndustries: "Todas las industrias",
    allServices: "Todos los servicios",
    metaFormat: "Formato",
    metaService: "Pagina de conversion",
    metaSprint: "Sprint",
    metaSprintValue: "2 – 6 semanas",
    metaTeam: "Equipo",
    metaTeamValue: "Estrategia · UX · Codigo",
    metaHandoff: "Entrega",
    metaHandoffValue: "CRM + analitica",
    blueprintTitle: "Que fijamos antes del diseno",
    blueprintText: "Un marco compacto: formato, sprint, equipo y entrega. Suficiente estructura para avanzar rapido.",
    blueprintFormatDetail: "Oferta, prueba, objeciones y accion en una ruta.",
    blueprintSprintDetail: "Corto para lanzar. Claro para evitar caos.",
    blueprintTeamDetail: "Estrategia marca el camino. UX y codigo lo vuelven sistema.",
    blueprintHandoffDetail: "Leads, eventos y mantenimiento quedan legibles.",
    industryLedgerTitle: "Que debe quitar la pagina",
    industryLedgerText:
      "Cada pagina de industria empieza con una pregunta simple: que impide al visitante confiar, entender y contactar al negocio.",
    industryProblemLabel: "Friccion",
    industryResponseLabel: "Respuesta de pagina",
    industryRunwayTitle: "Una ruta lista para lanzar",
    industryRunwayText:
      "Mantenemos la pagina ligera: estructura suficiente para trafico, CRM y analitica, sin convertirla en una presentacion pesada.",
    rhythmLabel: "Ritmo",
    systemTitle: "Sistema de pagina",
    systemAccent: "sin ruido extra",
    systemLayers: ["Base", "Interfaz", "Entrega"],
    workIntro: "Primero fijamos la base. Luego la convertimos en una pagina que el equipo puede usar.",
    specificValue: "Valor y audiencia especificos",
    crmBound: "CRM con eventos",
    structuredSeo: "Canonical, hreflang, datos estructurados",
    maintainedSystem: "Sistema mantenido con checklist",
    connectionsLabel: "Conexiones",
    faqTitle: "Preguntas antes de la primera llamada",
    bottomTitle: "Convierte la pagina en un embudo funcional.",
    bottomText: "Empieza con un brief. Revisamos oferta, ruta e integraciones antes de producir.",
    articleCtaTitle: "Aplica la misma logica a tu pagina.",
    articleCtaText:
      "Si el articulo describe una situacion real, solicita una auditoria. LORA respondera con estructura, no consejos genericos.",
  },
  ru: {
    industriesCrumb: "Ниши",
    blogCrumb: "Блог",
    servicesCrumb: "Услуги",
    backToBlog: "Все статьи",
    articleMove: "Ход",
    allIndustries: "Все ниши",
    allServices: "Все услуги",
    metaFormat: "Формат",
    metaService: "Конверсионная страница",
    metaSprint: "Спринт",
    metaSprintValue: "2 – 6 недель",
    metaTeam: "Команда",
    metaTeamValue: "Стратегия · UX · Код",
    metaHandoff: "Передача",
    metaHandoffValue: "CRM + аналитика",
    blueprintTitle: "Что фиксируем до дизайна",
    blueprintText: "Короткая рамка: формат, спринт, команда и передача. Достаточно структуры, чтобы двигаться быстро.",
    blueprintFormatDetail: "Оффер, доказательства, возражения и действие в одном маршруте.",
    blueprintSprintDetail: "Коротко для запуска. Четко, чтобы не утонуть в хаосе.",
    blueprintTeamDetail: "Стратегия задает путь. UX и код превращают его в систему.",
    blueprintHandoffDetail: "Заявки, события и логика поддержки остаются читаемыми.",
    industryLedgerTitle: "Что страница должна убрать",
    industryLedgerText:
      "Страница ниши начинается с простого вопроса: что мешает человеку поверить, разобраться и оставить заявку.",
    industryProblemLabel: "Трение",
    industryResponseLabel: "Ответ страницы",
    industryRunwayTitle: "Маршрут, который можно запускать",
    industryRunwayText:
      "Держим страницу легкой: достаточно структуры для трафика, CRM и аналитики, без превращения в тяжелую презентацию.",
    rhythmLabel: "Ритм",
    systemTitle: "Система страницы",
    systemAccent: "без лишнего шума",
    systemLayers: ["Основа", "Интерфейс", "Передача"],
    workIntro: "Сначала фиксируем основу. Потом превращаем ее в страницу, которой команда реально пользуется.",
    specificValue: "Конкретная ценность и аудитория",
    crmBound: "CRM и события",
    structuredSeo: "Техническая SEO-разметка",
    maintainedSystem: "Система с чеклистом поддержки",
    connectionsLabel: "Связи",
    faqTitle: "Вопросы до первого созвона",
    bottomTitle: "Превратите страницу в рабочую воронку.",
    bottomText: "Начните с брифа. Проверим оффер, путь и интеграции до производства.",
    articleCtaTitle: "Примените ту же логику к своей странице.",
    articleCtaText:
      "Если статья описывает реальную ситуацию — запросите аудит. LORA ответит структурой, а не общим советом.",
  },
  zh: {
    industriesCrumb: "行业",
    blogCrumb: "博客",
    servicesCrumb: "服务",
    backToBlog: "所有文章",
    articleMove: "步骤",
    allIndustries: "所有行业",
    allServices: "所有服务",
    metaFormat: "格式",
    metaService: "转化页面",
    metaSprint: "周期",
    metaSprintValue: "2 – 6 周",
    metaTeam: "团队",
    metaTeamValue: "策略 · UX · 代码",
    metaHandoff: "交付",
    metaHandoffValue: "CRM + 分析",
    blueprintTitle: "设计前先固定什么",
    blueprintText: "紧凑框架：格式、周期、团队和交付。足够清晰，推进更快。",
    blueprintFormatDetail: "报价、证明、疑虑和行动在同一路径中。",
    blueprintSprintDetail: "足够短以上线，足够清晰以避免混乱。",
    blueprintTeamDetail: "策略定路径，UX 和代码把它变成系统。",
    blueprintHandoffDetail: "线索、事件和维护逻辑保持可读。",
    industryLedgerTitle: "页面必须消除什么",
    industryLedgerText: "每个行业页面都从一个简单问题开始：什么阻碍访客信任、理解并联系业务。",
    industryProblemLabel: "阻力",
    industryResponseLabel: "页面回应",
    industryRunwayTitle: "可上线的路径",
    industryRunwayText: "页面保持轻量：足够支撑流量、CRM 和分析，不变成沉重介绍。",
    rhythmLabel: "节奏",
    systemTitle: "页面系统",
    systemAccent: "没有多余噪音",
    systemLayers: ["基础", "界面", "交付"],
    workIntro: "先固定基础，再把它变成团队真正能使用的页面。",
    specificValue: "具体价值和受众",
    crmBound: "连接 CRM 与事件",
    structuredSeo: "Canonical、hreflang、结构化数据",
    maintainedSystem: "带清单的维护系统",
    connectionsLabel: "连接",
    faqTitle: "首次沟通前的问题",
    bottomTitle: "把页面变成工作漏斗。",
    bottomText: "从 brief 开始。制作前检查报价、路径和集成。",
    articleCtaTitle: "把同样逻辑应用到你的页面。",
    articleCtaText: "如果文章描述了真实情况，请请求审计。LORA 会用结构回应，而不是泛泛建议。",
  },
};
