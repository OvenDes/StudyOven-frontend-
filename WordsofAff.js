const APILINK = 'https://5672e1d7-8f63-44af-80fe-2c97762754b4-00-kacw9b1o78ep.worf.replit.dev/api/v1/flashcards';
const url = new URL(location.href);
const taskId = url.searchParams.get('id');

const main = document.getElementById("item");

returnTasks(APILINK);

function newTask() {
  const task = document.createElement('input');
  task.setAttribute('type', 'checkbox');
  task.setAttribute('id', 'item1');

  const task1 = document.createElement('input');
  task1.setAttribute('type', 'text');
  task1.setAttribute('placeholder', 'new task');

  const nextline = document.createElement('br');

  document.getElementById('item').appendChild(task);
  document.getElementById('item').appendChild(task1);
  document.getElementById('item').appendChild(nextline);

  task1.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      const taskDescription = task1.value;
      let taskStatus = task.checked ? "DONE" : "NOT DONE";

      if (taskDescription.trim() !== '') {
        saveTask(taskDescription, taskStatus);
        // Optionally clear the input after saving
        task1.value = ''; // clear the input field
      }
    }
  });
}

function saveTask(taskDescription, taskStatus, id = "") {
  const method = id ? 'PUT' : 'POST';
  const endpoint = id ? `${APILINK}/${id}` : `${APILINK}/newtask`;

  fetch(endpoint, {
    method: method,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "status": taskStatus, "task": taskDescription })
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload();
    });
}

function returnTasks(url) {
  fetch(`${url}/task`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      data.forEach(flashcard => {
        const task = document.createElement('div');

        task.innerHTML = `
          <input type="checkbox" onclick="deleteTask('${flashcard._id}')" id="item1" ${flashcard.status == "DONE" ? 'checked' : ''}>  ${flashcard.task}
          <br>
        `;

        main.appendChild(task);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

document.getElementById("item1")?.addEventListener('click', () => {
  // Your event handling code here
});

function deleteTask(id) {
  fetch(APILINK + "/task/" + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });
}





const monthyear = document.getElementById("monthyear");
const dates = document.getElementById("dates");
const prevBtn = document.getElementById("previousB");
const nextBtn = document.getElementById("nextB");

let currentDate = new Date();

eventList(currentDate);

const updateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = (firstDay.getDay() + 6) % 7; //monday is now 0
  const lastDayIndex = (lastDay.getDay() + 6) % 7;

  const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  monthyear.textContent = monthYearString;

  let datesHTML = '';

  //get inactive dates from mondaty to first day of month
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 1 - i);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    // const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
    //datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
    datesHTML += `<div class="date ${activeClass}" data-date="${dateString}">${i}</div>`;
  }

  for (let i = 1; i <= 6 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  dates.innerHTML = datesHTML;
}

updateCalendar();
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
})

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
})

dates.addEventListener('click', (event) => {
  if (event.target.classList.contains('date')) {
    const clickedDate = new Date(event.target.dataset.date);
    eventList(clickedDate);
  }
})

function eventList(clickedDate) {
  //<div class="daytask" id="daytask">Events</div>
  clickedDate = clickedDate.toISOString().split('T')[0];
  const newdiv = document.getElementById('daytask');
  newdiv.innerHTML = clickedDate;
  //document.getElementById('daytask').innerHTML = clickedDate;
  // document.getElementById('gen').appendChild(newdiv);
  const plus = document.createElement('div')
  plus.setAttribute('class', 'plus');
  plus.setAttribute('onclick', `newEvent('${clickedDate}')`);
  plus.innerHTML = "+";
  newdiv.appendChild(plus);
  getEventbasedonDate(APILINK, clickedDate);
  //document.getElementById('daytask').innerHTML = clickedDate.toDateString();
}

function getEventbasedonDate(url, date) {
  fetch(`${url}/event/${date}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      data.forEach(flashcard => {
        const event = document.createElement('div');

        event.innerHTML = `
        <div class="eventbox">
        <div class="event1">${flashcard.event}</div>
        <div class="deleteEvent" onclick="deleteTask('${flashcard._id}')"> -- </div>
        <div>
      `;

        document.getElementById('daytask').appendChild(event);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

function deleteEvent(id) {
  fetch(APILINK + "/task/" + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });
}

plus.addEventListener('click', (event) => {
  const clickedDate1 = new Date(event.target.dataset.date);
  newEvent(clickedDate1);
})

function newEvent(clickedDate1) {
  const div_new3 = document.createElement('div');
  let date = clickedDate1;
  // date = date.toISOString().split('T')[0];
  div_new3.innerHTML = `
  <div class="eventbox">
    <input type="text" id="new_event" /></input>
    <a href="#" onclick="saveReview('new_event', '${date}')" >Save</a>
  </div>`;
  document.getElementById('daytask').appendChild(div_new3);
}

function saveReview(new_event, date, id = "") {
  const event_name = document.getElementById(new_event).value;
  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "date": date, "event": event_name })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  } else {
    fetch(APILINK + "/newevent/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "date": date, "event": event_name })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}