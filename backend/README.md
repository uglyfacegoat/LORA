# Backend

Minimal Node backend for LORA lead submissions.

## Setup

1. Create `backend/.env`
2. Fill in:

```env
HOST=0.0.0.0
PORT=8787
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_ADMIN_CHAT_ID=989807462
```

## Run

From repo root:

```bash
pnpm backend:dev
```

or

```bash
pnpm backend:start
```

## Frontend

Frontend submits to:

`POST /api/leads`

By default the UI calls `http://localhost:8787/api/leads`.
Override with:

```env
VITE_API_BASE_URL=http://your-domain-or-server:8787
```

## Production On Your Server

Recommended layout:

- frontend served from your domain
- Node backend runs on the same server on port `8787`
- Nginx proxies `/api/*` to the backend

Then frontend can use the default relative path:

`/api/leads`

Example Nginx block:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8787;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```
