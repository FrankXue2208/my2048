/**
 * Created by Ming on 14-6-22.
 *
 * Moved by Touch for mobiles
 */

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
    endMoveTime = new Date();
    if ( !isOnceMoved &&  endMoveTime - startMoveTime < 200) {
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var deltax = endx - startx;
        var deltay = endy - starty;

        if ( Math.abs(deltax) < 0.1 * documentWidth && Math.abs(deltay) < 0.1 * documentWidth)
            return;

        isOnceMoved = true;
        if (Math.abs(deltax) >= Math.abs(deltay)){

            if (deltax <= 0) {
                //move left
                if (moveLeft()) {
                    setTimeout("generateOneNumber()", 110);
                    setTimeout("isgameover()", 200);
                }
            } else {
                //move right
                if (moveRight()) {
                    setTimeout("generateOneNumber()", 110);
                    setTimeout("isgameover()", 200);
                }
            }
        }else
        if (deltay > 0 ){
            //move downs
            if(moveDown()){
                setTimeout("generateOneNumber()", 110);
                setTimeout("isgameover()", 200);
            }
        }
        else{
            //move up
            if(moveUp()){
                setTimeout("generateOneNumber()", 110);
                setTimeout("isgameover()", 200);
            }
        }
    }
}

function touchEnd() {}
function touchCancel() {}

moveContainer.addEventListener("touchstart", touchStart, false);
moveContainer.addEventListener("touchmove", touchMove, false);
moveContainer.addEventListener("touchend", touchEnd, false);
moveContainer.addEventListener("touchCancel", touchCancel, false);

