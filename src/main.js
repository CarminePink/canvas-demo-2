let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");

const colorRed = document.querySelector("#colorRed");
const colorBlack = document.querySelector("#colorBlack");
const lineStyle = document.querySelector("#lineStyle");
const lineBig = document.querySelector("#lineBig");
const clear = document.querySelector("#clear");
const eraser = document.querySelector("#eraser");

ctx.fillStyle = "black";
ctx.strokeStyle = "none";
ctx.lineWidth = 10;
ctx.lineCap = "round"; //让线条之间连接圆润

let painting = false;
let last;

colorRed.onclick = () => {
  ctx.strokeStyle = "red";
};
colorBlack.onclick = () => {
  ctx.strokeStyle = "black";
};
lineStyle.onclick = () => {
  ctx.lineWidth = 3;
};
lineBig.onclick = () => {
  ctx.lineWidth = 10;
};
clear.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
eraser.onclick = () => {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;
};

var isTouchDevice = "ontouchstart" in document.documentElement;
if (isTouchDevice) {
  canvas.ontouchstart = e => {
    console.log(e);
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    last = [e.clientX, e.clientY];
  };

  canvas.ontouchmove = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    drawLine(last[0], last[1], x, y);
    last = [x, y];
  };
} else {
  canvas.onmousedown = e => {
    console.log(e);
    painting = true;
    last = [e.clientX, e.clientY];
    console.log(last);
  };

  canvas.onmousemove = e => {
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY);
      last = [e.clientX, e.clientY];
    } else {
    }
  };

  canvas.onmouseup = () => {
    painting = false;
  };
}
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
window.onresize = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}; //监听当前窗口的resize事件，当窗口大小改变后会触发clearRect方法清空画板
