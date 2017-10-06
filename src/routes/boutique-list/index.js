var template = require('./index.marko');
var boutiqueTabsService = require('./boutiqueTabsService.js');

module.exports = function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    res.locals.tada = 'boom';

    res.marko(template,{
        boutiqueTabsProvider: boutiqueTabsService.get,
        currentPage: __('title'),
        __:'t'
    });
};
