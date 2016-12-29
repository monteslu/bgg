var interceptor = require('rest/interceptor');
var parser = require('xml2json');

var defaultConfig = {object: true};

var interceptorSetup = function(cfg){
  var parserConfig = cfg || defaultConfig;

  return interceptor({
    success: function(response, config, client){
      return parser.toJson(response.entity, parserConfig);
    }
  });
};

module.exports = interceptorSetup;
