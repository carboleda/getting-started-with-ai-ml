import robotjs from "robotjs";

console.log(robotjs);

function sendKeyPress(key) {
  robotjs.keyTap(key);
}

setInterval(() => sendKeyPress("right"), 3000);
