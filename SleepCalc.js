document.addEventListener("DOMContentLoaded", function() {
  var calculateButton = document.getElementById('calculate-button');
  calculateButton.addEventListener('click', function(event) {
    event.preventDefault();
    calculate();
  });
});

function calculate() {
  console.log("here");

  var waketime = document.getElementById("waketime").value;
  var wakeselection = document.getElementById("time-selection1").value;

  console.log(waketime);

  var sleeptime = document.getElementById("sleeptime").value;
  var sleepselection = document.getElementById("time-selection").value;

  var wakehour = parseInt(waketime);
  var sleephour = parseInt(sleeptime);

  //if (isNaN(wakehour) || isNaN(sleephour)) {
  //alert("Please enter valid numbers for sleep and wake times.");
  //return;
  //}

  // Simple calculation for demonstration purposes
  var sleeptimeInHours = wakehour - sleephour;
  if (sleeptimeInHours < 0) {
    sleeptimeInHours += 12;
  }

  console.log("Calculated sleep time in hours:", sleeptimeInHours);

  var resultdiv = document.getElementById("result");
  resultdiv.innerHTML = "You will get " + sleeptimeInHours + " hours of sleep";
  var notediv = document.getElementById("note");
  if (sleeptimeInHours < 7) {
    notediv.innerHTML = " Please keep in mind it is reccomended to get 8 hours of sleep a night."
  }
}
