/**
 * Created by Arming on 14-6-17.
 */

function showNumberWithAnimation(i , j , randNumber){

    var numberCell = $('#number-cell-' + i +'-' + j);

    numberCell.css('top', getPosTop(i, j) + cellSideLength / 2);
    numberCell.css('left', getPosLeft(i, j) + cellSideLength / 2);
    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.css('border-radius', 0.05 * cellSideLength + 'px');

    numberCell.css('line-height', cellSideLength + 'px');
    numberCell.css('font-size', 60 * getNumberFontSize(board[i][j]) * forMobileRate + 'px');

    numberCell.text(randNumber);

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top: getPosTop(i, j),
        left:getPosLeft(i, j )
    }, 300);
}

function showMoveAnimation( fromx , fromy , tox , toy, Number, conflict ){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy );

    numberCell.animate({
        top:getPosTop( tox, toy),
        left:getPosLeft(tox, toy)
    }, 50);

    if(conflict){
        // show conflicted
        setTimeout( function() {
            numberCell = $('#number-cell-' + tox +'-' + toy);
            //alert(' conflicted');

            numberCell.css('background-color', getNumberBackgroundColor(Number));
            numberCell.css('color', getNumberColor(Number));
            numberCell.css('border-radius', 0.05 * cellSideLength);
            numberCell.css('line-height', cellSideLength + 'px');
            numberCell.css('font-size', 60 * getNumberFontSize(Number) * forMobileRate + 'px');
            numberCell.text(Number);
        }, 300);

        numberCell.animate({
                width: 1.2 * cellSideLength,
                height: 1.2 * cellSideLength,
                top: getPosTop(tox, toy) - 0.1 * cellSideLength,
                left:getPosLeft(tox, toy ) - 0.1 * cellSideLength
            }, 30);

            numberCell.animate({
                width:cellSideLength,
                height:cellSideLength,
                top: getPosTop(tox, toy),
                left:getPosLeft(tox, toy )
            }, 50);



    } else{
        // no conflicted
        setTimeout(function(){
            numberCell = $('#number-cell-' + tox + '-' + toy );
            //alert('no conflicted  \n from: #number-cell-' + fromx + '-' + fromy   + '   To: #number-cell-' + tox + '-' + toy);
            numberCell.css('width', cellSideLength);
            numberCell.css('height',cellSideLength);
            numberCell.css('top', getPosTop(tox, toy));
            numberCell.css('left', getPosLeft(tox, toy));
            numberCell.css('background-color', getNumberBackgroundColor(Number));
            numberCell.css('color', getNumberColor(Number));
            numberCell.css('border-radius', 0.05 * cellSideLength);
            numberCell.css('line-height', cellSideLength + 'px');
            //numberCell.css('font-size', 0.6 * cellSideLength * getNumberFontSize(board[i][j]) + 'px');
            numberCell.css('font-size', 60 * getNumberFontSize(Number) * forMobileRate + 'px');
            numberCell.text(Number);
        },400);
    }

    setTimeout(function(){
        numberCell = $('#number-cell-' + fromx + '-' + fromy );
        numberCell.css('width', '0px');
        numberCell.css('height', '0px');
        numberCell.css('background-color', '#f00');
        numberCell.css('top', getPosTop(fromx, fromy) + cellSideLength / 2);
        numberCell.css('left', getPosLeft(fromx, fromy) + cellSideLength / 2);
        numberCell.text('');
    }, 500);
}

function updateScore( score, highScore ){
    $("#score").text( score );
    $("#highScore").text(highScore);
    $('#score-number').text(score);
}

function showConflictedAnimation( i , j , Number){
    var numberCell = $('#number-cell-' + i +'-' + j);

    numberCell.css('background-color', getNumberBackgroundColor(Number));
    numberCell.css('color', getNumberColor(Number));
    numberCell.css('border-radius', 0.05 * cellSideLength);
    numberCell.text(Number);

    numberCell.animate({
        width: 1.2 * cellSideLength,
        height: 1.2 * cellSideLength,
        top: getPosTop(i, j) - 0.1 * cellSideLength,
        left:getPosLeft(i, j ) - 0.1 * cellSideLength
    }, 50);

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top: getPosTop(i, j),
        left:getPosLeft(i, j )
    }, 70);
}


