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
  renderMeme();
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
// FUNCS CONTROL BOX:
function onAlignTxt(align){
    alignTxt(align)
    renderMeme();
}

function onChangeColor(type,value){
    changeColor(type,value);
    renderMeme();
}


// END CONTROL BOX //
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
    renderFocus()
  };
}

function renderTexts(texts) {
  texts.forEach((line) => {
    drawText(
      line.txt,
      line.color,
      line.stroke,
      line.size,
      line.align,
      line.x,
      line.y,
      line.font
    );
  });
}

function drawText(text, color,stroke, size, align, x, y, font = "IMPACT") {
  gCtx.strokeStyle = stroke;
  gCtx.fillStyle = color;
  gCtx.lineWidth = "2";
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = align;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function renderInput() {
  var elInput = document.querySelector("#enter-text");
  elInput.value = getCurrTxt();
}
function renderFocus(){
    var focus = getCoordsLine();
    var xEnd = Math.abs(focus.x/2)
    gCtx.beginPath()
    gCtx.moveTo(focus.x, focus.y+5)
    gCtx.lineTo(xEnd, focus.y+5)
    gCtx.strokeStyle = 'rgb(255, 244, 127)'
    gCtx.stroke()
    gCtx.closePath()
    gCtx.beginPath()
    gCtx.moveTo(xEnd, focus.y+5)
    gCtx.lineTo(xEnd*3, focus.y+5)
    gCtx.strokeStyle = 'rgb(255, 244, 127)'
    gCtx.stroke()
    // gCtx.beginPath()
    // gCtx.rect(focus.x,focus.y,focus.x , focus.y)
    // gCtx.strokeStyle = 'black'
    // gCtx.stroke()
}
