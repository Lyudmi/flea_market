parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"n5RC":[function(require,module,exports) {
window.initAutocomplete=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:49.5832541,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:34.489807;this.lat=e,this.lng=o,console.log(this.lat);var n=new google.maps.Map(document.getElementById("mymap"),{center:{lat:this.lat,lng:this.lng},zoom:14,mapTypeId:"roadmap"}),t=document.getElementById("pac-input"),a=new google.maps.places.SearchBox(t);n.controls[google.maps.ControlPosition.TOP_LEFT].push(t),n.addListener("bounds_changed",function(){a.setBounds(n.getBounds())});var s=[];a.addListener("places_changed",function(){var e=a.getPlaces();if(0!=e.length){s.forEach(function(e){e.setMap(null)}),s=[];var o=new google.maps.LatLngBounds;e.forEach(function(e){if(e.geometry){console.log(e.formatted_address);var t={url:e.icon,size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(25,25)};s.push(new google.maps.Marker({map:n,icon:t,title:e.name+e.formatted_address,position:e.geometry.location,formatted_address:e.formatted_address})),e.geometry.viewport?o.union(e.geometry.viewport):o.extend(e.geometry.location)}else console.log("Returned place contains no geometry")}),console.log(s),n.fitBounds(o)}})};
},{}]},{},["n5RC"], null)
//# sourceMappingURL=/flea_market/map.25dd438a.map