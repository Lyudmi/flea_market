"use strict";var precacheConfig=[["/flea_market/about.45af6681.png","cc205d8b344d7dfed2563cad00873be3"],["/flea_market/about.55efda69.css","0f1e61d96f5df4efb9a8267b588e8f37"],["/flea_market/about.html","dd8b58f9912abae8be2e45ab29cd5e1a"],["/flea_market/habit.18bb60ec.css","f6cee8f1f6d8fe9113156be2261ab33b"],["/flea_market/habits.34648e0d.png","71076822426102babf25a719d7266945"],["/flea_market/habits.e4f6e207.js","39d265d887fd6028f356108ef9e094a7"],["/flea_market/habits.html","96bb5ab0a9d790c08f711941cb5d3dc7"],["/flea_market/index.html","f936d75d3627802d4240d496de506efe"],["/flea_market/js.399519bd.js","d2c04ae3fadf92babc33a6be5d72c4f9"],["/flea_market/logo11.2fe65bb9.png","eb2efcc51ecf6d41f300dbe5828e576f"],["/flea_market/logo22.d6d5b346.png","f7bf8b12f02540ae5f1eb8d13158ec92"],["/flea_market/logo41.4a54a8fe.png","b736e3f7efc0680bae0b08a3381369a3"],["/flea_market/logo6(1).4e79c1fe.png","81dd2aeb90413462b470855926439fb9"],["/flea_market/logo_habits2.f91df08e.png","09ccc8d80d3393c6f6e0d783f25b6de8"],["/flea_market/main.219cb472.css","4d4cb55d93921ed0befec127c4cff7b8"],["/flea_market/main.45073534.js","f4f5e81a2735044189fdd72994ccb49b"],["/flea_market/map.25dd438a.js","b514abaee60f7f68542956793808db90"],["/flea_market/map.6aa5fd07.css","6a8b4eda41c44a1edc4c2a10a2c29b36"],["/flea_market/map.cb545759.png","f37fdcd8c17cd529a1b74f55d17dc7f3"],["/flea_market/map.html","0b30d2e568b9f5f81134249031fcdc9c"],["/flea_market/question.9237edd6.png","31558b18a1754ed00c90ca6a3d430f00"],["/flea_market/style.a38d63a5.css","14470b71dd958b573d53a6aa44671a9e"],["/flea_market/task.5617f64e.png","7b0ab2f8778de5cbb8e729f0bbb440e6"],["/flea_market/todo.19712837.js","0b4e22d707b4619cab309536975d0407"],["/flea_market/todo.d2cf73e2.css","4ae115a0b4a0cdd10097cfa5759d8c8a"],["/flea_market/todo.html","a04d32314d2b1da1f86dd532180c219e"],["/flea_market/weather.18b738f3.js","fecbc26fe0024179dc9744feddbb9d1f"],["/flea_market/weather.547f5516.css","84ecab17405798e49f2f8bacaa847b86"],["/flea_market/weather.fbe535c5.png","5b0d8de547b28670842c2c0dc02ab227"],["/flea_market/weather.html","9055eeb95ef2350f7867e53afee79145"],["/flea_market/weather_back.1750ba47.png","7be0b27467cb7fcf04b9797e3ac28257"]],cacheName="sw-precache-v3-flea_market-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],r=new URL(a,self.location),n=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var r=new Request(t,{credentials:"same-origin"});return fetch(r).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/flea_market/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});