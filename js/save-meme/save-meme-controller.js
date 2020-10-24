"use strict";
const gMemeImgs = [];
function initImgs() {
  loadMemeImgs();
  renderImgsMeme();
}
function loadMemeImgs() {
  const limit = loadFromStorage(MEMELIMIT);
  for (let i = 1; i <= limit; i++) {
    const currMeme = loadFromStorage(MEMEDB + `-${i}`);
    gMemeImgs.push(currMeme);
  }
  return gMemeImgs;
}

function renderImgsMeme() {
  const elMemeGallery = document.querySelector(".meme-gallery");
  const elContiner = document.querySelector(".saved-meme-container");
  if (!gMemeImgs || gMemeImgs.length === 0)
    return (elContiner.innerHTML =
      '<h1 class="title-saved-meme">You have not saved yet</h1>');
  gMemeImgs.forEach((url) => {
    const newImg = document.createElement("img");
    newImg.src = url;
    elMemeGallery.appendChild(newImg);
  });
}
