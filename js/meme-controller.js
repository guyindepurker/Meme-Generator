"use strict";

let gCanvas;
let gCtx;
const gMemeLines = gMeme.lines;
const MEMEDB = "MEME";
let isDragging = false;

function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderGallery();
  renderKeyWords();
  addEventListener()
window.addEventListener("resize", resizeCanvas);

}

function onSelectMemeToRender(id) {
  setMeme(id);
  renderMeme();
  toggleDisplay("main-container", "canvas-container");
}
// render func
function renderMeme() {
  const imgToRender = findImgById(gMeme.selectedImgId);
  const img = new Image();
  img.src = imgToRender.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    renderTexts(gMemeLines);
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
  const elInput = document.querySelector("#enter-text");
  elInput.value = getCurrTxt();
}
function renderFocus() {
  const line = getLineToFocus();
  const x = line.x;
  const y = line.y;
  const width = gCtx.measureText(line.txt).width;
  const height = line.size * 1.286;
  gCtx.strokeRect(x , y, width, -height);
}

function renderGallery(keyword = null) {
  const imgs = getImagesToShow(keyword);
  const htmlStrs = imgs.map((img) => {
    return `
    <img src="${img.url}" class="img-gallery img-${img.id}"  onclick="onSelectMemeToRender(${img.id})">`;
  });
  document.querySelector(".main-container .gallery").innerHTML = htmlStrs.join("");
}
function renderKeyWords() {
  const elListPop = document.querySelector(".keyowrds-populer");
  const elListAll = document.querySelector(".keyowrds-list");
  const words = gKeywords;
  const keyowrds = [];
  for (var word in words) {
    keyowrds.push(`
    <li class="title-keywords ${word}" style="font-size:${words[word]}px" onclick="onSearch('${word}')">${word}</li>`);
  }
  const length = keyowrds.length - 5;
  const populerWords = keyowrds.filter((str, idx) => {
    if (idx <= length) return str;
  });
  const restWords = keyowrds.filter((str, idx) => {
    if (idx > length) return str;
  });
  elListPop.innerHTML = populerWords.join("");
  elListAll.innerHTML = restWords.join("");
}
//Search func:
function onIncreaseKeyWord(keyowrd) {
  increaseKeyWord(keyowrd);
  renderKeyWords();
}
function onShowAll(elWord) {
  const elAllList = document.querySelector(".all-key-word");
  elAllList.classList.toggle("hide");
  if (elWord.innerText === "more...") {
    elWord.innerText = "close";
  } else {
    elWord.innerText = "more...";
  }
}
function onSearch(elValue) {
  const value = elValue.toLowerCase();
  const isMatch = wordIsMatch(value);
  if (isMatch) onIncreaseKeyWord(value);
  renderGallery(value)
}
//Navigate canvas:
function onSwitchLine() {
  switchLine();
  renderMeme();
  renderInput();

}
function onMoveLine(action, num = 5) {
  moveLine(action, num);
  renderMeme();
}
// FUNCS CONTROLS BOX:

function onAddLine() {
  addLine();
  renderMeme();
}
function onRemoveLine() {
  removeLine();
  renderMeme();
}
function onChangeText(value) {
  const meme = getMeme();
  const currIdx = meme.selectedLineIdx;
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
  const imgToRender = findImgById(gMeme.selectedImgId);
  const img = new Image();
  img.src = imgToRender.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    renderTexts(gMemeLines);
    var imgContent = gCanvas.toDataURL("image/jpeg");
  elLink.href = imgContent;
  };
 
}
//*** Bonus Save Meme ****/
function onSaveMeme() {
  const urlImg = gCanvas.toDataURL()
  saveMeme(urlImg)

}

//Load img to canvas
function onImgInput(ev) {
  loadImageFromInput(ev, renderMeme);
}

function addEventListener(){
  gCanvas.addEventListener('mousedown', (ev) => {
    onMouseSelectLine(ev);
});
gCanvas.addEventListener('mouseup', () => {
  onMouseup();
});
gCanvas.addEventListener('mousemove', (ev) => {
    onMouseMoveLine(ev);
});
}
function onMouseup(){
  isDragging = false;
}
function onMouseSelectLine(ev){
  isDragging = true;
  selectLine(ev);
}
function onMouseMoveLine(ev){
  if(!isDragging)return;
    mouseMoveLine(ev);
    renderMeme();
}
function resizeCanvas() {
  if (window.innerWidth < 1070) {
    gCanvas.width = 400;
    gCanvas.height = 400;
    setCanvasSizes(400, true);
  } else {
    gCanvas.width = 500;
    gCanvas.height = 500;
    setCanvasSizes(500, false);
  }
  renderMeme();
}
