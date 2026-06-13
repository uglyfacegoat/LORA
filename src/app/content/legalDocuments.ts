import type { Lang } from "../seo/site";

type LegalBlock = {
  title: string;
  body: string[];
  items?: string[];
};

export type LegalDoc = {
  label: string;
  updated: string;
  effective: string;
  intro: string[];
  blocks: LegalBlock[];
  note: string;
};

export const legalUi: Record<
  Lang,
  { version: string; effective: string; contact: string; contents: string; contentsAria: string }
> = {
  en: {
    version: "Version",
    effective: "Effective",
    contact: "Contact",
    contents: "Contents",
    contentsAria: "Document contents",
  },
  es: {
    version: "Version",
    effective: "Vigente desde",
    contact: "Contacto",
    contents: "Contenido",
    contentsAria: "Contenido del documento",
  },
  ru: {
    version: "Версия",
    effective: "Действует с",
    contact: "Контакт",
    contents: "Содержание",
    contentsAria: "Содержание документа",
  },
  zh: {
    version: "版本",
    effective: "生效日期",
    contact: "联系",
    contents: "目录",
    contentsAria: "文件目录",
  },
};

export function getDoc(type: "privacy" | "cookies" | "terms", lang: Lang): LegalDoc {
  return docsByLang[lang][type];
}

const ruDocs: Record<"privacy" | "cookies" | "terms", LegalDoc> = {
  privacy: {
    label: "LORA / legal / privacy",
    updated: "09.06.2026",
    effective: "09.06.2026",
    intro: [
      "Настоящая Политика конфиденциальности и обработки данных описывает, какие сведения LORA может получать через сайт, формы, email, мессенджеры, брифы и аналитические события, зачем эти сведения используются и как пользователь может запросить доступ, исправление или удаление данных.",
      "Документ применяется к сайту loragroup.space и связанным страницам LORA. Если между LORA и клиентом заключен отдельный договор, NDA, техническое задание или соглашение об обработке данных, такие документы имеют приоритет в части конкретного проекта.",
      "LORA не просит через публичные формы пароли, платежные данные, закрытые базы клиентов, медицинскую тайну, коммерческую тайну или другие чувствительные материалы. Если такие материалы действительно нужны для проекта, способ передачи согласуется отдельно.",
    ],
    blocks: [
      {
        title: "Какие данные может получать LORA",
        body: [
          "Пользователь может добровольно передать имя, email, телефон, мессенджер, ссылку на сайт, название компании, описание задачи, бюджетный ориентир, сроки, файлы, комментарии и другую информацию, которую он сам включает в форму, письмо или сообщение.",
          "При отправке формы или переходе по сайту могут фиксироваться технические сведения: дата и время обращения, страница отправки, выбранный язык, тема интерфейса, UTM-метки, источник перехода, тип устройства, базовые данные браузера и события взаимодействия с интерфейсом.",
        ],
        items: [
          "контактные данные для обратной связи;",
          "описание проекта, задачи, продукта или бизнеса;",
          "технические данные заявки и страницы;",
          "аналитические события: клики по CTA, отправка форм, переходы по email/мессенджерам;",
          "переписка и материалы, которые пользователь отправляет добровольно.",
        ],
      },
      {
        title: "Цели обработки данных",
        body: [
          "Данные используются для ответа на запрос, подготовки брифа, диагностики сайта или воронки, оценки возможности сотрудничества, обсуждения проекта, подготовки коммерческого предложения и выполнения дальнейших договоренностей.",
          "Технические и аналитические данные используются для улучшения сайта, поиска ошибок, понимания эффективности страниц, настройки рекламных кампаний, измерения конверсий и защиты форм от злоупотреблений.",
        ],
        items: [
          "ответ на заявку или письмо;",
          "подготовка аудита, брифа, оценки и плана работ;",
          "ведение проектной коммуникации;",
          "передача заявки в CRM, email, мессенджер или систему учета;",
          "аналитика, реклама, безопасность и улучшение интерфейса.",
        ],
      },
      {
        title: "Правовые основания и согласие",
        body: [
          "Отправляя форму, письмо или сообщение, пользователь подтверждает, что передает данные добровольно и понимает, что LORA использует их для ответа и обработки запроса.",
          "Если пользователь передает данные третьих лиц, он подтверждает, что имеет право сделать это и уведомил таких лиц о передаче данных LORA. Пользователь несет ответственность за корректность и законность передаваемой информации.",
          "Для аналитики, cookie и рекламных инструментов могут использоваться отдельные механизмы согласия, настройки браузера или баннеры, если они требуются применимыми правилами.",
        ],
      },
      {
        title: "Передача данных сервисам и подрядчикам",
        body: [
          "LORA не продает персональные данные и не передает заявки третьим лицам для их самостоятельного маркетинга.",
          "Данные могут технически обрабатываться через сервисы, необходимые для работы сайта и коммуникации: хостинг, почта, CRM, формы, аналитика, рекламные кабинеты, мессенджеры, системы уведомлений, резервного копирования и безопасности.",
          "Если к проекту привлекаются подрядчики или специалисты, им передается только тот объем информации, который нужен для выполнения конкретной задачи. При необходимости конфиденциальность фиксируется отдельным соглашением.",
        ],
      },
      {
        title: "Срок хранения",
        body: [
          "Заявки и переписка по потенциальному проекту хранятся в течение периода коммуникации и разумного архивного срока, необходимого для восстановления контекста, подтверждения договоренностей, учета и защиты интересов сторон.",
          "Если проект не начался, пользователь может запросить удаление данных. Если проект был начат или заключен договор, часть информации может храниться дольше в пределах, необходимых для исполнения обязательств, бухгалтерского учета, разрешения споров и соблюдения закона.",
        ],
      },
      {
        title: "Права пользователя",
        body: [
          "Пользователь может запросить информацию о переданных данных, исправление неточных данных, удаление заявки, прекращение дальнейшей коммуникации или уточнение каналов, через которые обрабатывалась заявка.",
          "Запрос направляется на email LORA. Для защиты от удаления данных посторонним лицом LORA может попросить подтвердить, что запрос направляет тот же человек или представитель той же компании.",
        ],
        items: [
          "получить информацию об обработке;",
          "исправить контактные данные;",
          "удалить заявку или часть переписки, если нет оснований хранить ее дальше;",
          "отказаться от follow-up сообщений;",
          "уточнить, какие аналитические или рекламные инструменты подключены.",
        ],
      },
      {
        title: "Безопасность и ограничения",
        body: [
          "LORA принимает разумные организационные и технические меры для защиты заявок и проектного контекста от несанкционированного доступа, потери и неправильного использования.",
          "Пользователь не должен отправлять через общедоступные формы секреты, пароли, закрытые базы, исходные коды, финансовые документы, медицинские документы или иные чувствительные материалы без предварительного согласования защищенного канала.",
          "Передача данных через интернет всегда несет технические риски. LORA не может гарантировать абсолютную безопасность публичных каналов связи, но обязуется не использовать полученные данные вне заявленных целей.",
        ],
      },
      {
        title: "Cookie, localStorage и аналитика",
        body: [
          "Сайт может использовать cookie, localStorage и похожие технологии, чтобы запоминать язык, тему интерфейса, техническое состояние сессии, UTM-метки и события взаимодействия с сайтом.",
          "Если подключены Яндекс Метрика, Google Analytics, рекламные пиксели или другие счетчики, они могут собирать сведения о просмотрах страниц, источниках перехода, кликах, отправке форм и технических параметрах устройства. Подробнее это описано в Cookie notice.",
        ],
      },
      {
        title: "Изменение политики",
        body: [
          "LORA может обновлять эту политику при изменении сайта, форм, аналитики, рекламных инструментов, юридической структуры или требований закона.",
          "Актуальная версия публикуется на этой странице. Если изменение существенно влияет на обработку данных, LORA может дополнительно уведомить пользователей доступным способом.",
        ],
      },
    ],
    note: "По вопросам обработки, удаления или уточнения данных напишите на контактный email. Для проектов с повышенной конфиденциальностью лучше заранее согласовать NDA и защищенный канал передачи материалов.",
  },
  cookies: {
    label: "LORA / legal / cookies",
    updated: "09.06.2026",
    effective: "09.06.2026",
    intro: [
      "Настоящее уведомление объясняет, как сайт LORA может использовать cookie, localStorage, sessionStorage, пиксели, аналитические события и другие похожие технологии.",
      "Cookie и аналитика нужны не для лишнего сбора данных, а для стабильной работы интерфейса, сохранения пользовательских настроек, понимания эффективности страниц и корректного измерения заявок.",
    ],
    blocks: [
      {
        title: "Что такое cookie и похожие технологии",
        body: [
          "Cookie — это небольшие файлы или записи, которые сайт или сторонний сервис может сохранить в браузере пользователя. LocalStorage и sessionStorage работают похожим образом, но обычно используются самим сайтом для хранения настроек интерфейса.",
          "Такие технологии могут быть необходимыми, аналитическими, рекламными или функциональными. Их состав зависит от текущей конфигурации сайта и подключенных счетчиков.",
        ],
      },
      {
        title: "Необходимые технологии",
        body: [
          "Необходимые cookie и локальное хранение помогают сайту работать корректно: запоминать язык, тему, состояние интерфейса, технические параметры формы и базовые настройки сессии.",
          "Отключение таких технологий может привести к тому, что язык, тема или часть интерфейсных настроек будут сбрасываться при переходах или перезагрузке страницы.",
        ],
        items: [
          "язык сайта;",
          "темная или светлая тема;",
          "техническое состояние формы или интерфейса;",
          "защита формы от повторной или некорректной отправки.",
        ],
      },
      {
        title: "Аналитические технологии",
        body: [
          "В проекте подготовлен слой аналитических событий: клики по кнопкам, отправка формы, переходы по контактам, действия на странице цен, открытие брифа и другие события пользовательского пути.",
          "Яндекс Метрика, Google Analytics или аналогичные инструменты могут быть подключены через переменные окружения и настройки сайта. Если они активны, они помогают понять, какие страницы приводят к заявкам и где интерфейс требует улучшения.",
        ],
      },
      {
        title: "Рекламные пиксели и UTM",
        body: [
          "Если LORA запускает рекламные кампании, сайт может использовать рекламные пиксели и UTM-метки для измерения заявок, качества трафика, ретаргетинга и оптимизации объявлений.",
          "UTM-метки могут сохраняться вместе с заявкой, чтобы LORA понимала, из какой кампании пришел запрос. Это помогает оценивать рекламу и не терять контекст коммуникации.",
        ],
      },
      {
        title: "Сторонние сервисы",
        body: [
          "Cookie и похожие технологии могут устанавливаться не только сайтом LORA, но и сторонними сервисами: аналитикой, рекламными платформами, картами, формами, мессенджерами, видео, CRM или системами безопасности.",
          "Такие сервисы обрабатывают данные по своим правилам. LORA стремится подключать только те инструменты, которые имеют понятную цель для сайта и проекта.",
        ],
      },
      {
        title: "Как пользователь может управлять cookie",
        body: [
          "Пользователь может ограничить или удалить cookie в настройках браузера. Также можно использовать режим приватного просмотра, блокировщики трекеров или настройки конкретных аналитических систем, если они доступны.",
          "Удаление cookie не удаляет уже отправленную заявку, письмо или проектную переписку. Для удаления заявки нужно направить отдельный запрос на email LORA.",
        ],
      },
      {
        title: "Срок хранения",
        body: [
          "Срок хранения зависит от типа технологии. Настройки языка и темы могут храниться до очистки браузера. Аналитические cookie и рекламные идентификаторы хранятся в соответствии с настройками конкретного сервиса.",
          "Сохраненные вместе с заявкой UTM-метки могут храниться столько же, сколько сама заявка, потому что они являются частью контекста обращения.",
        ],
      },
      {
        title: "Обновление уведомления",
        body: [
          "Если LORA подключит новые счетчики, пиксели, формы, CRM-интеграции или изменит подход к cookie, это уведомление должно быть обновлено.",
          "Актуальная версия всегда публикуется на этой странице.",
        ],
      },
    ],
    note: "Если нужно узнать, какие счетчики подключены в конкретный момент, или удалить данные отправленной заявки, напишите на email LORA.",
  },
  terms: {
    label: "LORA / legal / terms",
    updated: "09.06.2026",
    effective: "09.06.2026",
    intro: [
      "Настоящие Правила пользования регулируют доступ к сайту LORA, просмотр материалов, использование форм, отправку заявок, взаимодействие с контактными каналами и использование опубликованной информации.",
      "Сайт не является публичной офертой. Любые цены, сроки, описания услуг, примеры структуры работ и материалы на сайте носят информационный характер. Конкретные условия проекта фиксируются отдельно: в брифе, предложении, счете, договоре, техническом задании или переписке.",
    ],
    blocks: [
      {
        title: "Назначение сайта",
        body: [
          "Сайт предназначен для знакомства с LORA, услугами, подходом, внутренними страницами, ценовыми ориентирами, документами и контактными каналами.",
          "Пользователь может читать материалы, переходить по страницам, отправлять заявки, запрашивать аудит, писать на email и использовать другие опубликованные способы связи.",
        ],
      },
      {
        title: "Статус информации на сайте",
        body: [
          "Информация на сайте не является гарантией результата, окончательной сметой, юридической консультацией, техническим заданием или обязательством LORA принять проект.",
          "LORA не гарантирует топ-1 в поиске, конкретный процент роста, определенный объем продаж, окупаемость рекламы или финансовый результат без анализа проекта, трафика, предложения, рынка и исполнения.",
        ],
      },
      {
        title: "Заявки и начало коммуникации",
        body: [
          "Отправка формы или письма означает, что пользователь просит LORA рассмотреть запрос и связаться для уточнения задачи. Это не создает обязанности LORA взять проект в работу и не создает обязанности пользователя купить услугу.",
          "LORA может отказать в проекте или прекратить обсуждение, если задача не подходит по профилю, срокам, бюджету, этике, юридическим рискам, доступности команды или другим разумным причинам.",
        ],
      },
      {
        title: "Обязанности пользователя",
        body: [
          "Пользователь обязуется передавать достоверную информацию, не нарушать права третьих лиц, не отправлять незаконные материалы и не использовать сайт способом, который мешает его работе или безопасности.",
          "Если пользователь передает материалы, данные клиентов, тексты, изображения, логотипы или доступы, он подтверждает, что имеет право передать их LORA для обсуждения или выполнения проекта.",
        ],
      },
      {
        title: "Запрещенное использование",
        body: [
          "Запрещается использовать сайт для спама, автоматического сбора данных, атак, попыток получить несанкционированный доступ, подмены заявок, загрузки вредоносных файлов, нарушения работы форм или обхода технических ограничений.",
          "Запрещается копировать сайт целиком, выдавать материалы LORA за свои, продавать дизайн или тексты сайта как самостоятельный продукт, использовать бренд LORA без разрешения или вводить других лиц в заблуждение относительно связи с LORA.",
        ],
        items: [
          "массовая отправка форм и тестовых заявок;",
          "скрейпинг и автоматический сбор материалов;",
          "попытки доступа к серверу, админкам, данным или исходному коду;",
          "передача вредоносных файлов, фишинговых ссылок или незаконного контента;",
          "копирование сайта для перепродажи или имитации бренда.",
        ],
      },
      {
        title: "Интеллектуальная собственность",
        body: [
          "Логотип, название, визуальный стиль, тексты, структура страниц, интерфейсные решения, изображения, компоненты и иные материалы сайта принадлежат LORA или используются на законном основании.",
          "Разрешается делиться ссылками на сайт и цитировать небольшие фрагменты с указанием источника. Любое коммерческое копирование, воспроизведение или адаптация материалов требует предварительного письменного согласия LORA.",
        ],
      },
      {
        title: "Сторонние ссылки и сервисы",
        body: [
          "Сайт может содержать ссылки на сторонние сервисы: мессенджеры, email-клиенты, карты, платежные сервисы, аналитические или рекламные платформы, социальные сети и другие инструменты.",
          "LORA не контролирует правила, доступность и безопасность сторонних сайтов. Переходя на них, пользователь взаимодействует с такими сервисами на их условиях.",
        ],
      },
      {
        title: "Ограничение ответственности",
        body: [
          "LORA стремится поддерживать сайт корректным и доступным, но не гарантирует отсутствие ошибок, перерывов, несовместимости с конкретным устройством, браузером, расширением или настройками пользователя.",
          "LORA не несет ответственность за убытки, возникшие из-за неправильного использования сайта, передачи пользователем недостоверных данных, действий сторонних сервисов, технических сбоев вне контроля LORA или решений, принятых пользователем только на основе информации сайта без отдельного обсуждения проекта.",
        ],
      },
      {
        title: "Конфиденциальные материалы",
        body: [
          "До заключения NDA или отдельного соглашения пользователь не должен отправлять через публичные формы материалы, которые являются коммерческой тайной, персональными данными третьих лиц, закрытой финансовой информацией, медицинскими данными или иными чувствительными сведениями.",
          "Если для оценки проекта нужны такие материалы, стороны заранее согласуют состав данных, цель передачи, канал передачи и режим конфиденциальности.",
        ],
      },
      {
        title: "Изменение правил",
        body: [
          "LORA может обновлять настоящие Правила при изменении сайта, услуг, контактных каналов, юридической структуры, требований закона или бизнес-процессов.",
          "Актуальная версия публикуется на этой странице. В отношении уже согласованных проектов приоритет имеют условия конкретного договора, счета, технического задания или письменной договоренности.",
        ],
      },
    ],
    note: "Если перед отправкой заявки нужно уточнить юридические условия, NDA, порядок передачи материалов или статус предложения, напишите LORA заранее.",
  },
};

const enDocs: Record<"privacy" | "cookies" | "terms", LegalDoc> = {
  privacy: {
    label: "LORA / legal / privacy",
    updated: "2026-06-09",
    effective: "2026-06-09",
    intro: [
      "This Privacy and Data Processing Policy explains what information LORA may receive through the website, forms, email, messengers, briefs and analytics events, why that information is used and how a user can request access, correction or deletion.",
      "This document applies to loragroup.space and related LORA pages. If a separate contract, NDA, statement of work or data agreement is signed, that document prevails for the specific project.",
    ],
    blocks: [
      {
        title: "Information LORA may receive",
        body: [
          "Users may voluntarily provide name, email, phone, messenger, website link, company name, project description, budget range, timeline, files and other project context.",
          "The site may also record technical context such as submission date, source page, selected language, theme, UTM tags, referral source, device type, browser data and interface events.",
        ],
        items: [
          "contact details",
          "project and business context",
          "submission metadata",
          "analytics events",
          "messages and files voluntarily sent",
        ],
      },
      {
        title: "Purposes of processing",
        body: [
          "Data is used to respond to requests, prepare briefs, diagnose websites or funnels, evaluate cooperation, discuss projects, prepare proposals and perform further agreements.",
          "Technical and analytics data is used to improve the website, find errors, understand page effectiveness, configure campaigns, measure conversions and protect forms from abuse.",
        ],
      },
      {
        title: "Legal basis and consent",
        body: [
          "By submitting a form, email or message, the user confirms that the information is provided voluntarily and may be used by LORA to process the request.",
          "If the user submits third-party data, the user confirms that they have the right to do so.",
        ],
      },
      {
        title: "Service providers and contractors",
        body: [
          "LORA does not sell personal data or provide leads to third parties for their independent marketing.",
          "Data may be technically processed by hosting, email, CRM, form, analytics, ad, messenger, backup and security services needed for site operation and communication.",
        ],
      },
      {
        title: "Retention",
        body: [
          "Requests and project communication are kept for the communication period and a reasonable archive period needed to restore context, confirm agreements, keep records and protect legitimate interests.",
          "Deletion can be requested by email unless retention is required for a contract, accounting, dispute resolution or legal compliance.",
        ],
      },
      {
        title: "User rights",
        body: [
          "A user may request access, correction, deletion, stop to follow-up communication or clarification of processing channels.",
          "LORA may request confirmation that the person making the request is the same person or company representative.",
        ],
      },
      {
        title: "Security and limitations",
        body: [
          "LORA uses reasonable organizational and technical measures to protect requests and project context.",
          "Users should not send passwords, closed databases, financial documents, medical records or other sensitive materials through public forms without agreeing on a secure channel first.",
        ],
      },
      {
        title: "Cookies and analytics",
        body: [
          "The site may use cookies, localStorage and similar technologies for language, theme, session state, UTM tags and interaction events.",
          "If analytics or ad pixels are enabled, they may collect page views, referral sources, clicks, form submissions and technical device parameters.",
        ],
      },
    ],
    note: "For access, correction, deletion or safer transfer of materials, contact LORA by email.",
  },
  cookies: {
    label: "LORA / legal / cookies",
    updated: "2026-06-09",
    effective: "2026-06-09",
    intro: [
      "This notice explains how the LORA site may use cookies, localStorage, sessionStorage, pixels, analytics events and similar technologies.",
      "These tools are used for interface stability, user preferences, page effectiveness and request measurement.",
    ],
    blocks: [
      {
        title: "Cookies and similar technologies",
        body: [
          "Cookies are small files or records stored in the user's browser. LocalStorage and sessionStorage are similar browser storage mechanisms commonly used for interface preferences.",
        ],
      },
      {
        title: "Necessary technologies",
        body: ["Necessary storage helps the site remember language, theme, form state and basic session settings."],
        items: ["language", "theme", "form state", "anti-abuse form handling"],
      },
      {
        title: "Analytics technologies",
        body: [
          "The project prepares analytics events for CTA clicks, form submissions, contact clicks, pricing actions and brief interactions. Analytics tools can be connected through environment variables and site settings.",
        ],
      },
      {
        title: "Advertising pixels and UTM",
        body: [
          "If LORA runs ad campaigns, ad pixels and UTM tags may be used to measure requests, traffic quality, retargeting and campaign optimization.",
        ],
      },
      {
        title: "Third-party services",
        body: [
          "Cookies and similar technologies may be set by analytics, advertising platforms, maps, forms, messengers, video, CRM or security services.",
        ],
      },
      {
        title: "User control",
        body: [
          "Users can restrict or delete cookies in browser settings. Deleting cookies does not delete already submitted requests or emails.",
        ],
      },
      {
        title: "Retention",
        body: [
          "Retention depends on the technology. Language and theme may remain until browser cleanup; analytics cookies follow the relevant service settings.",
        ],
      },
    ],
    note: "For questions about active counters or deletion of submitted request data, contact LORA by email.",
  },
  terms: {
    label: "LORA / legal / terms",
    updated: "2026-06-09",
    effective: "2026-06-09",
    intro: [
      "These Terms of Use govern access to the LORA website, viewing materials, using forms, sending requests, contacting LORA and using published information.",
      "The website is not a public offer. Prices, timelines, service descriptions and examples are informational. Specific project terms are fixed separately in a brief, proposal, invoice, contract, statement of work or written communication.",
    ],
    blocks: [
      {
        title: "Website purpose",
        body: [
          "The website introduces LORA, services, approach, pricing ranges, documents and contact channels. Users may read materials, navigate pages, send requests, request an audit and contact LORA.",
        ],
      },
      {
        title: "Status of information",
        body: [
          "Site information is not a result guarantee, final estimate, legal advice, statement of work or obligation for LORA to accept a project.",
          "LORA does not guarantee top search positions, a specific growth percentage, sales volume, ad payback or financial result without project analysis and execution context.",
        ],
      },
      {
        title: "Requests and communication",
        body: [
          "Submitting a form means the user asks LORA to review the request and respond. It does not oblige LORA to accept the project and does not oblige the user to buy a service.",
        ],
      },
      {
        title: "User obligations",
        body: [
          "The user must provide accurate information, avoid violating third-party rights, avoid unlawful materials and avoid disrupting site operation or security.",
        ],
      },
      {
        title: "Prohibited use",
        body: [
          "Spam, scraping, attacks, unauthorized access attempts, form abuse, malicious files, phishing links and copying the site as a product are prohibited.",
        ],
        items: [
          "mass form submissions",
          "scraping",
          "server or data access attempts",
          "malicious files or links",
          "brand imitation",
        ],
      },
      {
        title: "Intellectual property",
        body: [
          "The logo, name, visual style, texts, page structure, interface decisions and other site materials belong to LORA or are used lawfully. Commercial copying or adaptation requires prior written permission.",
        ],
      },
      {
        title: "Third-party links",
        body: [
          "The site may link to messengers, email clients, maps, payment tools, analytics or ad platforms, social networks and other tools. LORA does not control their rules or availability.",
        ],
      },
      {
        title: "Liability limitations",
        body: [
          "LORA aims to keep the site correct and available but does not guarantee absence of errors, interruptions or incompatibility with a particular device, browser or extension.",
        ],
      },
      {
        title: "Confidential materials",
        body: [
          "Before an NDA or separate agreement is signed, users should not send trade secrets, third-party personal data, closed financial data, medical data or other sensitive information through public forms.",
        ],
      },
    ],
    note: "For questions about legal terms, NDA, material transfer or proposal status, contact LORA before submitting sensitive information.",
  },
};

const esDocs: Record<"privacy" | "cookies" | "terms", LegalDoc> = {
  privacy: {
    label: "LORA / legal / privacidad",
    updated: "09.06.2026",
    effective: "09.06.2026",
    intro: [
      "Esta Politica de privacidad y tratamiento de datos explica que informacion puede recibir LORA a traves del sitio web, formularios, email, mensajeria, briefs y eventos analiticos, por que se utiliza y como el usuario puede solicitar acceso, correccion o eliminacion.",
      "El documento se aplica a loragroup.space y paginas relacionadas de LORA. Si existe un contrato, NDA, especificacion tecnica o acuerdo de tratamiento de datos separado, ese documento prevalece para el proyecto concreto.",
      "LORA no solicita en formularios publicos contrasenas, datos de pago, bases cerradas de clientes, secretos comerciales ni otros materiales sensibles. Si fueran necesarios para un proyecto, el canal de envio se acuerda por separado.",
    ],
    blocks: [
      {
        title: "Informacion que LORA puede recibir",
        body: [
          "El usuario puede facilitar voluntariamente nombre, email, telefono, mensajeria, enlace al sitio, empresa, descripcion del proyecto, rango de presupuesto, plazos, archivos, comentarios y otra informacion incluida en un formulario, email o mensaje.",
          "Al enviar un formulario o navegar por el sitio tambien pueden registrarse datos tecnicos: fecha y hora, pagina de envio, idioma elegido, tema visual, etiquetas UTM, fuente de trafico, tipo de dispositivo, datos basicos del navegador y eventos de interfaz.",
        ],
        items: [
          "datos de contacto para responder;",
          "descripcion del proyecto, producto o negocio;",
          "datos tecnicos de la solicitud y de la pagina;",
          "eventos analiticos: clics en CTA, envio de formularios, clics en email o mensajeria;",
          "mensajes y materiales enviados voluntariamente.",
        ],
      },
      {
        title: "Finalidades del tratamiento",
        body: [
          "Los datos se utilizan para responder a la solicitud, preparar un brief, diagnosticar un sitio o embudo, evaluar la posibilidad de colaboracion, discutir el proyecto, preparar una propuesta y cumplir acuerdos posteriores.",
          "Los datos tecnicos y analiticos se usan para mejorar el sitio, detectar errores, entender la eficacia de las paginas, configurar campanas publicitarias, medir conversiones y proteger formularios frente a abuso.",
        ],
      },
      {
        title: "Base legal y consentimiento",
        body: [
          "Al enviar un formulario, email o mensaje, el usuario confirma que entrega la informacion voluntariamente y entiende que LORA la utiliza para responder y procesar la solicitud.",
          "Si el usuario transmite datos de terceros, confirma que tiene derecho a hacerlo y que ha informado a esas personas sobre la transferencia a LORA.",
          "Para analitica, cookies y herramientas publicitarias pueden usarse mecanismos de consentimiento, configuracion del navegador o banners cuando sean necesarios.",
        ],
      },
      {
        title: "Servicios, proveedores y contratistas",
        body: [
          "LORA no vende datos personales ni entrega solicitudes a terceros para su marketing independiente.",
          "Los datos pueden procesarse tecnicamente mediante servicios necesarios para el sitio y la comunicacion: hosting, email, CRM, formularios, analitica, publicidad, mensajeria, notificaciones, copias de seguridad y seguridad.",
          "Si participan contratistas o especialistas, reciben solo la informacion necesaria para su tarea. Cuando sea necesario, la confidencialidad se fija en un acuerdo separado.",
        ],
      },
      {
        title: "Plazo de conservacion",
        body: [
          "Las solicitudes y conversaciones sobre un proyecto potencial se conservan durante la comunicacion y un periodo razonable de archivo para recuperar contexto, confirmar acuerdos, mantener registros y proteger intereses legitimos.",
          "Si el proyecto no empieza, el usuario puede solicitar eliminacion. Si existe contrato o trabajo iniciado, parte de la informacion puede conservarse durante mas tiempo para cumplir obligaciones, contabilidad, disputas o requisitos legales.",
        ],
      },
      {
        title: "Derechos del usuario",
        body: [
          "El usuario puede solicitar informacion sobre los datos enviados, correccion de datos inexactos, eliminacion de una solicitud, cese de comunicaciones posteriores o aclaracion de canales de tratamiento.",
          "La solicitud se envia al email de LORA. Para evitar eliminaciones por terceros, LORA puede pedir confirmacion de identidad o de representacion de la empresa.",
        ],
        items: [
          "acceder a informacion sobre el tratamiento;",
          "corregir datos de contacto;",
          "eliminar una solicitud o parte de la conversacion si no hay razon para conservarla;",
          "rechazar comunicaciones de seguimiento;",
          "aclarar que herramientas analiticas o publicitarias estan activas.",
        ],
      },
      {
        title: "Seguridad y limitaciones",
        body: [
          "LORA aplica medidas organizativas y tecnicas razonables para proteger solicitudes y contexto de proyecto frente a acceso no autorizado, perdida y uso indebido.",
          "El usuario no debe enviar por formularios publicos secretos, contrasenas, bases cerradas, codigo fuente, documentos financieros, documentos medicos u otros materiales sensibles sin acordar antes un canal seguro.",
          "Toda transmision por internet tiene riesgos tecnicos. LORA no puede garantizar seguridad absoluta de canales publicos, pero no usa los datos recibidos fuera de las finalidades declaradas.",
        ],
      },
      {
        title: "Cookies, almacenamiento y analitica",
        body: [
          "El sitio puede usar cookies, localStorage y tecnologias similares para recordar idioma, tema, estado tecnico de sesion, etiquetas UTM y eventos de interaccion.",
          "Si se activan Yandex Metrica, Google Analytics, pixeles publicitarios u otros contadores, pueden recoger vistas de pagina, fuentes, clics, envios de formularios y parametros tecnicos del dispositivo. El detalle esta en el aviso de cookies.",
        ],
      },
      {
        title: "Cambios de la politica",
        body: [
          "LORA puede actualizar esta politica si cambian el sitio, formularios, analitica, herramientas publicitarias, estructura legal o requisitos normativos.",
          "La version vigente se publica en esta pagina. Si el cambio afecta de forma sustancial al tratamiento, LORA puede avisar por un medio disponible.",
        ],
      },
    ],
    note: "Para cuestiones de tratamiento, eliminacion o correccion de datos, escribe al email de contacto. Para proyectos con alta confidencialidad conviene acordar antes un NDA y un canal seguro.",
  },
  cookies: {
    label: "LORA / legal / cookies",
    updated: "09.06.2026",
    effective: "09.06.2026",
    intro: [
      "Este aviso explica como el sitio de LORA puede usar cookies, localStorage, sessionStorage, pixeles, eventos analiticos y tecnologias similares.",
      "Las cookies y la analitica no se usan para recoger datos sin sentido, sino para mantener estable la interfaz, conservar preferencias, entender la eficacia de las paginas y medir solicitudes correctamente.",
    ],
    blocks: [
      {
        title: "Que son cookies y tecnologias similares",
        body: [
          "Las cookies son pequenos archivos o registros que un sitio o servicio externo puede guardar en el navegador. LocalStorage y sessionStorage funcionan de forma parecida y suelen usarse para preferencias de interfaz.",
          "Estas tecnologias pueden ser necesarias, analiticas, publicitarias o funcionales. Su composicion depende de la configuracion actual del sitio y de los contadores conectados.",
        ],
      },
      {
        title: "Tecnologias necesarias",
        body: [
          "Las cookies necesarias y el almacenamiento local ayudan al sitio a funcionar correctamente: recordar idioma, tema, estado de interfaz, parametros tecnicos de formularios y ajustes basicos de sesion.",
          "Si se desactivan, el sitio puede seguir abriendo, pero idioma, tema o algunas preferencias pueden reiniciarse al navegar o recargar.",
        ],
        items: [
          "idioma del sitio;",
          "tema oscuro o claro;",
          "estado tecnico de formulario o interfaz;",
          "proteccion contra envios repetidos o incorrectos.",
        ],
      },
      {
        title: "Tecnologias analiticas",
        body: [
          "El proyecto prepara eventos analiticos: clics en botones, envio de formularios, clics en contactos, acciones en precios, apertura de brief y otros pasos del recorrido.",
          "Yandex Metrica, Google Analytics u otras herramientas pueden conectarse mediante variables de entorno y configuracion del sitio. Si estan activas, ayudan a entender que paginas generan solicitudes y donde mejorar la interfaz.",
        ],
      },
      {
        title: "Pixeles publicitarios y UTM",
        body: [
          "Si LORA lanza campanas publicitarias, el sitio puede usar pixeles y etiquetas UTM para medir solicitudes, calidad del trafico, retargeting y optimizacion de anuncios.",
          "Las etiquetas UTM pueden guardarse junto con la solicitud para entender de que campana vino el contacto.",
        ],
      },
      {
        title: "Servicios de terceros",
        body: [
          "Cookies y tecnologias similares pueden instalarse por servicios externos: analitica, plataformas publicitarias, mapas, formularios, mensajeria, video, CRM o seguridad.",
          "Estos servicios procesan datos segun sus propias reglas. LORA busca conectar solo herramientas con una finalidad clara para el sitio y el proyecto.",
        ],
      },
      {
        title: "Control del usuario",
        body: [
          "El usuario puede limitar o eliminar cookies desde el navegador. Tambien puede usar modo privado, bloqueadores de rastreo o ajustes de sistemas analiticos cuando existan.",
          "Eliminar cookies no elimina solicitudes, emails o conversaciones ya enviadas. Para eliminar una solicitud hay que escribir al email de LORA.",
        ],
      },
      {
        title: "Plazo de conservacion",
        body: [
          "El plazo depende del tipo de tecnologia. Idioma y tema pueden conservarse hasta limpiar el navegador. Cookies analiticas e identificadores publicitarios dependen del servicio correspondiente.",
          "Las UTM guardadas con una solicitud pueden conservarse durante el mismo plazo que la propia solicitud, porque forman parte del contexto del contacto.",
        ],
      },
      {
        title: "Actualizacion del aviso",
        body: [
          "Si LORA conecta nuevos contadores, pixeles, formularios, integraciones CRM o cambia el enfoque de cookies, este aviso debe actualizarse.",
          "La version vigente se publica siempre en esta pagina.",
        ],
      },
    ],
    note: "Si necesitas saber que contadores estan activos o eliminar datos de una solicitud enviada, escribe al email de LORA.",
  },
  terms: {
    label: "LORA / legal / terminos",
    updated: "09.06.2026",
    effective: "09.06.2026",
    intro: [
      "Estos Terminos de uso regulan el acceso al sitio de LORA, la lectura de materiales, el uso de formularios, el envio de solicitudes, la comunicacion por canales publicados y el uso de la informacion del sitio.",
      "El sitio no constituye una oferta publica. Precios, plazos, descripciones de servicios, ejemplos de alcance y materiales son informativos. Las condiciones concretas se fijan por separado en brief, propuesta, factura, contrato, especificacion tecnica o correspondencia escrita.",
    ],
    blocks: [
      {
        title: "Finalidad del sitio",
        body: [
          "El sitio sirve para conocer LORA, sus servicios, enfoque, paginas internas, rangos de precio, documentos y canales de contacto.",
          "El usuario puede leer materiales, navegar, enviar solicitudes, pedir auditoria, escribir por email y usar otros canales publicados.",
        ],
      },
      {
        title: "Estado de la informacion",
        body: [
          "La informacion del sitio no es garantia de resultado, presupuesto final, asesoramiento legal, especificacion tecnica ni obligacion de LORA de aceptar un proyecto.",
          "LORA no garantiza primera posicion en buscadores, porcentaje concreto de crecimiento, volumen de ventas, retorno publicitario ni resultado financiero sin analizar proyecto, trafico, oferta, mercado y ejecucion.",
        ],
      },
      {
        title: "Solicitudes e inicio de comunicacion",
        body: [
          "Enviar un formulario o email significa que el usuario pide a LORA revisar el contexto y responder. No obliga a LORA a aceptar el proyecto ni obliga al usuario a comprar un servicio.",
          "LORA puede rechazar un proyecto o terminar la conversacion si la tarea no encaja por perfil, plazos, presupuesto, etica, riesgos legales, disponibilidad del equipo u otras razones razonables.",
        ],
      },
      {
        title: "Obligaciones del usuario",
        body: [
          "El usuario debe proporcionar informacion veraz, no violar derechos de terceros, no enviar materiales ilegales y no usar el sitio de forma que afecte su funcionamiento o seguridad.",
          "Si entrega materiales, datos de clientes, textos, imagenes, logotipos o accesos, confirma que tiene derecho a transferirlos a LORA para la conversacion o el proyecto.",
        ],
      },
      {
        title: "Uso prohibido",
        body: [
          "Se prohibe usar el sitio para spam, scraping, ataques, intentos de acceso no autorizado, manipulacion de formularios, carga de archivos maliciosos, enlaces de phishing o eludir restricciones tecnicas.",
          "Se prohibe copiar el sitio completo, presentar materiales de LORA como propios, vender diseno o textos como producto independiente, usar la marca sin permiso o inducir a error sobre una relacion con LORA.",
        ],
        items: [
          "envio masivo de formularios;",
          "scraping de materiales;",
          "intentos de acceso a servidor, datos o codigo;",
          "archivos maliciosos o enlaces ilegales;",
          "copia del sitio para reventa o imitacion de marca.",
        ],
      },
      {
        title: "Propiedad intelectual",
        body: [
          "Logotipo, nombre, estilo visual, textos, estructura de paginas, decisiones de interfaz, imagenes, componentes y otros materiales pertenecen a LORA o se usan legalmente.",
          "Se permite compartir enlaces y citar fragmentos pequenos con fuente. Cualquier copia comercial, reproduccion o adaptacion requiere consentimiento escrito previo de LORA.",
        ],
      },
      {
        title: "Enlaces y servicios externos",
        body: [
          "El sitio puede contener enlaces a mensajeria, clientes de email, mapas, pagos, analitica, publicidad, redes sociales y otras herramientas.",
          "LORA no controla las reglas, disponibilidad o seguridad de sitios externos. Al acceder, el usuario interactua con ellos bajo sus condiciones.",
        ],
      },
      {
        title: "Limitacion de responsabilidad",
        body: [
          "LORA intenta mantener el sitio correcto y disponible, pero no garantiza ausencia de errores, interrupciones o incompatibilidad con un dispositivo, navegador, extension o configuracion concretos.",
          "LORA no responde por danos derivados del uso incorrecto del sitio, datos falsos enviados por el usuario, acciones de terceros, fallos tecnicos fuera de su control o decisiones tomadas solo con informacion del sitio sin discutir el proyecto.",
        ],
      },
      {
        title: "Materiales confidenciales",
        body: [
          "Antes de firmar un NDA o acuerdo separado, el usuario no debe enviar por formularios publicos secretos comerciales, datos personales de terceros, informacion financiera cerrada, datos medicos u otros datos sensibles.",
          "Si son necesarios para evaluar el proyecto, las partes acuerdan antes el alcance, finalidad, canal de envio y regimen de confidencialidad.",
        ],
      },
      {
        title: "Cambios de los terminos",
        body: [
          "LORA puede actualizar estos Terminos si cambian el sitio, servicios, canales de contacto, estructura legal, requisitos normativos o procesos de negocio.",
          "La version vigente se publica en esta pagina. Para proyectos ya acordados prevalecen contrato, factura, especificacion tecnica o acuerdo escrito concreto.",
        ],
      },
    ],
    note: "Si antes de enviar una solicitud necesitas aclarar condiciones legales, NDA, transferencia de materiales o estado de una propuesta, escribe a LORA.",
  },
};

const zhDocs: Record<"privacy" | "cookies" | "terms", LegalDoc> = {
  privacy: {
    label: "LORA / legal / 隐私",
    updated: "2026-06-09",
    effective: "2026-06-09",
    intro: [
      "本隐私与数据处理政策说明 LORA 可能通过网站、表单、电子邮件、即时通讯、项目简报和分析事件接收哪些信息，为什么使用这些信息，以及用户如何请求访问、更正或删除。",
      "本文件适用于 loragroup.space 及 LORA 相关页面。如果某个项目另有合同、NDA、工作说明或数据处理协议，则该单独文件优先适用于该项目。",
      "LORA 不会通过公开表单要求用户提交密码、支付数据、封闭客户数据库、商业秘密或其他敏感材料。如项目确有需要，应另行约定安全传输方式。",
    ],
    blocks: [
      {
        title: "LORA 可能接收的信息",
        body: [
          "用户可自愿提供姓名、邮箱、电话、即时通讯账号、网站链接、公司名称、项目描述、预算范围、时间计划、文件、备注以及表单、邮件或消息中包含的其他项目背景。",
          "提交表单或浏览网站时，也可能记录技术信息：提交日期和时间、提交页面、所选语言、界面主题、UTM 参数、来源、设备类型、基础浏览器信息和界面交互事件。",
        ],
        items: [
          "用于回复的联系方式；",
          "项目、产品或业务描述；",
          "请求和页面的技术数据；",
          "分析事件：CTA 点击、表单提交、邮箱或通讯链接点击；",
          "用户自愿发送的消息和材料。",
        ],
      },
      {
        title: "数据处理目的",
        body: [
          "数据用于回复请求、准备项目简报、诊断网站或转化漏斗、评估合作可能性、讨论项目、准备商业方案以及履行后续约定。",
          "技术和分析数据用于改进网站、发现错误、理解页面效果、配置广告活动、衡量转化并保护表单免受滥用。",
        ],
      },
      {
        title: "法律依据与同意",
        body: [
          "当用户提交表单、邮件或消息时，即确认其自愿提供信息，并理解 LORA 会将其用于回复和处理请求。",
          "如用户提交第三方数据，则确认其有权这样做，并已告知相关人员数据将传递给 LORA。",
          "对于分析、cookie 和广告工具，可能根据适用要求使用单独的同意机制、浏览器设置或提示横幅。",
        ],
      },
      {
        title: "服务商与承包方",
        body: [
          "LORA 不出售个人数据，也不会将线索提供给第三方用于其独立营销。",
          "数据可能由网站和沟通所需的服务进行技术处理：托管、邮件、CRM、表单、分析、广告平台、即时通讯、通知、备份和安全服务。",
          "如果项目需要承包方或专家参与，他们只会接收完成具体任务所需的信息。必要时，保密义务会通过单独协议约定。",
        ],
      },
      {
        title: "保存期限",
        body: [
          "潜在项目的请求和沟通记录会在沟通过程中保存，并在合理归档期内保存，以恢复上下文、确认约定、保留记录和保护合法利益。",
          "如果项目未开始，用户可请求删除数据。如果项目已开始或存在合同，部分信息可能因履约、会计、争议解决或法律要求而保存更长时间。",
        ],
      },
      {
        title: "用户权利",
        body: [
          "用户可以请求了解已提交数据、更正不准确数据、删除请求、停止后续沟通，或了解其请求通过哪些渠道被处理。",
          "请求应发送至 LORA 邮箱。为防止第三方恶意删除，LORA 可能要求确认请求人与原用户或公司代表一致。",
        ],
        items: [
          "获取处理信息；",
          "更正联系方式；",
          "在无继续保存依据时删除请求或部分沟通记录；",
          "拒绝后续跟进消息；",
          "了解当前启用的分析或广告工具。",
        ],
      },
      {
        title: "安全与限制",
        body: [
          "LORA 采取合理的组织和技术措施，保护请求和项目背景免受未经授权访问、丢失和不当使用。",
          "用户不应在未事先约定安全渠道的情况下，通过公开表单发送秘密、密码、封闭数据库、源代码、财务文件、医疗文件或其他敏感材料。",
          "互联网传输始终存在技术风险。LORA 无法保证公开通信渠道的绝对安全，但承诺不将收到的数据用于声明目的之外。",
        ],
      },
      {
        title: "Cookie、本地存储与分析",
        body: [
          "网站可能使用 cookie、localStorage 和类似技术来记住语言、界面主题、会话技术状态、UTM 参数和网站交互事件。",
          "如启用 Yandex Metrica、Google Analytics、广告像素或其他计数器，它们可能收集页面浏览、来源、点击、表单提交和设备技术参数。详情见 Cookie notice。",
        ],
      },
      {
        title: "政策变更",
        body: [
          "当网站、表单、分析、广告工具、法律结构或法规要求发生变化时，LORA 可能更新本政策。",
          "最新版本会发布在本页面。如变更对数据处理产生重大影响，LORA 可能通过可用方式另行通知用户。",
        ],
      },
    ],
    note: "如需处理、删除或更正数据，请发送邮件联系 LORA。涉及高度保密的项目，建议提前约定 NDA 和安全传输渠道。",
  },
  cookies: {
    label: "LORA / legal / cookies",
    updated: "2026-06-09",
    effective: "2026-06-09",
    intro: [
      "本通知说明 LORA 网站可能如何使用 cookie、localStorage、sessionStorage、像素、分析事件和其他类似技术。",
      "Cookie 和分析不是为了无意义地收集数据，而是为了保持界面稳定、保存用户偏好、理解页面效果并正确衡量请求。",
    ],
    blocks: [
      {
        title: "什么是 cookie 和类似技术",
        body: [
          "Cookie 是网站或第三方服务可保存在用户浏览器中的小文件或记录。LocalStorage 和 sessionStorage 类似，通常由网站用于保存界面设置。",
          "这些技术可以是必要、分析、广告或功能性的。具体组成取决于网站当前配置和已连接的计数器。",
        ],
      },
      {
        title: "必要技术",
        body: [
          "必要 cookie 和本地存储帮助网站正常运行：记住语言、主题、界面状态、表单技术参数和基础会话设置。",
          "如果禁用这些技术，网站仍可能打开，但语言、主题或部分界面偏好可能在跳转或刷新时重置。",
        ],
        items: ["网站语言；", "深色或浅色主题；", "表单或界面的技术状态；", "防止重复或错误提交。"],
      },
      {
        title: "分析技术",
        body: [
          "项目中已准备分析事件层：按钮点击、表单提交、联系人点击、价格页操作、打开 brief 以及用户路径中的其他事件。",
          "Yandex Metrica、Google Analytics 或类似工具可通过环境变量和网站设置连接。如启用，它们帮助理解哪些页面带来请求以及哪里需要改进界面。",
        ],
      },
      {
        title: "广告像素与 UTM",
        body: [
          "如果 LORA 启动广告活动，网站可能使用广告像素和 UTM 参数来衡量请求、流量质量、再营销和广告优化。",
          "UTM 参数可能与请求一起保存，以便 LORA 理解该联系来自哪个活动。",
        ],
      },
      {
        title: "第三方服务",
        body: [
          "Cookie 和类似技术也可能由第三方服务设置：分析、广告平台、地图、表单、即时通讯、视频、CRM 或安全服务。",
          "这些服务按其自身规则处理数据。LORA 会尽量只连接对网站和项目有明确目的的工具。",
        ],
      },
      {
        title: "用户控制",
        body: [
          "用户可以在浏览器设置中限制或删除 cookie，也可以使用隐私模式、跟踪拦截器或具体分析系统提供的设置。",
          "删除 cookie 不会删除已提交的请求、邮件或项目沟通。删除请求需要单独发送邮件给 LORA。",
        ],
      },
      {
        title: "保存期限",
        body: [
          "保存期限取决于技术类型。语言和主题可保留到浏览器清理为止。分析 cookie 和广告标识符按相应服务设置保存。",
          "与请求一起保存的 UTM 参数可能与该请求保存同样的期限，因为它们属于联系背景的一部分。",
        ],
      },
      {
        title: "通知更新",
        body: [
          "如果 LORA 连接新的计数器、像素、表单、CRM 集成或改变 cookie 使用方式，本通知应更新。",
          "最新版本始终发布在本页面。",
        ],
      },
    ],
    note: "如需了解当前启用的计数器，或删除已提交请求的数据，请发送邮件联系 LORA。",
  },
  terms: {
    label: "LORA / legal / 条款",
    updated: "2026-06-09",
    effective: "2026-06-09",
    intro: [
      "本使用条款规范用户访问 LORA 网站、查看材料、使用表单、发送请求、通过公开联系方式沟通以及使用网站发布信息的方式。",
      "本网站不构成公开要约。价格、时间、服务描述、工作范围示例和网站材料均为信息性内容。具体项目条件将另行通过 brief、方案、发票、合同、工作说明或书面沟通确定。",
    ],
    blocks: [
      {
        title: "网站用途",
        body: [
          "网站用于介绍 LORA、服务、方法、内部页面、价格范围、文件和联系方式。",
          "用户可以阅读材料、浏览页面、发送请求、申请审计、发送邮件并使用其他公开联系方式。",
        ],
      },
      {
        title: "网站信息的性质",
        body: [
          "网站信息不构成结果保证、最终报价、法律咨询、技术任务书，也不构成 LORA 接受项目的义务。",
          "未经项目、流量、报价、市场和执行背景分析，LORA 不保证搜索排名第一、具体增长比例、销售量、广告回本或财务结果。",
        ],
      },
      {
        title: "请求与沟通开始",
        body: [
          "提交表单或邮件表示用户请求 LORA 审查信息并联系澄清任务。这不意味着 LORA 必须接受项目，也不意味着用户必须购买服务。",
          "如果任务不符合服务范围、时间、预算、伦理、法律风险、团队可用性或其他合理原因，LORA 可以拒绝项目或停止讨论。",
        ],
      },
      {
        title: "用户义务",
        body: [
          "用户应提供真实信息，不侵犯第三方权利，不发送违法材料，也不得以影响网站运行或安全的方式使用网站。",
          "如用户提交材料、客户数据、文本、图片、标志或访问权限，即确认其有权将其提供给 LORA 用于讨论或执行项目。",
        ],
      },
      {
        title: "禁止使用",
        body: [
          "禁止将网站用于垃圾信息、自动抓取、攻击、未经授权访问、伪造请求、上传恶意文件、发送钓鱼链接、破坏表单运行或绕过技术限制。",
          "禁止复制整个网站、将 LORA 材料冒充为自己的内容、将网站设计或文本作为独立产品出售、未经许可使用 LORA 品牌，或误导他人认为其与 LORA 有关联。",
        ],
        items: [
          "批量提交表单和测试请求；",
          "抓取和自动收集材料；",
          "尝试访问服务器、管理后台、数据或源代码；",
          "发送恶意文件、钓鱼链接或违法内容；",
          "复制网站用于转售或品牌仿冒。",
        ],
      },
      {
        title: "知识产权",
        body: [
          "标志、名称、视觉风格、文本、页面结构、界面方案、图片、组件和其他网站材料属于 LORA 或依法使用。",
          "允许分享网站链接并注明来源引用少量片段。任何商业复制、再制作或改编均需事先获得 LORA 书面同意。",
        ],
      },
      {
        title: "第三方链接与服务",
        body: [
          "网站可能包含指向即时通讯、邮件客户端、地图、支付、分析或广告平台、社交网络和其他工具的链接。",
          "LORA 不控制第三方网站的规则、可用性或安全性。用户访问这些服务时，应遵守其自身条款。",
        ],
      },
      {
        title: "责任限制",
        body: [
          "LORA 努力保持网站正确和可用，但不保证不存在错误、中断，或与特定设备、浏览器、扩展或设置完全兼容。",
          "因错误使用网站、用户提交虚假数据、第三方服务行为、LORA 控制范围外的技术故障，或用户仅基于网站信息而未单独讨论项目所作决定造成的损失，LORA 不承担责任。",
        ],
      },
      {
        title: "保密材料",
        body: [
          "在签署 NDA 或单独协议之前，用户不应通过公开表单发送商业秘密、第三方个人数据、封闭财务信息、医疗数据或其他敏感信息。",
          "如评估项目确需这些材料，双方应事先约定数据范围、传输目的、传输渠道和保密制度。",
        ],
      },
      {
        title: "条款变更",
        body: [
          "当网站、服务、联系方式、法律结构、法规要求或业务流程发生变化时，LORA 可以更新本条款。",
          "最新版本发布在本页面。对于已达成的项目，具体合同、发票、工作说明或书面约定优先适用。",
        ],
      },
    ],
    note: "如在提交请求前需要确认法律条件、NDA、材料传输方式或方案状态，请先联系 LORA。",
  },
};

const docsByLang: Record<Lang, Record<"privacy" | "cookies" | "terms", LegalDoc>> = {
  en: enDocs,
  es: esDocs,
  ru: ruDocs,
  zh: zhDocs,
};
