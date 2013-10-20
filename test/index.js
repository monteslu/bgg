var mysqlConfig = {
  host: 'localhost',
  user: '',
  password: '',
  database: 'test'
};

var bgg = require('../');

var log = console.log.bind(console);
var error = console.error.bind(console);


bgg({path: 'user', params: {name: 'monteslu', guilds: 1}})
  .then(log, error);
