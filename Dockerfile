# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable

# Dependencies
FROM base AS deps
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* .npmrc* .yarnrc.yml* ./
COPY .yarn ./.yarn

RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then corepack use && yarn install --immutable; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml
COPY . .

ENV NODE_ENV=production

RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm run build; \
  elif [ -f yarn.lock ]; then yarn build; \
  else npm run build; \
  fi

# Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 8000

CMD ["node", "server.js"]