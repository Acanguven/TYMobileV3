exports.path = "/";

var template = require('./index.marko');
var boutiqueTabsService = require('./boutiqueTabsService.js');


exports.handler = function(req, res) {
  res.setHeader('content-type', 'text/html');
  template.render({ boutiqueTabsProvider: boutiqueTabsService.get, currentPage: 'HomePage' }, res);
};
