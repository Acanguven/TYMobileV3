var template = require('./index.marko');
var BoutiqueDetailService = require('./boutiqueDetailService.js');


module.exports = function (req, res) {
    res.setHeader('content-type', 'text/html');

    res.marko(template,{
        currentPage: 'Butikdetay',
        boutiqueDetailProvider: BoutiqueDetailService.id(req.params.boutiqueId),
    });
};
