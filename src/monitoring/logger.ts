// Module de journalisation centralisée et d'audit de production (Standard Big Four)
export interface ProductionErrorLog {
    timestamp: string;
    level: 'INFO' | 'WARNING' | 'CRITICAL';
    service: string;
    message: string;
    metadata?: Record<string, unknown>;
}

export function logProductionError(
    level: 'INFO' | 'WARNING' | 'CRITICAL',
    service: string,
    message: string,
    metadata?: Record<string, unknown>
): ProductionErrorLog {
    const errorLog: ProductionErrorLog = {
        timestamp: new Date().toISOString(),
        level,
        service,
        message,
        metadata
    };

    // Formatage structuré pour les outils de monitoring (Datadog, Sentry, Supabase)
    console.error([PROD-MONITOR] [\] [\] \, JSON.stringify(errorLog));

    // Ici, vous pouvez étendre l'envoi vers une table Supabase dédiée ou un webhook sécurisé

    return errorLog;
}
