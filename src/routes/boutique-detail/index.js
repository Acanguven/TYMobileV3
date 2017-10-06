var template = require('./index.marko');
var BoutiqueDetailService = require('./boutiqueDetailService.js');


module.exports = function (req, res) {
    res.setHeader('content-type', 'text/html');

    template.render({
        currentPage: 'Butikdetay',
        boutiqueDetailProvider: BoutiqueDetailService.id(req.params.boutiqueId)
    }, res);
};