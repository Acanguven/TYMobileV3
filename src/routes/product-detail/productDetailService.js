var cacheRequest = require('~/src/helpers/cache.js');

function ProductDetailService() {
}

ProductDetailService.prototype.get = function (cb) {
  var url = 'https://api.trendyol.com/catalog/product/detail?productId='+this.productId+'&boutiqueId='+this.boutiqueId+'&storefrontId=1';
  console.log(url);
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

ProductDetailService.prototype.id = function (productId, boutiqueId) {
  var scope = {
    productId: productId,
    boutiqueId: boutiqueId
  };
  return this.get.bind(scope);
};

function buildViewModel(data) {
  var model = {
    productId: data.Product.Id,
    productName: data.Product.Name,
    marketPrice: data.Product.MarketPrice,
    salePrice: data.Product.SalePrice,
    variants: data.Product.ProductVariants,
  };



  return model;
}

module.exports = new ProductDetailService();
