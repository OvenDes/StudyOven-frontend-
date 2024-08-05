let distance;
let timer;

function PTimer() {

  clearInterval(timer);
  distance = 1500; // 25 minutes in seconds

  document.body.style.backgroundColor = "#A34757";
  startimer();
}

function STimer() {
  clearInterval(timer);
  distance = 300; // 5 minutes in seconds
  document.body.style.backgroundColor = "#93cec3";
  startimer();
}

function LTimer() {
  clearInterval(timer);
  distance = 900; // 15 minutes in seconds
  document.body.style.backgroundColor = "#6495ED";
  startimer();
}

function startimer() {
  console.log("here");

  timer = setInterval(function() {
    var minutes = Math.floor(distance / 60);
    var seconds = distance % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    document.getElementById("PTimer").innerHTML = minutes + ":" + seconds;

    if (distance <= 0) {
      clearInterval(timer);
      document.getElementById("PTimer").innerHTML = "DONE";
    } else {
      distance--;
    }
  }, 1000);
}
