"use strict";
var gCanvas;
var gCtx;
var gMemeLines = gMeme.lines;


function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderMeme();
  console.log(gMeme.selectedLineIdx);
}
function hendleEvent(ev) {
  console.log(ev);
}
function renderMeme() {
  var img = findImgById(gMeme.selectedImgId);
  drawImg(img.url);
}
function onSwitchLine(){
    switchLine();

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
//   *********** change all of the top to one func //
function onUpdateMeme(id) {
  updateMeme(id);
  renderMeme();
  toggleDisplay("main-container", "canvas-container");
}

function drawImg(src) {
  var img = new Image();
  img.src = src;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    renderTexts(gMemeLines)
  };
}

function renderTexts(texts){
    texts.forEach(line => {
        drawText(line.txt,line.color,line.size,line.align, line.x, line.y,line.font)
    });
}

function drawText(text,color,size,align, x, y,font='IMPACT') {
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = color;
  gCtx.lineWidth = "2";
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = align;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

