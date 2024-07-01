let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false; //tell that game not start yet.
let level = 0; //game not start hence level is 0.

let h2 = document.querySelector("h2");

const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener("click", function () {
  //  Click start button to start the game
  if (started == false) {
    // console.log("game started");
    startBtn.innerText = "Playing";
    this.disabled = true;
    started = true;

    levelUp();
  }
});

document.addEventListener("keypress", function (event) {
  //  Press any key to start the game on large device 
  startBtn.click();
}
);

function gameFlash(btn) {
  btn.classList.add("gameFlash"); //we add our flash class which have background color white.
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash"); //we add our flash class which have background color white.
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}
//in this level Up we have to two three things i.e up the level,flash button for milliseconds and update the value of level.
function levelUp() {
  userSeq = []; //we make it empty because when user put wrong color game will over.
  level++;
  h2.innerText = `Level ${level}`;

  //random btn choose.to choose random button to flash we make array for that.Basically find random address.
  let randIdx = Math.floor(Math.random() * 3); //here we choose random index.
  let randColor = btns[randIdx]; //here we choose random color random index ke through.
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  // console.log(gameSeq);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);
  gameFlash(randBtn);
}

//Matching squence of user and system.
function checkAns(idx) {
  // console.log("curr level :",level);
  // let idx=level-1;

  if (userSeq[idx] === gameSeq[idx]) {
    // console.log("same value");
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 300);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Play again.`;
    document.querySelector("body").style.backgroundColor = "red";
    startBtn.disabled = false;
    startBtn.innerText = "Start"
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 300);
    reset();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id"); //this thing tell us that which color user enter
  // console.log(userColor);
  userSeq.push(userColor); //this user color puch in arr then next step to match color sequence.
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
