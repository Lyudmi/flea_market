import apiKeys from "./config.json";

// =======================
// locationApi
// =======================
          
export class LocationApi {
    getMyLocation(){
        const ipCache = JSON.parse(localStorage.getItem("ipCache")) || {};
        if (ipCache["location"]) {
            if (Date.now() - ipCache["location"].timestamp < 1000 * 60 * 20) {
                return Promise.resolve(ipCache["location"].data);

            } else {
                ipCache["location"] = null;
                localStorage.setItem("ipCache", JSON.stringify(ipCache));
            }
        }

        
        return fetch(`http://ip-api.com/json`)
        .then(res => {
            if(res.status === 200){
                return res.json();
            }

            return Promise.reject(res.status);
        })

        .then((data) => {
                ipCache["location"] = {
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

export class LocalStorageApi {
    removeStorageItem(){
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let keyValue =  JSON.parse(localStorage.getItem(key)); 
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

export class Weather {
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

        
        return fetch(`https://api.apixu.com/v1/forecast.json?key=${apiKeys.weatherApiKey}&q=${city}&days=6&lang=en`)
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
    }
}

// =======================
// domApi
// =======================

export class Dom {
    constructor(){
        this.preloader = document.getElementsByClassName("preloader");
        this.locationBlock =  document.getElementById("location_block");
        this.country = document.getElementById("country");
        this.city = document.getElementById("city");
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

