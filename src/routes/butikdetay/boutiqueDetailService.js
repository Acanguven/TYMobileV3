var cacheRequest = require('~/src/helpers/cache.js');

function BoutiqueDetailService() {}

BoutiqueDetailService.prototype.get = function(cb) {
  var url = 'https://api.trendyol.com/catalog//boutique/detail?boutiqueFilter.boutiqueId=' + this.id + '&boutiqueFilter.hideUnavailable=false&loadBoutique=true&pagination.itemCount=50&pagination.pageIndex=1&storefrontId=1';
  cacheRequest.fetch(url).then(function(res) {
    if (res.cache) {
      cb(null, res.data);
    } else {
      var viewModel = buildViewModel(res.data);
      cacheRequest.cacheSync(url, viewModel);
      cb(null, viewModel);
    }
  });
};

BoutiqueDetailService.prototype.id = function(id){
  var scope = {
    id: id
  }
  return this.get.bind(scope);
}

function buildViewModel(data) {
  var model = {
    totalHits: data.TotalHits,
    cdnPath: data.Boutique.CdnPath,
    boutiqueId: data.Boutique.BoutiqueId,
    boutiqueName: data.Boutique.BoutiqueName
  }
  model.products = data.ProductList.reduce(function(productList, product){
    productList.push({
      id: product.ProductId,
      name: product.Name,
      brandName: product.ProductMain.BrandName,
      marketPrice: product.MarketPrice,
      imageUrl: product.ImageUrl
    });
    return productList;
  }, []).slice(0, 6);

  return model;
}

module.exports = new BoutiqueDetailService();
