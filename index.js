let iMilliseconds = 0;
let iSeconds = 0;
let iMinutes = 0;
let iLaps = 1;
let intervalID = 0;
const eTextTimer = document.querySelector(".app__timer");
const eLapsList = document.querySelector(".app__laps");

function doubleO(num) {
    // return `${(num<10)?'0':''}${num}`
    return `${num}`.padStart(2, '0');
}

//Démarrer le minuteur
const eStartBtn = document.querySelector(".app__controls__start");
eStartBtn.addEventListener('click', () => {
    if (intervalID === 0) {
        intervalID = setInterval(updateTime, 10);
        [eStartBtn.textContent, eStartBtn.dataset.alternate] = [eStartBtn.dataset.alternate, eStartBtn.textContent]; //Minuteur en marche
        eLapBtn.textContent = "Tour";
        eLapBtn.dataset.alternate = "Effacer";
    } else {
        clearInterval(intervalID);
        intervalID = 0;
        [eStartBtn.dataset.alternate, eStartBtn.textContent] = [eStartBtn.textContent, eStartBtn.dataset.alternate]; //Minuteur à l'arrêt
        [eLapBtn.dataset.alternate, eLapBtn.textContent] = [eLapBtn.textContent, eLapBtn.dataset.alternate];
    }

});


function updateTime() {
    iMilliseconds++;
    eTextTimer.textContent = `${doubleO(iMinutes)}:${doubleO(iSeconds)}:${doubleO(iMilliseconds)}`;
    if (iMilliseconds > 99) {
        iMilliseconds = 0;
        iSeconds++;
    }
    if (iSeconds > 59) {
        iSeconds = 0;
        iMinutes++;
    }
}


//Tours
const eLapBtn = document.querySelector(".app__controls__lap");
eLapBtn.addEventListener('click', () => {
    if (eStartBtn.textContent === "Stop") {
        eLapsList.insertAdjacentHTML("beforeend",
            `<li class="app__lap">
              <span class="app__lap-count">Tour ${iLaps}</span>
              <time class="app__lap-value" datatype="XX:YY:ZZ">${iMinutes}:${iSeconds}:${iMilliseconds}</time>
              </li>`);
        iLaps++;
    }
    if (eLapBtn.textContent === "Effacer") {
        document.querySelector(".app__laps").innerHTML = "";
        iMilliseconds = 0;
        iSeconds = 0;
        iMinutes = 0;
        iLaps = 1;
        eTextTimer.textContent = `${doubleO(iMinutes)}:${doubleO(iSeconds)}:${doubleO(iMilliseconds)}`;
    }
})



