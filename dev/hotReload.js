var path = require('path');
var markoReload = require('marko/hot-reload');
var watch = require('node-watch');
var sourceDir = path.join(__dirname, '../src');
var browserRefresh = require('marko/browser-refresh');

//browserRefresh.enable();
require('marko/browser-refresh').enable();
require('lasso/browser-refresh').enable('*.marko *.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg');
//markoReload.enable();

watch(sourceDir, { recursive: true }, function(evt, filename) {
    if (/\.marko$/.test(filename)) {
        markoReload.handleFileModified(filename);
    }
});