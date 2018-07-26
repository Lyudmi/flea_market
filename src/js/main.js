// div.cd-left
// =========================

// =========================
// SetDateandWeatherMainApi
// =========================

import { LocationApi, LocalStorageApi, Weather, Dom } from "./loc&WeatherApi.js";

class setDateMain {
    setDate() {
        this.time = document.getElementById("time");
        this.day = document.getElementById("day");
        this.date = new Date();
        const timeOptions = {
            hour: "numeric", 
            minute: "numeric",
        };
        const dayOptions = {
            weekday: "long", 
            day: "numeric", 
            month: "long",
            year: "numeric",
        };

        this.time.innerHTML = this.date.toLocaleTimeString("en-GB", timeOptions);
        this.day.innerHTML = this.date.toLocaleDateString("en-GB", dayOptions);
    }

}

const date = new setDateMain();
const dom = new Dom();
const weather = new Weather;
const loc = new LocationApi;
const storage = new LocalStorageApi();

function loadDateAndLocation(){
    dom.showPreloader();
    date.setDate();
    storage.removeStorageItem();
    loc.getMyLocation()
    	.catch(rej => {
			console.log('Error:', rej);
			return { "city" : "Poltava"}
		})
        .then(res => weather.getWeather(res.city))
        .then(res => {
            dom.setLocation(res);
            dom.setWeatherMain(res);
            dom.hidePreloader();
		})
		.catch(rej => {
			dom.hidePreloader();
			console.log('Error:', rej);
		})
}

window.onload = () => {
    loadDateAndLocation();
}

// =========================
// SheduleItem
// =========================

class ScheduleItem {
	constructor(day, parent){
		this.date = new Date(day).toLocaleDateString().split(".").reverse().join("-");

		this.scheduleItem = document.createElement("div");
		this.scheduleItem.classList.add("schedule_item");

		this.weekday = document.createElement("span");
		this.weekday.classList.add("weekday");
		this.dayMonth = document.createElement("span");
		this.dayMonth.classList.add("day_month");
		this.taskDate = document.createElement("div");
		this.taskDate.classList.add("task_date");
		this.taskDate.appendChild(this.weekday);
		this.taskDate.appendChild(this.dayMonth);

		this.taskRow = document.createElement("div");
		this.taskRow.classList.add("task_row");
		this.statOutput = document.createElement("div");
		this.statOutput.classList.add("statOutput");
		this.navArrow = document.createElement("span");
		this.navArrow.classList.add("navArrow");
		this.navArrow.innerHTML = "<i class='fas fa-caret-down'></i>";
		this.navArrow.classList.add("hide");
		this.taskSet = document.createElement("div");
		this.taskSet.classList.add("taskSet");
		this.taskSet.appendChild(this.taskRow);
		this.taskSet.appendChild(this.statOutput);
		this.taskSet.appendChild(this.navArrow);
		
		this.setDate(day);
		this.setTasks();
		this.setStatistic();
		this.checkHiddenTask = true;
		this.scheduleItem.onclick = this.hideTasks.bind(this);		

		this.scheduleItem.appendChild(this.taskDate);
		this.scheduleItem.appendChild(this.taskSet);		
		parent.appendChild(this.scheduleItem);
	}

	setDate(day){
		this.weekday.textContent = new Date(day).toDateString().slice(0, 3);
		this.dayMonth.textContent = new Date(day).toLocaleDateString().slice(0, 5);
    }
    
    setTasks(){
		this.taskStr = "";
		if(todoCache[this.date]){
			this.taskArr = Object.values(todoCache[this.date]);
			this.taskArr.map((el) => {
				if(this.taskArr.indexOf(el) < 3) {
					(el.state === true) ? this.taskStr +=`<p><span>${el.task}</span></p>`
										: this.taskStr +=`<p>${el.task}</p>`;
					
					this.navArrow.classList.add("hide");
										
				} else {				
					(el.state === true) ? this.taskStr +=`<p class="hide"><span>${el.task}</span></p>`
										: this.taskStr +=`<p class="hide">${el.task}</p>`;

					this.navArrow.classList.remove("hide");
				}
			});
		}	
		this.taskRow.innerHTML = this.taskStr;
	}

	setStatistic(){
		if(todoCache[this.date]){
			this.total = Object.keys(todoCache[this.date]).length;
			this.done = 0;			
			for(let obj of Object.values(todoCache[this.date])){
				if (obj.state === true) {
					this.done += 1;
				}
			}
			(this.done === this.total) ? this.statistic = `All tasks completed`
							: this.statistic = `Completed: <span class="completed">${this.done}</span> of <span class="total">${this.total}</span>`;		
		} else {
			this.total = 0;
			this.statistic = `${this.total} task on this day`;
		}			
		this.statOutput.innerHTML = this.statistic;
	}

	hideTasks(){
		this.arr = this.scheduleItem.querySelectorAll("p");
		if(this.arr.length > 3) {
			if(this.checkHiddenTask) {
				for(let i = 3; i < this.arr.length; i++){
					this.arr[i].classList.remove("hide");
				}
				this.checkHiddenTask = false;
				this.navArrow.innerHTML = "<i class='fas fa-caret-up'></i>";

			} else {
				for(let i = 3; i < this.arr.length; i++){
					this.arr[i].classList.add("hide");
				}
				this.checkHiddenTask = true;
				this.navArrow.innerHTML = "<i class='fas fa-caret-down'></i>";									
			}
		}					
	}	
}

const todoCache = JSON.parse(localStorage.getItem("todoCache")) || {};
const scheduleWrp = document.getElementById("schedule_wrp");
const schedule = document.createElement("div");
schedule.setAttribute("id", "schedule");

for (let i = 0, day = (new Date().getTime() - (24 * 60 * 60 * 1000)); 
		i < 8; 
		i++, day += (24 * 60 * 60 * 1000)){

		let scheduleItem = new ScheduleItem(day, schedule);
}

scheduleWrp.appendChild(schedule);

// ========================================








