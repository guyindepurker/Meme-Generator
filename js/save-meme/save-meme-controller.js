"use strict";
let gMemeImgs;
function initImgs() {
  loadMemeImgs();
  renderImgsMeme();
}
function loadMemeImgs() {
  gMemeImgs =getMemeSaved();
}

function renderImgsMeme() {
  const elMemeGallery = document.querySelector(".meme-gallery");
  const elContiner = document.querySelector(".gallery-saved");
  if (!gMemeImgs || gMemeImgs.length === 0)
    return (elContiner.innerHTML =
      '<h1 class="title-saved-meme">You have not saved yet</h1>');
  gMemeImgs.forEach((url) => {
    const newImg = document.createElement("img");
    newImg.src = url;
    elMemeGallery.appendChild(newImg);
  });
}
