const timerBtn = document.querySelector('.time-btn');
const timerForm = document.getElementById('timer-form');
const startBtn = document.querySelector('.start-btn');
const endBtn = document.querySelector('.end-btn');
const resetBtn = document.querySelector('.reset-btn');
const dateStart = document.querySelector('.date-start');
const dateEnd = document.querySelector('.date-end');


timerBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("one");
    console.log(timerBtn.value);
    if(timerBtn.innerHTML === 'Start'){
        console.log("two");
        startTimer();
        timerBtn.style.backgroundColor = '#d60000';
        timerBtn.style.boxShadow = '0px 0px 40px 0px rgb(196 35 95 / 75%)';
        timerBtn.innerHTML = "End";
        const now = new Date();
        // let b = now.toLocaleDateString();
        console.log(now.toLocaleDateString());

        dateStart.innerHTML = `${now.toLocaleDateString()} | ${now.toLocaleTimeString()}`;
        dateStart.style.color = 'white';

        let formData = new FormData()
        formData.append("timer", "start")
        formData.append("date", now.toLocaleDateString())
        formData.append("start", now.toLocaleTimeString())
    
        fetch('/main', { // it should send to this site, like a <form method="post" acction=""> does
            method: 'POST',
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: formData
        })

    }else {
        const amount = document.getElementById('timerDisplay').innerText;
        console.log('three');
        endTimer();
        dateEnd.innerHTML = `${now.toLocaleDateString()} | ${now.toLocaleTimeString()}`;
        dateEnd.style.color = 'white';
        let formData = new FormData()
        formData.append("timer", "end")
        formData.append("amount", amount)
    
        fetch('/main', { // it should send to this site, like a <form method="post" acction=""> does
            method: 'POST',
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: formData
        })
        
        
        
        timerBtn.style = 'inherit';
        timerBtn.innerHTML = "Start";
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;


function startTimer() {
    timer = setInterval(updateTimer, 1000);
    const now = new Date(); console.log(now);
}

function endTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('timerDisplay').innerText = "00:00:00";
}

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    const timeString = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    document.getElementById('timerDisplay').innerText = timeString;
}


var timeElement = document.getElementById('currentTime');
setInterval(function () {
  var currentTime = new Date();
  timeElement.textContent = currentTime.toLocaleTimeString();
}, 1000);