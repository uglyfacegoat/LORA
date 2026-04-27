# ── Stage 1: build frontend ───────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests first (better layer caching)
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY backend/package.json ./backend/

# Install all deps
RUN pnpm install --frozen-lockfile

# Copy source (after install so node_modules layer is cached)
COPY src ./src
COPY index.html vite.config.ts postcss.config.mjs ./
COPY lib ./lib

RUN pnpm build

# ── Stage 2: production server ────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Copy backend source and lib
COPY backend/ ./backend/
COPY lib/ ./lib/

# Copy built frontend
COPY --from=builder /app/dist ./dist

EXPOSE 8787

CMD ["node", "backend/server.mjs"]
