# SEO Implementation Plan

## 1. Что найдено в проекте

- Стек: Vite 6, React 18, TypeScript/TSX, Tailwind CSS 4, `motion/react`; сборка через `pnpm build`.
- Роутинг: явного роутера нет, приложение работает как SPA из `src/main.tsx` и `src/app/App.tsx`; текущая главная страница собрана из секций.
- Структура страниц: физически есть только лендинг в `App.tsx`; секции лежат в `src/app/components`.
- Мультиязычность: есть `src/app/i18n.tsx`, языки `en`, `es`, `ru`, `zh`; язык хранится в `localStorage` и выставляется в `document.documentElement.lang`, но URL-версий `/ru/`, `/en/`, `/es/`, `/zh/` нет.
- Компоненты: основные визуальные блоки находятся в `src/app/components`; данные статей находятся в `src/data/articles.json`.
- SEO-конфиги лучше хранить в `src/app/seo`, чтобы рядом были типы маршрутов, метаданные, sitemap, structured data и общие SEO-данные.
- Текущие SEO-проблемы:
  - `index.html` содержит только `<title>LORA</title>` и viewport.
  - Нет `robots.txt`, `sitemap.xml`, `manifest.webmanifest`.
  - Нет canonical, hreflang, Open Graph, Twitter Card и JSON-LD.
  - Нет индексируемых страниц услуг, ниш, privacy/cookie, 404 и thank-you.
  - Нет настоящих URL для языковых версий.
  - Часть ссылок в footer ведет на `#`.
  - CTA-события и аналитический слой не выделены.

## 2. Что будет сделано

- Будут созданы:
  - `src/app/seo/site.ts` — базовые настройки сайта, языки, домен, пути.
  - `src/app/seo/routes.ts` — конфиги основных страниц, услуг, ниш и блога.
  - `src/app/seo/meta.ts` — генерация title/description/canonical/hreflang/OG/Twitter.
  - `src/app/seo/structuredData.ts` — JSON-LD Organization, WebSite, Service, FAQPage, BreadcrumbList, Article.
  - `src/app/analytics.ts` — безопасный слой событий без реальных ID счетчиков.
  - `src/app/components/SeoHead.tsx`, `JsonLd.tsx`, `SeoShell.tsx`, `SeoListingPage.tsx`, `SeoDetailPage.tsx`, `SimplePage.tsx`, `NotFoundPage.tsx`.
  - `public/robots.txt`, `public/sitemap.xml`, `public/manifest.webmanifest`.
  - `SEO_IMPLEMENTATION_REPORT.md` после реализации.
- Будут изменены:
  - `index.html` — базовые fallback meta, theme-color, icons/manifest.
  - `src/app/App.tsx` — легкий SPA-router по URL и сохранение текущего лендинга как главной.
  - `src/app/i18n.tsx` — язык будет браться из URL при наличии `/ru/`, `/en/`, `/es/`, `/zh/`, с fallback на `localStorage`.
  - `src/app/components/Footer.tsx` — реальные внутренние ссылки вместо `#`.
  - CTA/форма — отправка аналитических событий через helper.
- SEO-функции:
  - canonical URL для каждой страницы.
  - hreflang и `x-default` для всех языковых версий.
  - title/description/H1 из единого конфига.
  - Open Graph и Twitter Card.
  - JSON-LD для организации, сайта, услуг, FAQ, хлебных крошек, статей.
  - sitemap со всеми языками, главными страницами, услугами, нишами и статьями.
  - robots.txt со ссылкой на sitemap.
- Страницы:
  - Основные: главная, услуги, цены, кейсы, блог, контакты, аудит/бриф, privacy, cookies, thank-you.
  - Услуги: разработка сайтов, лендинги, корпоративные сайты, интернет-магазины, UX/UI, редизайн, SEO, CRM, автоматизация, поддержка.
  - Ниши: beauty, restaurant, construction, clinic, online school, expert, B2B, service, legal, real estate.
- Данные будут вынесены в конфиги:
  - URL slug, тип страницы, title, description, H1, summary, FAQ, связанные услуги, CTA, breadcrumbs.
- Риски:
  - Это Vite SPA, поэтому без SSR поисковик получает HTML-shell и мета теги выставляются клиентом. Статические sitemap/robots и читаемый контент улучшают основу, но полноценный production SEO лучше усиливать SSR/SSG-пререндером.
  - Текущий i18n-файл отображается в консоли с mojibake из-за кодировки вывода; правки будут точечными, без переписывания всех переводов.
  - Полноценные SEO-тексты для 20+ страниц будут нейтральными и не будут обещать неподтвержденных результатов.

## 3. Почему это делается

- Sitemap нужен, чтобы поисковики быстро находили все важные страницы, языковые версии и дату обновления.
- Robots.txt нужен, чтобы указать sitemap и правила обхода для публичных/служебных маршрутов.
- Title/description нужны для понятных сниппетов и релевантности страницы.
- Canonical нужен, чтобы не плодить дубли из-за slash, UTM и языковых вариантов.
- Hreflang нужен, чтобы Google и Яндекс понимали языковые версии `/ru/`, `/en/`, `/es/`, `/zh/`.
- JSON-LD нужен, чтобы явно описать организацию, услуги, FAQ, хлебные крошки и статьи.
- Страницы услуг нужны под коммерческий спрос и посадочные страницы для рекламы.
- Страницы ниш нужны под отраслевые запросы без спама и фейковых обещаний.
- FAQ нужен для полезного объяснения услуги и как структурированный контент для AI/LLM и поисковых систем.
- Open Graph данные нужны для корректных превью в мессенджерах и соцсетях.
- UTM/аналитические события нужны для будущей Яндекс Метрики, Google Analytics и Яндекс Директа: клики по CTA, отправки форм, контакты и переходы должны быть измеримы.
