const imgToChange = document.getElementById("imgToChange");
const setWorkTime = 30 * 60;//Initialization of the work Timer
const setRestTime = 5 * 60;//Initialization of the rest Timer
let workTime = setWorkTime;
let restTime = setRestTime;
let intervalId;//Set a let for intervalId, so we will be able to use it with clearInterval
let toggle = false;//Set toggle to false, so we will be able to start & pause the interval
let cycle = 0;//Set the number of cycle to increment it later

/* PLAY/PAUSE FEATURE */
const playPauseButton = document.getElementById("play-pause-btn");
playPauseButton.addEventListener("click", interval);

function interval() {
    if (!toggle) {
        if (restTime < setRestTime) {//Condition to determine if workTime or restTime is running
            restInterval();
        } else {
            workInterval();
        }
        toggle = true;
        imgToChange.src = "ressources/pause.svg"
    } else {
        clearInterval(intervalId);
        toggle = false;
        imgToChange.src = "ressources/play.svg"
    }
}

const workTimer = document.getElementById("worktime");

function workInterval() {
    intervalId = setInterval(() => {
        workTime = workTime <= 0 ? 0 : workTime - 1;
        let workMinutes = parseInt(workTime / 60, 10);
        let workSecondes = parseInt(workTime % 60, 10);

        workMinutes = workMinutes < 10 ? "0" + workMinutes : workMinutes;
        workSecondes = workSecondes < 10 ? "0" + workSecondes : workSecondes;

        workTimer.innerText = workMinutes + ":" + workSecondes;
        console.log("Work : " + workTime)

        if (workTime === 0) {//Once workTimer is done, begin the rest timer
            workTime = setWorkTime;
            workTimer.innerText = "30:00";
            clearInterval(intervalId);

            restInterval();
        }
    }, 1000)
}

const restTimer = document.getElementById("pausetime");
const cycleScore = document.getElementById("cycle");

function restInterval() {
    intervalId = setInterval(() => {
        restTime = restTime <= 0 ? 0 : restTime - 1;
        let restMinutes = parseInt(restTime / 60, 10);
        let restSecondes = parseInt(restTime % 60, 10);

        restMinutes = restMinutes < 10 ? "0" + restMinutes : restMinutes;
        restSecondes = restSecondes < 10 ? "0" + restSecondes : restSecondes;

        restTimer.innerText = restMinutes + ":" + restSecondes;
        console.log("Rest : " + restTime)

        if (restTime === 0) {//Once restTimer is done, increment 1 to cycle and restart workTimer
            restTime = setRestTime;
            restTimer.innerText = "05:00";
            clearInterval(intervalId);

            cycle++;
            cycleScore.textContent = cycle;

            workInterval();
        }
    }, 1000)
}

/* RESET FEATURE */
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", resetTimer);

function resetTimer() {
    workTime = setWorkTime;
    workTimer.innerText = "30:00";

    restTime = setRestTime;
    restTimer.innerHTML = "05:00"

    clearInterval(intervalId);

    imgToChange.src = "ressources/play.svg"
    toggle = false;
}