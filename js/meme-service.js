'use strict';
var gKeywords = {'happy':12,'funny':1};

var gImgs = [{id:1,url:'./imgs/meme-imgs/1.jpg',keywords:['happy']},{id:2,url:'./imgs/meme-imgs/2.jpg',keywords:['funny']}];

var gMeme = {
    selectedImgId:1,
    selectedLineIdx:0,
    lines:[{
        txt:'I never eat Falafel',
        size:20,
        align:'left',
        color:'white',
        x:234,
        y:50
    },
    {
        txt:'I never eat Hem',
        size:10,
        align:'center',
        color:'white',
        x:null,
        y:null
    }
],
 
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


