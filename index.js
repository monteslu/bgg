var rest = require('rest');
var interceptor = require('./interceptor');

var errorCodeInterceptor = require('rest/interceptor/errorCode');
var pathPrefixInterceptor = require('rest/interceptor/pathPrefix');
var entityInterceptor = require('rest/interceptor/entity');
var mimeInterceptor = require('rest/interceptor/mime');

module.exports = rest
  .chain(pathPrefixInterceptor, { prefix: 'http://www.boardgamegeek.com/xmlapi2/'})
  .chain(mimeInterceptor, {mime:'text/xml', accept: 'text/xml'})
  .chain(interceptor)
  .chain(entityInterceptor)
  .chain(errorCodeInterceptor);
