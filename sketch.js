let player_default = 'X';
let computer_default = 'O';
// First Turn will be of player
let all_lines;
let line_cordinates;
let board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
]

function setup() {
    createCanvas(windowHeight - 150, windowHeight - 150);
    all_lines = [
        [width / 3, 0, width / 3, height],
        [width * 2 / 3, 0, width * 2 / 3, height],
        [0, height / 3, width, height / 3],
        [0, height * 2 / 3, width, height * 2 / 3],
    ];
    // From this line cordinates the 4 lines are made up of
    line_cordinates = [
        [0, width / 3, width * 2 / 3, width],
        [0, height / 3, height * 2 / 3, height]

    ];

}

function draw_board() {
    textSize(128);
    noStroke();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] != '_') {
                text(board[i][j], line_cordinates[1][j] + 25, line_cordinates[0][i] + 100);
            }
        }
    }
}
function giveWhiteSpaces() {
    let returning_list = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == '_') {
                returning_list.push([i, j]);
            }
        }
    }
    return returning_list;
}
function whoWin() {
    let winned = undefined;
    // Checking Horizontal,Vertical side and i here means rows and j here means columns
    for (let i = 0; i < board.length; i++) {
        let ias_hv = [true,true];
        // Sorry for my bad variable naming but it is - 'is all same horizontal and vertical'
        // Horizontal Here
        let j;
        for (j = 0; j < board[0].length - 1; j++) {
            // Horizontal checking
            if (board[i][j] != board[i][j + 1]) {
                ias_hv[0] = false;
            }
            // Vertical Checking
            if(board[j][i] != board[j+1][i]){
                ias_hv[1] = false;
            }
        }
        if (ias_hv[0] && board[i][j] != '_' ) {
            winned = board[i][j];
        }
        else if(ias_hv[1] && board[j][i] != '_'){
            winned = board[j][i];
        }
    }
    // Now checking diagonally I know i can do it by for loop for checking in board more than 9 tiles but i am so lazy
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2]){
        winned = board[1][1];
    }
    else if(board[0][2] == board[1][1] && board[2][0]){
        winned = board[1][1];
    }
    if(winned == computer_default){
        return -1;
    }
    else if(winned == player_default){
        return 1;
    }
    else{
        return 0;
    }
}

// Min is Computer and Max is Player
function miniMax(turn,update_value=true) {
    let avlWhSpace = giveWhiteSpaces(board);
    let returning_index;
    // avlWhSpace means avlaibleWhiteSpace
    if(avlWhSpace.length == 0){
        return whoWin(board);
    }
    else{
        let all_recursion_returns = [];
        let next_turn;
        if(turn == computer_default){next_turn=player_default;}
        else if(turn == player_default){next_turn=computer_default};
        // Trying in all avlaiable white spaces so that i can minimax
        for(let i=0;i<avlWhSpace.length;i++){
            let old_value = [avlWhSpace[i][0]][avlWhSpace[i][1]];
            board[avlWhSpace[i][0]][avlWhSpace[i][1]] = turn;
            let recursion_return = miniMax(next_turn,false);
            board[avlWhSpace[i][0]][avlWhSpace[i][1]] = old_value;
            all_recursion_returns.push(recursion_return);
        }
        if(turn == computer_default){
            returning_index = all_recursion_returns.indexOf(Math.min(all_recursion_returns));
        }
        else if(turn == player_default){
            returning_index = all_recursion_returns.indexOf(Math.max(all_recursion_returns));
        }
        if(update_value){
            board[all_recursion_returns[returning_index][0]][all_recursion_returns[returning_index][1]] = turn;
        }
    }
}
function logic_of_game(){
    if(giveWhiteSpaces().length == 0){
        if(whoWin()== -1){
            console.log("Computer Wins");
        }
        else{
            console.log("player wins");
        }
    }
    else{
        miniMax(computer_default);
    }
}


function isClickedThere() {
    if (mouseIsPressed && mouseButton == LEFT) {
        for (let start_index_1 = 0; start_index_1 < line_cordinates[0].length - 1; start_index_1++) {
            for (let start_index_2 = 0; start_index_2 < line_cordinates[0].length - 1; start_index_2++) {
                let end_index_1 = start_index_1 + 1;
                let end_index_2 = start_index_2 + 1;
                let isMur = (line_cordinates[0][start_index_1] < mouseY) && (mouseY < line_cordinates[0][end_index_1]) && (line_cordinates[1][start_index_2] < mouseX) && (mouseX < line_cordinates[1][end_index_2]);
                // isMur Full form isMouseUnderrectangle
                if (isMur && board[start_index_1][start_index_2] == '_') {
                    board[start_index_1][start_index_2] = player_default;
                }
            }
        }
        logic_of_game();
    }
}

function draw() {
    background(color(100, 200, 225));
    // Basic Lines Drawing For Seperation
    strokeWeight(4);
    stroke(color('black'));
    for (let no_drawned = 0; no_drawned < all_lines.length; no_drawned++) {
        let l_c = all_lines[no_drawned];
        // l_c means line cordiantes
        line(l_c[0], l_c[1], l_c[2], l_c[3]);
    }
    // draw_board();
    strokeWeight(18);
    stroke(color('white'));
    // point(0,0);
    // point(0,height/3);
    point(0, width / 3);
    // point(0,width * 2 / 3);
    // point(0,width);
    // point(height / 3,0);
    // point(width/3,width*2/3);
    // point(width/3,height/3);
    // for (let i = 0; i < line_cordinates.length; i++) {
    //     point(line_cordinates[0][i],line_cordinates[1][i]);
    // }
    draw_board();
    isClickedThere();
}