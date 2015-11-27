var bgg = require('../')();

var log = console.log.bind(console);
var error = console.error.bind(console);


bgg('user', {name: 'monteslu', guilds: 1})
  .then(log, error);
