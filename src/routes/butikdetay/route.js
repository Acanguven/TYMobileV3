exports.path = "/:boutiqueName/butikdetay/:boutiqueId";

var template = require('./index.marko');
var BoutiqueDetailService = require('./boutiqueDetailService.js');


exports.handler = function(req, res) {
  res.setHeader('content-type', 'text/html');
  template.render({ currentPage: 'Butikdetay', boutiqueDetailProvider: BoutiqueDetailService.id(req.params.boutiqueId) }, res);
};
