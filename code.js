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

  clockHoursHands.forEach(hand => clockRotateHand(hand, date));
  clockMinutesHands.forEach(hand => clockRotateHand(hand, date));
  clockSecondsHands.forEach(hand => clockRotateHand(hand, date));
}

//handles the clock hand rotations, fixes 360°
function clockRotateHand(hand, date) {
  let deg = 6, time;
  
  if(hand.className.includes("hours-hand")) {
    deg = 30;
    time = date.getHours()+(date.getMinutes()/60);
  } else if(hand.className.includes("minutes-hand")) {
    time = date.getMinutes();
  } else {
    time = date.getSeconds();
  };

  if(time === 0 && !hand.className.includes("to-zero-fix")) {
    hand.classList.add("to-zero-fix");
  } else if(date.getSeconds() !== 0) {
    hand.classList.remove("to-zero-fix")
  };
  
  if(hand.className.includes("to-zero-fix")) {
    console.log("fixing zero");
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