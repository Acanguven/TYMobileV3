var template = require('./index.marko');

var ProductDetailService = require('./productDetailService');

module.exports = function (req, res) {
  res.marko(template, {
    title: __('title'),
    productDetailProvider: ProductDetailService.id(req.params.productId, req.params.boutiqueId)
  });
};
