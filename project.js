var projectConfig = {
  name: 'TYMobileWeb'
};

var productionConfig = {
  minify: true,
  minifyCss: true,
  minifyJs: true,
  outputDir: 's/',
  fingerPrintsEnabled: true,
  staticUrlPrefix: '/s/'
};


if(process.env.NODE_ENV == 'production'){
  for(var config in productionConfig){
    projectConfig[config] = productionConfig[config];
  }
}

module.exports = require("marko-starter").projectConfig(projectConfig);
