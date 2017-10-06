var template = require('./index.marko');

var ProductDetailService = require('./productDetailService');

module.exports = function (req, res) {
  template.render({
    title: 'Product Detail',
    productDetailProvider: ProductDetailService.id(req.params.productId, req.params.boutiqueId)
  }, res);
};
