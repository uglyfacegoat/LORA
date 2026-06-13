FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY scripts ./scripts
COPY index.html vite.config.ts postcss.config.mjs tsconfig.json ./
COPY lib ./lib

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY backend ./backend
COPY lib ./lib
COPY --from=builder /app/dist ./dist

EXPOSE 8787

CMD ["node", "backend/server.mjs"]
