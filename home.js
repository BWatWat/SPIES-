// seedrandom.min.js by David Bau.
// github.com/davidbau/seedrandom

const RANDOM_SEED_LENGTH = 5;

var seedBox = document.getElementById("seed");
seedBox.value = "";

function updateSeed() {
    seedBox.value = seedBox.value.toUpperCase();
    Math.seedrandom(seedBox.value);
    var code = "";
    if(seedBox.value != "")
        code = randomInt(10000);
    document.getElementById("check").innerHTML = code;
}

function randomSeed() {
    Math.seedrandom();
    var s = "";
    for(var i = 0; i < RANDOM_SEED_LENGTH; i++)
        s += randomLetter();
    seedBox.value = s;
    updateSeed();
}


function startGame() {
    updateSeed();

    var numPlayers = document.getElementById("num-players").value;
    var playerNum = document.getElementById("player-num").value;

    error = false;
    if(isNaN(numPlayers) || isNaN(playerNum))
        error = true;
    else if(numPlayers < 1 || playerNum < 1 || playerNum > numPlayers)
        error = true;
    if(error) {
        document.getElementById("error").innerHTML =
            "Please enter a valid player number and number of players.";
        return;
    }
    document.getElementById("error").innerHTML = "";

    if(document.getElementById("seed").value == "") {
        document.getElementById("error").innerHTML =
            "Please choose New Game or enter an existing game code.";
        return;
    }

    document.getElementById("start-div").style.display = "none";
    document.getElementById("game-div").style.display = "block";
    game(playerNum, numPlayers);
}


function endGame() {
    document.getElementById("seed").value = "";
    document.getElementById("start-div").style.display = "block";
    document.getElementById("game-div").style.display = "none";
    updateSeed();
    gameEnd();
}



function random() {
    return Math.random();
}

// max is exclusive
function randomInt(max) {
    return Math.floor((random() * max));
}

function randomLetter() {
    return String.fromCharCode(65 + randomInt(26));
}
