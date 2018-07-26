parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"t8pi":[function(require,module,exports) {
module.exports={weatherApiKey:"f79e38a9176442b59ae105655180707"};
},{}],"Adml":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Dom=exports.Weather=exports.LocalStorageApi=exports.LocationApi=void 0;var e=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),t=require("./config.json"),r=i(t);function i(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=exports.LocationApi=function(){function t(){n(this,t)}return e(t,[{key:"getMyLocation",value:function(){var e=JSON.parse(localStorage.getItem("ipCache"))||{};if(e.location){if(Date.now()-e.location.timestamp<12e5)return Promise.resolve(e.location.data);e.location=null,localStorage.setItem("ipCache",JSON.stringify(e))}return fetch("http://ip-api.com/json").then(function(e){return 200===e.status?e.json():Promise.reject(e.status)}).then(function(t){return e.location={timestamp:Date.now(),data:t},localStorage.setItem("ipCache",JSON.stringify(e)),t})}}]),t}(),o=exports.LocalStorageApi=function(){function t(){n(this,t)}return e(t,[{key:"removeStorageItem",value:function(){for(var e=0;e<localStorage.length;e++){var t=localStorage.key(e),r=JSON.parse(localStorage.getItem(t));for(var i in r)Date.now()-r[i].timestamp>12e5&&localStorage.removeItem(t)}}}]),t}(),s=exports.Weather=function(){function t(){n(this,t)}return e(t,[{key:"getWeather",value:function(e){var t=JSON.parse(localStorage.getItem("weatherCache"))||{};if(t[e]){if(Date.now()-t[e].timestamp<12e5)return Promise.resolve(t[e].data);t[e]=null,localStorage.setItem("weatherCache",JSON.stringify(t))}return fetch("https://api.apixu.com/v1/forecast.json?key="+r.default.weatherApiKey+"&q="+e+"&days=6&lang=en").then(function(e){return 200===e.status?e.json():Promise.reject(e.status)}).then(function(r){return t[e]={timestamp:Date.now(),data:r},localStorage.setItem("weatherCache",JSON.stringify(t)),r})}}]),t}(),c=exports.Dom=function(){function t(){n(this,t),this.preloader=document.getElementsByClassName("preloader"),this.locationBlock=document.getElementById("location_block"),this.country=document.getElementById("country"),this.city=document.getElementById("city")}return e(t,[{key:"showPreloader",value:function(){var e=this;setTimeout(function(){for(var t=0;t<e.preloader.length;t+=1)e.preloader[t].classList.remove("done")},500)}},{key:"hidePreloader",value:function(){var e=this;setTimeout(function(){for(var t=0;t<e.preloader.length;t+=1)e.preloader[t].classList.add("done")},500)}},{key:"setLocation",value:function(e){this.country.innerHTML=e.location.country,this.city.innerHTML=e.location.name}},{key:"setWeatherToday",value:function(e){var t=document.getElementById("weather_today");this.weekday=t.querySelector("[class='weekday']"),this.date=t.querySelector("[class='date']"),this.weatherIcon=t.querySelector("[class='weather_icon']"),this.description=t.querySelector("[class='description']"),this.tempMax=t.querySelector("[class='temp_max']"),this.tempMin=t.querySelector("[class='temp_min']"),this.humidity=t.querySelector("[class='humidity']"),this.pressure=t.querySelector("[class='pressure']"),this.winds=t.querySelector("[class='wind']"),this.date.innerHTML=e.forecast.forecastday[0].date,this.day=new Date(this.date.innerHTML),this.weekday.innerHTML=this.day.toLocaleString("en",{weekday:"short"}),this.weatherIcon.src="http:"+e.current.condition.icon,this.description.innerHTML=e.current.condition.text,this.tempMax.innerHTML=e.current.temp_c+" ºC",this.tempMin.innerHTML=e.forecast.forecastday[0].day.mintemp_c+" ºC",this.humidity.innerHTML=e.current.humidity+" %",this.pressure.innerHTML=e.current.pressure_mb+" hPa",this.winds.innerHTML=(e.current.wind_kph/3.6).toFixed(1)+" m/s"}},{key:"setWeatherForecast",value:function(e){for(var t=document.getElementsByClassName("weather_item"),r=0;r<t.length;r++)this.weekday=t[r].querySelector("[class='weekday']"),this.date=t[r].querySelector("[class='date']"),this.weatherIcon=t[r].querySelector("[class='weather_icon']"),this.tempMax=t[r].querySelector("[class='temp_max']"),this.tempMin=t[r].querySelector("[class='temp_min']"),this.date.innerHTML=e.forecast.forecastday[r+1].date,this.day=new Date(this.date.innerHTML),this.weekday.innerHTML=this.day.toLocaleString("en",{weekday:"short"}),this.weatherIcon.src="http:"+e.forecast.forecastday[r+1].day.condition.icon,this.tempMax.innerHTML=e.forecast.forecastday[r+1].day.maxtemp_c+" ºC",this.tempMin.innerHTML=e.forecast.forecastday[r+1].day.mintemp_c+" ºC"}},{key:"setWeatherMain",value:function(e){var t=document.getElementById("weather_today");this.weatherIcon=t.querySelector("[class='weather_icon']"),this.description=t.querySelector("[class='description']"),this.tempMax=t.querySelector("[class='temp_max']"),this.tempMin=t.querySelector("[class='temp_min']"),this.weatherIcon.src="http:"+e.current.condition.icon,this.description.innerHTML=e.current.condition.text,this.tempMax.innerHTML=e.current.temp_c+" ºC",this.tempMin.innerHTML=e.forecast.forecastday[0].day.mintemp_c+" ºC"}},{key:"showError",value:function(e){var t=this;this.errorMessage=document.getElementById("error"),this.inputCity=document.getElementById("input_city"),this.inputCity.value?/^[A-z]{1,}/.test(this.inputCity.value)?400===e?(this.errorMessage.innerHTML="Error "+e+". No location is found. Please, type correct city",this.inputCity.classList.add("error")):this.errorMessage.innerHTML="Error "+e+". Server is not available. Please, try again later":(this.errorMessage.innerHTML="Please, type city with Latin characters.",this.inputCity.classList.add("error")):(this.errorMessage.innerHTML="Please, type city",this.inputCity.classList.add("error")),this.errorMessage.classList.remove("done"),this.hidePreloader(),this.inputCity.onkeyup=function(){t.errorMessage.classList.add("done"),t.inputCity.classList.remove("error")}}}]),t}();
},{"./config.json":"t8pi"}],"Zj9U":[function(require,module,exports) {
"use strict";var e=require("./loc&WeatherApi.js"),t=new e.LocationApi,o=new e.Weather,r=new e.Dom,n=new e.LocalStorageApi,a=document.getElementById("weather"),i=document.getElementById("input_city");function c(){var e=document.getElementById("input_city");/^[A-z]{1,}/.test(e.value)?(r.showPreloader(),o.getWeather(e.value).then(function(e){r.setWeatherToday(e),r.setWeatherForecast(e),r.setLocation(e)}).then(function(e){return r.hidePreloader()}).catch(function(e){r.showPreloader(),console.log(e),r.showError(e)})):r.showError(error)}window.onload=function(){r.showPreloader(),n.removeStorageItem(),t.getMyLocation().then(function(e){return o.getWeather(e.city)}).then(function(e){r.setWeatherToday(e),r.setWeatherForecast(e),r.setLocation(e),r.hidePreloader()}).catch(function(e){r.hidePreloader(),alert("Error "+e+". Sever is not available. Please, try again later"),console.log("Error:",e)})},a.addEventListener("click",c),i.addEventListener("keyup",function(e){13===e.keyCode&&c()});
},{"./loc&WeatherApi.js":"Adml"}]},{},["Zj9U"], null)
//# sourceMappingURL=/flea_market/weather.18b738f3.map