window.onload = make_board;

function make_board(){
    let table = document.getElementById("board");
    table.className = "board";
    for(let i = 0; i < 8; i++){
        let tr = document.createElement("tr");
        for(let j = 0; j < 8; j++){
            let td = document.createElement("td");
            td.className = "cell";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

