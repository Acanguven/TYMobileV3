var template = require('./index.marko');
var boutiqueTabsService = require('./boutiqueTabsService.js');

module.exports = function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    template.render({
        boutiqueTabsProvider: boutiqueTabsService.get,
        currentPage: 'HomePage'
    }, res);
};