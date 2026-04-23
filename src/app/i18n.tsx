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
  "nav.process": { en: "Process", es: "Proceso", ru: "Процесс", zh: "流程" },
  "nav.results": { en: "Results", es: "Resultados", ru: "Результаты", zh: "成果" },
  "nav.contact": { en: "Contact", es: "Contacto", ru: "Контакты", zh: "联系" },
  "nav.cta": { en: "Get in touch", es: "Contáctanos", ru: "Связаться", zh: "联系我们" },
  "nav.tagline": { en: "Systems Agency", es: "Agencia de Sistemas", ru: "Системное агентство", zh: "系统机构" },
  "nav.language": { en: "Language", es: "Idioma", ru: "Язык", zh: "语言" },
  "nav.theme": { en: "Theme", es: "Tema", ru: "Тема", zh: "主题" },
  "nav.languageAria": { en: "Change language", es: "Cambiar idioma", ru: "Сменить язык", zh: "切换语言" },
  "nav.themeAria": { en: "Toggle theme", es: "Cambiar tema", ru: "Сменить тему", zh: "切换主题" },

  "hero.tagline": {
    en: "We engineer conversion systems that turn your traffic into predictable, scalable revenue.",
    es: "Diseñamos sistemas de conversión que convierten tu tráfico en ingresos previsibles y escalables.",
    ru: "Мы проектируем системы конверсии, которые превращают ваш трафик в предсказуемую и масштабируемую выручку.",
    zh: "我们设计转化系统，把你的流量变成可预测、可扩展的收入。",
  },
  "hero.cta.primary": { en: "Get Free Audit", es: "Auditoría gratuita", ru: "Бесплатный аудит", zh: "免费审计" },
  "hero.cta.secondary": { en: "Contact Us", es: "Contáctanos", ru: "Связаться", zh: "联系我们" },
  "hero.scroll": { en: "Scroll", es: "Desliza", ru: "Листай", zh: "继续下滑" },

  "manifesto.l1": { en: "We don't experiment.", es: "No experimentamos.", ru: "Мы не экспериментируем.", zh: "我们不做实验。" },
  "manifesto.l2": { en: "We don't try.", es: "No improvisamos.", ru: "Мы не пробуем наугад.", zh: "我们不靠试错。" },
  "manifesto.l3": { en: "We don't guess.", es: "No adivinamos.", ru: "Мы не гадаем.", zh: "我们不靠猜。" },
  "manifesto.l4": { en: "We build modern", es: "Construimos sistemas", ru: "Мы создаём современные", zh: "我们打造现代化" },
  "manifesto.l5": { en: "revenue machines.", es: "de ingresos.", ru: "машины выручки.", zh: "营收机器。" },
  "manifesto.eyebrowL": { en: "Manifesto", es: "Manifiesto", ru: "Манифест", zh: "宣言" },
  "manifesto.eyebrowR": { en: "Principles / 001", es: "Principios / 001", ru: "Принципы / 001", zh: "原则 / 001" },

  "pain.eyebrow": { en: "Diagnosis / Scan", es: "Diagnóstico / Escaneo", ru: "Диагностика / Скан", zh: "诊断 / 扫描" },
  "pain.title": { en: "You know", es: "Ya sabes", ru: "Ты знаешь,", zh: "你知道" },
  "pain.titleAccent": { en: "what the problem is.", es: "dónde está el problema.", ru: "в чём проблема.", zh: "问题出在哪里。" },
  "pain.sub": {
    en: "The four most common ways companies bleed money every day without noticing.",
    es: "Las cuatro formas más comunes en que las empresas pierden dinero cada día sin notarlo.",
    ru: "Четыре самые частые причины, по которым компании каждый день теряют деньги и даже не замечают этого.",
    zh: "企业每天最常见的四种隐性漏钱方式。",
  },
  "pain.01.t": { en: "Leads vanish before converting", es: "Los leads desaparecen antes de convertir", ru: "Лиды пропадают до конверсии", zh: "潜在客户在转化前流失" },
  "pain.01.s": { en: "Your traffic costs money, but your funnel gives nothing back.", es: "Tu tráfico cuesta dinero, pero el embudo no devuelve nada.", ru: "Трафик стоит денег, а воронка не возвращает ничего.", zh: "流量花了钱，漏斗却没有任何回报。" },
  "pain.01.l": { en: "OF LEADS LOST", es: "DE LEADS PERDIDOS", ru: "ЛИДОВ ТЕРЯЕТСЯ", zh: "潜客流失" },
  "pain.02.t": { en: "Revenue leaks at every stage", es: "Los ingresos se escapan en cada etapa", ru: "Выручка утекает на каждом шаге", zh: "收入在每个环节流失" },
  "pain.02.s": { en: "Checkout, forms and CTAs bleed money you'll never see.", es: "Checkout, formularios y CTAs pierden dinero que nunca verás.", ru: "Чекаут, формы и CTA теряют деньги, которые ты так и не увидишь.", zh: "结账、表单和 CTA 都在流失你看不见的钱。" },
  "pain.02.l": { en: "POTENTIAL MISSED", es: "POTENCIAL PERDIDO", ru: "ПОТЕНЦИАЛА УПУЩЕНО", zh: "潜力错失" },
  "pain.03.t": { en: "No system, just chaos", es: "Sin sistema, solo caos", ru: "Нет системы, только хаос", zh: "没有系统，只有混乱" },
  "pain.03.s": { en: "You're running on hope, not data. Every win is accidental.", es: "Operas con esperanza y no con datos. Cada victoria es accidental.", ru: "Ты работаешь на надежде, а не на данных. Каждая победа случайна.", zh: "你靠希望在跑，而不是靠数据。每一次增长都只是偶然。" },
  "pain.03.l": { en: "DECISIONS BY GUT", es: "DECISIONES POR INSTINTO", ru: "РЕШЕНИЙ НАОБУМ", zh: "凭感觉决策" },
  "pain.04.t": { en: "Growth never compounds", es: "El crecimiento no se acumula", ru: "Рост не накапливается", zh: "增长无法复利" },
  "pain.04.s": { en: "Wins don't stack. Every quarter starts from zero again.", es: "Las victorias no se acumulan. Cada trimestre empieza de cero.", ru: "Победы не складываются. Каждый квартал снова начинается с нуля.", zh: "增长无法累积，每个季度都像重新开始。" },
  "pain.04.l": { en: "COMPOUNDING", es: "ACUMULACIÓN", ru: "НАРАЩИВАНИЯ", zh: "复利增长" },

  "why.eyebrow": { en: "Why Us", es: "Por qué nosotros", ru: "Почему мы", zh: "为什么选我们" },
  "why.title": { en: "Built different.", es: "Hecho distinto.", ru: "Сделано иначе.", zh: "从底层就不同。" },
  "why.titleAccent": { en: "On purpose.", es: "A propósito.", ru: "И не случайно.", zh: "而且是刻意如此。" },
  "why.ap.label": { en: "OUR APPROACH", es: "NUESTRO ENFOQUE", ru: "НАШ ПОДХОД", zh: "我们的方法" },
  "why.ap.title": { en: "Systems, not campaigns", es: "Sistemas, no campañas", ru: "Системы, а не кампании", zh: "做系统，不做单次活动" },
  "why.ap.desc": {
    en: "Most agencies sell a landing page and stop there. We engineer end-to-end conversion systems designed to compound over time.",
    es: "La mayoría de agencias vende una landing y se queda ahí. Nosotros construimos sistemas de conversión de extremo a extremo que crecen con el tiempo.",
    ru: "Большинство агентств продаёт лендинг и на этом заканчивает. Мы проектируем сквозные системы конверсии, которые растут со временем.",
    zh: "大多数机构卖给你一个落地页就结束了。我们搭建的是端到端的转化系统，并且会随着时间持续复利增长。",
  },
  "why.roi": { en: "AVG. ROI", es: "ROI PROMEDIO", ru: "СРЕДНИЙ ROI", zh: "平均 ROI" },
  "why.roi.desc": { en: "Return on investment across all client engagements", es: "Retorno de inversión en todos los proyectos", ru: "Окупаемость по всем клиентским проектам", zh: "所有合作项目的平均投资回报" },
  "why.quote": { en: "Working with LORA felt like upgrading from a bicycle to a rocket ship.", es: "Trabajar con LORA fue como pasar de una bicicleta a una nave.", ru: "Работать с LORA было как пересесть с велосипеда на ракету.", zh: "和 LORA 合作，就像从自行车直接升级到火箭。" },
  "why.quoteAuthor": { en: "Sarah Chen", es: "Sarah Chen", ru: "Sarah Chen", zh: "Sarah Chen" },
  "why.quoteRole": { en: "VP Growth, Nexus Commerce", es: "VP de Growth, Nexus Commerce", ru: "VP Growth, Nexus Commerce", zh: "Nexus Commerce 增长副总裁" },
  "why.data.t": { en: "Data-First", es: "Datos primero", ru: "Сначала данные", zh: "数据优先" },
  "why.data.s": { en: "Every decision is backed by data. No guesswork, no gut calls.", es: "Cada decisión se apoya en datos. Sin suposiciones ni intuición.", ru: "Каждое решение опирается на данные. Без догадок и интуиции.", zh: "每个决策都以数据为依据，不靠猜测。" },
  "why.fast.t": { en: "Fast Execution", es: "Ejecución rápida", ru: "Быстрое исполнение", zh: "快速执行" },
  "why.fast.s": { en: "From audit to live system in weeks, not months.", es: "De la auditoría al sistema en vivo en semanas, no meses.", ru: "От аудита до живой системы за недели, а не месяцы.", zh: "从审计到上线是按周计算，不是按月。" },
  "why.own.t": { en: "Full Ownership", es: "Propiedad total", ru: "Полное владение", zh: "完全归你所有" },
  "why.own.s": { en: "You own everything we build: code, designs and data.", es: "Todo lo que construimos es tuyo: código, diseño y datos.", ru: "Всё, что мы создаём, принадлежит тебе: код, дизайн и данные.", zh: "我们做的一切都归你所有，包括代码、设计和数据。" },
  "why.step.attract": { en: "Attract", es: "Atraer", ru: "Привлечь", zh: "吸引" },
  "why.step.convert": { en: "Convert", es: "Convertir", ru: "Конверсия", zh: "转化" },
  "why.step.close": { en: "Close", es: "Cerrar", ru: "Закрыть", zh: "成交" },
  "why.step.scale": { en: "Scale", es: "Escalar", ru: "Масштаб", zh: "放大" },

  "sol.eyebrow": { en: "The System", es: "El sistema", ru: "Система", zh: "系统" },
  "sol.title": { en: "Five phases.", es: "Cinco fases.", ru: "Пять фаз.", zh: "五个阶段。" },
  "sol.titleAccent": { en: "One machine.", es: "Una máquina.", ru: "Одна машина.", zh: "一台机器。" },
  "sol.sub": {
    en: "Each phase builds on the previous one. In the end, you don't have a campaign. You have a system.",
    es: "Cada fase se apoya en la anterior. Al final no tienes una campaña, tienes un sistema.",
    ru: "Каждая фаза опирается на предыдущую. В итоге у тебя не кампания, а система.",
    zh: "每个阶段都建立在前一个阶段之上。最后你得到的不是一次活动，而是一套系统。",
  },
  "sol.fastNote": {
    en: "Fast turnaround. The audit fee is credited toward the project if we move forward.",
    es: "Trabajamos rápido. El coste de la auditoría se descuenta del proyecto si avanzamos.",
    ru: "Работаем быстро. Стоимость аудита засчитывается в счёт работы, если идём дальше.",
    zh: "推进速度很快。如果继续合作，审计费用会直接抵扣项目费用。",
  },
  "sol.p1.title": { en: "AUDIT", es: "AUDITORÍA", ru: "АУДИТ", zh: "审计" },
  "sol.p1.head": { en: "Find every leak", es: "Encontrar cada fuga", ru: "Найти все утечки", zh: "找出每一处流失" },
  "sol.p1.desc": {
    en: "Complete diagnostic of your funnel, traffic sources, UX and conversion data. The fee goes toward the project.",
    es: "Diagnóstico completo de embudo, tráfico, UX y datos de conversión. El coste se acredita al proyecto.",
    ru: "Полный диагноз воронки, источников трафика, UX и данных конверсии. Стоимость идёт в счёт работы.",
    zh: "全面诊断你的漏斗、流量来源、体验和转化数据。审计费用可抵后续项目款。",
  },
  "sol.p2.title": { en: "ALIGNMENT", es: "ALINEACIÓN", ru: "СОГЛАСОВАНИЕ", zh: "对齐" },
  "sol.p2.head": { en: "Lock the plan", es: "Fijar el plan", ru: "Зафиксировать план", zh: "锁定方案" },
  "sol.p2.desc": {
    en: "We align on goals, priorities, KPIs and timelines before a single pixel gets built.",
    es: "Alineamos objetivos, prioridades, KPIs y plazos antes de construir un solo píxel.",
    ru: "Согласуем цели, приоритеты, KPI и сроки ещё до того, как будет сделан первый пиксель.",
    zh: "在动手之前，先把目标、优先级、KPI 和时间线全部对齐。",
  },
  "sol.p3.title": { en: "CREATION", es: "CREACIÓN", ru: "СОЗДАНИЕ", zh: "创建" },
  "sol.p3.head": { en: "Build the machine", es: "Construir la máquina", ru: "Построить машину", zh: "搭建机器" },
  "sol.p3.desc": {
    en: "Design, develop and deploy. Fast, precise and heavily tested before launch.",
    es: "Diseño, desarrollo y despliegue. Rápido, preciso y probado antes del lanzamiento.",
    ru: "Дизайн, разработка и деплой. Быстро, точно и с жёстким тестированием до запуска.",
    zh: "设计、开发、上线。快速、精准，并在上线前完成严格测试。",
  },
  "sol.p4.title": { en: "REVISIONS", es: "REVISIONES", ru: "ПРАВКИ", zh: "优化" },
  "sol.p4.head": { en: "Tune for revenue", es: "Optimizar para ingresos", ru: "Донастроить под выручку", zh: "为营收调优" },
  "sol.p4.desc": {
    en: "A/B tests, iteration loops and focused edits until the numbers move.",
    es: "Pruebas A/B, ciclos de iteración y ajustes precisos hasta que las métricas empiecen a crecer.",
    ru: "A/B-тесты, циклы итераций и точечные правки, пока метрики не начнут расти.",
    zh: "通过 A/B 测试、迭代和精细修改，一直调到指标开始上涨。",
  },
  "sol.p5.title": { en: "SCALE", es: "ESCALA", ru: "МАСШТАБ", zh: "扩张" },
  "sol.p5.head": { en: "Compound growth", es: "Crecimiento compuesto", ru: "Наращивание роста", zh: "复利增长" },
  "sol.p5.desc": {
    en: "Systematize what works and scale it across channels. Growth becomes a machine, not a gamble.",
    es: "Sistematizamos lo que funciona y lo escalamos por canales. El crecimiento deja de ser apuesta.",
    ru: "Систематизируем то, что работает, и масштабируем по каналам. Рост становится машиной, а не азартом.",
    zh: "把有效的方法系统化并扩展到更多渠道，让增长变成机器，而不是赌博。",
  },

  "live.eyebrow": { en: "Live Preview", es: "Vista previa en vivo", ru: "Живой предпросмотр", zh: "实时预览" },
  "live.title": { en: "See the system", es: "Mira el sistema", ru: "Посмотри, как система", zh: "看看系统" },
  "live.titleAccent": { en: "in action.", es: "en acción.", ru: "работает вживую.", zh: "如何运转。" },
  "live.sub": {
    en: "This is what happens when we plug into your funnel. Real diagnostics. Real fixes. Real growth.",
    es: "Esto es lo que pasa cuando nos conectamos a tu embudo. Diagnóstico real. Correcciones reales. Crecimiento real.",
    ru: "Вот что происходит, когда мы подключаемся к твоей воронке. Реальная диагностика. Реальные правки. Реальный рост.",
    zh: "这就是我们接入你的漏斗后会发生的事。真实诊断，真实修复，真实增长。",
  },
  "live.line1": { en: "$ lora diagnose --target funnel", es: "$ lora diagnose --target funnel", ru: "$ lora diagnose --target funnel", zh: "$ lora diagnose --target funnel" },
  "live.line2": { en: "-> Scanning 247 touchpoints...", es: "-> Escaneando 247 puntos de contacto...", ru: "-> Сканируем 247 точек касания...", zh: "-> 正在扫描 247 个触点..." },
  "live.line3": { en: "-> 12 critical leaks identified", es: "-> Detectadas 12 fugas críticas", ru: "-> Найдено 12 критических утечек", zh: "-> 已识别 12 处关键流失点" },
  "live.line4": { en: "-> Est. revenue loss: $340K/month", es: "-> Pérdida estimada: $340K/mes", ru: "-> Оценка потерь: $340K в месяц", zh: "-> 预计营收损失：每月 $340K" },
  "live.line5": { en: "$ lora fix --priority critical", es: "$ lora fix --priority critical", ru: "$ lora fix --priority critical", zh: "$ lora fix --priority critical" },
  "live.line6": { en: "-> Deploying conversion patches...", es: "-> Desplegando mejoras de conversión...", ru: "-> Разворачиваем правки конверсии...", zh: "-> 正在部署转化修复..." },
  "live.line7": { en: "-> A/B tests configured: 8", es: "-> Tests A/B configurados: 8", ru: "-> Настроено A/B-тестов: 8", zh: "-> 已配置 A/B 测试：8 个" },
  "live.line8": { en: "[OK] System online. Monitoring active.", es: "[OK] Sistema en línea. Monitorización activa.", ru: "[OK] Система онлайн. Мониторинг активен.", zh: "[OK] 系统已上线，监控运行中。" },
  "live.metric1": { en: "Funnel Health", es: "Salud del embudo", ru: "Здоровье воронки", zh: "漏斗健康度" },
  "live.metric2": { en: "Conv. Rate", es: "Tasa de conversión", ru: "Конверсия", zh: "转化率" },
  "live.metric3": { en: "Revenue / Visit", es: "Ingreso por visita", ru: "Выручка за визит", zh: "每次访问收入" },
  "live.metric4": { en: "Lead Quality", es: "Calidad de leads", ru: "Качество лидов", zh: "线索质量" },

  "process.eyebrow": { en: "Process", es: "Proceso", ru: "Процесс", zh: "流程" },
  "process.title": { en: "Five steps.", es: "Cinco pasos.", ru: "Пять шагов.", zh: "五个步骤。" },
  "process.titleAccent": { en: "Zero guesswork.", es: "Cero suposiciones.", ru: "Ноль догадок.", zh: "没有猜测。" },
  "process.sub": {
    en: "A repeatable workflow that has already proven itself. Every step builds on the previous one.",
    es: "Un flujo repetible y probado. Cada paso se apoya en el anterior.",
    ru: "Повторяемый и уже доказавший себя процесс. Каждый шаг опирается на предыдущий.",
    zh: "一套可重复、已被验证的流程，每一步都建立在前一步之上。",
  },
  "process.duration": { en: "Duration", es: "Duración", ru: "Длительность", zh: "周期" },
  "process.step": { en: "Step", es: "Paso", ru: "Шаг", zh: "步骤" },
  "process.of": { en: "of", es: "de", ru: "из", zh: "共" },
  "process.s1.title": { en: "AUDIT", es: "AUDITORÍA", ru: "АУДИТ", zh: "审计" },
  "process.s1.desc": { en: "Full diagnostic of funnels, UX, traffic and data. We document every friction point and revenue leak.", es: "Diagnóstico completo de embudos, UX, tráfico y datos. Documentamos cada fricción y fuga de ingresos.", ru: "Полная диагностика воронок, UX, трафика и данных. Фиксируем каждую точку трения и утечку выручки.", zh: "全面诊断漏斗、体验、流量和数据，记录每一个阻塞点和营收流失点。" },
  "process.s1.duration": { en: "1-2 WKS", es: "1-2 SEM", ru: "1-2 НЕД", zh: "1-2 周" },
  "process.s2.title": { en: "STRATEGY", es: "ESTRATEGIA", ru: "СТРАТЕГИЯ", zh: "策略" },
  "process.s2.desc": { en: "A data-driven roadmap with clear KPIs, benchmarks and priorities.", es: "Una hoja de ruta basada en datos con KPIs, referencias y prioridades claras.", ru: "Дата-ориентированный план с понятными KPI, бенчмарками и приоритетами.", zh: "基于数据的路线图，明确 KPI、基准和优先级。" },
  "process.s2.duration": { en: "1 WK", es: "1 SEM", ru: "1 НЕД", zh: "1 周" },
  "process.s3.title": { en: "BUILD", es: "CREACIÓN", ru: "СБОРКА", zh: "搭建" },
  "process.s3.desc": { en: "Design, develop and deploy quickly, precisely and with deep testing before launch.", es: "Diseñamos, desarrollamos y lanzamos rápido, con precisión y pruebas exhaustivas.", ru: "Проектируем, разрабатываем и запускаем быстро, точно и с глубоким тестированием.", zh: "快速、精准地完成设计、开发和上线，并在发布前充分测试。" },
  "process.s3.duration": { en: "2-4 WKS", es: "2-4 SEM", ru: "2-4 НЕД", zh: "2-4 周" },
  "process.s4.title": { en: "OPTIMIZE", es: "OPTIMIZAR", ru: "ОПТИМИЗАЦИЯ", zh: "优化" },
  "process.s4.desc": { en: "Continuous A/B tests, iteration loops and performance tuning until numbers move.", es: "Tests A/B continuos, iteraciones y afinación hasta que las métricas suban.", ru: "Постоянные A/B-тесты, циклы итераций и тюнинг, пока цифры не начнут расти.", zh: "持续 A/B 测试、迭代和性能调优，直到指标开始上涨。" },
  "process.s4.duration": { en: "ONGOING", es: "CONTINUO", ru: "ПОСТОЯННО", zh: "持续中" },
  "process.s5.title": { en: "SCALE", es: "ESCALA", ru: "МАСШТАБ", zh: "扩张" },
  "process.s5.desc": { en: "Systematize what wins and scale it across channels for compound growth.", es: "Sistematizamos lo que funciona y lo escalamos por canales para crecimiento compuesto.", ru: "Систематизируем победы и масштабируем их по каналам для накопительного роста.", zh: "把有效做法系统化并扩展到更多渠道，形成复利增长。" },
  "process.s5.duration": { en: "ONGOING", es: "CONTINUO", ru: "ПОСТОЯННО", zh: "持续中" },

  "cmp.eyebrow": { en: "Comparison", es: "Comparación", ru: "Сравнение", zh: "对比" },
  "cmp.title": { en: "Not your typical", es: "No es la típica", ru: "Не типичный", zh: "这不是典型的" },
  "cmp.titleAccent": { en: "agency experience.", es: "experiencia de agencia.", ru: "опыт агентства.", zh: "代理体验。" },
  "cmp.them": { en: "TYPICAL AGENCY", es: "AGENCIA TÍPICA", ru: "ТИПИЧНОЕ АГЕНТСТВО", zh: "普通机构" },
  "cmp.us": { en: "LORA", es: "LORA", ru: "LORA", zh: "LORA" },
  "cmp.badge": { en: "OUR WAY", es: "NUESTRO MÉTODO", ru: "НАШ ПОДХОД", zh: "我们的方式" },
  "cmp.r1.l": { en: "Approach", es: "Enfoque", ru: "Подход", zh: "方法" },
  "cmp.r1.t": { en: "Campaign-based", es: "Basado en campañas", ru: "Разовые кампании", zh: "以活动为中心" },
  "cmp.r1.u": { en: "System-based", es: "Basado en sistemas", ru: "Системный подход", zh: "以系统为中心" },
  "cmp.r2.l": { en: "Timeline", es: "Plazos", ru: "Сроки", zh: "周期" },
  "cmp.r2.t": { en: "Months of planning", es: "Meses de planificación", ru: "Месяцы планирования", zh: "几个月规划" },
  "cmp.r2.u": { en: "Weeks to results", es: "Semanas hasta resultados", ru: "Недели до результата", zh: "几周见结果" },
  "cmp.r3.l": { en: "Decisions", es: "Decisiones", ru: "Решения", zh: "决策" },
  "cmp.r3.t": { en: "Gut feeling", es: "Intuición", ru: "Интуитивно", zh: "靠感觉" },
  "cmp.r3.u": { en: "Data-driven", es: "Basado en datos", ru: "На данных", zh: "靠数据" },
  "cmp.r4.l": { en: "Ownership", es: "Propiedad", ru: "Владение", zh: "归属" },
  "cmp.r4.t": { en: "Locked contracts", es: "Contratos cerrados", ru: "Кабальные договоры", zh: "被合同锁死" },
  "cmp.r4.u": { en: "You own it all", es: "Todo te pertenece", ru: "Всё принадлежит тебе", zh: "一切归你所有" },
  "cmp.r5.l": { en: "Growth", es: "Crecimiento", ru: "Рост", zh: "增长" },
  "cmp.r5.t": { en: "Linear at best", es: "Como mucho lineal", ru: "В лучшем случае линейный", zh: "最多线性增长" },
  "cmp.r5.u": { en: "Compounding", es: "Compuesto", ru: "Накопительный", zh: "复利增长" },
  "cmp.r6.l": { en: "Reporting", es: "Reportes", ru: "Отчётность", zh: "报表" },
  "cmp.r6.t": { en: "Vanity metrics", es: "Métricas vanidosas", ru: "Пустые метрики", zh: "虚荣指标" },
  "cmp.r6.u": { en: "Revenue metrics", es: "Métricas de ingresos", ru: "Метрики выручки", zh: "营收指标" },
  "cmp.r7.l": { en: "Focus", es: "Foco", ru: "Фокус", zh: "重点" },
  "cmp.r7.t": { en: "Clicks and impressions", es: "Clics e impresiones", ru: "Клики и показы", zh: "点击和曝光" },
  "cmp.r7.u": { en: "Conversions and revenue", es: "Conversiones e ingresos", ru: "Конверсии и выручка", zh: "转化和营收" },

  "results.eyebrow": { en: "Results / Verified", es: "Resultados / Verificados", ru: "Результаты / Подтверждено", zh: "成果 / 已验证" },
  "results.title": { en: "Real outcomes.", es: "Resultados reales.", ru: "Реальные результаты.", zh: "真实结果。" },
  "results.titleAccent": { en: "Not promises.", es: "No promesas.", ru: "Не обещания.", zh: "不是承诺。" },
  "results.engagement": { en: "engagement", es: "colaboración", ru: "сотрудничества", zh: "合作周期" },
  "results.case1.client": { en: "E-commerce Brand", es: "Marca e-commerce", ru: "E-commerce бренд", zh: "电商品牌" },
  "results.case1.tag": { en: "RETAIL", es: "RETAIL", ru: "РИТЕЙЛ", zh: "零售" },
  "results.case1.heroLabel": { en: "CONVERSION RATE", es: "TASA DE CONVERSIÓN", ru: "КОНВЕРСИЯ", zh: "转化率" },
  "results.case1.secondary1": { en: "Revenue Growth", es: "Crecimiento de ingresos", ru: "Рост выручки", zh: "营收增长" },
  "results.case1.secondary2": { en: "CAC Reduction", es: "Reducción de CAC", ru: "Снижение CAC", zh: "获客成本下降" },
  "results.case1.quote": { en: "They found $2.4M we didn't know we were losing.", es: "Encontraron $2.4M que ni sabíamos que estábamos perdiendo.", ru: "Они нашли $2.4M, о потере которых мы даже не подозревали.", zh: "他们帮我们找出了原本根本没意识到的 240 万美元损失。" },
  "results.case1.timeline": { en: "12 weeks", es: "12 semanas", ru: "12 недель", zh: "12 周" },
  "results.case2.client": { en: "SaaS Platform", es: "Plataforma SaaS", ru: "SaaS-платформа", zh: "SaaS 平台" },
  "results.case2.tag": { en: "TECHNOLOGY", es: "TECNOLOGÍA", ru: "ТЕХНОЛОГИИ", zh: "科技" },
  "results.case2.heroLabel": { en: "TRIAL TO PAID", es: "TRIAL A PAGO", ru: "ИЗ ТРИАЛА В ОПЛАТУ", zh: "试用转付费" },
  "results.case2.secondary1": { en: "Lead Quality", es: "Calidad de leads", ru: "Качество лидов", zh: "线索质量" },
  "results.case2.secondary2": { en: "MRR Growth", es: "Crecimiento de MRR", ru: "Рост MRR", zh: "MRR 增长" },
  "results.case2.quote": { en: "Our trial-to-paid rate nearly doubled in 6 weeks.", es: "La conversión de prueba a pago casi se duplicó en 6 semanas.", ru: "Конверсия из триала в оплату почти удвоилась за 6 недель.", zh: "我们的试用转付费率在 6 周内几乎翻了一倍。" },
  "results.case2.timeline": { en: "6 weeks", es: "6 semanas", ru: "6 недель", zh: "6 周" },
  "results.case3.client": { en: "Fintech Product", es: "Producto fintech", ru: "Финтех-продукт", zh: "金融科技产品" },
  "results.case3.tag": { en: "FINANCE", es: "FINANZAS", ru: "ФИНАНСЫ", zh: "金融" },
  "results.case3.heroLabel": { en: "QUALIFIED LEADS", es: "LEADS QUALIFICADOS", ru: "КВАЛИФИЦИРОВАННЫЕ ЛИДЫ", zh: "高质量线索" },
  "results.case3.secondary1": { en: "Conversion Rate", es: "Tasa de conversión", ru: "Конверсия", zh: "转化率" },
  "results.case3.secondary2": { en: "Pipeline Value", es: "Valor del pipeline", ru: "Стоимость пайплайна", zh: "销售管道价值" },
  "results.case3.quote": { en: "LORA turned our funnel into a pipeline machine.", es: "LORA convirtió nuestro embudo en una máquina de pipeline.", ru: "LORA превратила нашу воронку в машину по созданию пайплайна.", zh: "LORA 把我们的漏斗变成了稳定产出的销售机器。" },
  "results.case3.timeline": { en: "8 weeks", es: "8 semanas", ru: "8 недель", zh: "8 周" },

  "cta.eyebrow": { en: "STILL SCROLLING?", es: "SIGUES BAJANDO?", ru: "ВСЕ ЕЩЕ ЛИСТАЕТЕ?", zh: "还在继续滚动？" },
  "cta.line1": { en: "If you're here,", es: "Si estás aquí,", ru: "Если вы тут,", zh: "如果你已经在这里，" },
  "cta.line2": { en: "your competitors are already behind", es: "tus competidores ya están detrás", ru: "то ваши конкуренты уже позади", zh: "你的竞争对手已经被甩在身后" },
  "cta.slogan": { en: "LEAVE OLD RULES AHEAD", es: "LEAVE OLD RULES AHEAD", ru: "LEAVE OLD RULES AHEAD", zh: "LEAVE OLD RULES AHEAD" },

  "contact.eyebrow": { en: "Start", es: "Inicio", ru: "Старт", zh: "开始" },
  "contact.title": { en: "Ready to grow?", es: "¿Listo para crecer?", ru: "Готов расти?", zh: "准备好增长了吗？" },
  "contact.sub": { en: "Get a free brief on your current funnel. We'll show you exactly where revenue is being lost.", es: "Obtén un briefing gratuito de tu embudo actual. Te mostraremos dónde se pierde el ingreso.", ru: "Получи бесплатный бриф по текущей воронке. Мы покажем, где именно теряется выручка.", zh: "获取当前漏斗的免费简报，我们会明确告诉你收入具体流失在哪里。" },
  "contact.name": { en: "Your name", es: "Tu nombre", ru: "Ваше имя", zh: "你的名字" },
  "contact.phone": { en: "+1 (000) 000-0000", es: "+34 000 000 000", ru: "+7 000 000-00-00", zh: "+86 000 0000 0000" },
  "contact.email": { en: "you@company.com", es: "tu@empresa.com", ru: "you@company.com", zh: "you@company.com" },
  "contact.company": { en: "Company and site (optional)", es: "Empresa y sitio (opcional)", ru: "Компания и сайт (опционально)", zh: "公司和网站（可选）" },
  "contact.countrySelect": { en: "Phone Region", es: "Región del teléfono", ru: "Регион телефона", zh: "电话号码地区" },
  "contact.submit": { en: "Request Free Brief", es: "Solicitar briefing", ru: "Запросить бриф", zh: "申请免费简报" },
  "contact.ok.t": { en: "Request received", es: "Solicitud recibida", ru: "Заявка принята", zh: "已收到申请" },
  "contact.ok.s": { en: "Our team will reach out within 24 hours.", es: "Nuestro equipo te responderá en 24 horas.", ru: "Наша команда свяжется с вами в течение 24 часов.", zh: "我们的团队会在 24 小时内联系你。" },
  "contact.guarantee": { en: "48h response · NDA on request · No commitment", es: "Respuesta en 48h · NDA bajo solicitud · Sin compromiso", ru: "Ответ за 48ч · NDA по запросу · Без обязательств", zh: "48 小时回复 · 可签 NDA · 无绑定承诺" },
  "contact.slot": { en: "Next brief slot", es: "Siguiente briefing", ru: "Ближайший бриф", zh: "下一个简报档期" },
  "contact.spots": { en: "3 spots left this month", es: "Quedan 3 plazas este mes", ru: "В этом месяце осталось 3 слота", zh: "本月还剩 3 个名额" },

  "footer.tagline": { en: "Leave Old Rules Ahead", es: "Leave Old Rules Ahead", ru: "Leave Old Rules Ahead", zh: "Leave Old Rules Ahead" },
  "footer.desc": { en: "High-performance conversion systems for companies that refuse to settle.", es: "Sistemas de conversión de alto rendimiento para compañías que no se conforman con lo mediocre.", ru: "Высокопроизводительные системы конверсии для компаний, которые не готовы мириться со средним результатом.", zh: "为不愿接受平庸结果的公司打造高性能转化系统。" },
  "footer.contact": { en: "Contact", es: "Contacto", ru: "Контакты", zh: "联系" },
  "footer.social": { en: "Social", es: "Redes", ru: "Соцсети", zh: "社交" },
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados.", ru: "Все права защищены.", zh: "版权所有。" },
  "footer.privacy": { en: "PRIVACY", es: "PRIVACIDAD", ru: "КОНФИДЕНЦИАЛЬНОСТЬ", zh: "隐私" },
  "footer.terms": { en: "TERMS", es: "TÉRMINOS", ru: "УСЛОВИЯ", zh: "条款" },

  "label.manifesto": { en: "MANIFESTO", es: "MANIFIESTO", ru: "МАНИФЕСТ", zh: "宣言" },
  "label.diagnosis": { en: "DIAGNOSIS", es: "DIAGNÓSTICO", ru: "ДИАГНОЗ", zh: "诊断" },
  "label.advantage": { en: "ADVANTAGE", es: "VENTAJA", ru: "ПРЕИМУЩЕСТВО", zh: "优势" },
  "label.solution": { en: "SOLUTION", es: "SOLUCIÓN", ru: "СИСТЕМА", zh: "方案" },
  "label.terminal": { en: "TERMINAL", es: "TERMINAL", ru: "ТЕРМИНАЛ", zh: "终端" },
  "label.process": { en: "PROCESS", es: "PROCESO", ru: "ПРОЦЕСС", zh: "流程" },
  "label.contrast": { en: "CONTRAST", es: "CONTRASTE", ru: "СРАВНЕНИЕ", zh: "对比" },
  "label.results": { en: "RESULTS", es: "RESULTADOS", ru: "РЕЗУЛЬТАТЫ", zh: "成果" },
  "label.choice": { en: "CHOICE", es: "ELECCIÓN", ru: "ВЫБОР", zh: "选择" },
  "label.connect": { en: "CONNECT", es: "CONTACTO", ru: "КОНТАКТ", zh: "联系" },
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
    if (saved && ["en", "es", "ru", "zh"].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lora.lang", l);
    } catch {}
  };

  const t = (key: string) => translations[key]?.[lang] ?? translations[key]?.en ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
