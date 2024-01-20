var board = [];
var next = 1;
var black = 0;
var white = 0;

window.onload = make_board;

class Stone {
    constructor(canvas, color, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.color = color;
        this.x = x;
        this.y = y;
        this.black_check = [];
        this.white_check = [];
    }
    click() {
        if(this.color == 0) {
            if(next == 1) {
                if(this.black_check.length > 0) {
                    for(let i = 0; i < this.black_check.length; i++) {
                        reverse(this.x, this.y, next, this.black_check[i]);
                    }
                    this.color = next;
                    next = 2;
                }
            } else {
                if(this.white_check.length > 0) {
                    for(let i = 0; i < this.white_check.length; i++) {
                        reverse(this.x, this.y, next, this.white_check[i]);
                    }
                    this.color = next;
                    next = 1;
                }
            }
        }
    }
    reverse() {
        if(this.color == 1) {
            this.color = 2;
        } else {
            this.color = 1;
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, 44, 48);
        if(this.color == 1){
            this.color = 1;
            this.ctx.strokeStyle = "#000000";
            this.ctx.fillStyle = "#000000";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(25, 25, 18, 0, 2 * Math.PI);
            this.ctx.fill();
        } else if(this.color == 2){
            this.color = 2;
            this.ctx.strokeStyle = "#FFFFFF";
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(25, 25, 18, 0, 2 * Math.PI);
            this.ctx.fill();
        } else {
            this.color = 0;
            if(next == 1){
                if(this.black_check.length > 0) {
                    this.ctx.strokeStyle = "#444444";
                    this.ctx.fillStyle = "#444444";
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.arc(25, 25, 8, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            } else { 
                if(this.white_check.length > 0) {
                    this.ctx.strokeStyle = "#BBBBBB";
                    this.ctx.fillStyle = "#BBBBBB";
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.arc(25, 25, 8, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
    }
}

function canvas_click(e) {
    board[e.target.index].click();
    disp();
}

function make_board(){
    let color = 0;
    let table = document.getElementById("board");
    table.className = "board";
    for(let i = 0; i < 8; i++){
        let tr = document.createElement("tr");
        for(let j = 0; j < 8; j++){
            let td = document.createElement("td");
            td.className = "cell";
            td.index = i * 8 + j;
            td.onclick = canvas_click;
            let canvas = document.createElement("canvas");
            canvas.id = "canvas" + i + j;
            canvas.index = i * 8 + j;
            canvas.height = 44;
            canvas.width = 48;
            td.appendChild(canvas);
            tr.appendChild(td);
            if(((i == 3) && (j == 3)) || ((i == 4) && (j == 4))){
                color = 1;
            } else if((i == 3 && j == 4) || (i == 4 && j == 3)){
                color = 2;
            } else {
                color = 0;
            }
            let stone = new Stone(canvas, color, i, j);
            board.push(stone);
        }
        table.appendChild(tr);
    }
    disp();
}

function disp() {
    let b = document.getElementById("black");
    let w = document.getElementById("white");
    let comment = document.getElementById("comment");
    let result_black = false;
    let result_white = false;
    point_check();
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(board[i * 8 + j].color == 0) {
                if(reverse_check(i, j, 1)) {
                    result_black = true;
                }
                if(reverse_check(i, j, 2)) {
                    result_white = true;
                }
            }
        }
    }
    if(black > white) {
        b.style.color = "blue";
        w.style.color = "red";
    } else if(black < white) {
        b.style.color = "red";
        w.style.color = "blue";
    } else {
        b.style.color = "black";
        w.style.color = "black";
    }
    b.textContent = "黒：" + black;
    w.textContent = "白：" + white;
    if(result_black == false && result_white == false) {
        if(black > white) {
            comment.textContent = "黒の勝ちです。";
        } else if(black < white) {
            comment.textContent = "白の勝ちです。";
        } else {
            comment.textContent = "引き分けです。";
        }
    } else {
        if(result_black == false && next == 1) {
            next = 2;
        } else if(result_white == false && next == 2) {
            next = 1;
        }
        if(next == 1) {
            comment.textContent = "黒の番です。";
        } else {
            comment.textContent = "白の番です。";
        }
    }
    redraw();
}

function reverse_check(x, y, color) {
    let result = false;
    let dirs = [
    [-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]
    ];
    let check = [];
    if(color == 1) {
        board[x * 8 + y].black_check = [];
    } else {
        board[x * 8 + y].white_check = [];
    }
    for(let i = 0; i < 8; i++) {
        let dx = dirs[i][0];
        let dy = dirs[i][1];
        let x1 = x + dx;
        let y1 = y + dy;
        if((x1 >= 0) && (y1 >= 0) && (x1 <= 7) && (y1 <= 7)) {
            if((board[x1 * 8 + y1].color != color) && (board[x1 * 8 + y1].color != 0)) {
                check.push(i);
            }
        }
    }
    for(let i = 0; i < check.length; i++) {
        let dx = dirs[check[i]][0];
        let dy = dirs[check[i]][1];
        let x1 = x + dx;
        let y1 = y + dy;
        while((x1 >= 0) && (y1 >= 0) && (x1 <= 7) && (y1 <= 7)) {
            if(board[x1 * 8 + y1].color == 0) {
                break;
            } else if(board[x1 * 8 + y1].color != color) {
                x1 += dx; 
                y1 += dy; 
                continue;
            } else {
                if(color == 1) {
                    board[x * 8 + y].black_check.push(check[i]);
                } else {
                    board[x * 8 + y].white_check.push(check[i]);
                }
                result = true;
                break;
            }
        }
    }
    return result;
}

function reverse(x, y, color, i) {
    let dirs = [
    [-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]
    ];
    let dx = dirs[i][0];
    let dy = dirs[i][1];
    let x1 = x + dx;
    let y1 = y + dy;
    while((x1 >= 0) && (y1 >= 0) && (x1 <= 7) && (y1 <= 7)) {
        if(board[x1 * 8 + y1].color != color) {
            board[x1 * 8 + y1].reverse();
            x1 += dx; 
            y1 += dy;
            continue;
        } else {
            break;
        }
    }
}

function point_check() {
    black = 0;
    white = 0;
    board.forEach(function(s) {
        if(s.color == 1) {
            black += 1;
        }
        if(s.color == 2) {
            white += 1;
        }
    });
}

function redraw() {
    board.forEach(function(s) { s.draw(); });
}
