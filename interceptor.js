var interceptor = require('rest/interceptor');
var parser = require('xml2json');

var parserConfig = {object: true};

module.exports = interceptor({
  success: function(response, config, client){
    return parser.toJson(response.entity, parserConfig);
  }
});
