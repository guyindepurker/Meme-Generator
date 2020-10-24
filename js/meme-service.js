"use strict";
let gImgLoadId = 17845; //In Case User uplpoad more the one img in same time
const gKeywords = {
  happy: 22,
  funny: 40,
  love: 22,
  dogs: 30,
  nice: 22,
  cats: 48,
  baby: 22,
  cool: 22,
  angry: 22,
  sad: 22,
};
const gImgs = [
  { id: 1, url: "imgs/meme-imgs/1.jpg", keywords: ["happy"] },
  { id: 2, url: "imgs/meme-imgs/2.jpg", keywords: ["love", "dogs"] },
  {
    id: 3,
    url: "imgs/meme-imgs/3.jpg",
    keywords: ["love", "dogs", "nice", "baby"],
  },
  { id: 4, url: "imgs/meme-imgs/4.jpg", keywords: ["cats"] },
  { id: 5, url: "imgs/meme-imgs/5.jpg", keywords: ["nice", "baby"] },
  { id: 6, url: "imgs/meme-imgs/6.jpg", keywords: ["happy", "cool"] },
  { id: 7, url: "imgs/meme-imgs/7.jpg", keywords: ["baby", "funny"] },
  { id: 8, url: "imgs/meme-imgs/8.jpg", keywords: ["cool", "funny"] },
  {
    id: 9,
    url: "imgs/meme-imgs/9.jpg",
    keywords: ["cool", "funny", "happy", "baby"],
  },
  {
    id: 10,
    url: "imgs/meme-imgs/10.jpg",
    keywords: ["funny", "cool", "happy"],
  },
  { id: 11, url: "imgs/meme-imgs/11.jpg", keywords: ["funny", "love", "cool"] },
  { id: 12, url: "imgs/meme-imgs/12.jpg", keywords: ["cool", "angry", "sad"] },
  { id: 13, url: "imgs/meme-imgs/13.jpg", keywords: ["cool", "funny"] },
  { id: 14, url: "imgs/meme-imgs/14.jpg", keywords: ["cool", "angry"] },
  { id: 15, url: "imgs/meme-imgs/15.jpg", keywords: ["cool", "angry"] },
  { id: 16, url: "imgs/meme-imgs/16.jpg", keywords: ["funny"] },
  { id: 17, url: "imgs/meme-imgs/17.jpg", keywords: ["angry"] },
  { id: 18, url: "imgs/meme-imgs/18.jpg", keywords: ["cool", "angry"] },
];

const gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Enter Text",
      size: 35,
      align: "center",
      color: "white",
      stroke: "black",
      font: "impact",
      x: 258,
      y: 50,
    },
    {
      txt: "Enter a Text Here",
      size: 35,
      align: "center",
      color: "white",
      stroke: "black",
      font: "impact",
      x: 258,
      y: 490,
    },
  ],
};

function getMeme() {
  return gMeme;
}
function getImagesToRender() {
  return gImgs;
}
function findImgById(id) {
  return gImgs.find((img) => img.id === id);
}

function setMeme(id) {
  gMeme.selectedImgId = id;
}
// controls func service
function switchLine() {
  const lengthLines = gMeme.lines.length - 1;
  if (gMeme.selectedLineIdx < lengthLines) {
    gMeme.selectedLineIdx++;
  } else if (
    gMeme.selectedLineIdx === lengthLines ||
    gMeme.lines.length === 1
  ) {
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
function alignTxt(newAlign) {
  gMeme.lines[gMeme.selectedLineIdx].align = newAlign;
}
function changeColor(type, value) {
  if (type === "fill") {
    gMeme.lines[gMeme.selectedLineIdx].color = value;
  } else if (type === "stroke") {
    gMeme.lines[gMeme.selectedLineIdx].stroke = value;
  }
}
function changeFont(fontValue) {
  gMeme.lines[gMeme.selectedLineIdx].font = fontValue;
}

function addLine() {
  gMeme.lines.push(_createLine());
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function removeLine() {
  if (gMeme.lines.length <= 1) return (gMeme.lines[0].txt = "Enter a text!");
  const idx = gMeme.selectedLineIdx;
  gMeme.lines.splice(idx, 1);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getCurrTxt() {
  if (gMeme.lines.length === 1) gMeme.selectedLineIdx = 0;
  return gMeme.lines[gMeme.selectedLineIdx].txt;
}
function getLineToFocus() {
  if (gMeme.lines.length === 1) gMeme.selectedLineIdx = 0;
  const x = gMeme.lines[gMeme.selectedLineIdx].x;
  const y = gMeme.lines[gMeme.selectedLineIdx].y;
  const txt = gMeme.lines[gMeme.selectedLineIdx].txt;
  const size = gMeme.lines[gMeme.selectedLineIdx].size;
  const lineToFocus = { txt, size, x, y };
  return lineToFocus;
}

function increaseKeyWord(word) {
  gKeywords[word]++;
}

function _createLine() {
  return {
    txt: "Enter text",
    size: 35,
    align: "center",
    color: "white",
    stroke: "black",
    font: "IMPACT",
    x: 250,
    y: 250,
  };
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImgs.push({ id: gImgLoadId, url: img.src });
    //The Next Line depend when the user want to Upload another image!!:
    gMeme.selectedImgId = gImgs[gImgs.length - 1].id;
    gImgLoadId++;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function wordIsMatch(word) {
  const keys = Object.keys(gKeywords);
  const res = keys.some((key) => key === word);
  return res;
}
function setCanvasSizes(width, isLess) {
  if (isLess) {
    gMeme.lines[1].y = width - 15;
    gMeme.lines.forEach((line) => {
      line.x = width - 200;
    });
  } else if (!isLess) {
    gMeme.lines.forEach((line) => {
      line.x = width / 2;
    });
    gMeme.lines[1].y = width - 10;
  }
}
