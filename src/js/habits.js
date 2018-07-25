
let db;
window.onload = function() {
  let request = window.indexedDB.open('habits', 1);

  request.onerror = function() {
    console.log('database failed to open');
  }
  request.onsuccess = function() {
    console.log('database opened successfully');
    db = request.result;
    displayHabits();
  }

  request.onupgradeneeded = function(e) {
    let db = e.target.result; 
    
    let objectStore = db.createObjectStore('habits', { keyPath: 'id', autoIncrement: true });

    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('type', 'type', { unique: false });
    objectStore.createIndex('history', 'history', { unique: false });
    objectStore.createIndex('start', 'start', { unique: false });
    objectStore.createIndex('countday', 'countday', { unique: false });
    objectStore.createIndex('end', 'end', { unique: false });

    console.log('database setup complete');
  }

  document.getElementById('form').onsubmit = addHabit;
}


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const today = new Date();
const day = today.getDay();
const date = today.getDate();
const month = today.getMonth();
const next_month = today.getMonth()+1;
const past_month = today.getMonth()-1;

const year = today.getFullYear();
const days2 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const todayHeader = `${date} ${months[month].toLowerCase()}  ${year} (${days2[day].toLowerCase()})`;
const monthHeader = `${months[month]} ${year}`;

let currentView = 'today'; 
 //document.getElementById('view-header').textContent = todayHeader;

const toggleView = () => {
  //document.getElementById('view-header').textContent = currentView === 'today' ? todayHeader : monthHeader;

  document.querySelectorAll('.view-option').forEach(viewoption => viewoption.classList.toggle('selected-view'));

  document.getElementById('today-view').classList.toggle('hidden');
  document.getElementById('month-view').classList.toggle('hidden');
};

document.querySelectorAll('.view-option').forEach(viewoption => {
  viewoption.addEventListener('click', (e) => { 
    this.selectedView = e.target.id;
    if (this.selectedView !== currentView) {
      currentView = this.selectedView;
      toggleView();
    }
  });
});


//------------------------------function displayHabits() ------------------------------//

function displayHabits() {
  monthTable = document.getElementById('month-table-body');
  todayTable = document.getElementById('today-table-body');
  monthTable.innerHTML = todayTable.innerHTML = "";

  this.objectStore = db.transaction('habits').objectStore('habits');
  this.objectStore.openCursor().onsuccess = function(e) {
    let cursor = e.target.result;
    if (cursor) {
      let habit = cursor.value;
      let monthRow = document.createElement('tr');// display month table
      addHabitTitleCell(habit, monthRow, 'month-habit-title-cell', 'month');
      addDailyCells(habit, monthRow);
      monthRow.setAttribute('data-habit-id', habit.id);
      monthTable.appendChild(monthRow);

      // display today table
      let todayRow = document.createElement('tr');
      addCheckboxCell(habit, todayRow);
      addHabitTitleCell(habit, todayRow, 'today-habit-title-cell', 'daily');
      todayRow.setAttribute("data-habit-id", habit.id);
      todayTable.appendChild(todayRow);
      cursor.continue();

    } else 
    {
      if (!monthTable.innerHTML) {
        let monthRow = document.createElement('tr');
        let cell = document.createElement('td');
        cell.textContent = `create your habit`;
        cell.setAttribute('colspan', 40);
        monthRow.appendChild(cell);
        monthTable.appendChild(monthRow);
      }
      if (!todayTable.innerHTML) {
        let todayRow = document.createElement('tr');
        let cell = document.createElement("td");
        cell.textContent = `create your habit!`;
        cell.setAttribute("colspan", 40);
        todayRow.appendChild(cell);
        todayTable.appendChild(todayRow);
      }
    }
  }
}

const addCheckboxCell = (habit, row) => {
  const checkboxCell = document.createElement('td');
  checkboxCell.classList.add('cell', 'checkbox-cell');

  let dateKey = `${days2[day]} ${months2[month]} ${date} ${year}`;

  let response = habit.history[dateKey]; // 'complete', 'incomplete', null/undefined

  if (response) {
    checkboxCell.classList.add(response);

    if (response === "complete") {
      checkboxCell.innerHTML = '<i class="fas fa-check"></i>';
    } else if (response === "incomplete") {
      checkboxCell.innerHTML = '<i class="fas fa-times"></i>';
    }
  }
  checkboxCell.addEventListener("click", () => { updateHabit(habit.id, dateKey) });
  row.appendChild(checkboxCell);
}

const addHabitTitleCell = (habit, row, classname, type) => {
  const title = document.createElement('td');
  title.classList.add('cell', classname);
  title.textContent = habit.title;

  ///add count day
  const countDay = document.createElement('td');
  countDay.classList.add('counDay');
  countDay.innerHTML = "<span class='limit_day'>days ("+habit.countday+")</span>";
  row.appendChild(title);
  row.appendChild(countDay);

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', () => {
    deleteHabit(habit.id);
  });
  if (type === 'month') { 
    deleteButton.classList.add('month-delete');
    title.appendChild(deleteButton) 
  } else { 
    deleteButton.classList.add('today-delete');
    title.appendChild(deleteButton);
  }
  

  return row;
};

const addDailyCells = (habit, row) => {
  const habitStart = habit.start;
  const habitStartNumber = Number(`${habitStart.getFullYear()}${habitStart.getMonth()}${habitStart.getDate()}`);
  const habitEnd = habit.end;
  const habitEndNumber = Number(`${habitEnd.getFullYear()}${habitEnd.getMonth()}${habitEnd.getDate()}`);
  console.log( `habit start ${habitStartNumber}`);
  console.log( `habit end ${habitEndNumber}`);
  let currDay = startDay;
  for (let i = 1; i <= monthLength; i++) {
    let currDate = i;
    let currDateNumber = Number('' + year + month + i);
    let dateKey = `${days2[currDay]} ${months2[month]} ${i} ${year}`;
    //console.log('datakey' + dateKey);
    const cell = document.createElement('td');
    cell.classList.add('cell', 'daily-cell');

    let response = habit.history[dateKey]; // 'complete', 'incomplete', null/undefined

    if (currDateNumber === habitStartNumber) {
      cell.classList.add("start-date");
    }
    if (currDateNumber === habitEndNumber){
      cell.classList.add("end-date");
    }
    if (response) {
      cell.classList.add(response);
      if (response === 'complete') {
        cell.innerHTML = '<i class="fas fa-check"></i>';
      } else if (response === 'incomplete') {
        cell.innerHTML = '<i class="fas fa-times"></i>';
      }
    } else if (currDateNumber >= habitStartNumber) {
      if (i < date && !response) {
        response = "incomplete";
        cell.classList.add("incomplete");
        cell.innerHTML = '<i class="fas fa-times"></i>';
      }
    }

    if (i >= date  && i <= date) {
      cell.addEventListener('click', () => { updateHabit(habit.id, dateKey)});
    }
    if (currDateNumber === habitEndNumber){
        cell.addEventListener('click', () => { endHabit(habit.id, habitEnd)});
       cell.classList.add("end-date"); 
    }
    row.appendChild(cell);

    // currDay++;
    // console.log(currDay);
    // if (currDay === 7) { currDay = 0 };

   
  }
}
//-----------------function addHabit()----------------------//

function addHabit(e) {
  e.preventDefault();

  const titleInput = document.getElementById('habit_title').value;
  let titleCountDay = document.getElementById('count-day').value;
  let endHabitDay = new Date();;
  endHabitDay.setDate(endHabitDay.getDate() + Number(titleCountDay));
  this.endday = endHabitDay.getDate();
  console.log(titleCountDay);
  console.log(endHabitDay);
  console.log(this.endday);
  const typeInput = 'daily';
  let newHabit = { title: titleInput, type: typeInput, history: {}, start: new Date(), countday: titleCountDay, end: endHabitDay };
  let transaction = db.transaction(['habits'], 'readwrite');
  let objectStore = transaction.objectStore("habits");
  var request = objectStore.add(newHabit);

  request.onsuccess = function() {
    document.getElementById('habit_title').value = ''; 
    document.getElementById('count-day').value = 1; 
  };

  transaction.oncomplete = function() {
    console.log('transaction complete: database modification finished');
    displayHabits();
  };

  transaction.onerror = function() {
    console.log('transaction not opened due to error');
  };
}

//----------------------function updateHabit()-------------------//

function updateHabit(habitId, dateKey) {
  var objectStore = db.transaction(['habits'], 'readwrite').objectStore('habits');
  var objectStoreHabitRequest = objectStore.get(habitId);

  objectStoreHabitRequest.onsuccess = function() {
    var habit = objectStoreHabitRequest.result;

    let currResponse = habit.history[dateKey];
    let newResponse;

    if (currResponse === 'complete') {
      newResponse = 'incomplete';
    } else if (currResponse === 'incomplete') {
      newResponse = null;
    } else {
      newResponse = 'complete';
    }
    habit.history[dateKey] = newResponse;
    var updateHabitRequest = objectStore.put(habit);
    updateHabitRequest.onsuccess = function() {
      displayHabits();
      console.log('habit save');
    }
  }
} 

/*-------------------------------endHabit()-----------------*/
function endHabit(habitId, habitEnd) {
  let objectEndhabit = db.transaction(['habits'], 'readwrite').objectStore('habits');
  let objectEndRequest = objectEndhabit.get(habitId);


   objectEndRequest.onsuccess = function() {
    let habit = objectEndRequest.result;
    console.log("endHabit" + habit);
    let enfResponse = habit.end;
    console.log("history" + enfResponse);
     
    alert( "Congratulations! Now you have a new habit!" );
    
  }
} 
//------------------------function deleteHabit(habitId)----------------//

function deleteHabit(habitId) {
  let deleteRequest = db.transaction(['habits'], 'readwrite')
                        .objectStore('habits')
                        .delete(habitId);
  deleteRequest.onsuccess = function() {
    console.log('habit successfully deleted');
    displayHabits();
  }
}

//------------------- getMonthStartDay ---------------------//

const getMonthStartDay = () => {
  const currDate = today.getDate();
  const currDay = today.getDay();
  let startDay = 0;

  let dayCount = currDay;

  for (let dateCount = currDate; dateCount > 0; dateCount--) {
    if (dayCount === -1) {
      dayCount = 6;
    }
    if (dateCount === 1) {
      startDay = dayCount;
    }
    dayCount--;
  }
  return startDay;
};

const dateHeaderRow = document.getElementById("date-header-row");

const startDay = getMonthStartDay();

const monthLength = monthLengths[month];

const addDayAndDateCells = () => {
  // add date cells
  for (let i = 1; i <= monthLength; i++) {
    const cell = document.createElement("td");
    cell.classList.add("cell", "date-cell");
    cell.textContent = i;
    if (i === date) {
      cell.classList.add("highlight");
    }
    dateHeaderRow.appendChild(cell);
  }
  // add days above dates
  const allDateCells = document.querySelectorAll(".date-cell");
  for (let i = 0; i < allDateCells.length; i++) {
    const day = document.createElement("div");
    day.textContent = days[i % 7];
    allDateCells[i].prepend(day);//prepend () виставляє попередньо заповнений елемент при першому індексі
  }
};
addDayAndDateCells();