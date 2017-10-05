module.exports = [
    {path: '/', handler: require('./routes/index'), method:'get'},
    {path: '/:boutiqueName/butikdetay/:boutiqueId', handler: require('./routes/butikdetay'), method:'get'}
];