"use strict";
var gCanvas;
var gCtx;
var gMemeLines = gMeme.lines;
const MEMEDB = 'MEME';
const MEMELIMIT = 'LIMIT';
var gSaveNum = 0;
var isDownload = false;

function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderMeme();
  renderGallery()
  renderKeyWords()
//   window.addEventListener('resize', function(){
//     gCanvas.width = window.innerWidth
//     gCanvas.height = window.innerHeight
//   renderMeme();

// })
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
// render func
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

function renderInput() {
  var elInput = document.querySelector("#enter-text");
  elInput.value = getCurrTxt();
}
function renderFocus() {
  if(isDownload) return;
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
function renderKeyWords(){
  var elListPop = document.querySelector('.keyowrds-populer')
  var elListAll = document.querySelector('.keyowrds-list')
  var words = gKeywords;
  var htmlStrs = [];
  for (var word in words){
    htmlStrs.push(`
    <li class="title-keywords ${word}" style="font-size:${words[word]}px" onclick="onIncreaseKeyWord('${word}')">${word}</li>`)  
  }
  var length = htmlStrs.length-5;
  var populerWords =  htmlStrs.filter((str,idx)=>{
    if(idx<length) return str;
  })
  elListPop.innerHTML = populerWords.join('');
  elListAll.innerHTML = htmlStrs.join('');
}
function onIncreaseKeyWord(keyowrd){
  increaseKeyWord(keyowrd)
  renderKeyWords()
}
function onShowAll(elWord){
var elAllList = document.querySelector('.all-key-word');
elAllList.classList.toggle('hide')
if(elWord.innerText === 'more...'){
  elWord.innerText = 'close';
}else{
  elWord.innerText ='more...'
}

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

function drawText(text, color, stroke, size, align, x, y, font = "IMPACT") {
  gCtx.strokeStyle = stroke;
  gCtx.fillStyle = color;
  gCtx.lineWidth = "2";
  gCtx.font = `bolder ${size}px ${font}`;
  gCtx.textAlign = align;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent
}
//*** Bonus Save Meme ****/
function onSaveMeme(){
  gSaveNum = loadFromStorage(MEMELIMIT);
  if(gSaveNum === 10) return alert('cant save more');
  saveToStorage(MEMEDB+`-${gSaveNum+1}`, gCanvas.toDataURL())
  gSaveNum++
  saveToStorage(MEMELIMIT,gSaveNum);
}
// responsive canvas:
function resizeCanvas() {
    var elContainer = document.querySelector('.meme-canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth // show width & height in CSS
    gCanvas.height = elContainer.offsetHeight
}


//Load img to canvas
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
