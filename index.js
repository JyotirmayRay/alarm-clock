const display = document.getElementById('clock');


//  set audio to the alarm
const audio = new Audio('sound/alarm-clock.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const AlarmList = document.querySelector('#AlarmList');
const addAlarm = document.querySelector('.setAlarm')

// keeps track of all the alarms that have been set.
const alarmList = [];

// Updates the time every second
function updateTime() {
    const today = new Date();
    let hour = formatTime(today.getHours());

    // Convert to AM/PM time if isAM is false
    if (!isAM) {
        hour = formatTime(today.getHours() % 12 || 12);
    }

    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText = `${hour}:${minutes}:${seconds}`;

    // Check if the alarmList contains the current time, "now."
    // If yes, ringing() is called
    if (alarmList.includes(now)) {
        ringing(now);
    }
}


// Triggers the alarm audio to play at the specified time
function ringing(now) {
    audio.play();
    alert(`Hey! it is ${now}`)
}


// Updates the time every second
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText = `${hour}:${minutes}:${seconds}`;

    // Check if the alarmList contains the current time, "now."
    //     if yes, ringing() is called
    if (alarmList.includes(now)) {
        ringing(now);
    }
}

// Add event listeners to the AM and PM toggle buttons
const toggleAM = document.getElementById('toggleAM');
const togglePM = document.getElementById('togglePM');

let isAM = true; // Flag to track if it's AM or PM

// AM toggle button
toggleAM.addEventListener('click', () => {
    isAM = true;
    updateTime(); // Update the displayed time
});

// PM toggle button
togglePM.addEventListener('click', () => {
    isAM = false;
    updateTime(); // Update the displayed time
});

// Updates the time every second
function updateTime() {
    const today = new Date();
    let hour = formatTime(today.getHours());

    // Convert to AM/PM time if isAM is false
    if (!isAM) {
        hour = formatTime(today.getHours() % 12 || 12);
    }

    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText = `${hour}:${minutes}:${seconds}`;

    // Check if the alarmList contains the current time, "now."
    // If yes, ringing() is called
    if (alarmList.includes(now)) {
        ringing(now);
    }
}

// Ensure the time format is correct
// Converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// This function stops the currently playing alarm.
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}

// When the "Delete Alarm" button is clicked, this removes alarm from list and the webpage.
AlarmList.addEventListener('click', e => {
    console.log("removing element")
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
})


// When the "Delete Alarm" button is clicked, removes the alarm from the array.
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;
    alarmList.push.apply(alarmList, newList);

    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Add newAlarm to the list as a new list item on webpage
function showNewAlarm(newAlarm) {
    const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    AlarmList.innerHTML += html
};


// This event sets a new alarm every time the form is submitted.
addAlarm.addEventListener('submit', e => {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h = formatTime(addAlarm.a_hour.value);
    if (new_h === '0') {
        new_h = '00'
    }
    let new_m = formatTime(addAlarm.a_min.value);
    if (new_m === '0') {
        new_m = '00'
    }
    let new_s = formatTime(addAlarm.a_sec.value);
    if (new_s === '0') {
        new_s = '00'
    }

    const newAlarm = `${new_h}:${new_m}:${new_s}`

    //add newAlarm to alarmList
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})


// The updateTime() function is called every second.
setInterval(updateTime, 1000);

