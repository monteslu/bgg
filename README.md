# BGG

A promises aware boardgamegeek.com API client.

Will support any of the commands available in the [BGG XMLAPI2 documentation](http://boardgamegeek.com/wiki/page/BGG_XML_API2)

## install

`
npm install bgg
`

## Usage

```javascript
// all options are optional
var options = {
  timeout: 10000, // timeout of 10s (5s is the default)

  // see https://github.com/cujojs/rest/blob/master/docs/interceptors.md#module-rest/interceptor/retry
  retry: {
    initial: 100,
    multiplier: 2,
    max: 15e3
  },

  toJSONConfig: {object: true, sanitize: false} //Optional xml2json.toJSON options
}

var bgg = require('bgg')(options);

bgg('user', {name: 'monteslu', guilds: 1})
  .then(function(results){
    console.log(results);
  });
```
