# --- builder ---
FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9.6.0 --activate
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# --- runner ---
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', res => process.exit(res.statusCode===200?0:1)).on('error', ()=>process.exit(1))"
CMD ["npm","run","start","--","-p","3000","-H","0.0.0.0"]