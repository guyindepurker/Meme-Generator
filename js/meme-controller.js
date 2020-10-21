"use strict";
var gCanvas;
var gCtx;
var gMemeLines = gMeme.lines;

function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderMeme();
}
function hendleEvent(ev) {
  console.log(ev);
}
function renderMeme() {
  var img = findImgById(gMeme.selectedImgId);
  drawImg(img.url);
}
function onSwitchLine() {
  switchLine();
  renderInput();
}
function onChangeText(value) {
  var meme = getMeme();
  var currIdx = meme.selectedLineIdx;
  changeLineTxt(value, currIdx);
  renderMeme();
}

function onMoveLine(action, num = 5) {
  moveLine(action, num);
  renderMeme();
}
function onChangeFontSize(action, num = 5) {
  changeFontSize(action, num);
  renderMeme();
}

function onSelectMemeToRender(id) {
  setMeme(id);
  renderMeme();
  toggleDisplay("main-container", "canvas-container");
}

function drawImg(src) {
  var img = new Image();
  img.src = src;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    renderTexts(gMemeLines);
    renderInput();
  };
}

function renderTexts(texts) {
  texts.forEach((line) => {
    drawText(
      line.txt,
      line.color,
      line.size,
      line.align,
      line.x,
      line.y,
      line.font
    );
  });
}

function drawText(text, color, size, align, x, y, font = "IMPACT") {
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = color;
  gCtx.lineWidth = "2";
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = align;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function renderInput() {
  var elInput = document.querySelector("#enter-text");
  elInput.value = getInputTxt();
}
// function renderFocus(){
//     var focus = getCuurLine();
//     gCtx.beginPath()
//     gCtx.rect(focus.x,focus.y,focus.x , focus.y)
//     gCtx.strokeStyle = 'black'
//     gCtx.stroke()
// }
