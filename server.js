/*
    Enable Relative Paths
 */
require('require-self-ref');
require('marko/node-require');
var express = require('express');
require('marko/express');
var compression = require('compression');

var isProduction = process.env.NODE_ENV === 'production';

require('marko/compiler').configure({ writeToDisk: !isProduction });

require('lasso').configure({
    plugins: [
        'lasso-marko'
    ],
    outputDir: __dirname + '/s',
    bundlingEnabled: isProduction,
    minify: isProduction,
    fingerprintsEnabled: isProduction,
    minifyCSS: isProduction,
    minifyJS: isProduction,
    urlPrefix: '/s/'
});


if (isProduction) {
    require('./dev/hotReload');
}

var app = express();

app.use(compression());
app.use(require('lasso/middleware').serveStatic());


var routes = require('./src/routing');
routes.forEach(function (routeConfig) {
    app[routeConfig.method](routeConfig.path, routeConfig.handler);
});



app.listen(8080, function () {
    if (isProduction) {
        if (process.send) {
            process.send('online');
        }
    }
});