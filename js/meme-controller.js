"use strict";
var gCanvas;
var gCtx;
var gMemeLines = gMeme.lines;

function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderMeme();
  renderGallery()
}
function hendleEvent(ev) {
  console.log('y',ev.offsetX);
  console.log('x',ev.offsetY);
}

function onSelectMemeToRender(id) {
  setMeme(id);
  renderMeme();
  toggleDisplay("main-container", "canvas-container");
}
function renderMeme() {
  var imgToRender = findImgById(gMeme.selectedImgId);
  var img = new Image();
  img.src = imgToRender.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    renderTexts(gMemeLines);
    renderInput();
    renderFocus();
  };
}
//Nevigate canvas:
function onSwitchLine() {
  switchLine();
  renderMeme();
  document.getElementById("font-family").value =
    gMemeLines[gMeme.selectedLineIdx].font;
}
function onMoveLine(action, num = 5) {
  moveLine(action, num);
  renderMeme();
}
// FUNCS CONTROLS BOX:

function onAddLine(){
    addLine();
    renderMeme();
}
function onRemoveLine(){
    removeLine();
    renderMeme();
}
function onChangeText(value) {
  var meme = getMeme();
  var currIdx = meme.selectedLineIdx;
  changeLineTxt(value, currIdx);
  renderMeme();
}
function onChangeFontSize(action, num = 5) {
  changeFontSize(action, num);
  renderMeme();
}
function onAlignTxt(align) {
  alignTxt(align);
  renderMeme();
}

function onChangeColor(type, value) {
  changeColor(type, value);
  renderMeme();
}
function onChangeFont(value) {
  changeFont(value);
  renderMeme();
}

// END CONTROL BOX //


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

function drawText(text, color, stroke, size, align, x, y, font = "IMPACT") {
  gCtx.strokeStyle = stroke;
  gCtx.fillStyle = color;
  gCtx.lineWidth = "2";
  gCtx.font = `bolder ${size}px ${font}`;
  gCtx.textAlign = align;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function renderInput() {
  var elInput = document.querySelector("#enter-text");
  elInput.value = getCurrTxt();
}
function renderFocus() {
  var line = getLineToFocus();
  var x = line.x;
  var y = line.y;
  var width =  gCtx.measureText(line.txt).width
  var height = line.size * 1.6;
  var boundingY = y - height / 1.1 + 10;
  gCtx.strokeRect(x - (width / 2), boundingY, width, height - 5);
}

function renderGallery(){
  var imgs = getImagesToRender();
  var htmlStrs = imgs.map(img=>{
    return `
    <img src="${img.url}" class="img-gallery img-${img.id}" onclick="onSelectMemeToRender(${img.id})">
    `
  })
  document.querySelector('.main-container .gallery').innerHTML = htmlStrs.join('');
}

function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent
}







function onImgInput(ev) {
  loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
  document.querySelector('.share-container').innerHTML = ''
  var reader = new FileReader();
  
  reader.onload = function (event) {
      var img = new Image();
      img.onload = onImageReady.bind(null, img)
      img.src = event.target.result;
  }
  reader.readAsDataURL(ev.target.files[0]);
}
function renderCanvas(img) {
  gCanvas.width = img.width;
  gCanvas.height = img.height;
  gCtx.drawImage(img, 0, 0);
  // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
