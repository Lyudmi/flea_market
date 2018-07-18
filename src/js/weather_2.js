// =======================
// locationApi
// =======================
          
class LocationApi {
    getMyIp () {
        return fetch("https://api.ipify.org?format=json")
        .then(res => {
            if(res.status === 200){
                return res.json();
            }

            return Promise.reject(res.status);
        })
    }

    getMyLocation(my_ip){
        const ipCache = JSON.parse(localStorage.getItem("ipCache")) || {};
        if (ipCache[my_ip]) {
            if (Date.now() - ipCache[my_ip].timestamp < 1000 * 60 * 20) {
                return Promise.resolve(ipCache[my_ip].data);

            } else {
                ipCache[my_ip] = null;
                localStorage.setItem("ipCache", JSON.stringify(ipCache));
            }
        }

        const access_key = "d7e18e707400c1adebbaa807b91efaf4";
        return fetch(`http://api.ipstack.com/${my_ip}?access_key=${access_key}`)
        .then(res => {
            if(res.status === 200){
                return res.json();
            }

            return Promise.reject(res.status);
        })

        .then((data) => {
                ipCache[my_ip] = {
                    timestamp: Date.now(),
                    data,
                };
                localStorage.setItem("ipCache", JSON.stringify(ipCache));

                return data;
            });
    }

}

// =======================
// localStorageApi
// =======================

class LocalStorageApi {
    removeStorageItem(){
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            // console.log(key);
            let keyValue =  JSON.parse(localStorage.getItem(key)); 
            // console.log(keyValue);
            for (let j in keyValue) {
                if (Date.now() - keyValue[j].timestamp > 1000 * 60 * 20) {
                    localStorage.removeItem(key);
                }
            }
        }
    }
}


// =======================
// weatherApi
// =======================

class Weather {
    getWeather(city){
        const weatherCache = JSON.parse(localStorage.getItem("weatherCache")) || {};
        if (weatherCache[city]) {
            if (Date.now() - weatherCache[city].timestamp < 1000 * 60 * 20) {
                return Promise.resolve(weatherCache[city].data);

            } else {
                weatherCache[city] = null;
                localStorage.setItem("weatherCache", JSON.stringify(weatherCache));
            }
        }

        const api_key = "f79e38a9176442b59ae105655180707";
        return fetch(`http://api.apixu.com/v1/forecast.json?key=${api_key}&q=${city}&days=6&lang=en`)
       	.then(res => {
            if(res.status === 200){
                return res.json();
            } 
            
            return Promise.reject(res.status);
		})

        .then((data) => {
                weatherCache[city] = {
                    timestamp: Date.now(),
                    data,
                };
                localStorage.setItem("weatherCache", JSON.stringify(weatherCache));

                return data;
            });

        // .catch(rej => {
        //     console.log(rej);
        // })
    }
}

// =======================
// domApi
// =======================


class Dom {
    constructor(){
        this.preloader = document.getElementsByClassName("preloader");
        this.locationBlock =  document.getElementById("location_block");

        this.country = document.getElementById("country");
        this.city = document.getElementById("city");
        // this.city_wthr = document.getElementById("city_wthr");

    }

    showPreloader() {
        setTimeout(() => {
            for (let i = 0; i < this.preloader.length; i += 1){
                this.preloader[i].classList.remove("done");
            }
        }, 500);
    }

    hidePreloader() {
        setTimeout(() => {
            for (let i = 0; i < this.preloader.length; i += 1){
                this.preloader[i].classList.add("done");
            }
        }, 500);
    }

    setLocation(coordinates) {
        this.country.innerHTML = coordinates.location.country;
        this.city.innerHTML = coordinates.location.name;
        // this.city_wthr.innerHTML = coordinates.city;

    }

    setWeatherToday(weatherData){
        const weather_today = document.getElementById("weather_today");
        this.weekday =  weather_today.querySelector("[class='weekday']");
        this.date =  weather_today.querySelector("[class='date']");
        this.weatherIcon =  weather_today.querySelector("[class='weather_icon']");
        this.description = weather_today.querySelector("[class='description']");
        this.tempMax =  weather_today.querySelector("[class='temp_max']");
        this.tempMin =  weather_today.querySelector("[class='temp_min']");
        this.humidity = weather_today.querySelector("[class='humidity']");
        this.pressure = weather_today.querySelector("[class='pressure']");
        this.winds = weather_today.querySelector("[class='wind']");

        // this.city_wthr.innerHTML = weatherData.location.name;
        this.date.innerHTML = weatherData.forecast.forecastday[0].date;
        this.day = new Date(this.date.innerHTML);
        this.weekday.innerHTML = this.day.toLocaleString("en", {weekday: "short"});
        this.weatherIcon.src = "http:" + weatherData.current.condition.icon;  
        this.description.innerHTML = weatherData.current.condition.text;
        this.tempMax.innerHTML = weatherData.current.temp_c + " ºC";
        this.tempMin.innerHTML = weatherData.forecast.forecastday[0].day.mintemp_c + " ºC";
        this.humidity.innerHTML = weatherData.current.humidity + " %";
        this.pressure.innerHTML = weatherData.current.pressure_mb + " hPa";
        this.winds.innerHTML = (weatherData.current.wind_kph / 3.6).toFixed(1) + " m/s";
    }

    setWeatherForecast(weatherData){
        const weather_item = document.getElementsByClassName("weather_item");
        for (let i = 0; i < weather_item.length; i++){
            this.weekday =  weather_item[i].querySelector("[class='weekday']");
            this.date =  weather_item[i].querySelector("[class='date']");
            this.weatherIcon =  weather_item[i].querySelector("[class='weather_icon']");
            this.tempMax =  weather_item[i].querySelector("[class='temp_max']");
            this.tempMin =  weather_item[i].querySelector("[class='temp_min']");
            
            this.date.innerHTML = weatherData.forecast.forecastday[i + 1].date;
            this.day = new Date(this.date.innerHTML);
            this.weekday.innerHTML = this.day.toLocaleString("en", {weekday: "short"});
            this.weatherIcon.src = "http:" + weatherData.forecast.forecastday[i + 1].day.condition.icon;
            this.tempMax.innerHTML = weatherData.forecast.forecastday[i + 1].day.maxtemp_c + " ºC";
            this.tempMin.innerHTML = weatherData.forecast.forecastday[i + 1].day.mintemp_c + " ºC";
        }
    }

    setWeatherMain(weatherData){
        const weather_today = document.getElementById("weather_today");
        this.weatherIcon =  weather_today.querySelector("[class='weather_icon']");
        this.description = weather_today.querySelector("[class='description']");
        this.tempMax =  weather_today.querySelector("[class='temp_max']");
        this.tempMin =  weather_today.querySelector("[class='temp_min']");
        
        this.weatherIcon.src = "http:" + weatherData.current.condition.icon;  
        this.description.innerHTML = weatherData.current.condition.text;
        this.tempMax.innerHTML = weatherData.current.temp_c + " ºC";
        this.tempMin.innerHTML = weatherData.forecast.forecastday[0].day.mintemp_c + " ºC";
    }

    showError(error){
        this.errorMessage = document.getElementById("error");
        this.inputCity = document.getElementById("input_city");
        if(!this.inputCity.value) {
            this.errorMessage.innerHTML = "Please, type city";
            this.inputCity.classList.add("error");

        } else if (!/^[A-z]{1,}/.test(this.inputCity.value)) {
            this.errorMessage.innerHTML = `Please, type city with Latin characters.`;
            this.inputCity.classList.add("error");

        } else if (error === 400) {
            // this.errorMessage.innerHTML = `Error ${error}. Message: ${error.error.code} :  ${error.error.message}. Please, try again`;
            this.errorMessage.innerHTML = `Error ${error}. No location is found. Please, type correct city`;
            this.inputCity.classList.add("error");
        } else {
            this.errorMessage.innerHTML = `Error ${error}. Server is not available. Please, try again later`;
        }

        this.errorMessage.classList.remove("done");
        this.hidePreloader();

        this.inputCity.onkeyup = () => {
            this.errorMessage.classList.add("done");
            this.inputCity.classList.remove("error");
        }
    }
}


// =======================
// index_2
// =======================


const loc = new LocationApi();
const weather = new Weather();
const dom = new Dom();
const storage = new LocalStorageApi();
const btnWeather = document.getElementById("weather");

window.onload = () => {
    dom.showPreloader();
    storage.removeStorageItem();
    loc.getMyIp()
        .then(res => loc.getMyLocation(res.ip))
        .then(res => weather.getWeather(res.city))
        .then(res => {
            dom.setWeatherToday(res);
            dom.setWeatherForecast(res);
            console.log(res);
            dom.setLocation(res);
            dom.hidePreloader();
        })
        // .then(res => dom.hidePreloader())
         
        .catch(error => {
            console.log(error);
            alert(`Error ${error}. Sever is not available. Please, try again later`);
        });
}

// let coord = {"ip":"93.78.218.204","type":"ipv4","continent_code":"EU","continent_name":"Europe","country_code":"UA","country_name":"Ukraine","region_code":"53","region_name":"Poltavs'ka Oblast'","city":"Poltava","zip":"36004","latitude":49.5937,"longitude":34.5407,"location":{"geoname_id":696643,"capital":"Kyiv","languages":[{"code":"uk","name":"Ukrainian","native":"\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430"}],"country_flag":"http:\/\/assets.ipstack.com\/flags\/ua.svg","country_flag_emoji":"\ud83c\uddfa\ud83c\udde6","country_flag_emoji_unicode":"U+1F1FA U+1F1E6","calling_code":"380","is_eu":false}};
// let wthr = {"location":{"name":"Poltava","region":"Poltavs'ka Oblast'","country":"Ukraine","lat":49.58,"lon":34.57,"tz_id":"Europe/Kiev","localtime_epoch":1531050340,"localtime":"2018-07-08 14:45"},"current":{"last_updated_epoch":1531049408,"last_updated":"2018-07-08 14:30","temp_c":23.9,"temp_f":75.0,"is_day":1,"condition":{"text":"Cloudy","icon":"//cdn.apixu.com/weather/64x64/day/119.png","code":1006},"wind_mph":8.7,"wind_kph":14.0,"wind_degree":296,"wind_dir":"WNW","pressure_mb":1010.0,"pressure_in":30.3,"precip_mm":0.0,"precip_in":0.0,"humidity":58,"cloud":64,"feelslike_c":25.4,"feelslike_f":77.7,"vis_km":19.6,"vis_miles":12.0},"forecast":{"forecastday":[{"date":"2018-07-08","date_epoch":1531008000,"day":{"maxtemp_c":25.2,"maxtemp_f":77.4,"mintemp_c":17.6,"mintemp_f":63.7,"avgtemp_c":20.9,"avgtemp_f":69.6,"maxwind_mph":8.7,"maxwind_kph":14.0,"totalprecip_mm":0.0,"totalprecip_in":0.0,"avgvis_km":18.2,"avgvis_miles":11.0,"avghumidity":72.0,"condition":{"text":"Partly cloudy","icon":"//cdn.apixu.com/weather/64x64/day/116.png","code":1003},"uv":7.1},"astro":{"sunrise":"04:44 AM","sunset":"08:49 PM","moonrise":"01:19 AM","moonset":"03:17 PM"}},{"date":"2018-07-09","date_epoch":1531094400,"day":{"maxtemp_c":26.5,"maxtemp_f":79.7,"mintemp_c":18.8,"mintemp_f":65.8,"avgtemp_c":22.2,"avgtemp_f":71.9,"maxwind_mph":6.5,"maxwind_kph":10.4,"totalprecip_mm":1.2,"totalprecip_in":0.05,"avgvis_km":18.9,"avgvis_miles":11.0,"avghumidity":69.0,"condition":{"text":"Heavy rain at times","icon":"//cdn.apixu.com/weather/64x64/day/305.png","code":1192},"uv":7.2},"astro":{"sunrise":"04:45 AM","sunset":"08:48 PM","moonrise":"01:48 AM","moonset":"04:31 PM"}},{"date":"2018-07-10","date_epoch":1531180800,"day":{"maxtemp_c":27.9,"maxtemp_f":82.2,"mintemp_c":19.9,"mintemp_f":67.8,"avgtemp_c":24.0,"avgtemp_f":75.2,"maxwind_mph":3.8,"maxwind_kph":6.1,"totalprecip_mm":0.0,"totalprecip_in":0.0,"avgvis_km":19.6,"avgvis_miles":12.0,"avghumidity":63.0,"condition":{"text":"Partly cloudy","icon":"//cdn.apixu.com/weather/64x64/day/116.png","code":1003},"uv":7.2},"astro":{"sunrise":"04:46 AM","sunset":"08:48 PM","moonrise":"02:21 AM","moonset":"05:47 PM"}},{"date":"2018-07-11","date_epoch":1531267200,"day":{"maxtemp_c":30.2,"maxtemp_f":86.4,"mintemp_c":19.7,"mintemp_f":67.5,"avgtemp_c":25.5,"avgtemp_f":77.8,"maxwind_mph":7.6,"maxwind_kph":12.2,"totalprecip_mm":0.5,"totalprecip_in":0.02,"avgvis_km":19.5,"avgvis_miles":12.0,"avghumidity":59.0,"condition":{"text":"Moderate rain at times","icon":"//cdn.apixu.com/weather/64x64/day/299.png","code":1186},"uv":7.1},"astro":{"sunrise":"04:47 AM","sunset":"08:47 PM","moonrise":"03:04 AM","moonset":"07:00 PM"}},{"date":"2018-07-12","date_epoch":1531353600,"day":{"maxtemp_c":32.1,"maxtemp_f":89.8,"mintemp_c":20.0,"mintemp_f":68.0,"avgtemp_c":25.4,"avgtemp_f":77.7,"maxwind_mph":7.8,"maxwind_kph":12.6,"totalprecip_mm":11.8,"totalprecip_in":0.46,"avgvis_km":19.2,"avgvis_miles":11.0,"avghumidity":66.0,"condition":{"text":"Moderate or heavy rain shower","icon":"//cdn.apixu.com/weather/64x64/day/356.png","code":1243},"uv":7.2},"astro":{"sunrise":"04:48 AM","sunset":"08:46 PM","moonrise":"03:57 AM","moonset":"08:06 PM"}},{"date":"2018-07-13","date_epoch":1531440000,"day":{"maxtemp_c":26.9,"maxtemp_f":80.4,"mintemp_c":17.8,"mintemp_f":64.0,"avgtemp_c":22.8,"avgtemp_f":73.0,"maxwind_mph":10.3,"maxwind_kph":16.6,"totalprecip_mm":13.6,"totalprecip_in":0.54,"avgvis_km":16.4,"avgvis_miles":10.0,"avghumidity":76.0,"condition":{"text":"Patchy rain possible","icon":"//cdn.apixu.com/weather/64x64/day/176.png","code":1063},"uv":39960.0},"astro":{"sunrise":"04:49 AM","sunset":"08:46 PM","moonrise":"05:01 AM","moonset":"09:03 PM"}}]}};

// dom.setLocation(wthr);
// dom.setWeatherToday(wthr);
// dom.setWeatherForecast(wthr);


btnWeather.addEventListener("click", () => {
    const inputCity = document.getElementById("input_city");
    if(/^[A-z]{1,}/.test(inputCity.value)) {
        dom.showPreloader();
        weather.getWeather(inputCity.value)
            .then(res => {
                dom.setWeatherToday(res);
                dom.setWeatherForecast(res);
                dom.setLocation(res);
            })
            .then(res => dom.hidePreloader())

            .catch(error => {
                // console.log(error);
                dom.showError(error);
            });
    } else {
        dom.showError(error);
    }
});



