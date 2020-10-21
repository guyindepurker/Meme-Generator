"use strict";
var gCanvas;
var gCtx;
var gCurrMeme = gMeme.lines;


function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderMeme();
}
function hendleEvent(ev) {
  console.log(ev);
}
function renderMeme() {
  var meme = getMeme();
  var img = findImgById(gMeme.selectedImgId);
  var cuurLine = meme.lines[meme.selectedLineIdx];
  drawImg(img.url, cuurLine.txt, cuurLine.x, cuurLine.y);
}

function changeText(value) {
  console.log(value);
  var meme = getMeme();
  var currIdx = meme.selectedLineIdx;
  changeLineTxt(value, currIdx);
  renderMeme();
}
// Later change all of this func to one func
function onUpLine(num) {
  upLine(num);
  renderMeme();
}
function onDownLine(num) {
  downLine(num);
  renderMeme();
}
function onIncreaseFont(num) {
    increaseFont(num);
    renderMeme();
  }
  function onDecreaseFont(num) {
    decreaseFont(num);
    renderMeme();
  }
//   ***********
function onUpdateMeme(id) {
  updateMeme(id);
  renderMeme();
  toggleDisplay("main-container", "canvas-container");
}

function drawImg(src, txt, x, y) {
  var img = new Image();
  img.src = src;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText(txt, x, y);
    // drawText(txt,240,481)
  };
}

function drawText(text, x, y) {
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = `${gCurrMeme.color}`;
  gCtx.lineWidth = "2";
  gCtx.font = `${gCurrMeme.size}px ${gCurrMeme.font}`;
  gCtx.textAlign = gCurrMeme.align;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}
