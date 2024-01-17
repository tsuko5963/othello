var board = [];
var next = 1;

window.onload = make_board;

class Stone {
    constructor(canvas, color, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.color = color;
        this.x = x;
        this.y = y;
    }
    click() {
        this.color = next;
        if(next == 1) next = 2;
        else next = 1;
        this.draw();
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
        }
    }
}

function canvas_click(e) {
    board[e.target.index].click();
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
            let stone = new Stone(canvas, color, i, j);
            board.push(stone);
            stone.draw();
        }
        table.appendChild(tr);
    }
}

