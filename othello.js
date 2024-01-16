window.onload = make_board;


function canvas_click(e) {
}

function make_board(){
    let table = document.getElementById("board");
    table.className = "board";
    for(let i = 0; i < 8; i++){
        let tr = document.createElement("tr");
        for(let j = 0; j < 8; j++){
            let td = document.createElement("td");
            td.className = "cell";
            let canvas = document.createElement("canvas");
            canvas.id = "canvas" + i + j;
            canvas.height = 44;
            canvas.width = 48;
            canvas.index = i * 8 + j;
            canvas.onclick = canvas_click;
            td.appendChild(canvas);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

