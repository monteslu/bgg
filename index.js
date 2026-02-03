import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  textNodeName: '_text'
});

const BGG_API = 'https://api.geekdo.com/xmlapi2/';

export default function createClient(config = {}) {
  const timeout = config.timeout || 10000;
  const retries = config.retries || 0;

  async function request(path, params, attempt = 0) {
    const url = new URL(path, BGG_API);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, value);
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'text/xml' }
      });

      if (!response.ok) {
        throw new Error(`BGG API error: ${response.status} ${response.statusText}`);
      }

      const xml = await response.text();
      return parser.parse(xml);
    } catch (err) {
      if (attempt < retries) {
        return request(path, params, attempt + 1);
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return request;
}

// Named export for ESM
export { createClient };
