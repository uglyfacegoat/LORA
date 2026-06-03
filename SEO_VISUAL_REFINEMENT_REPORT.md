# SEO Visual Refinement Report

## Что визуально улучшено

- SEO-страницы больше не выглядят как базовый шаблон из заголовка и карточек.
- Добавлен общий визуальный слой LORA для SEO-страниц:
  - orbital background;
  - тонкие линии;
  - мягкие glow-зоны;
  - крупная контрастная типографика;
  - uppercase labels;
  - полупрозрачные карточки;
  - hover states;
  - асимметричная композиция hero + side panel.
- Страницы услуг и ниш теперь выглядят как посадочные страницы:
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
- Страницы списков `/services/`, `/industries/`, `/blog/` стали навигационными страницами с hero, side panel, карточками и CTA.
- Простые страницы `/cases/`, `/privacy/`, `/cookies/`, `/thank-you/` получили более аккуратную визуальную подачу.
- `/audit/` и `/contacts/` сохранили форму, но теперь имеют более сильный верхний page hero.

## Какие компоненты созданы

- `src/app/components/SeoVisualBlocks.tsx`
  - `SeoOrbitBackground`
  - `SeoBreadcrumbs`
  - `SeoPageHero`
  - `SeoHeroPanel`
  - `SeoSection`
  - `SeoCard`
  - `SeoFeatureList`
  - `SeoProcessTimeline`
  - `SeoFaq`
  - `RelatedLinks`
  - `SeoCtaBlock`

## Какие компоненты доработаны

- `src/app/components/SeoShell.tsx`
- `src/app/components/SeoListingPage.tsx`
- `src/app/components/SeoDetailPage.tsx`
- `src/app/components/SimplePage.tsx`
- `src/app/seo/routes.ts`
- `Dockerfile`

## Какие страницы доработаны

- `/services/`
- `/industries/`
- `/blog/`
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
- `/pricing/`
- `/cases/`
- `/contacts/`
- `/audit/`
- `/privacy/`
- `/cookies/`
- `/thank-you/`

## Что изменено в дизайне

- Вместо простого page layout добавлена брендовая SEO-оболочка.
- Добавлены фоновые orbital/eclipse мотивы без тяжелых ассетов.
- Карточки приведены ближе к основному лендингу: тонкая граница, soft surface, subtle top highlight, hover lift.
- Детальные страницы получили side panel в hero, похожий на системные карточки LORA.
- FAQ сделан через аккуратные раскрывающиеся блоки.
- Related links стали отдельными навигационными карточками.
- CTA внизу страниц стал большим брендированным блоком.
- Privacy/cookies оформлены как аккуратные policy cards.
- Thank-you оформлен как полноценный финальный экран, но остается служебной страницей.

## Что изменено в контенте

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
- Добавлены разные проблемы, разные deliverables, разные integrations и related services.
- Фейковые кейсы, отзывы, клиенты, цифры и гарантии не добавлялись.

## Что изменено в SEO

- SEO-архитектура сохранена:
  - `SeoHead`;
  - canonical;
  - hreflang;
  - `x-default`;
  - meta robots;
  - Open Graph;
  - Twitter Card;
  - JSON-LD;
  - BreadcrumbList;
  - FAQPage;
  - Article;
  - sitemap;
  - robots.
- URL-структура не менялась.
- `noindex` для `/thank-you/` сохранен.
- FAQ остается в DOM и в JSON-LD.
- Breadcrumbs остаются в DOM и в JSON-LD.
- Analytics events и форма заявки не удалялись.

## Что проверено через build

- `npm run build` выполнен успешно.
- `node scripts/generate-sitemap.mjs` выполнен внутри build успешно.
- Vite build прошел успешно.
- Vite выдал предупреждение: JS chunk больше 500 kB. Это не ошибка, но следующий шаг — code splitting для SEO-страниц.

## Что проверено через HTTP / curl-аналог

Через `Invoke-WebRequest` проверены:

- `/ru/` — 200
- `/ru/services/websites/` — 200
- `/ru/services/seo-optimization/` — 200
- `/ru/industries/restaurant/` — 200
- `/en/services/websites/` — 200
- `/ru/blog/why-landing-pages-fail/` — 200
- `/ru/thank-you/` — 200
- `/robots.txt` — 200
- `/sitemap.xml` — 200
- `/favicon.svg` — 200
- `/manifest.webmanifest` — 200

## Проверка исходного HTML

- Проверил исходный HTML для `/ru/services/websites/`.
- Проверил исходный HTML для `/ru/thank-you/`.
- Ограничение текущей архитектуры: проект остается Vite SPA, поэтому route-specific данные появляются после выполнения React.
- В исходном HTML до JS есть базовые fallback meta из `index.html`, но нет уникального `Разработка сайтов | LORA`, route-specific JSON-LD, route-specific hreflang и `noindex` для `/thank-you/`.
- Безопасный следующий шаг: добавить prerender/SSG для Vite или перейти на SSR/SSG framework, чтобы каждый маршрут имел собственный HTML до выполнения JS.

## Что проверено в браузере

- Открыта страница `http://127.0.0.1:4173/ru/services/websites/`.
- DOM title после React: `Разработка сайтов | LORA`.
- Открыта страница `http://127.0.0.1:4173/ru/services/`.
- DOM title после React: `Услуги | LORA`.
- Проверен mobile viewport `390x844`.
- Явных console errors в выводе Playwright MCP после проверок не зафиксировано.

## Docker

- `Dockerfile` проверен.
- Найден и исправлен production-риск: build stage не копировал `public` и `scripts`.
- Теперь Dockerfile копирует:
  - `public ./public`
  - `scripts ./scripts`
- `docker build` запустить не удалось, потому что Docker Desktop Linux engine не запущен:
  - `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified`

## Что осталось как ограничение

- Route-specific meta в исходном HTML до JS пока не решены из-за Vite SPA.
- Для максимального SEO нужен prerender/SSG или SSR.
- Не все 20 страниц услуг/ниш имеют глубокий уникальный текст: ключевые страницы уникализированы, остальные используют общий базовый слой и готовы к дальнейшему расширению.
- JS chunk стал больше 500 kB; желательно вынести SEO pages в lazy-loaded chunks.
- `pnpm` в текущем PowerShell недоступен, проверка выполнена через `npm run build`.

## Следующие шаги

- Добавить prerender route HTML для всех sitemap routes.
- Разнести SEO pages через `React.lazy` / dynamic imports.
- Доуникализировать оставшиеся услуги и ниши на уровне FAQ, deliverables и integrations.
- Добавить production screenshots в CI или Playwright visual smoke.
- Подключить реальные счетчики только через env и consent/analytics layer.
