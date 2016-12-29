var rest = require('rest');


var errorCodeInterceptor = require('rest/interceptor/errorCode');
var pathPrefixInterceptor = require('rest/interceptor/pathPrefix');
var mimeInterceptor = require('rest/interceptor/mime');
var retryInterceptor = require('rest/interceptor/retry');
var timeoutInterceptor = require('rest/interceptor/timeout');

module.exports = function(_config) {

  var config = _config || {};
  var interceptor = require('./interceptor')(config.toJSONConfig || null);
  var restCall = rest
    .wrap(pathPrefixInterceptor, { prefix: 'https://www.boardgamegeek.com/xmlapi2/'})
    .wrap(mimeInterceptor, {mime:'text/xml', accept: 'text/xml'})
    .wrap(errorCodeInterceptor)
    .wrap(interceptor)
    .wrap(timeoutInterceptor, { timeout: config.timeout || 5000 });

  if(config.retry) {
    restCall = restCall.wrap(retryInterceptor, config.retry);
  }

  return function(path, params){
    var restConfig = {path: path};
    if(params){
      restConfig.params = params;
    }
    return restCall(restConfig);
  };
}
