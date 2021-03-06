import { LocationApi, LocalStorageApi, Weather, Dom } from "./loc&WeatherApi.js";

const loc = new LocationApi();
const weather = new Weather();
const dom = new Dom();
const storage = new LocalStorageApi();
const btnWeather = document.getElementById("weather");
const inputCity = document.getElementById("input_city");

window.onload = () => {
    dom.showPreloader();
    storage.removeStorageItem();
    loc.getMyLocation()
        .catch(rej => {
            console.log('Error:', rej);
            return { "city" : "Poltava"}
        })
        .then(res => weather.getWeather(res.city))
        .then(res => {
            dom.setWeatherToday(res);
            dom.setWeatherForecast(res);
            dom.setLocation(res);
            dom.hidePreloader();
        })
         
        .catch(error => {
            dom.hidePreloader();
            alert(`Error ${error}. Sever is not available. Please, try again later`);
            console.log('Error:', error);
        });
}

function getWeatherByCity() {
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
                dom.showPreloader();
                console.log(error);
                dom.showError(error);
            });
    } else {
        dom.showError(error);
    }
}

btnWeather.addEventListener("click", getWeatherByCity);

inputCity.addEventListener("keyup", (key) => {
    if(key.keyCode === 13) {
        getWeatherByCity();
    }
})


