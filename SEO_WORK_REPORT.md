# SEO Work Report

## Статус

Проект уже получил базовую SEO-архитектуру, мультиязычные URL, технические SEO-файлы, структурированные данные, SEO-страницы, внутреннюю перелинковку и визуальную оболочку для новых посадочных страниц.

Этот отчет объединяет информацию из предыдущих SEO-документов, чтобы не потерять контекст проделанной работы.

## Что было найдено изначально

- Стек: Vite 6, React 18, TypeScript/TSX, Tailwind CSS 4, `motion/react`.
- Приложение работало как SPA без явного роутера.
- Фактически была только главная страница из секций в `App.tsx`.
- Мультиязычность уже была в `src/app/i18n.tsx`, но без URL-версий `/ru/`, `/en/`, `/es/`, `/zh/`.
- `index.html` содержал минимальный SEO-набор.
- Не было `robots.txt`, `sitemap.xml`, `manifest.webmanifest`.
- Не было canonical, hreflang, Open Graph, Twitter Card и JSON-LD.
- Не было отдельных индексируемых страниц услуг, ниш, privacy/cookie, 404 и thank-you.
- Часть ссылок в footer вела на `#`.
- Аналитические события и будущая рекламная разметка не были выделены в отдельный слой.

## Что сделано по техническому SEO

- Добавлен SEO-фундамент для Vite/React SPA.
- Добавлены языковые URL:
  - `/en/`
  - `/es/`
  - `/ru/`
  - `/zh/`
- Добавлена логика определения языка из URL.
- Добавлен fallback: если URL без языка, приложение переводит пользователя на URL с текущим языком.
- Добавлена смена языка с сохранением текущей страницы.
- Добавлена генерация canonical URL для каждой страницы.
- Добавлены hreflang-ссылки для всех языков.
- Добавлен `x-default`.
- Добавлен `meta robots`.
- Добавлены Open Graph meta tags.
- Добавлены Twitter Card meta tags.
- Добавлены fallback meta tags в `index.html`.
- Добавлен `theme-color`.
- Добавлен favicon.
- Добавлен apple-touch icon.
- Добавлен web manifest.

## Sitemap и robots

- Создан `public/robots.txt`.
- Создан `public/sitemap.xml`.
- Добавлен генератор sitemap: `scripts/generate-sitemap.mjs`.
- Генерация sitemap подключена к `npm run build`.
- Sitemap включает:
  - все языковые версии страниц;
  - главные страницы;
  - страницы услуг;
  - страницы ниш;
  - страницу блога;
  - стартовую статью.
- `thank-you` не добавляется в sitemap, потому что это служебная страница с `noindex`.

## Structured Data / JSON-LD

- Добавлена JSON-LD-разметка Organization / ProfessionalService.
- Добавлена JSON-LD-разметка WebSite.
- Добавлена JSON-LD-разметка Service.
- Добавлена JSON-LD-разметка FAQPage.
- Добавлена JSON-LD-разметка BreadcrumbList.
- Добавлена JSON-LD-разметка Article.
- Вынесены helpers в `src/app/seo/structuredData.ts`.
- Добавлен компонент `JsonLd`.

## SEO-конфиги и компоненты

Созданы:

- `src/app/seo/site.ts`
- `src/app/seo/routes.ts`
- `src/app/seo/meta.ts`
- `src/app/seo/structuredData.ts`
- `src/app/analytics.ts`
- `src/app/components/SeoHead.tsx`
- `src/app/components/JsonLd.tsx`
- `src/app/components/SeoShell.tsx`
- `src/app/components/SeoListingPage.tsx`
- `src/app/components/SeoDetailPage.tsx`
- `src/app/components/SimplePage.tsx`
- `src/app/components/NotFoundPage.tsx`
- `src/app/components/SeoVisualBlocks.tsx`
- `src/app/components/SiteNavigation.tsx`

Изменены:

- `index.html`
- `package.json`
- `src/app/App.tsx`
- `src/app/i18n.tsx`
- `src/app/components/Footer.tsx`
- `src/app/components/HeroSection.tsx`
- `src/app/components/PricingSection.tsx`
- `src/app/components/ContactSection.tsx`
- `Dockerfile`

## Добавленные страницы

Основные страницы:

- `/services/`
- `/industries/`
- `/blog/`
- `/pricing/`
- `/cases/`
- `/contacts/`
- `/audit/`
- `/privacy/`
- `/cookies/`
- `/thank-you/`

Страницы услуг:

- `/services/websites/`
- `/services/landing-pages/`
- `/services/corporate-websites/`
- `/services/ecommerce/`
- `/services/ux-ui-design/`
- `/services/website-redesign/`
- `/services/seo-optimization/`
- `/services/crm-integration/`
- `/services/business-automation/`
- `/services/website-support/`

Страницы ниш:

- `/industries/beauty-salon/`
- `/industries/restaurant/`
- `/industries/construction-company/`
- `/industries/clinic/`
- `/industries/online-school/`
- `/industries/expert/`
- `/industries/b2b-company/`
- `/industries/service-business/`
- `/industries/legal-company/`
- `/industries/real-estate/`

Блог:

- `/blog/why-landing-pages-fail/`

Все публичные страницы доступны в языковых версиях через `/en/`, `/es/`, `/ru/`, `/zh/`.

## Внутренняя перелинковка и навигация

- Добавлены хлебные крошки на SEO-страницах.
- Добавлены ссылки со списков на детальные страницы.
- Добавлены связанные услуги на страницах услуг и ниш.
- Добавлены CTA-ссылки на `/audit/`.
- Добавлена отдельная навигация `SiteNavigation`.
- Логотип ведет на главную текущего языка.
- Desktop navbar получил реальные ссылки на:
  - услуги;
  - отрасли;
  - блог;
  - кейсы;
  - цены;
  - аудит;
  - контакты.
- Для услуг и отраслей добавлены dropdown-меню.
- Добавлено мобильное меню с теми же публичными SEO-страницами.
- Footer расширен до sitemap-навигации.
- Старые `href="#"` в footer заменены на реальные ссылки.
- `thank-you` не добавлен в navbar/mobile/footer.
- `privacy` и `cookies` оставлены в footer.
- Все внутренние ссылки проходят через `localizedPath`, поэтому сохраняют текущий язык.

## Визуальное улучшение SEO-страниц

Новые SEO-страницы больше не выглядят как базовый шаблон из заголовка и карточек.

Добавлен общий визуальный слой LORA:

- orbital background;
- тонкие линии;
- мягкие glow-зоны;
- крупная контрастная типографика;
- uppercase labels;
- полупрозрачные карточки;
- hover states;
- асимметричная композиция hero + side panel.

Страницы услуг и ниш получили структуру посадочных страниц:

- hero;
- breadcrumbs;
- problem map;
- LORA response;
- project scope;
- work timeline;
- integrations;
- FAQ;
- related links;
- CTA block.

Страницы `/services/`, `/industries/`, `/blog/` стали навигационными страницами с hero, side panel, карточками и CTA.

Страницы `/cases/`, `/privacy/`, `/cookies/`, `/thank-you/` получили более аккуратную визуальную подачу.

`/audit/` и `/contacts/` сохранили форму, но получили более сильный верхний page hero.

## Контент

- Услуги частично уникализированы:
  - `websites`;
  - `landing-pages`;
  - `ecommerce`;
  - `ux-ui-design`;
  - `seo-optimization`;
  - `crm-integration`.
- Ниши частично уникализированы:
  - `beauty-salon`;
  - `restaurant`;
  - `clinic`;
  - `online-school`;
  - `real-estate`.
- Добавлены разные problems, deliverables, integrations, process, FAQ и related services.
- Фейковые кейсы, отзывы, клиенты, цифры и гарантии не добавлялись.

## Аналитика и подготовка под рекламу

- Добавлен analytics helper: `src/app/analytics.ts`.
- Подготовлена поддержка Яндекс Метрики через `VITE_YANDEX_METRIKA_ID`.
- Подготовлена поддержка Google Analytics через `VITE_GA_MEASUREMENT_ID`.
- Добавлены события:
  - `click_cta`;
  - `submit_lead_form`;
  - `click_phone`;
  - `click_email`;
  - `click_telegram`;
  - `click_whatsapp`;
  - `open_brief`;
  - `pricing_click`;
  - `service_page_cta_click`.
- События добавлены на hero CTA, nav CTA, pricing CTA, выбор даты/времени брифа и успешную отправку формы.

## Проверки

- `npm run build` проходит успешно.
- `scripts/generate-sitemap.mjs` успешно пересобирает `public/sitemap.xml`.
- Vite build проходит успешно.
- Проверялись основные URL на preview:
  - `/ru/`
  - `/ru/services/websites/`
  - `/ru/services/seo-optimization/`
  - `/ru/industries/restaurant/`
  - `/en/services/websites/`
  - `/ru/blog/why-landing-pages-fail/`
  - `/ru/thank-you/`
  - `/robots.txt`
  - `/sitemap.xml`
  - `/favicon.svg`
  - `/manifest.webmanifest`
- Проверялся DOM title после React:
  - `/ru/services/websites/` -> `Разработка сайтов | LORA`
  - `/ru/services/` -> `Услуги | LORA`
- Проверялся mobile viewport `390x844`.

## Текущие ограничения

- Проект остается Vite SPA.
- Уникальные route-specific meta, JSON-LD, hreflang и `noindex` появляются после выполнения React.
- В исходном HTML до JS есть только fallback meta из `index.html`.
- Для максимального SEO нужен prerender/SSG или SSR.
- Не все страницы услуг и ниш имеют глубокий уникальный текст.
- JS chunk больше 500 kB, желательно сделать code splitting.
- Реальные счетчики аналитики еще не подключены.

## Как добавлять новые SEO-страницы

- Открыть `src/app/seo/routes.ts`.
- Для основной страницы добавить объект в `mainRoutes`.
- Для услуги добавить запись в `serviceDefs`.
- Для ниши добавить запись в `industryDefs`.
- Для статьи добавить объект в `articleRoutes`.
- После изменения конфигов запустить `npm run build` или `node scripts/generate-sitemap.mjs`, чтобы обновить sitemap.

## Как менять title/description

- Все SEO title/description/H1 находятся в `src/app/seo/routes.ts`.
- Поля многоязычные: `en`, `es`, `ru`, `zh`.
- Canonical, hreflang, OG и Twitter Card генерируются автоматически.

## Как подключить Яндекс Метрику

- Добавить ID в `.env`: `VITE_YANDEX_METRIKA_ID=...`.
- Подключить официальный счетчик Метрики в HTML или через отдельный компонент.
- `analytics.ts` уже вызывает `ym(counterId, "reachGoal", eventName, payload)`, если `window.ym` доступен.

## Как подключить Google Analytics / Search Console

- Для GA добавить `VITE_GA_MEASUREMENT_ID=...` и подключить `gtag`.
- `analytics.ts` уже отправляет `gtag("event", eventName, payload)`, если `window.gtag` доступен.
- Для Google Search Console подтвердить домен `loragroup.space`.
- Отправить sitemap: `https://loragroup.space/sitemap.xml`.

## Как подключить Яндекс Вебмастер

- Подтвердить домен в Яндекс Вебмастере.
- Отправить sitemap: `https://loragroup.space/sitemap.xml`.
- Проверить региональность, зеркала, HTTPS и обход важных страниц.

