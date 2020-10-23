"use strict";
var gCanvas;
var gCtx;
var gMemeLines = gMeme.lines;
const MEMEDB = 'MEME';
const MEMELIMIT = 'LIMIT';
var gSaveNum = 0;
var isDownload = false;
var isDragging = false;
var gX = 0;
var gY = 0;

function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderMeme();
  renderGallery()
  renderKeyWords()
  addEventToMeme()
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
    <img src="${img.url}" class="img-gallery img-${img.id}" alt="${img.keywords.join(' ')}" onclick="onSelectMemeToRender(${img.id})">
    `
  })
  document.querySelector('.main-container .gallery').innerHTML = htmlStrs.join('');
}
function renderKeyWords(){
  var elListPop = document.querySelector('.keyowrds-populer')
  var elListAll = document.querySelector('.keyowrds-list')
  var words = gKeywords;
  var keyowrds = [];
  for (var word in words){
    keyowrds.push(`
    <li class="title-keywords ${word}" style="font-size:${words[word]}px" onclick="onIncreaseKeyWord('${word}')">${word}</li>`)  
  }
  var length = keyowrds.length-5;
  var populerWords =  keyowrds.filter((str,idx)=>{
    if(idx<=length) return str;
  })
  var restWords =keyowrds.filter((str,idx)=>{
    if(idx>length) return str;
  })
  elListPop.innerHTML = populerWords.join('');
  elListAll.innerHTML = restWords.join('');
}
//Search func:
function onIncreaseKeyWord(keyowrd){
  increaseKeyWord(keyowrd)
  renderKeyWords()
}
function onShowAll(elWord){
var elAllList = document.querySelector('.all-key-word');
elAllList.classList.toggle('hide');
if(elWord.innerText === 'more...'){
  elWord.innerText = 'close';
}else{
  elWord.innerText ='more...';
}

}
function onSearch(value){
var imgs = document.querySelectorAll('.img-gallery');
imgs.forEach((img)=>{
  if(img.getAttribute('alt').includes(value.toLowerCase())){
    img.style.display = 'block';
  }else {
    img.style.display = 'none';
  }
})
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

// add eventListner:
function addEventToMeme(){
  var elCanvas=document.getElementById('meme-canvas')
  elCanvas.addEventListener('mousedown',e=>{
   gX =e.offsetX;
   gY =e.offsetY;
   isDragging = true;
  })
  elCanvas.addEventListener('mousemove',e=>{
    if (isDragging === true) {
      drawLine(gCtx, gX, gY, e.offsetX, e.offsetY);
      gX = e.offsetX;
      gY = e.offsetY;
    }

  })
  elCanvas.addEventListener('mouseup',()=>{
    // if (isDrawing === true) {
    //   drawLine(gCtx,  gX,  gY, e.offsetX, e.offsetY);
    //   gX = 0;
    //   gY = 0;
    //   isDrawing = false;
    // }
    isDragging = false;
  })
}



function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
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
