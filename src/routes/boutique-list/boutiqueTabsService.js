var cacheRequest = require('~/src/helpers/cache.js');

function BoutiqueTabsService() {
}

BoutiqueTabsService.prototype.get = function (cb) {
    var url = 'https://api.trendyol.com/catalog/boutique/tabbed?includeRushDeliveryTab=true&storefrontId=1';
    cacheRequest.fetch(url).then(function (res) {
        if (res.cache) {
            cb(null, res.data);
        } else {
            var viewModel = buildViewModel(res.data);
            cacheRequest.cacheSync(url, viewModel);
            cb(null, viewModel);
        }
    });
};

function buildViewModel(data) {
    var model = {
        cdnPath: data.CdnPath,
        secureCdnPath: data.SecureCdnPath
    };
    model.tabs = data.TabbedBoutiques.reduce(function (tabList, tabbedBoutique) {
        tabList.push(tabbedBoutique.GenderType);
        return tabList;
    }, []);
    model.boutiques = data.TabbedBoutiques.reduce(function (tabList, tabbedBoutique) {
        tabList.push(tabbedBoutique.Boutiques.slice(0, 6).reduce(function (tabList, boutiqueTab) {
            var boutiqueModel = {
                beautifiedName: boutiqueTab.BoutiqueName.replace(/ /g, '-'),
                boutiqueId: boutiqueTab.BoutiqueId,
                image: boutiqueTab.Image.DetailImage
            };
            tabList.push(boutiqueModel);
            return tabList;
        }, []));
        return tabList;
    }, []);

    return model;
}

module.exports = new BoutiqueTabsService();
