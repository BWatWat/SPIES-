locations.sort(); //alphabetize

var locationList = document.getElementById("location-list");

for(var i = 0; i < locations.length; i++) {
    locationList.innerHTML += "<li>" + locations[i][0] + "</li>";
}


function setSecret(show) {
  var d = "none";
  if(show)
    d = "block";
  document.getElementById("secret-div").style.display = d;
}


function game(playerNum, numPlayers) {
    setSecret(true);
    startTimer();

    var firstPlayer = randomInt(numPlayers) + 1;
    if(playerNum == firstPlayer)
      firstPlayer = "You";
    document.getElementById("first").innerHTML = firstPlayer;
    
    var spyPlayer = randomInt(numPlayers) + 1;
    
    if(playerNum == spyPlayer) {
        document.getElementById("location").innerHTML = "You are the spy!";
        document.getElementById("role").innerHTML = "";
    } else {
        var locI = randomInt(locations.length);
        var loc = locations[locI].slice(0);
        document.getElementById("location").innerHTML = loc[0];
        
        var role;
        for(var i = 0; i < playerNum; i++) {
            var roleIndex = randomInt(loc.length - 1) + 1;
            role = loc[roleIndex];
            loc.splice(roleIndex, 1);

            if(loc.length == 1)
                loc = locations[locI].slice(0);
        }
        
        document.getElementById("role").innerHTML = role;
    }

}

function gameEnd() {
    document.getElementById("location").innerHTML = "";
    document.getElementById("role").innerHTML = "";
    document.getElementById("first").innerHTML = "";
    endTimer();
}

var timerIntervalHandle;

// modified from https://stackoverflow.com/a/20618517
function startTimer() {
    endTimer();

    var start = Date.now();
    var duration = 8 * 60;
    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        var diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        var minutes = (diff / 60) | 0;
        var seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (diff <= 0) {
            endTimer();
        }
    };

    timer();
    timerIntervalHandle = setInterval(timer, 200);
}


function endTimer() {
    if(timerIntervalHandle)
        clearInterval(timerIntervalHandle);
}
