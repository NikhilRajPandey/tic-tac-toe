let player_default = 'X';
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

// function draw_board() {
//     for (let i = 0; i < board.length; i++) {
//         for (let j = 0; j < i.length; j++) {
//             if(board[i][j] != '_'){
//             textSize(32);
//             text(board[i][j], 0, 0);
//             }
//         }
//     }
// }


function isClickedThere() {
    if (mouseIsPressed && mouseButton == LEFT) {
        for (let start_index_1 = 0; start_index_1 < line_cordinates[0].length - 1; start_index_1++) {
            for (let start_index_2 = 0; start_index_2 < line_cordinates[0].length - 1; start_index_2++) {
                let end_index_1 = start_index_1 + 1;
                let end_index_2 = start_index_2 + 1;
                let isMur = (line_cordinates[0][start_index_1] < mouseY)&&(mouseY< line_cordinates[0][end_index_1]) && (line_cordinates[1][start_index_2] < mouseX)&&(mouseX < line_cordinates[1][end_index_2]);
                // isMur Full form isMouseUnderrectangle
                if (isMur && board[start_index_1][start_index_2] == '_') {
                    board[start_index_1][start_index_2] = player_default;
                    console.log("yes");
                }
                else {
                    console.log("nooop");
                }
            }
        }
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
    point(0,width/3);
    point(0,width * 2 / 3);
    point(0,width);
    // point(height / 3,0);
    // point(width/3,width*2/3);
    // point(width/3,height/3);
    // for (let i = 0; i < line_cordinates.length; i++) {
    //     point(line_cordinates[0][i],line_cordinates[1][i]);
    // }
    isClickedThere();
    // noLoop();
}