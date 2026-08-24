# ═══════════════════════════════════════════════════════════════
# KOS COMPLIANCE SEEDER™ v3.1 — Docker Image
# Node.js 20 Alpine + Cron 24/7
# ═══════════════════════════════════════════════════════════════
FROM node:20-alpine

# Install cron for health-check scheduling fallback
RUN apk add --no-cache tzdata

# Set timezone to GMT for cron alignment
ENV TZ=GMT
RUN cp /usr/share/zoneinfo/GMT /etc/localtime && echo "GMT" > /etc/timezone

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .

# Create log directory
RUN mkdir -p /var/log/kos-seeder

# Health check
HEALTHCHECK --interval=60s --timeout=15s --start-period=30s --retries=3 \
  CMD node -e "fetch('${SUPABASE_URL}/functions/v1/kos-compliance-daily-crawler',{method:'OPTIONS',signal:AbortSignal.timeout(10000)}).then(r=>process.exit(r.ok||r.status===204?0:1)).catch(()=>process.exit(1))"

EXPOSE 3000

CMD ["node", "seed-full.js"]