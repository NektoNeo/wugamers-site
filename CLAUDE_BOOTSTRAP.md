Ты — инженер сборки. Создай полностью готовый проект сайта «АНО Уникальный мир» по этим правилам:

I. Техстек и версии
- Node.js 20.x, pnpm 9.x; Next.js 14 (app router), TypeScript.
- Tailwind CSS 3.4, autoprefixer, postcss.
- shadcn/ui (Radix) + lucide-react + class-variance-authority + tailwind-merge.

II. Структура репозитория
/ (repo root)
  /app                     # Next.js (app router)
  /components              # UI-компоненты (в т.ч. shadcn)
  /styles                  # globals.css, tailwind.css
  /data                    # events.json, roadmap.json, gratitude.json, team.json
  /assets                  # изображения; /assets/gratitude, /assets/team, /assets/partners
  /specs                   # все выданные JSON спецификации ui_layout_spec (по блокам)
  /lib                     # утилиты (a11y, formatters, config)
  /public                  # logo, иконки
  Dockerfile, .dockerignore, package.json, pnpm-lock.yaml, next.config.mjs, tailwind.config.ts, postcss.config.js, components.json (shadcn)

III. Установка (выполни в терминале)
- corepack enable && corepack prepare pnpm@latest --activate
- pnpm dlx create-next-app@latest wug-site --ts --app --src-dir --use-pnpm --eslint --tailwind
- cd wug-site
- pnpm add -D @types/node @types/react @types/react-dom
- pnpm add class-variance-authority tailwind-merge lucide-react
- pnpm dlx shadcn@latest init -d
- В components.json: "aliases": { "components": "@/components", "utils": "@/lib/utils" }

IV. Базовые компоненты shadcn (установи):
- pnpm dlx shadcn@latest add button card badge tabs input sheet scroll-area
- Добавь утилиту /lib/utils.ts (cn = twMerge(clsx(...)))

V. Контент и ссылки (зашей как константы в /lib/config.ts)
- Telegram: https://t.me/wugamers
- RuTube: https://rutube.ru/channel/56489051/
- VK: https://vk.com/wugamers?from=groups
- YouTube: https://www.youtube.com/channel/UCuM6pM5taq-a5oZg2SIYJUw
- Донат: YooMoney https://sobe.ru/na/Q2S2i066P0Q9 ; Yandex Donate https://donate.stream/wugamers_ru
- Документы/презентации: https://wugamers.ru/wp-content/uploads/2022/05/Презентация_WUG2022.pdf ; https://wugamers.ru/wp-content/uploads/2021/04/WUG2021_ENGv1.pdf
- Контакты (из ТЗ): email unikmir@mail.ru, тел. +7 (977) 104-00-00 (Нечаев Н. И.)

VI. Интеграция MCP (Context7 + Sequential Thinking)
- Если MCP-клиент предложит войти в Context7, пройди авторизацию в браузере.
- Создай в корне mcp.json со следующим содержимым и активируй в текущем проекте:
{
  "mcpServers": {
    "context7": {
      "transport": "http",
      "url": "https://mcp.context7.com/mcp"
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y","@modelcontextprotocol/server-sequential-thinking"]
    }
  },
  "usage": [
    "Всегда подтягивай актуальные рецепты Tailwind/Next/shadcn из Context7",
    "Перед генерацией блока применяй планирование Sequential Thinking: сетка → типографика → адаптив → a11y → сверка по PNG"
  ]
}
- Включи этот файл в системный контекст Claude Code для сессии.

VII. Сборка по спецификациям
- Возьми все JSON из /specs (они формата ui_layout_spec v1, выданы мной ранее) и сгенерируй компоненты/страницы:
  * Навигация (sticky) → components/site-nav.tsx
  * Hero → app/page.tsx (первый экран)
  * «Ближайшие мероприятия» → components/events-section.tsx (данные /data/events.json)
  * «О проекте» (цели/миссия/ссылки) → components/about-section.tsx
  * «Дорожная карта» → components/roadmap-section.tsx (данные /data/roadmap.json)
  * «Команда» (однострочная карусель, порядок из манифеста, без Журкова) → components/team-carousel.tsx (фото из /assets/team)
  * «Партнёры» (бегущая строка/карусель; исключить GEOSCAN, Street Media Group; приоритеты как в ТЗ)
  * «Благодарности» (галерея грамот с лайтбоксом) → components/gratitude-gallery.tsx (локальные файлы /assets/gratitude + /data/gratitude.json)
  * «Донат» → components/donate-section.tsx (используй ссылки из config)
  * «Контакты» с формой и Яндекс.Картой → components/contacts-section.tsx
  * Подвал (тёмная тема) → components/site-footer.tsx
- Каждую секцию вынеси как компонент и подключи на главной в порядке из ТЗ.

VIII. Доступность, качество, стили
- WCAG 2.1 AA: landmarks, aria‑labels, контраст.
- Используй цветовые токены как в спеках, шрифты системные + Inter.
- Проверь Lighthouse ≥85 (performance ≥75 на статиках; 1 CPU-friendly).

IX. API и карта
- Создай pages/api/contact/submit.ts — моковый endpoint с валидацией (zod), лог в stdout.
- В «Контакты» добавь виджет Яндекс.Карт (api-maps.yandex.ru/2.1), placemark по адресу «Москва, Россия».
- Донат-кнопки перенаправляют на внешние URL (без приема ПДн на сервере).

X. Docker
- Добавь Dockerfile (multistage, node:20-bookworm-slim): сборка → раннер.
- CMD: next start -p 3000 -H 0.0.0.0
- ENV: NODE_ENV=production, NEXT_TELEMETRY_DISABLED=1
- Добавь HEALTHCHECK (GET /api/health).

XI. Скрипты npm
- "dev": "next dev"
- "build": "next build"
- "start": "next start -p 3000"
- "lint": "next lint"
- "docker:build": "docker build -t wug-site:latest ."
- "docker:run": "docker run --rm -p 3000:3000 --cpus=1 --name wug-site wug-site:latest"

В конце: выведи краткий отчёт, список созданных файлов и команды для запуска локально и в Docker.
