/**
 * Created by Arming on 14-6-17.
 */

function showNumberWithAnimation(i , j , randNumber){

    var numberCell = $('#number-cell-' + i +'-' + j);

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
    }, 50);
}

function showMoveAnimation( fromx , fromy , tox , toy ){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox, toy),
        left:getPosLeft(tox, toy)
    }, 150);
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


