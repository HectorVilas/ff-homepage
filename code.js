const clock = (() => {
  const
    clock = document.querySelector(".clock"),
    clockHoursHands = document.querySelectorAll(".hours-hand"),
    clockMinutesHands = document.querySelectorAll(".minutes-hand"),
    clockSecondsHands = document.querySelectorAll(".seconds-hand");

  function createHourMarks() {
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
  function positionHands() {
    const date = new Date();
  
    clockHoursHands.forEach(hand => rotateHand(hand, date));
    clockMinutesHands.forEach(hand => rotateHand(hand, date));
    clockSecondsHands.forEach(hand => rotateHand(hand, date));
  }
  
  //handles the clock hand rotations, fixes 360°
  function rotateHand(hand, date) {
    let deg = 6, time;
    
    if(hand.className.includes("hours-hand")) {
      deg = 30;
      //extra small rotation for realism, prevents abrupt jump
      time = date.getHours()+(date.getMinutes()/60);
    } else if(hand.className.includes("minutes-hand")) {
      time = date.getMinutes();
    } else {
      time = date.getSeconds();
    };
    //adding class to be fixed
    if(time === 0 && !hand.className.includes("seconds-hand") && date.getSeconds() === 0
    || time === 0 && hand.className.includes("seconds-hand")){
        hand.classList.add("to-zero-fix");
    } else {
        hand.classList.remove("to-zero-fix")
    }
    //fixing zero position if necessary or applying rotation
    if(hand.className.includes("to-zero-fix")) {
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

  function setDate() {
    const
    date = new Date(),
    days = ["Domingo", "Lunes", "Martes", "Miércoles",
      "Jueves", "Viernes", "Sábado",],
    months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
      "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    domDay = document.querySelector(".day"),
    domDate = document.querySelector(".date"),
    domMonth = document.querySelector(".month"),
    domYear = document.querySelector(".year");

    domDay.innerText = days[date.getDay()];
    domDate.innerText = date.getDate();
    domMonth.innerText = months[date.getMonth()];
    domYear.innerText = date.getFullYear();
  };

  function run(){
    positionHands();
    createHourMarks();
    setDate();

    setInterval(() => {
      positionHands();
    }, 1000);
  };

  return { run };
})();

const musicPlayer = (() => {
  const
    musicPlayer = document.querySelector(".player"),
    btnOpenPlayer = document.querySelector(".open-iframe");

  function openPlayer(){
    btnOpenPlayer.classList.add("hidden");
    musicPlayer.src = "https://aersia.skie.me/#/Mellow";
    musicPlayer.classList.remove("hidden");
  };

  function addListeners(){
    btnOpenPlayer.addEventListener("click", openPlayer);
  };

  return { addListeners };

})();




// - - - run on start - - -

clock.run();
musicPlayer.addListeners();
