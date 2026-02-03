import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import createClient from './index.js';

describe('bgg', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('creates a client', () => {
    const bgg = createClient();
    expect(typeof bgg).toBe('function');
  });

  it('makes requests to BGG API', async () => {
    const mockXml = '<?xml version="1.0"?><items><item id="13"><name>Catan</name></item></items>';
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockXml)
    });

    const bgg = createClient();
    const result = await bgg('thing', { id: 13 });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0].toString()).toContain('api.geekdo.com/xmlapi2/thing');
    expect(result.items.item.id).toBe('13');
  });

  it('handles params correctly', async () => {
    const mockXml = '<?xml version="1.0"?><items/>';
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockXml)
    });

    const bgg = createClient();
    await bgg('search', { query: 'catan', type: 'boardgame' });

    const url = fetch.mock.calls[0][0].toString();
    expect(url).toContain('query=catan');
    expect(url).toContain('type=boardgame');
  });

  it('throws on HTTP errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    const bgg = createClient();
    await expect(bgg('thing', { id: 99999999 })).rejects.toThrow('BGG API error');
  });

  it('retries on failure', async () => {
    const mockXml = '<?xml version="1.0"?><items/>';
    fetch
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockXml)
      });

    const bgg = createClient({ retries: 1 });
    const result = await bgg('thing', { id: 13 });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(result).toBeDefined();
  });
});
