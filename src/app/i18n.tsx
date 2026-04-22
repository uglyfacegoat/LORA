import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "es" | "ru" | "zh";

export const LANGS: { code: Lang; label: string; native: string; flag: string }[] = [
  { code: "en", label: "English", native: "English", flag: "EN" },
  { code: "es", label: "Spanish", native: "Español", flag: "ES" },
  { code: "ru", label: "Russian", native: "Русский", flag: "RU" },
  { code: "zh", label: "Chinese", native: "中文", flag: "ZH" },
];

type Dict = Record<string, { en: string; es: string; ru: string; zh: string }>;

export const translations: Dict = {
  // Nav
  "nav.process": { en: "Process", es: "Proceso", ru: "Процесс", zh: "流程" },
  "nav.results": { en: "Results", es: "Resultados", ru: "Результаты", zh: "成果" },
  "nav.contact": { en: "Contact", es: "Contacto", ru: "Контакты", zh: "联系" },
  "nav.cta":     { en: "Get in touch", es: "Contáctanos", ru: "Связаться", zh: "联系我们" },
  "nav.tagline": { en: "Systems Agency", es: "Agencia de Sistemas", ru: "Системное Агентство", zh: "系统机构" },
  "nav.language":{ en: "Language", es: "Idioma", ru: "Язык", zh: "语言" },
  "nav.theme":   { en: "Theme", es: "Tema", ru: "Тема", zh: "主题" },

  // Hero
  "hero.tagline": {
    en: "We engineer conversion systems that turn your traffic into predictable, scalable revenue.",
    es: "Diseñamos sistemas de conversión que convierten tu tráfico en ingresos predecibles y escalables.",
    ru: "Мы инженерим системы конверсии, превращающие ваш трафик в предсказуемую и масштабируемую выручку.",
    zh: "我们设计转化系统,将您的流量转化为可预测、可扩展的收入。",
  },
  "hero.cta.primary":   { en: "Get Free Audit", es: "Auditoría Gratuita", ru: "Бесплатный аудит", zh: "免费审计" },
  "hero.cta.secondary": { en: "Contact Us",     es: "Contáctanos",        ru: "Связаться",        zh: "联系我们" },
  "hero.scroll":        { en: "Scroll",          es: "Desliza",            ru: "Листайте",         zh: "滑动" },

  // Manifesto
  "manifesto.l1": { en: "We don't experiment.",  es: "No experimentamos.",  ru: "Мы не экспериментируем.",     zh: "我们不做实验。" },
  "manifesto.l2": { en: "We don't try.",         es: "No probamos.",        ru: "Мы не пробуем.",              zh: "我们不做尝试。" },
  "manifesto.l3": { en: "We don't guess.",       es: "No adivinamos.",      ru: "Мы не гадаем.",               zh: "我们不靠猜测。" },
  "manifesto.l4": {
    en: "We build modern",
    es: "Construimos máquinas",
    ru: "Мы создаём современные",
    zh: "我们打造现代化",
  },
  "manifesto.l5": {
    en: "revenue machines.",
    es: "modernas de ingresos.",
    ru: "машины для дохода.",
    zh: "的收入机器。",
  },
  "manifesto.eyebrowL": { en: "Manifesto", es: "Manifiesto", ru: "Манифест", zh: "宣言" },
  "manifesto.eyebrowR": { en: "Principles / 001", es: "Principios / 001", ru: "Принципы / 001", zh: "原则 / 001" },

  // Pain
  "pain.eyebrow":  { en: "Diagnosis / Scan", es: "Diagnóstico / Análisis", ru: "Диагностика / Скан", zh: "诊断 / 扫描" },
  "pain.title":    { en: "You know",          es: "Tú sabes",               ru: "Ты знаешь,",          zh: "你知道" },
  "pain.titleAccent": {
    en: "what the problem is.",
    es: "cuál es el problema.",
    ru: "в чём проблема.",
    zh: "问题在哪里。",
  },
  "pain.sub": {
    en: "The four most common ways companies bleed money — every day, without noticing.",
    es: "Las cuatro formas más comunes en que las empresas pierden dinero — cada día, sin darse cuenta.",
    ru: "Четыре самые частые причины, по которым компании теряют деньги — каждый день, не замечая этого.",
    zh: "企业每天无形中流失资金的四种最常见方式。",
  },
  "pain.01.t": { en: "Leads vanish before converting",              es: "Los leads se pierden antes de convertir",       ru: "Лиды пропадают, не конвертируясь",        zh: "潜在客户在转化前流失" },
  "pain.01.s": { en: "Your traffic costs money. But your funnel returns nothing.", es: "Tu tráfico cuesta dinero. Pero tu embudo no devuelve nada.", ru: "Трафик стоит денег. А воронка не возвращает ничего.", zh: "流量花钱买来,漏斗却零回报。" },
  "pain.01.l": { en: "OF LEADS LOST", es: "DE LEADS PERDIDOS", ru: "ЛИДОВ ТЕРЯЕТСЯ", zh: "的潜客流失" },
  "pain.02.t": { en: "Revenue leaks at every stage",                es: "Los ingresos se escapan en cada etapa",          ru: "Выручка утекает на каждом шаге",           zh: "收入在每个环节流失" },
  "pain.02.s": { en: "Checkout, forms, CTAs — each step bleeds money you'll never see.", es: "Checkout, formularios, CTAs — cada paso pierde dinero que nunca verás.", ru: "Чекаут, формы, CTA — каждый шаг теряет деньги, которые ты не увидишь.", zh: "结账、表单、CTA — 每一步都在流失你看不见的钱。" },
  "pain.02.l": { en: "POTENTIAL MISSED", es: "POTENCIAL PERDIDO", ru: "ПОТЕНЦИАЛА УПУЩЕНО", zh: "的潜力错失" },
  "pain.03.t": { en: "No system — just chaos",                       es: "Sin sistema — solo caos",                        ru: "Нет системы — только хаос",                zh: "没有系统 — 只有混乱" },
  "pain.03.s": { en: "You're running on hope, not data. Every win is accidental.", es: "Operas con esperanza, no con datos. Cada victoria es accidental.", ru: "Ты работаешь на надежде, а не на данных. Каждая победа — случайна.", zh: "你靠希望运作,而非数据。每次成功都是偶然。" },
  "pain.03.l": { en: "DECISIONS BY GUT", es: "DECISIONES INTUITIVAS", ru: "РЕШЕНИЙ НАОБУМ", zh: "凭直觉决策" },
  "pain.04.t": { en: "Growth never compounds",                       es: "El crecimiento nunca se acumula",                ru: "Рост не накапливается",                    zh: "增长从不复利" },
  "pain.04.s": { en: "Wins don't stack. You restart from zero every quarter.", es: "Las victorias no se acumulan. Empiezas de cero cada trimestre.", ru: "Победы не складываются. Каждый квартал — с нуля.", zh: "成果无法累积。每季度从零开始。" },
  "pain.04.l": { en: "COMPOUNDING", es: "ACUMULACIÓN", ru: "НАРАЩИВАНИЯ", zh: "复利增长" },

  // Solution — 5 phases now
  "sol.eyebrow": { en: "The System", es: "El Sistema", ru: "Система", zh: "系统" },
  "sol.title":   { en: "Five phases.", es: "Cinco fases.", ru: "Пять фаз.", zh: "五个阶段。" },
  "sol.titleAccent": { en: "One machine.", es: "Una máquina.", ru: "Одна машина.", zh: "一台机器。" },
  "sol.sub": {
    en: "Each phase builds on the last. By the end, you don't have a campaign — you have a system.",
    es: "Cada fase se construye sobre la anterior. Al final, no tienes una campaña — tienes un sistema.",
    ru: "Каждая фаза опирается на предыдущую. В итоге у тебя не кампания — у тебя система.",
    zh: "每个阶段建立在前一个之上。最终你得到的不是一场活动 — 是一套系统。",
  },
  "sol.fastNote": {
    en: "Fast turnaround. The audit fee is credited toward your engagement if you proceed.",
    es: "Respuesta rápida. El costo de la auditoría se acredita a tu contrato si continúas.",
    ru: "Работаем быстро. Стоимость аудита засчитывается в счёт оплаты, если двигаемся дальше.",
    zh: "快速周转。若继续合作,审计费用将抵扣正式费用。",
  },
  "sol.p1.title": { en: "AUDIT",       es: "AUDITORÍA",  ru: "АУДИТ",         zh: "审计" },
  "sol.p1.head":  { en: "Find every leak", es: "Encuentra cada fuga", ru: "Найти все утечки", zh: "找出每一处流失" },
  "sol.p1.desc":  {
    en: "Complete diagnostic of your funnel, traffic sources, UX, and conversion data. Fee credited to engagement.",
    es: "Diagnóstico completo de tu embudo, tráfico, UX y datos de conversión. El costo se acredita al contrato.",
    ru: "Полный диагноз воронки, источников трафика, UX и данных конверсии. Стоимость идёт в счёт работы.",
    zh: "全面诊断漏斗、流量、用户体验和转化数据。费用可抵扣后续合作。",
  },
  "sol.p2.title": { en: "ALIGNMENT",   es: "ALINEACIÓN", ru: "СОГЛАСОВАНИЕ",  zh: "对齐" },
  "sol.p2.head":  { en: "Lock the plan", es: "Fija el plan", ru: "Зафиксировать план", zh: "锁定方案" },
  "sol.p2.desc":  {
    en: "We align on goals, priorities, KPIs, and timelines before a single pixel is built.",
    es: "Alineamos objetivos, prioridades, KPIs y plazos antes de construir un solo píxel.",
    ru: "Согласуем цели, приоритеты, KPI и сроки до того, как построен хотя бы один пиксель.",
    zh: "在动工之前统一目标、优先级、KPI 与时间表。",
  },
  "sol.p3.title": { en: "CREATION",    es: "CREACIÓN",   ru: "СОЗДАНИЕ",      zh: "创建" },
  "sol.p3.head":  { en: "Build the machine", es: "Construir la máquina", ru: "Построить машину", zh: "搭建机器" },
  "sol.p3.desc":  {
    en: "Design, develop, deploy. Fast, precise, obsessively tested before launch.",
    es: "Diseño, desarrollo, despliegue. Rápido, preciso, obsesivamente probado.",
    ru: "Дизайн, разработка, деплой. Быстро, точно, с маниакальным тестом до запуска.",
    zh: "设计、开发、上线。快速、精准、上线前反复测试。",
  },
  "sol.p4.title": { en: "REVISIONS",   es: "REVISIONES", ru: "ПРАВКИ",        zh: "修订" },
  "sol.p4.head":  { en: "Tune for revenue", es: "Optimiza para ingresos", ru: "Донастроить под выручку", zh: "为收入调优" },
  "sol.p4.desc":  {
    en: "A/B tests, iteration loops and surgical edits — we tune until the numbers move.",
    es: "Pruebas A/B, ciclos de iteración y ajustes quirúrgicos hasta que los números suban.",
    ru: "A/B-тесты, циклы итераций и точечные правки — доводим, пока метрики не вырастут.",
    zh: "A/B 测试、迭代循环与精准调整 — 调到指标上升为止。",
  },
  "sol.p5.title": { en: "SCALE",       es: "ESCALA",     ru: "МАСШТАБ",        zh: "扩展" },
  "sol.p5.head":  { en: "Compound growth", es: "Crecimiento compuesto", ru: "Наращивание роста", zh: "复利增长" },
  "sol.p5.desc":  {
    en: "Systematize wins and scale across channels. Growth becomes a machine, not a gamble.",
    es: "Sistematizamos lo que funciona y escalamos por canales. El crecimiento es máquina, no apuesta.",
    ru: "Систематизируем победы и масштабируем по каналам. Рост — машина, а не азарт.",
    zh: "把成功模式系统化并跨渠道扩展。增长是机器,不是赌博。",
  },

  // CtaBreak
  "cta.eyebrow": { en: "Still scrolling?", es: "¿Sigues desplazándote?", ru: "Всё ещё листаешь?", zh: "还在往下滑?" },
  "cta.big": {
    en: "You scroll.\nThey launch.",
    es: "Tú desplazas.\nEllos lanzan.",
    ru: "Ты листаешь.\nОни запускают.",
    zh: "你在滑,\n他们在上线。",
  },
  "cta.big.sub": {
    en: "Every second on this page your competitors close another deal. The gap compounds.",
    es: "Cada segundo en esta página tus competidores cierran otro trato. La brecha crece.",
    ru: "Каждую секунду на этой странице конкурент закрывает ещё одну сделку. Разрыв нарастает.",
    zh: "你停留的每一秒,对手就多成交一单。差距不断累积。",
  },
  "cta.small":  { en: "Our slogan", es: "Nuestro lema", ru: "Наш лозунг", zh: "我们的口号" },
  "cta.slogan": { en: "LEAVE OLD RULES AHEAD", es: "LEAVE OLD RULES AHEAD", ru: "LEAVE OLD RULES AHEAD", zh: "LEAVE OLD RULES AHEAD" },

  // Why LORA
  "why.eyebrow":   { en: "Why Us",           es: "Por Qué",            ru: "Почему мы",           zh: "为什么选我们" },
  "why.title":     { en: "Built different.", es: "Construido distinto.", ru: "Сделано иначе.",    zh: "与众不同。" },
  "why.titleAccent": { en: "On purpose.",    es: "Con propósito.",     ru: "Намеренно.",          zh: "有意为之。" },
  "why.ap.label":  { en: "OUR APPROACH",     es: "NUESTRO ENFOQUE",    ru: "НАШ ПОДХОД",          zh: "我们的方法" },
  "why.ap.title":  { en: "Systems, not campaigns", es: "Sistemas, no campañas", ru: "Системы, а не кампании", zh: "系统,而非活动" },
  "why.ap.desc": {
    en: "Most agencies sell you a landing page and call it a day. We engineer end-to-end conversion systems — from first click to closed deal — designed to compound over time.",
    es: "La mayoría de agencias te venden una landing y ya. Nosotros construimos sistemas de conversión completos — del primer clic al cierre — que se acumulan con el tiempo.",
    ru: "Большинство агентств продают лендинг и на этом заканчивают. Мы инженерим сквозные системы конверсии — от первого клика до сделки — растущие во времени.",
    zh: "大多数机构只卖给你一个着陆页。我们打造端到端的转化系统——从首次点击到成交——随时间复利增长。",
  },
  "why.roi":       { en: "AVG. ROI",         es: "ROI PROMEDIO",       ru: "СРЕДНИЙ ROI",         zh: "平均ROI" },
  "why.roi.desc":  { en: "Return on investment across all client engagements", es: "Retorno de inversión en todos los clientes", ru: "Возврат инвестиций по всем проектам", zh: "所有客户合作的平均回报" },
  "why.quote":     { en: "Working with LORA felt like upgrading from a bicycle to a rocket ship.", es: "Trabajar con LORA fue como pasar de bicicleta a cohete.", ru: "Работа с LORA — как пересесть с велосипеда на ракету.", zh: "与LORA合作就像从自行车升级到火箭。" },
  "why.data.t":    { en: "Data-First",       es: "Datos Primero",      ru: "Сначала данные",      zh: "数据优先" },
  "why.data.s":    { en: "Every decision backed by data. No gut feelings, no guesswork.", es: "Cada decisión con datos. Sin intuiciones.", ru: "Каждое решение на данных. Без интуиции.", zh: "每个决策都有数据支撑。" },
  "why.fast.t":    { en: "Fast Execution",   es: "Ejecución Rápida",   ru: "Быстрое исполнение",  zh: "快速执行" },
  "why.fast.s":    { en: "From audit to live system in weeks, not months.", es: "De auditoría a sistema vivo en semanas.", ru: "От аудита до живой системы — недели.", zh: "从审计到上线——几周内。" },
  "why.own.t":     { en: "Full Ownership",   es: "Propiedad Total",    ru: "Полное владение",     zh: "完全所有权" },
  "why.own.s":     { en: "You own everything we build. Code, designs, data — it's all yours.", es: "Todo lo que construimos es tuyo.", ru: "Всё, что мы строим, принадлежит тебе.", zh: "我们构建的一切归你所有。" },
  "why.step.attract": { en: "Attract", es: "Atraer", ru: "Привлечь", zh: "吸引" },
  "why.step.convert": { en: "Convert", es: "Convertir", ru: "Конверсия", zh: "转化" },
  "why.step.close":   { en: "Close",   es: "Cerrar",   ru: "Закрыть",   zh: "成交" },
  "why.step.scale":   { en: "Scale",   es: "Escalar",  ru: "Масштаб",   zh: "扩展" },

  // Comparison
  "cmp.eyebrow": { en: "Comparison", es: "Comparación", ru: "Сравнение", zh: "对比" },
  "cmp.title":   { en: "Not your typical",   es: "No es la típica",     ru: "Не типичный",         zh: "不是典型的" },
  "cmp.titleAccent": { en: "agency experience.", es: "experiencia de agencia.", ru: "опыт агентства.", zh: "代理体验。" },
  "cmp.them":    { en: "TYPICAL AGENCY",     es: "AGENCIA TÍPICA",     ru: "ТИПИЧНОЕ АГЕНТСТВО",  zh: "典型机构" },
  "cmp.us":      { en: "LORA",               es: "LORA",               ru: "LORA",                zh: "LORA" },
  "cmp.r1.l":    { en: "Approach",           es: "Enfoque",            ru: "Подход",              zh: "方法" },
  "cmp.r1.t":    { en: "Campaign-based",     es: "Basado en campañas", ru: "На кампаниях",        zh: "基于活动" },
  "cmp.r1.u":    { en: "System-based",       es: "Basado en sistemas", ru: "На системах",         zh: "基于系统" },
  "cmp.r2.l":    { en: "Timeline",           es: "Plazos",             ru: "Сроки",               zh: "时间线" },
  "cmp.r2.t":    { en: "Months of planning", es: "Meses de planificación", ru: "Месяцы планирования", zh: "数月规划" },
  "cmp.r2.u":    { en: "Weeks to results",   es: "Semanas a resultados", ru: "Недели до результата", zh: "数周见效" },
  "cmp.r3.l":    { en: "Decisions",          es: "Decisiones",         ru: "Решения",             zh: "决策" },
  "cmp.r3.t":    { en: "Gut feeling",        es: "Intuición",          ru: "Интуитивно",          zh: "凭直觉" },
  "cmp.r3.u":    { en: "Data-driven",        es: "Basado en datos",    ru: "На данных",           zh: "数据驱动" },
  "cmp.r4.l":    { en: "Ownership",          es: "Propiedad",          ru: "Собственность",       zh: "所有权" },
  "cmp.r4.t":    { en: "Locked contracts",   es: "Contratos atados",   ru: "Кабальные договоры",  zh: "锁定合同" },
  "cmp.r4.u":    { en: "You own it all",     es: "Todo es tuyo",       ru: "Всё твоё",            zh: "一切归你" },
  "cmp.r5.l":    { en: "Growth",             es: "Crecimiento",        ru: "Рост",                zh: "增长" },
  "cmp.r5.t":    { en: "Linear at best",     es: "Lineal a lo mucho",  ru: "В лучшем случае линейный", zh: "最多线性" },
  "cmp.r5.u":    { en: "Compounding",        es: "Compuesto",          ru: "Наращиваемый",        zh: "复利" },
  "cmp.r6.l":    { en: "Reporting",          es: "Reportes",           ru: "Отчётность",          zh: "报告" },
  "cmp.r6.t":    { en: "Vanity metrics",     es: "Métricas vanidosas", ru: "Пустые метрики",      zh: "虚荣指标" },
  "cmp.r6.u":    { en: "Revenue metrics",    es: "Métricas de ingreso", ru: "Метрики выручки",    zh: "收入指标" },
  "cmp.r7.l":    { en: "Focus",              es: "Foco",               ru: "Фокус",               zh: "焦点" },
  "cmp.r7.t":    { en: "Clicks & impressions", es: "Clics e impresiones", ru: "Клики и показы",   zh: "点击和показы" },
  "cmp.r7.u":    { en: "Conversions & revenue", es: "Conversiones e ingresos", ru: "Конверсии и выручка", zh: "转化和收入" },

  // Contact
  "contact.eyebrow":{ en: "Start",          es: "Inicio",             ru: "Старт",               zh: "开始" },
  "contact.title":  { en: "Ready to grow?", es: "¿Listo para crecer?", ru: "Готов расти?",       zh: "准备好增长了吗?" },
  "contact.sub":    { en: "Get a free audit of your current funnel. We'll show you exactly where revenue is being lost.", es: "Obtén una auditoría gratuita. Te mostramos dónde pierdes ingresos.", ru: "Бесплатный аудит воронки. Покажем, где именно теряется выручка.", zh: "免费审计当前漏斗。我们会精准指出收入流失的位置。" },
  "contact.name":   { en: "Your name",      es: "Tu nombre",          ru: "Имя",                 zh: "姓名" },
  "contact.phone":  { en: "+1 (000) 000-0000", es: "+00 000 000 000", ru: "+7 000 000-00-00",    zh: "电话" },
  "contact.email":  { en: "you@company.com", es: "tu@empresa.com",    ru: "you@company.com",     zh: "邮箱" },
  "contact.company":{ en: "Company & site (optional)", es: "Empresa y sitio", ru: "Компания и сайт (опционально)", zh: "公司与网站(可选)" },
  "contact.submit": { en: "Request Free Audit", es: "Solicitar Auditoría", ru: "Запросить аудит", zh: "申请免费审计" },
  "contact.ok.t":   { en: "Request Received",   es: "Solicitud Recibida", ru: "Заявка принята",  zh: "申请已收到" },
  "contact.ok.s":   { en: "Our team will reach out within 24 hours.", es: "Te responderemos en 24 horas.", ru: "Свяжемся в течение 24 часов.", zh: "我们将在24小时内联系您。" },
  "contact.guarantee": { en: "48h response · NDA on request · No commitment", es: "Respuesta 48h · NDA · Sin compromiso", ru: "Ответ за 48ч · NDA по запросу · Без обязательств", zh: "48小时回复 · 可签NDA · 无需承诺" },
  "contact.slot":   { en: "Next audit slot", es: "Próximo slot",       ru: "Ближайший слот",      zh: "下一个时段" },
  "contact.spots":  { en: "3 spots left this month", es: "Quedan 3 lugares este mes", ru: "Осталось 3 слота в этом месяце", zh: "本月还剩3个名额" },

  // Process / Live / Cases / Footer — common
  "process.eyebrow":{ en: "Process",  es: "Proceso",   ru: "Процесс",    zh: "流程" },
  "results.eyebrow":{ en: "Results / Verified", es: "Resultados", ru: "Результаты", zh: "成果" },
  "live.eyebrow":   { en: "Live Preview", es: "Vista Previa", ru: "Живой предпросмотр", zh: "实时预览" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lora.lang") as Lang | null;
    if (saved && ["en", "es", "ru", "zh"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lora.lang", l); } catch {}
  };

  const t = (key: string) => translations[key]?.[lang] ?? translations[key]?.en ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
