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
    drawImg(img.url,cuurLine.txt)
}

function drawImg(src,txt){
    var img = new Image();
    img.src = src;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText(txt,234,50)
        drawText(txt,240,481)
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

