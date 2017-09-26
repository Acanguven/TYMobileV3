var nodeFetch = require('node-fetch');

function Cacher(){
  this.cacheData = {};
}

Cacher.prototype.fetch = function(url){
  var self = this;
  return new Promise(function(resolve, reject){
    if(self.cacheData[url]){
      resolve({data:self.cacheData[url], cache: true});
    }else{
      nodeFetch(url).then(function(res){
        return res.json();
       }).then(function(json){
        self.cacheData[url] = json;
        resolve({data:json, cache: false});
       }).catch(function(err){
        reject(err);
       });
     }
  });
}

Cacher.prototype.cacheSync = function(key, value){
  this.cacheData[key] = value;
}

module.exports = new Cacher();
