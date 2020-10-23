'use strict';
var gMemeImgs =[];
function initImgs(){
    loadMemeImgs()
    renderImgsMeme()
}
function loadMemeImgs(){
    var limit = loadFromStorage(MEMELIMIT);
    for(var i=1; i<=limit; i++){
        var currMeme = loadFromStorage(MEMEDB+`-${i}`);
        gMemeImgs.push(currMeme);
    }
    return gMemeImgs;
}

function renderImgsMeme(){
var elMemeGallery = document.querySelector('.meme-gallery');
var elContiner =document.querySelector('.saved-meme-container');
if(!gMemeImgs || gMemeImgs.length === 0) return elContiner.innerHTML = '<h1 class="title-saved-meme">You have not saved yet</h1>';
 gMemeImgs.forEach(url => {
        var newImg = document.createElement("img"); 
        newImg.src = url;
        elMemeGallery.appendChild(newImg)
    })
}

