var startFlag = 0;
var endFlag = 0;
var wallState = true;
var result = document.getElementById("result");
var wall = document.getElementsByClassName("wall");


window.onload = function() {
  initializeStateWhenLeaveTheMazeMap();
  changeStartState();
  changeEndState();
  stateChangesWhenCrashWall();
}

// 无论什么情况，当光标到地图外面，都恢复初始状态
function initializeStateWhenLeaveTheMazeMap() {
    document.getElementById("maze-map").addEventListener("mouseleave", function() {
    startFlag = 0;
    endFlag = 0;
    if (wallState == false) {
      wallState = true;
    }
  })
}

// 撞墙后再从内部经过起点，状态不改变，以及经过起点提示语消失
function changeStartState() {
    document.getElementById("start").addEventListener("mouseenter", function() {
    if (wallState == true) {
      startFlag = (startFlag == 0) ? 1 : 0;
    }
    if (startFlag == 1) {
      result.textContent = "";
    }
  })
}

// 根据起点的状态判断是赢还是作弊
function changeEndState() {
    document.getElementById("end").addEventListener("mouseenter", function() {
    if (wallState == true) {
      endFlag = (endFlag == 0) ? 1 : 0;
    }
    if (startFlag == 1 && endFlag == 1) {
      result.textContent = "You Win";
    } else if (startFlag == 0 && endFlag == 1) {
      result.textContent = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze";
    }
  })
}

// 碰墙时显示输了，同时恢复起点状态，时再碰到墙不会变红
function stateChangesWhenCrashWall() {
  for (var i = 0; i < wall.length; i++) {
    wall[i].addEventListener("mouseenter", function() {
      if(startFlag == 1 && endFlag == 0) {
        wallState = false;
        this.classList.add("alarm");
        result.textContent = "You Lose";
      }
    })
    wall[i].addEventListener("mouseleave", function() {
      if (startFlag == 1 && endFlag == 0) {
        this.classList.remove("alarm");
        startFlag = 0;
      }
    })
  }
}
