"use strict";

function toggleDisplay(selector, selector2) {
  const elSelctorHide = document.querySelector("." + selector); //hide
  const elSelectorShow = document.querySelector("." + selector2); //show
  elSelctorHide.style.display = "none";
  elSelectorShow.style.display = "block";
}
function toggleNav() {
  document.querySelector(".main-nav").classList.toggle("open");
}
// publish img:

// on submit call to this function
function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById("imgData").value = gCanvas.toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    document.querySelector(".btn-share").innerHTML = `
        <a class="btn-orange" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Share! 
        </a>`;
  }

  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch("http://ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then(function (res) {
      return res.text();
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err);
    });
}
