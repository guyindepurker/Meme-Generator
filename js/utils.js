'use strict';


function toggleDisplay(selector,selector2){
    var elSelctorHide = document.querySelector('.'+selector); //hide
    var elSelectorShow = document.querySelector('.'+selector2); //show
    elSelctorHide.style.display = 'none';
    elSelectorShow.style.display = 'block';
}
function onGoHome(){
    toggleDisplay("canvas-container","main-container");
    console.log('go home');
    
}