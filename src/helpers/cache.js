var nodeFetch = require('node-fetch');

function Cacher(){
  this.cacheData = {};
}

Cacher.prototype.fetch = function(url){
  var self = this;
  return new Promise(function(resolve, reject){
    if(self.cacheData[url]){
      console.log('serving from cache:'+ url)
      resolve(self.cacheData[url]);
    }else{
      nodeFetch(url).then(function(res){
        return res.json();
       }).then(function(json){
        console.log('Caching:'+ url)
        self.cacheData[url] = json;
        resolve(json);
       }).catch(function(err){
        reject(err);
       });
     }
  });
}

module.exports = new Cacher();
