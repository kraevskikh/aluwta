var CACHE="cards-cache";
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(["./","./index.html"])}).then(function(){return self.skipWaiting()}));
});
self.addEventListener("activate",function(e){
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch",function(e){
  var r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(
    fetch(r).then(function(res){
      var copy=res.clone();
      caches.open(CACHE).then(function(c){c.put(r,copy)});
      return res;
    }).catch(function(){
      return caches.match(r).then(function(m){return m||caches.match("./index.html")});
    })
  );
});
