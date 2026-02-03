# BGG

[![npm version](https://img.shields.io/npm/v/bgg.svg)](https://www.npmjs.com/package/bgg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern BoardGameGeek.com API client for Node.js.

Supports the [BGG XML API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2).

## Install

```bash
npm install bgg
```

Requires Node.js 18+ (uses native fetch).

## Usage

```javascript
import createClient from 'bgg';

const bgg = createClient({
  timeout: 10000,  // 10s timeout (default: 10s)
  retries: 2       // retry failed requests (default: 0)
});

// Get user info
const user = await bgg('user', { name: 'monteslu', guilds: 1 });
console.log(user);

// Search for games
const results = await bgg('search', { query: 'catan', type: 'boardgame' });
console.log(results);

// Get game details
const game = await bgg('thing', { id: 13, stats: 1 });
console.log(game);
```

## CommonJS

```javascript
const createClient = require('bgg').default;
const bgg = createClient();
```

## API

### `createClient(options)`

Creates a BGG API client.

**Options:**
- `timeout` (number) - Request timeout in ms (default: 10000)
- `retries` (number) - Number of retry attempts (default: 0)

### `bgg(endpoint, params)`

Makes a request to the BGG XML API2.

**Endpoints:** `thing`, `family`, `search`, `collection`, `user`, `plays`, `guild`, `forum`, `thread`, `hot`, etc.

See [BGG XML API2 docs](https://boardgamegeek.com/wiki/page/BGG_XML_API2) for all endpoints and parameters.

## v2.0 Breaking Changes

- Now requires Node.js 18+ (uses native fetch)
- ES modules by default (use `.default` for CommonJS)
- Replaced `xml2json` with `fast-xml-parser` (no native dependencies)
- Removed `rest` library dependency
- Simplified retry config (just `retries: number`)

## Alternatives

- [bgg-sdk](https://github.com/ColCross/bgg-sdk) - TypeScript SDK with typed responses

## License

MIT
