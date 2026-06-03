# SEO Visual Refinement Plan

## 1. Какие SEO-страницы выглядят слабее основного сайта

- Детальные страницы услуг и ниш выглядят слишком шаблонно: hero, блоки проблем, FAQ и related links собраны как обычная сетка карточек.
- Страницы `/services/`, `/industries/`, `/blog/` пока выглядят как список ссылок, а не как навигационные страницы LORA.
- Простые страницы `/cases/`, `/privacy/`, `/cookies/`, `/thank-you/` выглядят утилитарно и слабее основного лендинга.
- `/audit/` и `/contacts/` используют сильную форму, но верх страницы до формы нужно сделать более похожим на посадочную страницу.
- `/pricing/` переиспользует хороший `PricingSection`, но page shell вокруг него нужно визуально связать с общей SEO-системой.

## 2. Какие компоненты нужно улучшить

- `SeoShell` — добавить общий фон, орбитальные линии, мягкий glow и правильный max-width rhythm.
- `SeoListingPage` — заменить простую сетку на выразительный hero, асимметричную карточную сетку, footer CTA и hover states.
- `SeoDetailPage` — заменить базовую структуру на полноценную посадочную страницу: hero с орбитальным визуалом, problem/solution blocks, timeline, integrations, FAQ и related links.
- `SimplePage` — добавить отдельные варианты для audit, contacts, cases, privacy/cookies, thank-you.
- `routes.ts` — минимально уникализировать контент услуг и ниш: разные проблемы, решения, FAQ, связанные услуги и hero-акценты.

## 3. Какие общие компоненты лучше переиспользовать

- Создать `SeoVisualBlocks.tsx` с компонентами:
  - `SeoOrbitBackground`
  - `SeoBreadcrumbs`
  - `SeoPageHero`
  - `SeoSection`
  - `SeoCard`
  - `SeoGrid`
  - `SeoFeatureList`
  - `SeoProcessTimeline`
  - `SeoFaq`
  - `RelatedLinks`
  - `SeoCtaBlock`
- Переиспользовать существующие CSS variables из `App.tsx`: `--surface-soft`, `--surface-border`, `--fg-*`, `--line-*`, `--glow-*`, `--cta-*`.
- Переиспользовать существующие секции там, где они уже сильные: `PricingSection`, `ContactSection`, `Footer`.

## 4. Как привести услуги и ниши к визуальному языку LORA

- Использовать крупную контрастную типографику, короткие uppercase labels, тонкие разделительные линии.
- Добавить orbital/eclipsed background motif без тяжелых картинок.
- Карточки делать тонкими, полупрозрачными, с внутренними линиями и мягкими hover states.
- Делать асимметричные сетки: hero + side panel, 2-column blocks, timeline вместо равномерного SEO-grid.
- Оставить текст видимым для SEO, но подать его как landing page content, а не как hidden keyword text.
- Услуги отличать через разные акценты: scope, deliverables, process and FAQ.
- Ниши отличать через разные проблемы бизнеса, digital-потребности и релевантные услуги.

## 5. Какие изменения будут сделаны без поломки SEO

- Не трогать `SeoHead`, meta generation, canonical, hreflang, OG/Twitter, robots и sitemap-логику.
- Не менять структуру URL.
- Не удалять JSON-LD-компоненты.
- Сохранить FAQ в DOM и в JSON-LD.
- Сохранить хлебные крошки в DOM и BreadcrumbList JSON-LD.
- Сохранить `noindex` для `/thank-you/`.
- Сохранить analytics events и форму заявки.
- Сохранить UTM query parameters: визуальные правки не меняют обработку URL query.

## 6. Технические риски

- Проект остается Vite SPA: в исходном HTML до выполнения JS нет уникальных meta для каждого маршрута. Это ограничение будет проверено и описано в отчете.
- Полноценное решение для исходного HTML — prerender/SSG или переход на SSR framework. Без этого поисковики видят route meta после выполнения React.
- Слишком сложный визуал может ухудшить мобильную стабильность; поэтому orbital effects будут pointer-events-none и без тяжелой scroll-анимации.
- Нельзя использовать новые icon/font пакеты без установки; визуальные элементы будут сделаны на CSS/SVG и существующем `motion`.
- Docker build может требовать глобальный package manager; проверю доступность и зафиксирую результат.
