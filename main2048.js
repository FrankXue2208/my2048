/**
 * Created by Arming on 14-6-17.
 */

var board = [], score = 0, highScore = 0, highScoreHistory = 0, hasConflicted = [];

var startx = 0, starty = 0, endx = 0, endy = 0;
var isOnceMoved = false, startMoveTime, endMoveTime;
var timeTimeout, forMobileRate = 1;

//var moveContainer = document.getElementById("grid-container")
var maxDocumentWidth = 500, documentWidth = window.screen.availWidth;
var gridContainerWidth, cellSideLength ,cellSpace ;


$(document).ready(function () {
    prepareForMobile();

/*
    username=getCookie('username')
    if (username!=null && username!="")
    {alert('Welcome again '+username+'!')}
  */

    var strHighScoreHistory = getCookies('highScoreHistory');
    if(strHighScoreHistory != null && strHighScoreHistory != "" && !isNaN(strHighScoreHistory)){
        highScore = parseInt(strHighScoreHistory);
        highScoreHistory = parseInt(strHighScoreHistory);
    }

    newgame();
});

function prepareForMobile() {
    var prepareElement;

//    alert('Android:' + navigator.userAgent.indexOf('Android') +' and iPhone:' + navigator.userAgent.indexOf('iPhone'));
    timeTimeout = 100;
    if (navigator.userAgent.indexOf('Android') != -1 ){
        timeTimeout = 10;
        documentWidth = documentWidth / window.devicePixelRatio;
    }

    //alert(maxDocumentWidth.toString() + '  ' +documentWidth.toString());
    if (documentWidth < maxDocumentWidth) {
        forMobileRate = documentWidth / maxDocumentWidth;
    }
    //alert(forMobileRate);

    documentWidth  = Math.min( documentWidth, maxDocumentWidth);
    gridContainerWidth = 0.92 * documentWidth;
    cellSideLength = 0.18 * documentWidth;
    cellSpace = 0.04 * documentWidth;

    // 隐藏手机浏览器的地址栏
    setTimeout(function() {
        window.scrollTo(0, 1)
    }, 0);

//    if (maxDocumentWidth < documentWidth) return;


    // 自适应
    prepareElement = $('header');
    prepareElement.css('width', gridContainerWidth + 'px');
    prepareElement.css('height', gridContainerWidth * 0.28 + 'px');

    prepareElement = $('#logo');
    prepareElement.css('font-size', gridContainerWidth * 0.13 + 'px');
    prepareElement.css('line-height', gridContainerWidth * 0.28 + 'px');
    prepareElement.css('border-radius', gridContainerWidth * 0.02 + 'px');

    prepareElement = $('.top');
    prepareElement.css('height',gridContainerWidth * 0.16 + 'px');
    prepareElement.css('border-radius',gridContainerWidth * 0.02 + 'px');

    prepareElement = $('#txt-current-score');
    prepareElement.css('padding-top',gridContainerWidth * 0.01 + 'px');
    prepareElement.css('line-height',gridContainerWidth * 0.06 + 'px');
    prepareElement.css('font-size',gridContainerWidth * 0.05 + 'px');

    prepareElement = $('#txt-high-score');
    prepareElement.css('padding-top',gridContainerWidth * 0.01 + 'px');
    prepareElement.css('line-height',gridContainerWidth * 0.06 + 'px');
    prepareElement.css('font-size',gridContainerWidth * 0.04 + 'px');

    prepareElement = $('.bottom');
    prepareElement.css('height',gridContainerWidth * 0.09 + 'px');
    prepareElement.css('font-size',gridContainerWidth * 0.036 + 'px');
    prepareElement.css('line-height', gridContainerWidth  * 0.09 + 'px');
    prepareElement.css('margin-top',gridContainerWidth *0.03 + 'px');
    prepareElement.css('border-radius',gridContainerWidth * 0.02 + 'px');

    prepareElement = $('#score');
    prepareElement.css('font-size',gridContainerWidth * 0.07 + 'px');

    prepareElement = $('#highScore');
    prepareElement.css('font-size',gridContainerWidth * 0.07 + 'px');

    prepareElement = $('#grid-container');
    prepareElement.css('width', gridContainerWidth - 2 * cellSpace + 'px');
    prepareElement.css('height', gridContainerWidth - 2 * cellSpace + 'px');
    prepareElement.css('padding', cellSpace + 'px');
    prepareElement.css('border-radius', 0.02 * gridContainerWidth + 'px');

    prepareElement = $('.grid-cell');
    prepareElement.css('width',cellSideLength + 'px');
    prepareElement.css('height',cellSideLength + 'px');
    prepareElement.css('border-radius', 0.05 * cellSideLength + 'px');


    prepareElement =$('#ShopConfirmLayer');
    prepareElement.css('width', gridContainerWidth + 'px');
    prepareElement.css('height', gridContainerWidth * 1.3 + 'px');

    prepareElement =$('#gameover-title');
    prepareElement.css('margin-top', gridContainerWidth * 0.12 + 'px');
    prepareElement.css('height', gridContainerWidth * 0.12 + 'px');
    prepareElement.css('font-size',  gridContainerWidth * 0.12 + 'px');
    prepareElement.css('line-height',  gridContainerWidth * 0.12 + 'px');

    prepareElement =$('.showbutton');
    prepareElement.css('margin-top',  gridContainerWidth * 0.05 + 'px');
    prepareElement.css('margin-right',  gridContainerWidth * 0.2 + 'px');
    prepareElement.css('margin-down',  gridContainerWidth * 0.05 + 'px');
    prepareElement.css('margin-left',  gridContainerWidth * 0.2 + 'px');
    prepareElement.css('height',  gridContainerWidth * 0.16 + 'px');
    prepareElement.css('border-radius',  gridContainerWidth * 0.02 + 'px');

    prepareElement =$('#go-score');
    prepareElement.css('margin-top',  gridContainerWidth * 0.1 + 'px');
    prepareElement.css('margin-bottom',  gridContainerWidth * 0.2 + 'px');

    prepareElement =$('#score-title');
    prepareElement.css('height',  gridContainerWidth * 0.05 + 'px');
    prepareElement.css('font-size',  gridContainerWidth * 0.04 + 'px');
    prepareElement.css('line-height',  gridContainerWidth * 0.06 + 'px');
    prepareElement.css('padding-top',  gridContainerWidth * 0.012 + 'px');

    prepareElement =$('#score-number');
    prepareElement.css('font-size',  gridContainerWidth * 0.07 + 'px');
    prepareElement.css('line-height:',  gridContainerWidth * 0.06 + 'px');

    prepareElement =$('#go-about');
    prepareElement.css('font-size',  gridContainerWidth * 0.07 + 'px');
    prepareElement.css('line-height',  gridContainerWidth * 0.16 + 'px');

    prepareElement =$('#go-restart');
    prepareElement.css('font-size',  gridContainerWidth * 0.07 + 'px');
    prepareElement.css('line-height',  gridContainerWidth * 0.16 + 'px');


   // alert(documentWidth);
}

function newgame(){
    //初始化操作
    init();
    //在随机的两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i = 0 ; i < 4 ; i ++)
        for(var j = 0 ; j < 4 ; j ++){
            var gridCell = $('#grid-cell-' + i + '-' + j );
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }

    for( i = 0 ; i < 4 ; i ++ ){
        board[i] = [];
        hasConflicted[i] = [];
        for( j = 0 ; j < 4 ; j ++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    updateScore(score, highScore);
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0 ; i < 4 ; i ++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var theNumberCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength / 2);
                theNumberCell.css('left', getPosLeft(i, j) + cellSideLength / 2);
            }
            else {
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.css('line-height', cellSideLength + 'px');
                //theNumberCell.css('font-size', 0.6 * cellSideLength * getNumberFontSize(board[i][j]) + 'px');
                theNumberCell.css('font-size',  60 * getNumberFontSize(board[i][j]) * forMobileRate + 'px');
                theNumberCell.css('border-radius', 0.05 * cellSideLength);
                theNumberCell.text(board[i][j]);

                if (hasConflicted[i][j] == true) {
                    showConflictedAnimation(i, j, board[i][j])
                }
            }
            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber(){
    if( nospace(board))
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor( Math.random() * 4));
    var randy = parseInt(Math.floor( Math.random() * 4));

    var times = 0;
    while(times < 50){
        if (board[randx][randy] == 0 )
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times ++;
    }

    if(times == 50){
        for (var i = 0 ; i < 4 ; i ++ )
            for (var j = 0 ; j < 4 ; j ++)
                if ( board[i][j] == 0) {
                    randx = i ;
                    randy = j ;
                }
    }

    //随机一个数字    2 / 4
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

//noinspection JSUnresolvedFunction
$(document).keydown( function (event){
    switch( event.keyCode){
        case 37: //left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNumber()", timeTimeout + 10);
                setTimeout("isgameover()", timeTimeout + 100);
            }
            break;
        case 38: //up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()", timeTimeout + 10);
                setTimeout("isgameover()",timeTimeout + 100);
            }
            break;
        case 39: //right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()", timeTimeout + 10);
                setTimeout("isgameover()", timeTimeout + 100);
            }
            break;
        case 40: //down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()", timeTimeout + 10);
                setTimeout("isgameover()", timeTimeout + 100);
            }
            break;
        default: //default

            break;
    }
});

function restart(){
    CloseShopConfirm();
    newgame();
}

function isgameover(){
    if (nospace(board) && noMove(board))
        gameover();
}

function gameover(){
    setTimeout("ShopConfirm()", 500);
    setCookie("highScoreHistory", Math.max(highScore, highScoreHistory), 360);
}

// move to left, right, down, up
function moveLeft(){
    if( !canMoveLeft(board))
        return false;

    for (var i = 0 ; i < 4 ; i ++)
        for(var j = 1; j < 4 ; j ++){
            if (board[i][j] != 0){
                for( var k = 0; k < j ; k ++){
                    if (board[i][k] == 0 && noBlockHorizontal( i , k , j , board)){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board [i][j];
                        board[i][j] = 0;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );

                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        if(score > highScore) highScore = score;
                        updateScore(score, highScore);

                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", timeTimeout + 60);
    return true;
}

function moveUp(){
    if (!canMoveUp(board))
        return false;

    for (var i = 1 ; i < 4 ; i ++ )
        for (var j = 0 ; j < 4 ; j ++){
            if (board[i][j] != 0) {

                for (var k = 0 ; k < i ; k ++){
                    if (board[k][j] == 0 && noBlockVertical( j , k , i , board )){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;


                    } else if(board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );

                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        if(score > highScore) highScore = score;
                        updateScore( score , highScore);

                        hasConflicted[k][j] = true;

                    }
                }
            }
        }

    setTimeout("updateBoardView()", timeTimeout + 60);
    return true;
}

function moveRight(){
    if ( !canMoveRight(board))
        return false;

    for (var i = 0 ; i < 4 ; i ++)
        for (var j = 2 ; j >= 0 ; j --){
            if (board[i][j] != 0 ){
                for (var k = 3 ; k > j ; k --){
                    if (board[i][k] == 0 && noBlockHorizontal( i , j , k , board)){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                    } else if (board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board) && !hasConflicted[i][k] ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        if(score > highScore) highScore = score;
                        updateScore( score , highScore);

                        hasConflicted[i][k] = true;

                    }
                }
            }
        }

    setTimeout("updateBoardView()", timeTimeout + 60);
    return true;
}

function moveDown(){
    if ( !canMoveDown(board))
        return false;

    for (var i = 2 ; i >= 0 ; i--)
        for (var j = 0 ; j < 4 ; j ++){
            if (board[i][j] != 0) {
                for (var k = 3 ; k > i ; k --){
                    if (board[k][j] == 0 && noBlockVertical( j , i , k , board)){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                    } else if (board[k][j] == board[i][j] && noBlockVertical( j , i , k , board) && !hasConflicted[k][j]){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        if(score > highScore) highScore = score;
                        updateScore( score ,highScore);

                        hasConflicted[k][j] = true;

                    }
                }
            }
        }

    setTimeout("updateBoardView()", timeTimeout + 60);
    return true;
}

function ShopConfirm(){
    var ShopConfirmLayer=document.getElementById("ShopConfirmLayer");
    var webBgLayer=document.getElementById("webBgLayer");

    ShopConfirmLayer.style.display="";
    ShopConfirmLayer.style.left=parseInt((document.documentElement.scrollWidth-ShopConfirmLayer.offsetWidth)/2)+document.documentElement.scrollLeft+"px";
    //ShopConfirmLayer.style.top=Math.abs(parseInt((document.documentElement.clientHeight-ShopConfirmLayer.offsetHeight)/2))+document.documentElement.scrollTop+"px";
    ShopConfirmLayer.style.top="10px";
    webBgLayer.style.display="";
    webBgLayer.style.height=document.documentElement.scrollHeight+"px";
}

function CloseShopConfirm(){
    var ShopConfirmLayer=document.getElementById("ShopConfirmLayer");
    var webBgLayer=document.getElementById("webBgLayer");
    ShopConfirmLayer.style.display="none";
    webBgLayer.style.display="none";
}
