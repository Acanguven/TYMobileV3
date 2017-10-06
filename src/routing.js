module.exports = [
    {path: '/', handler: require('./routes/boutique-list'), method:'get'},
    {path: '/:boutiqueName/butikdetay/:boutiqueId', handler: require('./routes/boutique-detail'), method:'get'},
    {path: '/:productName/urundetay/:boutiqueId/:productId', handler: require('./routes/product-detail'), method:'get'}
];
