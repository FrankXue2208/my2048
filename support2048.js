/**
 * Created by Arming on 14-6-17.
 */

function getPosTop( i , j ){
    return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft( i , j ){
    return cellSpace + j * (cellSpace + cellSideLength);
}

function getNumberBackgroundColor(number){
    switch (number){
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
    }
    return "black";
}

function getNumberColor(number){
    if( number <= 4 )
        return "#776e65";

    return "white";
}

function getNumberFontSize(number){

    switch( number.toString().length)
    {
        case 1:
             return 1;
        case 2:
            return 0.9;
        case 3:
            return 0.75;
        case 4:
            return 0.62;
        default:
            return 0.5;
    }
}

function nospace(board){

    for (var i = 0 ; i < 4 ; i ++)
        for (var j = 0 ; j < 4 ; j ++)
            if(board[i][j] == 0 )
                return false;
    return true;
}

function canMoveLeft(board){
    for( var i = 0 ; i < 4 ; i ++)
        for ( var j = 1; j < 4; j ++)
            if (board[i][j] != 0)
                if(board[i][j-1] == 0 ||  board[i][j-1] == board[i][j])
                    return true;

    return false;
}

function canMoveUp(board){
    for (var i = 1 ; i < 4 ; i ++)
        for(var j = 0 ; j < 4 ; j ++)
            if(board[i][j] != 0)
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;

    return false;
}

function canMoveRight(board){
     for (var i = 0 ; i < 4 ; i ++)
        for (var j = 0 ; j < 3 ; j ++)
            if (board[i][j] != 0 )
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
    return false;
}

function canMoveDown(board){
    for (var i = 0 ; i < 3 ; i ++)
        for (var j = 0 ; j < 4 ; j ++)
            if (board[i][j] != 0)
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
    return false;
}

function noBlockHorizontal( row , col1 , col2 , board ){
    for(var i = col1 + 1 ; i < col2 ; i ++ )
        if(board[row][i] != 0 )
            return false;
    return true;
}

function noBlockVertical(col , row1 , row2 , board){
    for (var i = row1 + 1 ; i < row2 ; i ++)
        if (board[i][col] != 0)
            return false;
    return true;
}

function noMove(board){
    return !(canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board));
}

function getCookies(c_name){
    if (document.cookie.length > 0){
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1){
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);

    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());

}