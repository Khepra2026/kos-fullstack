# ═══════════════════════════════════════════════════════════════
# KOS DLQ WORKER — Auto-recovery Dead Letter Queue
# FIX-003 : Retraitement automatique des jobs échoués
# Deno runtime, retry exponentiel, max 3 tentatives
# ═══════════════════════════════════════════════════════════════

FROM denoland/deno:1.46.3

WORKDIR /app

COPY main.ts .

RUN deno cache main.ts

HEALTHCHECK --interval=30s --timeout=5s CMD deno eval "fetch('http://localhost:9091/health').then(r => r.ok ? Deno.exit(0) : Deno.exit(1))" || exit 1

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]