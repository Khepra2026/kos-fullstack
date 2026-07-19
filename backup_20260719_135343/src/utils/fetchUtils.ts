/**
 * fetchWithTimeout — wrapper fetch avec timeout configurable
 * Rejette avec une erreur "Timeout" si la requête dépasse le délai.
 * Utile pour éviter les requêtes qui pendent indéfiniment
 * (ex: API lente, réseau instable en Afrique).
 */

export interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number;
}

export function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {},
): Promise<Response> {
  const { timeout = 8000, ...fetchOptions } = options;

  return new Promise<Response>((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error(`Timeout : la requête vers ${url} a dépassé ${timeout}ms`));
    }, timeout);

    fetch(url, { ...fetchOptions, signal: controller.signal })
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        // Si l'erreur est déjà un abort du timeout, ne pas la doubler
        if (err instanceof Error && err.name === 'AbortError' && !controller.signal.aborted) {
          reject(new Error(`Timeout : la requête vers ${url} a dépassé ${timeout}ms`));
        } else {
          reject(err);
        }
      });
  });
}

export default fetchWithTimeout;



