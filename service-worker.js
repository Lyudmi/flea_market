"use strict";var precacheConfig=[["/about.2f1e4c8e.png","cc205d8b344d7dfed2563cad00873be3"],["/about.c8901a87.css","66509b8948189ea479d49333fb71a126"],["/about.html","79629d533183c0d7396941c32f9dcf3b"],["/habit.8af4d8d4.css","f058bee69666f0896cb208cd9fbcc75a"],["/habits.d4166677.js","1a0bf4264438e33552a2848a5687dd4e"],["/habits.ed17d8d4.png","71076822426102babf25a719d7266945"],["/habits.html","249c1082215f4fd0db4f38702bcda5f5"],["/index.html","d1ba89f59931e2828396c9acb3b57f78"],["/js.adaecac0.js","1297e57acb86afdd828f126a49bb8b71"],["/logo11.f8dcffb7.png","eb2efcc51ecf6d41f300dbe5828e576f"],["/logo22.0a36e329.png","f7bf8b12f02540ae5f1eb8d13158ec92"],["/logo41.4e8aa2d7.png","b736e3f7efc0680bae0b08a3381369a3"],["/logo6(1).0d57ca86.png","81dd2aeb90413462b470855926439fb9"],["/logo_habits2.5a8890a3.png","09ccc8d80d3393c6f6e0d783f25b6de8"],["/main.048869da.css","add80927ff682885799cb45ced4bc4dc"],["/main.db1ca8f4.js","d9fcd6bcdd70471e9a6a573f7397328c"],["/manifest.04911a7e.js","d88380972e350006452382fd2bde79c3"],["/map.0d2cc966.png","f37fdcd8c17cd529a1b74f55d17dc7f3"],["/map.905bc543.js","f080d2ada5bc4981f8986fb4043a0ffa"],["/map.a33c91c0.css","099f11da157e6cb9da2e68bc5888d42f"],["/map.html","7fd7f8b330aa99f1902837708578e161"],["/question.29781352.png","31558b18a1754ed00c90ca6a3d430f00"],["/style.636a09ea.css","ffffe857f455d22aebdcb5f0b703bcb3"],["/task.830cf793.png","7b0ab2f8778de5cbb8e729f0bbb440e6"],["/todo.391cc7ed.js","d578842a77a5cff2b45e4e2a70ef7abd"],["/todo.c602e3c2.css","3f84cbb1ca400861e986267856168812"],["/todo.html","188ddddc30caebfeef443f4720e4d15d"],["/weather.5df229ac.js","a3467027be1b2d023a0d1ed5eb797eda"],["/weather.985b3ac4.css","f35ffe213ad5015f7838553d101b5743"],["/weather.f893b863.png","5b0d8de547b28670842c2c0dc02ab227"],["/weather.html","a30ce268949425fc9e4f5693b3b887f5"],["/weather_back.ce91750b.png","7be0b27467cb7fcf04b9797e3ac28257"]],cacheName="sw-precache-v3-flea_market-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});