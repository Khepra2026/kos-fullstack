CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE diagnosis (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    image_hash CHAR(64) NOT NULL,
    image_embedding vector(512),
    ai_score FLOAT NOT NULL,
    model_version VARCHAR(20) NOT NULL,
    md_id VARCHAR(50) NOT NULL,
    vcp_proof TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX ON diagnosis USING ivfflat (image_embedding vector_l2_ops);
CREATE INDEX ON diagnosis (patient_id, created_at DESC);
