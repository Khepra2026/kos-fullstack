/// <reference lib="dom" />

/**
 * Stratégie de cache avancée
 * Cache Storage API + IndexedDB pour données structurées
 */

// Définition locale pour éviter les problèmes de résolution de types
type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string | null;
  mode?: string;
  credentials?: string;
  cache?: string;
  redirect?: string;
  referrer?: string;
  signal?: AbortSignal | null;
};

interface CacheConfig {
  name: string;
  version: number;
  maxAge: number; // en millisecondes
  maxItems?: number;
}

interface CachedItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

/**
 * Résout une URL en absolue si nécessaire
 */
function resolveUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  try {
    return new URL(url, window.location.origin).href;
  } catch {
    return url;
  }
}

/**
 * Gestionnaire de Cache Storage pour assets statiques
 */
export class AssetCacheManager {
  private cacheName: string;
  private version: number;

  constructor(name: string = 'khepra-assets', version: number = 1) {
    this.cacheName = `${name}-v${version}`;
    this.version = version;
  }

  /**
   * Met en cache une ressource (fetch manuel + put, plus sûr que add)
   */
  async cacheAsset(url: string): Promise<void> {
    if (!('caches' in window)) return;

    const resolved = resolveUrl(url);
    if (!resolved) return;

    try {
      const cache = await caches.open(this.cacheName);
      const response = await fetch(resolved, { mode: 'no-cors' });
      if (response.ok || response.type === 'opaque') {
        await cache.put(resolved, response);
      }
    } catch {
      // Silencieux : le cache est un optimisateur, pas un blocage
    }
  }

  /**
   * Met en cache plusieurs ressources
   */
  async cacheAssets(urls: string[]): Promise<void> {
    if (!('caches' in window)) return;

    // Filtrer les URLs vides/invalides et résoudre en absolues
    const validUrls = urls
      .filter((url) => typeof url === 'string' && url.trim().length > 0)
      .map(resolveUrl)
      .filter(Boolean);

    if (validUrls.length === 0) return;

    const cache = await caches.open(this.cacheName);
    let successCount = 0;
    let failCount = 0;

    for (const url of validUrls) {
      try {
        const response = await fetch(url, { mode: 'no-cors' });
        if (response.ok || response.type === 'opaque') {
          await cache.put(url, response);
          successCount += 1;
        } else {
          failCount += 1;
        }
      } catch {
        failCount += 1;
      }
    }

    if (failCount > 0 && successCount === 0) {
      // Warn seulement — pas d'erreur bloquante
      console.warn(`[Cache] Toutes les ressources ont échoué (${failCount}/${validUrls.length})`);
    } else if (failCount > 0) {
      console.warn(`[Cache] ${successCount}/${validUrls.length} ressources mises en cache, ${failCount} échecs`);
    }
  }

  /**
   * Récupère une ressource du cache
   */
  async getAsset(url: string): Promise<Response | undefined> {
    if (!('caches' in window)) return undefined;

    try {
      const cache = await caches.open(this.cacheName);
      return await cache.match(resolveUrl(url));
    } catch (error) {
      console.error('[Cache] Erreur lors de la récupération:', error);
      return undefined;
    }
  }

  /**
   * Nettoie les anciennes versions du cache
   */
  async cleanOldCaches(): Promise<void> {
    if (!('caches' in window)) return;

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith('khepra-assets-') && name !== this.cacheName)
          .map((name) => caches.delete(name))
      );
    } catch (error) {
      console.error('[Cache] Erreur lors du nettoyage:', error);
    }
  }

  /**
   * Vide complètement le cache
   */
  async clearCache(): Promise<void> {
    if (!('caches' in window)) return;

    try {
      await caches.delete(this.cacheName);
    } catch (error) {
      console.error('[Cache] Erreur lors de la suppression:', error);
    }
  }
}

/**
 * Gestionnaire de cache mémoire avec expiration
 */
export class MemoryCacheManager<T = any> {
  private cache: Map<string, CachedItem<T>>;
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.cache = new Map();
    this.config = {
      name: config.name || 'memory-cache',
      version: config.version || 1,
      maxAge: config.maxAge || 5 * 60 * 1000, // 5 minutes par défaut
      maxItems: config.maxItems || 100,
    };
  }

  /**
   * Stocke une valeur dans le cache
   */
  set(key: string, data: T, customMaxAge?: number): void {
    const maxAge = customMaxAge || this.config.maxAge;
    const timestamp = Date.now();

    this.cache.set(key, {
      data,
      timestamp,
      expiresAt: timestamp + maxAge,
    });

    // Nettoyer si trop d'items
    if (this.config.maxItems && this.cache.size > this.config.maxItems) {
      this.evictOldest();
    }
  }

  /**
   * Récupère une valeur du cache
   */
  get(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) return null;

    // Vérifier l'expiration
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * Vérifie si une clé existe et est valide
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Supprime une entrée
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Vide tout le cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Supprime les entrées expirées
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Supprime l'entrée la plus ancienne
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Obtient les statistiques du cache
   */
  getStats(): {
    size: number;
    maxItems: number;
    hitRate: number;
  } {
    return {
      size: this.cache.size,
      maxItems: this.config.maxItems || 0,
      hitRate: 0, // À implémenter avec compteurs
    };
  }
}

/**
 * Gestionnaire IndexedDB pour données structurées
 */
export class IndexedDBManager<T = any> {
  private dbName: string;
  private storeName: string;
  private version: number;
  private db: IDBDatabase | null = null;

  constructor(dbName: string = 'khepra-db', storeName: string = 'cache', version: number = 1) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }

  /**
   * Initialise la base de données
   */
  async init(): Promise<void> {
    if (!('indexedDB' in window)) {
      throw new Error('IndexedDB non supporté');
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'key' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('expiresAt', 'expiresAt', { unique: false });
        }
      };
    });
  }

  /**
   * Stocke une valeur
   */
  async set(key: string, data: T, maxAge: number = 24 * 60 * 60 * 1000): Promise<void> {
    if (!this.db) await this.init();

    const timestamp = Date.now();
    const item: CachedItem<T> & { key: string } = {
      key,
      data,
      timestamp,
      expiresAt: timestamp + maxAge,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Récupère une valeur
   */
  async get(key: string): Promise<T | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const item = request.result as (CachedItem<T> & { key: string }) | undefined;
        
        if (!item) {
          resolve(null);
          return;
        }

        // Vérifier l'expiration
        if (Date.now() > item.expiresAt) {
          this.delete(key);
          resolve(null);
          return;
        }

        resolve(item.data);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Supprime une valeur
   */
  async delete(key: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Nettoie les entrées expirées
   */
  async cleanup(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('expiresAt');
      const range = IDBKeyRange.upperBound(Date.now());
      const request = index.openCursor(range);

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Vide complètement le store
   */
  async clear(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

/**
 * Stratégie de cache unifiée
 */
export class CacheStrategy {
  private assetCache: AssetCacheManager;
  private memoryCache: MemoryCacheManager;
  private dbCache: IndexedDBManager;

  constructor() {
    this.assetCache = new AssetCacheManager();
    this.memoryCache = new MemoryCacheManager();
    this.dbCache = new IndexedDBManager();
  }

  /**
   * Initialise tous les caches
   */
  async init(): Promise<void> {
    await this.assetCache.cleanOldCaches();
    await this.dbCache.init();
    
    // Nettoyage périodique
    setInterval(() => {
      this.memoryCache.cleanup();
      this.dbCache.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Précache les images critiques via le Service Worker (cache agressif 30 jours)
   */
  precacheImages(urls: string[]): void {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return;
    navigator.serviceWorker.controller.postMessage({
      type: 'PRECACHE_IMAGES',
      urls,
    });
  }

  /**
   * Cache des assets critiques au démarrage
   */
  async precacheAssets(): Promise<void> {
    const criticalImages = [
      '/images/hero-executive.webp',
    ];

    // Précache via Cache Storage classique
    await this.assetCache.cacheAssets(criticalImages);

    // Précache agressif via Service Worker (30 jours, headers immutable)
    this.precacheImages(criticalImages);
  }

  /**
   * Récupère avec stratégie cache-first
   */
  async fetchWithCache(url: string, options?: FetchOptions): Promise<Response> {
    const cached = await this.assetCache.getAsset(url);
    if (cached) return cached;

    const fetchInit: { [key: string]: unknown } = options ? { ...options } : {};
    const response = await fetch(url, fetchInit as Parameters<typeof fetch>[1]);
    
    if (response.ok) {
      const cache = await caches.open('khepra-images-v2.0.0');
      cache.put(url, response.clone());
    }

    return response;
  }

  /**
   * Nettoie tous les caches
   */
  async clearAll(): Promise<void> {
    await this.assetCache.clearCache();
    this.memoryCache.clear();
    await this.dbCache.clear();
  }
}

// Instance singleton
export const cacheStrategy = new CacheStrategy();

export default cacheStrategy;



