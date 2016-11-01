// 在游戏里用到较多的变量
var holes = document.getElementsByName("hole");
var randomValue = parseInt(Math.random()*59);
var score = document.getElementById("score");
var scoreValue = 0;
var counter = document.getElementById("counter");
var counterValue = 30;
var startAndStop = 0;
var changeTime = null;
var start = document.getElementById("start");
var state = document.getElementById("gameState");

window.onload = function() {
    createHole();
    document.getElementById("start").addEventListener("click", startGame);
}

// js动态生成button，当做mole
function createHole() {
    var fragment = document.createDocumentFragment();
    var count = 0;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            var hole = document.createElement("button");
            hole.setAttribute("name", "hole");
            hole.setAttribute("value", count++);
            hole.setAttribute("class", "no-mouse");
            hole.disabled = true;
            fragment.appendChild(hole);
        }
        var line = document.createElement("br");
        fragment.appendChild(line);
    }
    var gameArea = document.getElementById("map");
    gameArea.appendChild(fragment);
}

// 开始，暂停，继续的操作函数
function startGame() {
    if(start.innerHTML == "Start Game") {
        start.innerHTML = "Stop Game";
        state.value = "Playing Game";
        recoverToInitialState();
        removeEvent();
        timeCounter();
        generateMouse();
        addEvent(); 
    } else if (start.innerHTML == "Stop Game") {
        start.innerHTML = "Continue";
        state.value = "Stop";
        clearInterval(changeTime);
        for (var i = 0; i < holes.length; i++) {
            holes[i].disabled = true;
        }
    } else {
        start.innerHTML = "Stop Game";
        state.value = "Playing Game";
        for (var i = 0; i < holes.length; i++) {
            holes[i].disabled = false;
        }
        timeCounter();
        generateMouse();
    }
}

// 恢复初始状态
function recoverToInitialState() {
    score.value = "0";
    scoreValue = 0;
    counter.value = "30";
    counterValue = 30;
    randomValue = parseInt(Math.random()*59);
    clearInterval(changeTime);
    for (var i = 0; i < holes.length; i++) {
        holes[i].disabled = false;
        if (holes[i].className == "have-mouse") {
            holes[i].className = "no-mouse";
        }
    }
}

// 倒计时计数器
function timeCounter() {    
    function timeCalculate() {
        if (counterValue == 0) {
            alert(scoreValue);
            start.innerHTML = "Start Game";
            state.value = "Game Over";
            clearInterval(changeTime);
            removeEvent();
        } else {
            counterValue--;
            counter.value = counterValue.toString();
        }
    }
    changeTime = setInterval(timeCalculate, 1000);
}

// 随机生成mole
function generateMouse() {
    for(var i = 0; i < holes.length; i++) {
        if(holes[i].value == randomValue.toString()) {
            holes[i].className = "have-mouse";
        }
    }
}

// 需要绑定在button上的事件处理函数
function clickOnButton() {
    if(this.value == randomValue.toString()) {
            this.className = "no-mouse";
            if (scoreValue == -1) {
                scoreValue = scoreValue + 2;
            } else {
                scoreValue++;
            }
            score.value = scoreValue.toString();
            randomValue = parseInt(Math.random()*59);
            generateMouse();
        } else {
            if (scoreValue > 0) {
                scoreValue--;
                score.value = scoreValue.toString();
            } else if(scoreValue == 0){
                score.value = "0";
                scoreValue--;
            }
        }
}

// 为每个button绑定事件
function addEvent() {
    for (var i = 0; i < holes.length; i++) {
        holes[i].addEventListener("click", clickOnButton);
    }
}

// 为每个button移除时间，防止一个button重复绑定多个事件
function removeEvent() {
    for (var i = 0; i < holes.length; i++) {
        holes[i].removeEventListener("click", clickOnButton);
    }
}

