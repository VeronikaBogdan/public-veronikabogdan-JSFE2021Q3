"use strict";

// Time and calendar
const timeT = document.querySelector(".time");
const dateT = document.querySelector('.date');

function showTime() {
  const date = new Date();
  
  timeT.textContent = date.toLocaleTimeString();
  setTimeout(showTime, 1000);
  showDate();
}

function showDate() {
  const date = new Date();
  const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
 
  dateT.textContent = date.toLocaleDateString('en-US', options);
  setTimeout(showDate, 1000);
}



showTime();
