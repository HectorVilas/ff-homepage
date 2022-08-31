const
  //clock hands and shadows/reflections
  clockHoursHands = document.querySelectorAll(".hours-hand"),
  clockMinutesHands = document.querySelectorAll(".minutes-hand"),
  clockSecondsHands = document.querySelectorAll(".seconds-hand");

// - - - functions - - -

//read time and rotate clock hands
function clock() {
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

//set time on start
clock();
//refresh each second
setInterval(() => {
  clock();
}, 1000);