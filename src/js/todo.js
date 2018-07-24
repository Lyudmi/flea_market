// =============================================
// todoApi
// =============================================

class List{
	constructor(date, parent){
		this.date = date;
		this.list = document.createElement("ul");
		this.list.setAttribute("id", this.date);
		this.list.classList.add("todolist");
		this.cell = document.getElementById(`td${this.date}`);

		this.closebtn = document.createElement("span");
		this.closebtn.classList.add("close_list");
		this.closebtn.setAttribute("title", "Close");
		this.closebtn.innerHTML = "<i class='fas fa-times'></i>";		
		this.dateOutput = document.createElement("p");
		this.dateOutput.textContent = this.date;
	
		this.noTaskMesssage = document.createElement("div");
		this.noTaskMesssage.setAttribute("id", `noTaskMesssage_${this.date}`);
		this.noTaskMesssage.textContent = "No task on this date";
		this.noTaskMesssage.classList.add("hide");	
	
		this.navBlock = document.createElement("nav");
		this.navBlock.setAttribute("id", `nav_${this.date}`);
		this.showUndonebtn = document.createElement("button");
		this.showUndonebtn.innerHTML = "Undone";
		this.showDonebtn = document.createElement("button");
		this.showDonebtn.innerHTML = "Done";	
		this.showAllbtn = document.createElement("button");
		this.showAllbtn.innerHTML = "Show all";
		this.deleteAllbtn = document.createElement("button");
		this.deleteAllbtn.innerHTML = "Delete All";

		this.completeAllInp = document.createElement("input");
		this.completeAllInp.setAttribute("type", "checkbox");
		this.completeAllInp.setAttribute("id", `completeAllInp_${this.date}`);
		this.completeAllInp.style.display = "none";
		this.completeAllLabel = document.createElement("label");
		this.completeAllLabel.setAttribute("for", `completeAllInp_${this.date}`);
		this.completeAllLabel.innerHTML = "Complete All";
		this.checkCompleted = false;

		this.closebtn.onclick = this.closeList.bind(this);
		this.showUndonebtn.onclick = this.filterTask.bind(this, false);
		this.showDonebtn.onclick = this.filterTask.bind(this, true);
		this.showAllbtn.onclick = this.showAll.bind(this);
		this.deleteAllbtn.onclick = this.deleteAll.bind(this);
		this.completeAllInp.onchange = this.completeAll.bind(this);
		// =====================================================
		// this.showCounter = document.createElement("p");
		// this.showCounter.setAttribute("id", `showCounter_${this.date}`);
		// this.counter = 0;
		// =====================================================
		// this.navBlock.appendChild(this.showCounter);
		this.navBlock.appendChild(this.showUndonebtn);
		this.navBlock.appendChild(this.showDonebtn);
		this.navBlock.appendChild(this.showAllbtn);
		this.navBlock.appendChild(this.deleteAllbtn);
		this.navBlock.appendChild(this.completeAllInp);
		this.navBlock.appendChild(this.completeAllLabel);
		
		this.list.appendChild(this.closebtn);
		this.list.appendChild(this.dateOutput);
		this.list.appendChild(this.noTaskMesssage);
		this.list.appendChild(this.navBlock);
		parent.appendChild(this.list);
			
	}

	closeList(){
		this.list.remove();
	}

	filterTask(rule){
		for (let i in todoCache[this.date]) {
			this.li = document.getElementById(`${i}`);
			if(todoCache[this.date][i].state === rule){
				this.li.classList.remove("hide");

			} else if(todoCache[this.date][i].state !== rule){
				this.li.classList.add("hide");
			}
		}
	}

	showAll(){
		for (let i in todoCache[this.date]) {
			this.li = document.getElementById(`${i}`);
			this.li.classList.remove("hide");
		}	
	}

	deleteAll(){
		for (let i in todoCache[this.date]) {
			this.li = document.getElementById(`${i}`);
			this.li.remove();
		}
		this.navBlock.classList.add("hide");
		this.noTaskMesssage.classList.remove("hide");
		if(this.cell) {
            this.cell.classList.remove("occupied");
            this.cell.classList.remove("all_completed");
		}
		delete todoCache[this.date];
		localStorage.setItem("todoCache", JSON.stringify(todoCache));
		// counter = 0;	
	}

	completeAll(){
		if(this.checkCompleted !== true){
			for (let i in todoCache[this.date]) {
				todoCache[this.date][i].state = true;
				this.li = document.getElementById(`${i}`);				
				this.li.querySelector("span").classList.add("done_task");
				this.li.querySelector(`label[for=check_${i}`).classList.add("inp_checked");
				this.li.querySelector("button.editbtn").setAttribute("disabled", true);
			}
			this.checkCompleted = true;
			this.completeAllLabel.innerHTML = "Uncomplete All";
			// if(this.cell){
			// 	this.cell.classList.remove("occupied");
			// 	this.cell.classList.add("all_completed");
			// }
			// counter = 0;

		} else {
			for (let i in todoCache[this.date]) {
				todoCache[this.date][i].state = false;
				this.li = document.getElementById(`${i}`);
				this.li.querySelector("span").classList.remove("done_task");
				this.li.querySelector(`label[for=check_${i}`).classList.remove("inp_checked");
				this.li.querySelector("button.editbtn").removeAttribute("disabled");
			}
			this.checkCompleted = false;
			this.completeAllLabel.innerHTML = "Complete All";
			// if(this.cell){
			// 	this.cell.classList.add("occupied");
			// 	this.cell.classList.remove("all_completed");
			// }// this.counter = Object.keys(todoCache[this.date]).length;

		}

		// (counter < 2) ? this.counterUndone.innerHTML = `${counter} item left` 
		// 				: this.counterUndone.innerHTML = `${counter} items left`;

		localStorage.setItem("todoCache", JSON.stringify(todoCache));
	}
}

class Task {
	constructor(date, text){
		this.date = date;
		this.text = text;
		this.stamp = Date.now();
		this.taskObj = todoCache[this.date] || {};
		this.cell = document.getElementById(`td${this.date}`);

		// this.counterUndone = document.getElementById(`counterUndone_${this.date}`);
		// this.counter = 0;
		// (this.counter < 2) ? this.counterUndone.innerHTML = `${this.counter} item left` 
		// 					: this.counterUndone.innerHTML = `${this.counter} items left`;

		this.li = document.createElement("li");
		this.li.setAttribute("id", this.stamp);
		this.li.classList.add("todoitem");
		this.doneInp = document.createElement("input");
		this.doneInp.setAttribute("type", "checkbox");
		this.doneInp.setAttribute("id", `check_${this.stamp}`);
		this.doneInp.style.display = "none";
		this.doneLable = document.createElement("label");
		this.doneLable.setAttribute("for", `check_${this.stamp}`);
		this.doneLable.innerHTML = "<i class='fas fa-check'></i>";
		this.span = document.createElement("span");
		this.editinput = document.createElement("textarea");
		this.editinput.classList.add("hide");
		this.editbtn = document.createElement("button");
		this.editbtn.classList.add("editbtn");
		this.editbtn.innerHTML = "<i class='far fa-edit'></i>";
		this.savebtn = document.createElement("button");
		this.savebtn.innerHTML = "<i class='far fa-save'></i>";
		this.savebtn.classList.add("hide");
		this.removebtn = document.createElement("button");
		this.removebtn.innerHTML = "<i class='fas fa-trash'></i>";
		
		this.editbtn.onclick = this.editTask.bind(this);
		this.doneInp.onchange = this.doneTask.bind(this);
		this.removebtn.onclick = this.removeTask.bind(this);

		this.li.appendChild(this.doneInp);
		this.li.appendChild(this.doneLable);
		this.li.appendChild(this.span);
		this.li.appendChild(this.editinput);
		this.li.appendChild(this.editbtn);
		this.li.appendChild(this.savebtn);
		this.li.appendChild(this.removebtn);

		// =====================================================
		this.list = document.getElementById(this.date) || null;
		this.noTaskMesssage = document.getElementById(`noTaskMesssage_${this.date}`);
		this.navBlock = document.getElementById(`nav_${this.date}`);
		
	}

	addTask(){
		if(this.text && this.date){
			console.log("hi");
			this.taskObj[`${this.stamp}`] = {
				task: this.text,
				state: false
			};
			todoCache[this.date] = this.taskObj;
			localStorage.setItem("todoCache", JSON.stringify(todoCache));

			if(this.cell) {
                this.cell.classList.add("occupied");
			}

			this.span.textContent = this.text;
			this.noTaskMesssage.classList.add("hide");
			this.navBlock.classList.remove("hide");
			this.list.appendChild(this.li);
			// this.counter +=1;
			// console.log(this.counter);

			// this.counterUndone();
		}
	}

	editTask() {
		this.editbtn.addEventListener("click", () => {
			this.editinput.value = this.span.textContent;
			this.span.classList.add("hide");
			this.editbtn.classList.add("hide");
			this.editinput.classList.remove("hide");			
			this.savebtn.classList.remove("hide");

			this.editinput.addEventListener("keyup", (key) => {
				if(key.keyCode === 13) {
					this.saveChanges();
				}
			});

			this.savebtn.addEventListener("click", () => {
				this.saveChanges();
			});
		});
	}

	saveChanges(){
		this.span.textContent = this.editinput.value;
		this.editinput.classList.add("hide");
		this.savebtn.classList.add("hide");
		this.span.classList.remove("hide");
		this.editbtn.classList.remove("hide");

		this.taskObj[`${this.stamp}`].task = `${this.span.textContent}`;
		this.taskObj[`${this.stamp}`].state = false;
		todoCache[this.date] = this.taskObj;
		localStorage.setItem("todoCache", JSON.stringify(todoCache));
	}

	doneTask(){
		if(this.taskObj[`${this.stamp}`].state !== true){
			this.span.classList.add("done_task");
			this.doneLable.classList.add("inp_checked");
			this.editbtn.setAttribute("disabled", true);
			this.taskObj[`${this.stamp}`].state = true;
			// this.counter -= 1;

		} else {
			this.span.classList.remove("done_task");
			this.doneLable.classList.remove("inp_checked");
			this.editbtn.removeAttribute("disabled");
			this.taskObj[`${this.stamp}`].state = false;
			// this.counter += 1;
		}
		
		todoCache[this.date] = this.taskObj;
		localStorage.setItem("todoCache", JSON.stringify(todoCache));

		// =======================

		// for(let stamp in todoCache[this.date]){
		// 	if(stamp.status === false){
		// 		this.cell.classList.add("occupied");
		// 		this.cell.classList.remove("all_completed");
		// 	} else  {
		// 		this.cell.classList.remove("occupied");
		// 		this.cell.classList.add("all_completed");
		// 	}
		// }
	}

	removeTask(){
		// if(this.taskObj[`${this.stamp}`].state = false){
		// 	this.counter -= 1;
		// }

		this.list.removeChild(this.li);
		delete this.taskObj[`${this.stamp}`];

		if(Object.keys(this.taskObj).length === 0){
			delete todoCache[this.date];
			this.navBlock.classList.add("hide");
			this.noTaskMesssage.classList.remove("hide");
			if(this.cell) {
                this.cell.classList.remove("occupied");
			}
		} else {
			todoCache[this.date] = this.taskObj;
		}

		localStorage.setItem("todoCache", JSON.stringify(todoCache));
	}
}

class LoadTask extends Task{
	constructor(date, stamp, text, state){
		super();
		this.date = date;
		this.taskObj = todoCache[this.date];
		this.stamp = stamp;
		this.text = text;
		this.state = state;
		// this.counter = Object.keys(this.taskObj).length;

		this.loadTask();
	}

	loadTask(){
		this.list = document.getElementById(this.date);
		this.noTaskMesssage = document.getElementById(`noTaskMesssage_${this.date}`);
		this.navBlock = document.getElementById(`nav_${this.date}`);
		if(this.taskObj){
			this.span.textContent = this.text;
			if(this.taskObj[`${this.stamp}`].state === true){
				this.span.classList.add("done_task");
				this.doneLable.classList.add("inp_checked");
				this.editbtn.setAttribute("disabled", true);
				this.counter -= 1;
			}

			this.doneInp = this.li.querySelector("input[type='checkbox']");
			this.doneLable = this.li.querySelector("label");
			this.doneInp.setAttribute("id", `check_${this.stamp}`);
			this.doneLable.setAttribute("for", `check_${this.stamp}`);
			this.li.setAttribute("id", this.stamp);
			this.list.appendChild(this.li);

		} else {
			this.navBlock.classList.add("hide");
			this.noTaskMesssage.classList.remove("hide");
		}
	}
}

function onTaskAdded(parent){	
	const inpText = document.getElementById("addtask");
	const inpDate = document.getElementById("inpDate");
	const text = inpText.value;
	const date = inpDate.value;
	const list = document.getElementById(date);

	if(!text) {
		inpText.classList.add("inpError");
	} else { 
		inpText.classList.remove("inpError");
	}
	if(!date){
		inpDate.classList.add("inpError");
	} else {
		inpDate.classList.remove("inpError");
	}

	if(text && date){
		if(list) {
			let newTask = new Task(date, text);
			newTask.addTask();

		} else {
			onLoadTask(date, parent);
			let newTask = new Task(date, text);
			newTask.addTask();
		}
		inpText.value = "";		
	}

}

function onLoadTask(date, parent){
	if(!document.getElementById(date)) {
		const ul = new List(date, parent);
		if(!todoCache[date]){
			console.log("no");
			let load = new LoadTask(date);

		} else {
			let stamp, text, state
			for(let i in todoCache[date]){	
				stamp = i;
				text = todoCache[date][i].task;
				state = todoCache[date][i].state;
				let load = new LoadTask(date, stamp, text, state);
			}
		}
	}
}


// =============================================
// calendar 
// =============================================

function Calendar2(id, year, month) {
	let Dlast = new Date(year, month+1,0).getDate();
	let	D = new Date(year, month, Dlast);
	let	DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay();
	let	DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay();
	let	calendar = "<tr>";
	let	monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	
	if (DNfirst != 0) {
	  for(let  i = 1; i < DNfirst; i++) calendar += "<td>";
	} else {
	  for(let  i = 0; i < 6; i++) calendar += "<td>";
	}

	for(let  i = 1; i <= Dlast; i++) {
	  if (i == new Date().getDate() 
	  	&& D.getFullYear() == new Date().getFullYear() 
	  	&& D.getMonth() == new Date().getMonth()) {
	  		calendar += "<td class='today'>" + i;
	  } else {
	    	calendar += "<td>" + i;
	  }

	  if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
	  		calendar += "<tr>";
	  }
	}
	for(let  i = DNlast; i < 7; i++) calendar += "<td>&nbsp</td>";

	document.querySelector("#"+id+" tbody").innerHTML = calendar;
	document.querySelector("#"+id+" thead th:nth-child(2)").innerHTML = monthArr[D.getMonth()] +" "+ D.getFullYear();
	document.querySelector("#"+id+" thead th:nth-child(2)").dataset.month = D.getMonth();
	document.querySelector("#"+id+" thead th:nth-child(2)").dataset.year = D.getFullYear();
	if (document.querySelectorAll("#"+id+" tbody tr").length < 6) {  
	    document.querySelector("#"+id+" tbody").innerHTML += "<tr><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td></tr>";
	}

}

Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());

// previous month
document.querySelector("#calendar2 thead tr:nth-child(1) th:nth-child(1)").onclick = function() {
  Calendar2("calendar2", document.querySelector("#calendar2 thead th:nth-child(2)").dataset.year, 
  	parseFloat(document.querySelector("#calendar2 thead th:nth-child(2)").dataset.month)-1);
  dayPicker(todoWrp);

}

// next month
document.querySelector("#calendar2 thead tr:nth-child(1) th:nth-child(3)").onclick = function() {
  Calendar2("calendar2", document.querySelector("#calendar2 thead th:nth-child(2)").dataset.year, 
  	parseFloat(document.querySelector("#calendar2 thead th:nth-child(2)").dataset.month)+1);
    dayPicker(todoWrp);
}

// ============================================
// dayPicker
// ============================================

function dayPicker(parent){
	const tbody = document.getElementById("daySet");
	let cell = tbody.getElementsByTagName("td");
	let monthSet = document.getElementById("monthSet");
	let month = parseInt(monthSet.getAttribute("data-month"), 10) + 1;
	if(month < 10) month = "0" + month;
	let year = parseInt(monthSet.getAttribute("data-year"), 10);
	let day = "";
	let date ="";
	for(let i = 0; i < cell.length; i++){
		if(cell[i].textContent !== "&nbsp"){
            day = parseInt(cell[i].textContent, 10);
			if(day < 10) day = "0" + day;
			date = year+"-"+month+"-"+day;
            cell[i].setAttribute("id", `td${date}`);
            
			if(!isNaN(day)) {
                cell[i].addEventListener("click", (e) => {
                    let date = e.target.id.slice(2);
                    onLoadTask(date, parent);
                });
            } 
			if(todoCache[date]) {
				cell[i].classList.add("occupied");

			} else {
                cell[i].classList.remove("occupied");
                // cell[i].setAttribute("title", "No task on this day");   
			}
		}
	}
}



// function scrollToElement(theElement) {
//     var selectedPosX = 0;
////     var selectedPosY = 0;
//
   
//
//     while (theElement != null) {
// 
//       selectedPosX += theElement.offsetLeft;
//
//         selectedPosY += theElement.offsetTop;
//
//         theElement = theElement.offsetParent;
// 
//    }
//
                                       
//
//     window.scrollTo(selectedPosX,selectedPosY);



// ======================================

const todoCache = JSON.parse(localStorage.getItem("todoCache")) || {};
const todoWrp = document.getElementById("todo_wrp");

window.onload = () => {
	document.getElementById("inpDate").valueAsDate = new Date();
	const today = new Date().toLocaleDateString().split(".").reverse().join("-");
	onLoadTask(today, todoWrp);

	// const tommorow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().substr(0, 10);
	const tommorow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString().split(".").reverse().join("-");
	onLoadTask(tommorow, todoWrp);

	dayPicker(todoWrp);
}

const addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", () => {
	onTaskAdded(todoWrp);
});

const inputTask = document.getElementById("addtask");
inputTask.addEventListener("keyup", (key) => {
	if(key.keyCode === 13) {
		onTaskAdded(todoWrp);
	}
});
	
