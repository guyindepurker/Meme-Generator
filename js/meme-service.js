"use strict";
var gKeywords = { happy: 12, funny: 1 };

var gImgs = [
  { id: 1, url: "imgs/meme-imgs/1.jpg", keywords: ["happy"] },
  { id: 2, url: "imgs/meme-imgs/2.jpg", keywords: ["funny"] },
  { id: 3, url: "imgs/meme-imgs/3.jpg", keywords: ["funny"] },
  { id: 4, url: "imgs/meme-imgs/4.jpg", keywords: ["funny"] },
  { id: 5, url: "imgs/meme-imgs/5.jpg", keywords: ["funny"] },
  { id: 6, url: "imgs/meme-imgs/6.jpg", keywords: ["funny"] },
  { id: 7, url: "imgs/meme-imgs/7.jpg", keywords: ["funny"] },
  { id: 8, url: "imgs/meme-imgs/8.jpg", keywords: ["funny"] },
  { id: 9, url: "imgs/meme-imgs/9.jpg", keywords: ["funny"] },
  { id: 10, url: "imgs/meme-imgs/10.jpg", keywords: ["funny"] },
  { id: 11, url: "imgs/meme-imgs/11.jpg", keywords: ["funny"] },
  { id: 12, url: "imgs/meme-imgs/12.jpg", keywords: ["funny"] },
  { id: 13, url: "imgs/meme-imgs/13.jpg", keywords: ["funny"] },
  { id: 14, url: "imgs/meme-imgs/14.jpg", keywords: ["funny"] },
  { id: 15, url: "imgs/meme-imgs/15.jpg", keywords: ["funny"] },
  { id: 16, url: "imgs/meme-imgs/16.jpg", keywords: ["funny"] },
  { id: 17, url: "imgs/meme-imgs/17.jpg", keywords: ["funny"] },
  { id: 18, url: "imgs/meme-imgs/18.jpg", keywords: ["funny"] },

];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Enter a Text Here",
      size: 35,
      align: "center",
      color: "white",
      stroke:'black',
      font: "IMPACT",
      x: 258,
      y: 50,
    },
    {
      txt: "Enter a Text Here",
      size: 35,
      align: "center",
      color: "white",
      stroke:'black',
      font: "IMPACT",
      x: 258,
      y: 493,
    },
  ],
};

function getMeme() {
  return gMeme;
}
function getImagesToRender(){
  return gImgs;
}
function findImgById(id) {
  return gImgs.find((img) => img.id === id);
}

function setMeme(id) {
  gMeme.selectedImgId = id;
}
// controls func
function switchLine() {
  var lengthLines = gMeme.lines.length - 1;
  if (gMeme.selectedLineIdx < lengthLines) {
    gMeme.selectedLineIdx++;
  } else if (gMeme.selectedLineIdx === lengthLines ||gMeme.lines.length === 1) {
    gMeme.selectedLineIdx = 0;
  }
}
function changeLineTxt(txt, lineIdx) {
  return (gMeme.lines[lineIdx].txt = txt);
}
function changeFontSize(action, num) {
  if (action === "decrease") {
    if (gMeme.lines[gMeme.selectedLineIdx].size <= 20) return;
    gMeme.lines[gMeme.selectedLineIdx].size -= num;
  } else if (action === "increase") {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 70) return;
    gMeme.lines[gMeme.selectedLineIdx].size += num;
  }
}
function moveLine(action, num) {
  if (action === "up") {
    gMeme.lines[gMeme.selectedLineIdx].y += num;
  } else if (action === "down") {
    gMeme.lines[gMeme.selectedLineIdx].y -= num;
  }
}
function alignTxt(newAlign){
    gMeme.lines[gMeme.selectedLineIdx].align = newAlign;
}
function changeColor(type,value){
    if(type === 'fill'){
        gMeme.lines[gMeme.selectedLineIdx].color = value;
    } else if(type === 'stroke'){
        gMeme.lines[gMeme.selectedLineIdx].stroke = value;
    }
}
function changeFont(fontValue){
    gMeme.lines[gMeme.selectedLineIdx].font = fontValue;
}

function addLine(){
    gMeme.lines.push(_createLine())
    gMeme.selectedLineIdx = gMeme.lines.length -1;
}
function removeLine(){
    if(gMeme.lines.length<=1) return;
  var idx =  gMeme.selectedLineIdx
  gMeme.lines.splice(idx,1)
  gMeme.selectedLineIdx = gMeme.lines.length-1;
}

function getCurrTxt() {
  if(gMeme.lines.length === 1) gMeme.selectedLineIdx = 0;
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}
function getLineToFocus(){
    if(gMeme.lines.length === 1) gMeme.selectedLineIdx = 0;
     var  x = gMeme.lines[gMeme.selectedLineIdx].x
     var  y = gMeme.lines[gMeme.selectedLineIdx].y
     var  txt = gMeme.lines[gMeme.selectedLineIdx].txt
     var  size = gMeme.lines[gMeme.selectedLineIdx].size
     var  lineToFocus = {txt,size,x,y}
    return lineToFocus;
}

function _createLine(){
return {
    txt:'Enter text',
    size:35,
    align:'center',
    color:'white',
    stroke:'black',
    font:'IMPACT',
    x:250,
    y:210
}
}
