/**
 * Configuration options for the BGG API client
 */
export interface BggClientConfig {
  /** Request timeout in milliseconds (default: 10000) */
  timeout?: number;
  /** Number of retries on failure (default: 0) */
  retries?: number;
}

/**
 * Parameters for BGG API requests
 */
export interface BggRequestParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * BGG API request function
 * @param path - API endpoint path (e.g., 'thing', 'search', 'collection')
 * @param params - Query parameters
 * @returns Parsed XML response as JavaScript object
 */
export type BggRequest = (path: string, params?: BggRequestParams) => Promise<unknown>;

/**
 * Creates a BGG API client
 * @param config - Client configuration options
 * @returns A request function for making BGG API calls
 * 
 * @example
 * ```ts
 * import createClient from 'bgg';
 * 
 * const bgg = createClient({ timeout: 15000 });
 * const result = await bgg('thing', { id: 174430, stats: 1 });
 * ```
 */
export function createClient(config?: BggClientConfig): BggRequest;

export default createClient;
