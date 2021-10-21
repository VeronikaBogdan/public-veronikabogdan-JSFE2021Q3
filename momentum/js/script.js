"use strict";

// Time and calendar
const timeT = document.querySelector(".time");
const dateT = document.querySelector('.date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeT.textContent = currentTime;
  setTimeout(showTime, 1000);
}

function showDate() {
  const date = new Date();
  const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
  const currentDate = date.toLocaleDateString('en-US', options);

  dateT.textContent = currentDate;
  
  setTimeout(showDate, 1000);

}



showTime();
showDate();