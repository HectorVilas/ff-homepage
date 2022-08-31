const
  //clock hands and shadows/reflections
  clock = document.querySelector(".clock"),
  clockHoursHands = document.querySelectorAll(".hours-hand"),
  clockMinutesHands = document.querySelectorAll(".minutes-hand"),
  clockSecondsHands = document.querySelectorAll(".seconds-hand");

// - - - functions - - -

//
function clockCreateHourMarks() {
  const container = document.createElement("div");
  container.classList.add("hour-marks");
  
  for (let i = 0; i < 30; i++) {
    const mark = document.createElement("div");
    
    i % 5 !== 0 ? mark.classList.add("second-mark") :
    mark.classList.add("hour-mark");

    mark.style.transform = `rotate(${i*6}deg)`;
    container.appendChild(mark);
  }

  clock.appendChild(container);
}

//read time and rotate clock hands
function runClock() {
  const date = new Date();

  clockHoursHands.forEach(hand => clockRotateHand(hand, date.getHours()));
  clockMinutesHands.forEach(hand => clockRotateHand(hand, date.getMinutes()));
  clockSecondsHands.forEach(hand => clockRotateHand(hand, date.getSeconds()));
}

//handles the clock hand rotations, fixes 360°
function clockRotateHand(hand, time) {
  let deg;
  
  hand.className.includes("hours-hand") ? deg = 30 : deg = 6

  if(time*deg == 0) {
    hand.classList.add("no-animate");
    hand.style.transform = `rotate(${deg* -1}deg)`;
    setTimeout(() => {
      hand.classList.remove("no-animate");
      hand.style.transform = `rotate(${0}deg)`;
    }, 10);
  } else {
    hand.style.transform = `rotate(${time*deg}deg)`;
  };
};



// - - - run on start - - -

//set time
runClock();
//refresh each second
setInterval(() => {
  runClock();
}, 1000);

clockCreateHourMarks();