# BGG

A promises aware boardgamegeek.com API client.

Will support any of the commands available in the [BGG XMLAPI2 documentation](http://boardgamegeek.com/wiki/page/BGG_XML_API2)

## install

`
npm install bgg
`

## Usage

```javascript
var bgg = require('bgg');

bgg('user', {name: 'monteslu', guilds: 1})
  .then(function(results){
    console.log(results);
  });
```
