'use strict';
var gCanvas;
var gCtx;
function init(){
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    renderMeme()
}
function hendleEvent(ev){
    console.log(ev);
}
function renderMeme(){
    var meme = getMeme();
    var img = findImgById(meme.selectedImgId);
    var cuurLine = meme.lines[meme.selectedLineIdx]
    drawImg(img.url,cuurLine.txt,cuurLine.x,cuurLine.y)
}

function changeText(value){
    console.log(value);
    var meme = getMeme()
    var currIdx = meme.selectedLineIdx
     changeLineTxt(value,currIdx)
    renderMeme()
}
function onUpdateMeme(id){
    var elMemeCanvas = document.querySelector('.canvas-container');
    var elGallry = document.querySelector('.main-container');
    console.log(id);
    updateMeme(id)
    renderMeme()
    elGallry.style.display = 'none';
    elMemeCanvas.style.display = 'block';
}

function drawImg(src,txt,x,y){
    var img = new Image();
    img.src = src;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText(txt,x,y)
        // drawText(txt,240,481)
    }
}

function drawText(text,x,y){
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = '50px IMPACT'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

