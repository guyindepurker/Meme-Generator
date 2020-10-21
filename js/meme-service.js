'use strict';
var gKeywords = {'happy':12,'funny':1};

var gImgs = [{id:1,url:'imgs/meme-imgs/1.jpg',keywords:['happy']},{id:2,url:'imgs/meme-imgs/2.jpg',keywords:['funny']}];

var gMeme = {
    selectedImgId:1,
    selectedLineIdx:0,
    lines:[{
        txt:'I never eat Falafel',
        size:30,
        align:'center',
        color:'white',
        font:'IMPACT',
        x:258,
        y:50
    },
    {
        txt:'I never eat dog',
        size:30,
        align:'center',
        color:'white',
        font:'IMPACT',
        x:258,
        y:493
    }
]
 
}

function switchLine(){
    var lengthLines = gMeme.lines.length -1;
    if(gMeme.selectedLineIdx < lengthLines){
        gMeme.selectedLineIdx++ 
     } else if(gMeme.selectedLineIdx === lengthLines){
        gMeme.selectedLineIdx=0
    }
}

function getMeme(){
    return gMeme;
}

function findImgById(id){
    var currImage = gImgs.find(img => img.id === id )
    return currImage;
}
function changeLineTxt(txt,lineIdx){
   return gMeme.lines[lineIdx].txt = txt;
}

function updateMeme(id){
    gMeme.selectedImgId = id;
}
// Later change all of this to one function
function increaseFont(num){
    if(gMeme.lines[gMeme.selectedLineIdx].size === 70) return;
    gMeme.lines[gMeme.selectedLineIdx].size += num
   
}

function decreaseFont(num){
    if(gMeme.lines[gMeme.selectedLineIdx].size <= 20) return;
    gMeme.lines[gMeme.selectedLineIdx].size -= num;
}

function upLine(num){
    gMeme.lines[gMeme.selectedLineIdx].y += num;
   
}
function downLine(num){
    gMeme.lines[gMeme.selectedLineIdx].y -= num;
    
}
//**************************** */
function getInputTxt(){
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}
// function getCuurLine(){
//     var x = gMeme.lines[gMeme.selectedLineIdx].x
//     var y = gMeme.lines[gMeme.selectedLineIdx].y
//     var size = gMeme.lines[gMeme.selectedLineIdx].size
//     var focus = {x,y,size}
//     return focus; 
// }