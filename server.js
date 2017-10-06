/*
    Enable Relative Paths
 */
require('require-self-ref');
require('marko/node-require');
var express = require('express');
var i18n = require("i18n");
var markoExpress = require('marko/express');
var compression = require('compression');

/*
  Check Production Env
 */
var isProduction = process.env.NODE_ENV === 'production';


/*
  Configuring Language Options
 */
i18n.configure({
  locales:['en', 'tr', 'de'],
  directory: __dirname + '/locales',
  register: global
});


/*
  Disable Writing Cache Files To Disk
 */
require('marko/compiler').configure({ writeToDisk: !isProduction });


/*
  Lasso Bundling Config
 */
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


/*
  Production Hot Reload
 */
if (isProduction) {
    require('./dev/hotReload');
}


/*
  Express Instance
 */
var app = express();
app.use(markoExpress());
app.use(compression());
app.use(require('lasso/middleware').serveStatic());


/*
  Dynamic Language Changing
 */
app.use(function (req, res, next) {
  //console.log(req.header('accept-language')); //based on header ?
  if(req.query.l){
    i18n.setLocale(req.query.l);
  }
  next();
});


/*
  Routing Config
 */
var routes = require('./src/routing');
routes.forEach(function (routeConfig) {
    app[routeConfig.method](routeConfig.path, routeConfig.handler);
});


/*
  Port Binding App
 */
app.listen(8080, function () {
    if (isProduction) {
        if (process.send) {
            process.send('online');
        }
    }
});
