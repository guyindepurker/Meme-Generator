"use strict";
var gKeywords = { happy: 12, funny: 1 };

var gImgs = [
  { id: 1, url: "imgs/meme-imgs/1.jpg", keywords: ["happy"] },
  { id: 2, url: "imgs/meme-imgs/2.jpg", keywords: ["funny"] },
];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I never eat Falafel",
      size: 35,
      align: "center",
      color: "white",
      stroke:'black',
      font: "IMPACT",
      x: 258,
      y: 50,
    },
    {
      txt: "I never eat dog",
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
// CONTROL LINES SETTING:
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
    gMeme.lines.push(createLine())
    gMeme.selectedLineIdx = gMeme.lines.length -1;
}
function removeLine(){
    if(gMeme.lines.length<=1) return;
  var idx =  gMeme.selectedLineIdx
  gMeme.lines.splice(idx,1)
  gMeme.selectedLineIdx = gMeme.lines.length-1;
}

function getCurrTxt() {
  if(gMeme.lines.length === 1){
    gMeme.selectedLineIdx = 0
    return gMeme.lines[gMeme.selectedLineIdx].txt
  }else{
    return gMeme.lines[gMeme.selectedLineIdx].txt;
  }
}
function getCoordsLine(){
    var x = 0
    var y = 0
    var cuurLineCoords = {}
    if(gMeme.lines.length === 1) gMeme.selectedLineIdx = 0;
       x = gMeme.lines[gMeme.selectedLineIdx].x
       y = gMeme.lines[gMeme.selectedLineIdx].y
       cuurLineCoords = {x,y}
    return cuurLineCoords;
}

function createLine(){
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
