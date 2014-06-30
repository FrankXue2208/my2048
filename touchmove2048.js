/**
 * Created by Ming on 14-6-22.
 *
 * Moved by Touch for mobiles
 */

var isOnceMoved = false, startMoveTime, endMoveTime;
var moveContainer = document.getElementById("grid-container")

function touchStart(e) {
    //e.preventDefault();
    isOnceMoved = false;
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
    startMoveTime = new Date();
}

function touchMove(e) {
    e.preventDefault();
    if (isReplay)
        return;

    endMoveTime = new Date();
    if ( !isOnceMoved &&  endMoveTime - startMoveTime < 200) {
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var deltax = endx - startx;
        var deltay = endy - starty;

        if ( Math.abs(deltax) < 0.1 * documentWidth && Math.abs(deltay) < 0.1 * documentWidth)
            return;

        if (Math.abs(deltax) >= Math.abs(deltay)){
            if (deltax <= 0) {if (moveLeft()) {isOnceMoved = true ; }}//move left
             else {if (moveRight()) {isOnceMoved = true;}}//move right
        }else{
            if (deltay > 0 ){if(moveDown()){isOnceMoved = true;}}//move downs
             else{ if(moveUp()){isOnceMoved = true; } }//move up
        }
        if (isOnceMoved){
            setTimeout("generateOneNumber()", timeTimeout);
            setTimeout("isgameover()", timeTimeout + 200);
        }
    }
}

function touchEnd() {}
function touchCancel() {}

moveContainer.addEventListener("touchstart", touchStart, false);
moveContainer.addEventListener("touchmove", touchMove, false);
moveContainer.addEventListener("touchend", touchEnd, false);
moveContainer.addEventListener("touchCancel", touchCancel, false);

