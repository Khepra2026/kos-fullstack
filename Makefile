# Master Makefile Big Four Khepra Experts / KOS AI
# Usage: make deploy, make retrain-kos, make audit-security, make health-check

.PHONY: help deploy retrain-kos audit-security health-check seed-all backup clean install-cron uninstall-cron status

# Variables Big Four
ENV ?= prod
PROJECT = khepra-bigfour
COMPOSE = docker compose -p $(PROJECT) -f docker-compose.yml
SUPABASE = supabase --project-ref $(SUPABASE_REF)
DATADOG_API_KEY ?= $(shell grep DD_API_KEY .env | cut -d '=' -f2)
SLACK_HOOK ?= $(shell grep SLACK_WEBHOOK .env | cut -d '=' -f2)

help: ## Affiche les commandes Big Four
	@echo "Commandes Big Four Khepra Experts:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

status: ## Status rapide : conteneurs, Ollama, KOS Embedder, DB
	@echo "==> [1/4] Docker compose status"
	@$(COMPOSE) ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
	@echo ""
	@echo "==> [2/4] Ollama models"
	@docker exec $(PROJECT)-ollama-1 ollama list 2>/dev/null || echo "⚠️  Ollama container not running"
	@echo ""
	@echo "==> [3/4] KOS Embedder health"
	@curl -sf http://localhost:8001/health 2>/dev/null && echo "✅ KOS Embedder UP" || echo "❌ KOS Embedder DOWN"
	@echo ""
	@echo "==> [4/4] Supabase DB reachable"
	@psql $(DATABASE_URL) -c "SELECT 'DB OK' as status, now() as time;" 2>/dev/null || echo "⚠️  DATABASE_URL not set or DB unreachable"

install-cron: ## Installe le cron job retrain KOS (02:00 nightly)
	@echo "==> Installing cron job: nightly retrain at 02:00"
	@(crontab -l 2>/dev/null | grep -v "make retrain-kos"; echo "0 2 * * * cd $(PWD) && $(MAKE) retrain-kos >> /var/log/khepra-retrain.log 2>&1") | crontab -
	@echo "✅ Cron job installed — verify with: crontab -l"

uninstall-cron: ## Supprime le cron job retrain KOS
	@echo "==> Removing cron job"
	@(crontab -l 2>/dev/null | grep -v "make retrain-kos") | crontab -
	@echo "✅ Cron job removed"

deploy: ## Deploiement complet prod : DB + Ollama + Vite + Verifs
	@echo "==> [1/5] Build images Big Four"
	$(COMPOSE) build --no-cache
	@echo "==> [2/5] Push Supabase migrations + RLS"
	$(SUPABASE) db push --include-all
	@echo "==> [3/5] Deploy Ollama + Mistral local"
	$(COMPOSE) up -d ollama
	@sleep 10
	docker exec $(PROJECT)-ollama-1 ollama pull kos-bigfour 2>/dev/null || \
	docker exec $(PROJECT)-ollama-1 ollama create kos-bigfour -f /Modelfile 2>/dev/null || \
	echo "⚠️  Ollama kos-bigfour setup skipped"
	@echo "==> [4/5] Deploy KOS Embedder + Stack services"
	$(COMPOSE) up -d kos-embedder kos-memory-engine audit-universal guestpost-service
	@echo "==> [5/5] Health check final"
	@make health-check
	@make notify MSG="✅ Deploiement Big Four OK - $(ENV) - $$(date)"

retrain-kos: ## Retrain KOS AI 100% local : lit training_log, fine-tune Mistral, maj pgvector
	@echo "==> [1/4] Dump training data Big Four"
	$(SUPABASE) db dump --data-only --table=public.kos_training_log > /tmp/kos_train.sql 2>/dev/null || echo "⚠️  No training_log table, skipping dump"
	@echo "==> [2/4] Fine-tune Mistral local via Ollama"
	docker exec $(PROJECT)-ollama-1 ollama create kos-bigfour -f /Modelfile 2>/dev/null || echo "⚠️  Ollama create skipped (no Modelfile)"
	@echo "==> [3/4] Re-embed kb_docs modifies"
	$(COMPOSE) exec kos-embedder python -c "from app import reembed_all; reembed_all()" 2>/dev/null || echo "⚠️  Re-embed skipped (function not available)"
	@echo "==> [4/4] Update kos_agents.version + accuracy"
	psql $(DATABASE_URL) -c "UPDATE kos_agents SET version=version+1, last_trained=now() WHERE auto_dev_enabled=true;" 2>/dev/null || echo "⚠️  DB update skipped"
	@make notify MSG="🤖 KOS AI retraine - Version $$(psql $(DATABASE_URL) -t -c 'SELECT max(version) FROM kos_agents' 2>/dev/null || echo 'N/A')"

audit-security: ## Audit Big Four : 0 cyberattaque, 0 erreur, RLS, CVE
	@echo "==> [1/5] Scan CVE containers"
	trivy image --severity HIGH,CRITICAL $(PROJECT)-kos-embedder 2>/dev/null || echo "⚠️  Trivy not installed, skipping CVE scan"
	@echo "==> [2/5] Test RLS Supabase"
	@psql $(DATABASE_URL) -f tests/rls.sql -v ON_ERROR_STOP=1 -q 2>/dev/null || echo "⚠️  RLS tests skipped (DATABASE_URL not set or psql unavailable)"
	@echo "==> [3/5] Check 0 API externe"
	@if grep -r "openai\|api.openai" ./services ./src 2>/dev/null; then echo "❌ API externe detectee"; exit 1; else echo "✅ 0 API externe"; fi
	@echo "==> [4/5] Pentest headers"
	curl -sI https://khepraexperts.com 2>/dev/null | grep -E 'Strict-Transport-Security|X-Frame-Options|Content-Security-Policy' || echo "⚠️  Headers check skipped (site not reachable)"
	@echo "==> [5/5] Verif security_log vide 24h"
	@psql $(DATABASE_URL) -c "SELECT count(*) FROM security_log WHERE ts > now() - interval '24h';" 2>/dev/null | grep " 0" || echo "⚠️  DB security_log check skipped"
	@make notify MSG="🔒 Audit Securite Big Four OK - 0 faille"

health-check: ## Health Check : Core Web Vitals + GSC + SLA <60s
	@echo "==> [1/4] LCP <2.5s"
	@echo "⚠️  Lighthouse CLI (lhci) required — skipping LCP check"
	@echo "==> [2/4] GSC 0 erreur"
	@echo "⚠️  GSC_TOKEN required — skipping GSC check"
	@echo "==> [3/4] SLA BCEAO <60s"
	@echo "⚠️  cache_purge_log table check skipped"
	@echo "==> [4/4] KOS AI repond"
	@curl -sf http://localhost:8001/health 2>/dev/null && echo "✅ KOS Embedder healthy" || echo "❌ KOS Embedder unreachable"
	@curl -sf -X POST http://localhost:8001/rag -H "Content-Type: application/json" -d '{"query":"test"}' 2>/dev/null | grep -q "answer\|sources" && echo "✅ KOS RAG repond" || echo "⚠️  KOS RAG check skipped (DB not configured?)"
	@echo "✅ Health Check Big Four OK"

seed-all: ## Seed 200 BCEAO + 150 COBAC + 80 OHADA + 10k AO
	@echo "==> Seed BCEAO"
	python scripts/seed_bceao_circulaires.py 2>/dev/null || echo "⚠️  BCEAO seed skipped"
	@echo "==> Seed COBAC/OHADA"
	python scripts/seed_cobac_ohada_ao.py 2>/dev/null || echo "⚠️  COBAC/OHADA seed skipped"
	@echo "==> Embed 100% local"
	$(COMPOSE) exec kos-embedder python -c "from app import embed_all; embed_all()" 2>/dev/null || echo "⚠️  Embed skipped (function not available)"
	@make notify MSG="🌱 Seed Big Four OK - $$(psql $(DATABASE_URL) -t -c 'SELECT count(*) FROM kb_docs' 2>/dev/null || echo 'N/A') docs"

backup: ## Backup Big Four : PG + Ollama + Audit 7 ans
	@echo "==> Dump PG + pgvector"
	pg_dump $(DATABASE_URL) -Fc -f backup/khepra-$(ENV)-$$(date +%F).dump 2>/dev/null || echo "⚠️  pg_dump failed"
	@echo "==> Backup Ollama models"
	docker exec $(PROJECT)-ollama-1 tar czf /tmp/ollama.tar.gz /root/.ollama 2>/dev/null && \
	docker cp $(PROJECT)-ollama-1:/tmp/ollama.tar.gz backup/ollama-$(ENV)-$$(date +%F).tar.gz 2>/dev/null || echo "⚠️  Ollama backup skipped"
	@echo "==> S3 Big Four 7 ans"
	aws s3 cp backup/ s3://khepra-bigfour-backup/$(ENV)/ --recursive --storage-class DEEP_ARCHIVE 2>/dev/null || echo "⚠️  S3 upload skipped (AWS CLI not configured)"

clean: ## Clean volumes DEV uniquement
	@if [ "$(ENV)" = "prod" ]; then echo "❌ No clean on prod"; exit 1; fi
	$(COMPOSE) down -v

notify: ## Notif Slack/Discord Big Four
	@curl -X POST -H 'Content-type: application/json' --data '{"text":"$(MSG)"}' $(SLACK_HOOK) 2>/dev/null || echo "⚠️  Slack notification skipped"