import type { Lang } from "../seo/site";

export type AuditPageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  readLogic: string;
  sideLabel: string;
  sideItems: { label: string; text: string }[];
  logicLabel: string;
  logicTitle: string;
  logicItems: { title: string; text: string }[];
  outcomeTitle: string;
  outcomes: string[];
  quote: string;
};

export const auditCopy: Record<Lang, AuditPageCopy> = {
  en: {
    eyebrow: "LORA · AUDIT / BRIEF",
    title: "Audit and brief",
    lead: "This page is the clean entry point before production. We collect context, read the weak points and decide what should be designed, fixed or left alone.",
    cta: "Send brief",
    readLogic: "How it works",
    sideLabel: "Before the call",
    sideItems: [
      { label: "Site", text: "What exists now and where traffic lands." },
      { label: "Funnel", text: "Where the visitor should move after the first screen." },
      { label: "CRM", text: "What happens to the lead after the form." },
      { label: "Goal", text: "What result matters enough to build around it." },
    ],
    logicLabel: "Reading logic",
    logicTitle: "We do not start with design.",
    logicItems: [
      {
        title: "First we read the offer",
        text: "Who the page speaks to, what promise it makes and whether the next action is obvious without explanation.",
      },
      {
        title: "Then we trace the route",
        text: "Traffic source, first screen, form, CRM handoff and follow-up. If the route breaks, design will only hide the leak.",
      },
      {
        title: "Then we define the build",
        text: "A page, redesign, CRM integration or automation only makes sense after the problem is visible.",
      },
    ],
    outcomeTitle: "What you get after the brief",
    outcomes: [
      "A clear project direction instead of a generic proposal.",
      "Priority list: what blocks conversion first.",
      "Recommended scope, timeline and starting format.",
      "A shared language before design starts.",
    ],
    quote: "A good brief does not slow the project down. It prevents building the wrong thing fast.",
  },
  es: {
    eyebrow: "LORA · AUDITORIA / BRIEF",
    title: "Auditoria y brief",
    lead: "Esta pagina es el punto de entrada antes de producir. Recogemos contexto, leemos puntos debiles y decidimos que disenar, corregir o dejar quieto.",
    cta: "Enviar brief",
    readLogic: "Como funciona",
    sideLabel: "Antes de la llamada",
    sideItems: [
      { label: "Sitio", text: "Que existe ahora y donde aterriza el trafico." },
      { label: "Embudo", text: "A donde debe moverse el visitante despues del primer pantallazo." },
      { label: "CRM", text: "Que pasa con el lead despues del formulario." },
      { label: "Objetivo", text: "Que resultado importa lo suficiente para construir alrededor." },
    ],
    logicLabel: "Logica de lectura",
    logicTitle: "No empezamos por diseno.",
    logicItems: [
      {
        title: "Primero leemos la oferta",
        text: "A quien habla la pagina, que promete y si el siguiente paso se entiende sin explicacion.",
      },
      {
        title: "Luego trazamos la ruta",
        text: "Fuente de trafico, primera pantalla, formulario, CRM y seguimiento. Si la ruta se rompe, el diseno solo oculta la fuga.",
      },
      {
        title: "Luego definimos el alcance",
        text: "Pagina, rediseno, CRM o automatizacion solo tienen sentido cuando el problema es visible.",
      },
    ],
    outcomeTitle: "Que recibes despues del brief",
    outcomes: [
      "Direccion clara en vez de propuesta generica.",
      "Prioridades: que bloquea la conversion primero.",
      "Alcance, tiempos y formato inicial recomendados.",
      "Lenguaje compartido antes del diseno.",
    ],
    quote: "Un buen brief no ralentiza el proyecto. Evita construir rapido lo equivocado.",
  },
  ru: {
    eyebrow: "LORA · АУДИТ / БРИФ",
    title: "Аудит и бриф",
    lead: "Это нормальная точка входа перед работой. Мы собираем контекст, читаем слабые места и понимаем, что нужно проектировать, чинить или вообще не трогать.",
    cta: "Отправить бриф",
    readLogic: "Как работает",
    sideLabel: "До созвона",
    sideItems: [
      { label: "Сайт", text: "Что уже есть и куда приходит трафик." },
      { label: "Воронка", text: "Куда человек должен двигаться после первого экрана." },
      { label: "CRM", text: "Что происходит с заявкой после формы." },
      { label: "Цель", text: "Какой результат важен настолько, чтобы строить вокруг него систему." },
    ],
    logicLabel: "Логика разбора",
    logicTitle: "Мы не начинаем с дизайна.",
    logicItems: [
      {
        title: "Сначала читаем оффер",
        text: "Кому говорит страница, что обещает и понятно ли следующее действие без дополнительного объяснения.",
      },
      {
        title: "Потом собираем маршрут",
        text: "Источник трафика, первый экран, форма, передача в CRM и дальнейший догрев. Если маршрут ломается, дизайн просто прячет утечку.",
      },
      {
        title: "Потом определяем работу",
        text: "Страница, редизайн, CRM-интеграция или автоматизация имеют смысл только после того, как видна настоящая проблема.",
      },
    ],
    outcomeTitle: "Что остается после брифа",
    outcomes: [
      "Понятное направление проекта вместо generic-предложения.",
      "Приоритеты: что первым мешает конверсии.",
      "Рекомендуемый scope, срок и стартовый формат.",
      "Общий язык до того, как начинается дизайн.",
    ],
    quote: "Хороший бриф не тормозит проект. Он не дает быстро построить не то.",
  },
  zh: {
    eyebrow: "LORA · 审计 / BRIEF",
    title: "审计与 brief",
    lead: "这是生产前的清晰入口。我们收集背景，阅读薄弱点，并判断应该设计、修复或保持不动的内容。",
    cta: "发送 brief",
    readLogic: "如何运作",
    sideLabel: "通话前",
    sideItems: [
      { label: "网站", text: "现在有什么，流量落到哪里。" },
      { label: "漏斗", text: "用户首屏之后应该走向哪里。" },
      { label: "CRM", text: "表单之后线索会发生什么。" },
      { label: "目标", text: "哪个结果重要到值得围绕它构建系统。" },
    ],
    logicLabel: "阅读逻辑",
    logicTitle: "我们不从设计开始。",
    logicItems: [
      { title: "先阅读报价", text: "页面面向谁、承诺什么，以及下一步是否无需解释就清楚。" },
      { title: "再梳理路径", text: "流量来源、首屏、表单、CRM 交接和跟进。如果路径断裂，设计只会隐藏流失。" },
      { title: "然后定义工作", text: "页面、改版、CRM 集成或自动化，只有在问题可见后才有意义。" },
    ],
    outcomeTitle: "brief 之后你会得到什么",
    outcomes: [
      "清晰项目方向，而不是泛泛提案。",
      "优先级：什么最先阻碍转化。",
      "推荐范围、时间线和起始格式。",
      "设计开始前的共同语言。",
    ],
    quote: "好的 brief 不会拖慢项目。它防止快速做错东西。",
  },
};
