# ── Stage 1: build frontend ───────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY backend/package.json ./backend/

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ── Stage 2: production server ────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Copy backend source
COPY backend/ ./backend/
COPY lib/ ./lib/

# Copy built frontend (served as static files by nginx or directly)
COPY --from=builder /app/dist ./dist

# Install only backend deps (none currently, but future-proof)
WORKDIR /app/backend
RUN npm install --omit=dev 2>/dev/null || true

WORKDIR /app

EXPOSE 8787

CMD ["node", "backend/server.mjs"]
