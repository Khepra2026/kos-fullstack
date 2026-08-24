-- ============================================================================
-- KOS PAYMENTS TABLE
-- Migration : Billing Engine Production
-- Objectif : PayDunya + MRR/ARR Dashboard + Audit Big Four
-- Rétention : 10 ans
-- ============================================================================


CREATE TABLE IF NOT EXISTS public.payments (

    id BIGSERIAL PRIMARY KEY,


    -- Organisation cliente SaaS
    org_id TEXT NOT NULL,


    -- Abonnement associé
    subscription_id UUID,


    -- Montant facturé
    amount INTEGER NOT NULL DEFAULT 0,


    -- Devise UEMOA/CEMAC
    currency TEXT NOT NULL DEFAULT 'XAF',


    -- Fournisseur paiement
    provider TEXT NOT NULL DEFAULT 'paydunya',


    -- Statut transaction
    status TEXT NOT NULL DEFAULT 'pending'
    CHECK (
        status IN (
            'pending',
            'processing',
            'completed',
            'success',
            'paid',
            'failed',
            'cancelled',
            'refunded'
        )
    ),


    -- Identifiants paiement externes
    transaction_id TEXT,

    payment_token TEXT,

    invoice_reference TEXT,


    -- Métadonnées audit
    event_type TEXT DEFAULT 'subscription_payment',

    metadata JSONB DEFAULT '{}'::jsonb,


    -- Dates
    paid_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()

);



-- ============================================================================
-- INDEX PERFORMANCE
-- ============================================================================


CREATE INDEX IF NOT EXISTS idx_payments_org

ON public.payments(org_id);



CREATE INDEX IF NOT EXISTS idx_payments_created

ON public.payments(created_at);



CREATE INDEX IF NOT EXISTS idx_payments_status

ON public.payments(status);



CREATE INDEX IF NOT EXISTS idx_payments_transaction

ON public.payments(transaction_id);



CREATE INDEX IF NOT EXISTS idx_payments_paid_at

ON public.payments(paid_at);



-- ============================================================================
-- TRIGGER UPDATED_AT
-- ============================================================================


CREATE OR REPLACE FUNCTION update_payments_timestamp()

RETURNS TRIGGER

LANGUAGE plpgsql

AS $$

BEGIN

    NEW.updated_at = NOW();

    RETURN NEW;

END;

$$;



DROP TRIGGER IF EXISTS trg_payments_updated

ON public.payments;



CREATE TRIGGER trg_payments_updated

BEFORE UPDATE ON public.payments

FOR EACH ROW

EXECUTE FUNCTION update_payments_timestamp();



-- ============================================================================
-- RLS SUPABASE
-- ============================================================================


ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;



DROP POLICY IF EXISTS payments_authenticated_read

ON public.payments;



CREATE POLICY payments_authenticated_read

ON public.payments

FOR SELECT

TO authenticated

USING (true);



-- ============================================================================
-- FIN KOS PAYMENTS TABLE
-- ============================================================================