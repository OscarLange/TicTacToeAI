let symbol = "X";

let field = [[null, null, null], [null, null, null], [null, null, null]];

let round = 0;

let treeconstructed = false;

let tree = {};

let costtree = {};


function buttonpressed(buttonid, human) {


    if(checkvictory() === "none"){
        round++;
    }


    document.getElementById("counterlabel").innerText = "Round: " + round;

    let label = document.createElement("Label");
    label.setAttribute("class", "label");
    label.setAttribute("id", "label" + buttonid);

    label.innerHTML = symbol;

    insertfield(String(buttonid));

    updatefield(checkvictory());

    if (symbol === "X") {
        symbol = "O";

    } else {
        symbol = "X"
    }

    if(checkvictory() === "none" || checkvictory() === "draw"){
        document.getElementById("td_" + buttonid).appendChild(label);
        document.getElementById("td_" + buttonid).removeChild(document.getElementById("button" + buttonid));
    }



    if(!treeconstructed){
        start(field);
        evaluatetree();
    }
    else if(human){
        trimtree();
    }


    if(human){
        nextmove();
    }



}

function insertfield(buttonid) {
    let buttonrow = Number(buttonid.charAt(0)) - 1;
    let buttoncell = Number(buttonid.charAt(1)) - 1;


    field[buttonrow][buttoncell] = symbol;
}

function checkvictory() {
    for (let i = 0; i < 3; i++) {
        if (!checkcolumn(i).includes("none")) {
            return checkcolumn(i) + ",column," + i;
        }
        if (!checkrow(field[i]).includes("none")) {
            return checkrow(field[i]) + ",row," + i;
        }
    }
    if (!checkdiagonale().includes("none")) {
        return checkdiagonale();
    }
    if (Number(round) === 9) {
        return "draw";
    } else {
        return "none";
    }
}

function checkdiagonale() {
    if (field[1][1] === null) {
        return "none";
    }
    if (String(field[1][1]).includes("X")) {
        if (field[0][0] !== null && field[2][2] !== null && String(field[0][0]).includes("X") && String(field[2][2]).includes("X")) {
            return "X,left"
        }
        if (field[0][2] !== null && field[2][0] !== null && String(field[0][2]).includes("X") && String(field[2][0]).includes("X")) {
            return "X,right"
        }
        return "none";
    }
    if (String(field[1][1]).includes("O")) {
        if (field[0][0] !== null && field[2][2] !== null && String(field[0][0]).includes("O") && String(field[2][2]).includes("O")) {
            return "O,left"
        }
        if (field[0][2] !== null && field[2][0] !== null && String(field[0][2]).includes("O") && String(field[2][0]).includes("O")) {
            return "O,right"
        }
        return "none";
    }
    return "none";
}

function checkcolumn(index) {
    let x = 0, o = 0;
    for (let k = 0; k < 3; k++) {
        let cell = field[k][index];
        if (cell !== null) {
            if (String(cell).includes("X")) {
                x++;
            } else {
                o++;
            }
        } else {
            return "none";
        }
    }
    if (x === 3) {
        return "X";
    }
    if (o === 3) {
        return "O";
    }
    return "none";
}

function checkrow(row) {
    let x = 0, o = 0;
    for (let j = 0; j < 3; j++) {
        let cell = row[j];
        if (cell !== null) {
            if (String(cell).includes("X")) {
                x++;
            } else {
                o++;
            }
        } else {
            return "none";
        }
    }
    if (x === 3) {
        return "X";
    }
    if (o === 3) {
        return "O";
    }
    return "none";
}

function reload(){
    location.reload();
}

function updatefield(msg) {
    if(msg.includes("draw")){
        document.getElementById("header_text").innerText = "DRAW!";


        document.getElementById("finish_button").style.visibility = "visible";
    }
    else if (!msg.includes("none")) {
        let winner = msg.split(",")[0];
        document.getElementById("header_text").innerText = "Player " + winner + " won!";
        let type = msg.split(",")[1];


        document.getElementById("finish_button").style.visibility = "visible";

        if (type === "row") {
            let index = Number(msg.split(",")[2]) + 1;

            let label1 = document.createElement("Label");
            label1.setAttribute("class", "label");
            label1.setAttribute("id", "label1");
            label1.innerText = winner;

            let label2 = document.createElement("Label");
            label2.setAttribute("class", "label");
            label2.setAttribute("id", "label2");
            label2.innerText = winner;

            let label3 = document.createElement("Label");
            label3.setAttribute("class", "label");
            label3.setAttribute("id", "label3");
            label3.innerText = winner;

            let td1 = document.createElement("td");
            td1.setAttribute("id", "newtd_" + index + "1");
            td1.setAttribute("class", "newtd");
            let td2 = document.createElement("td");
            td2.setAttribute("id", "newtd_" + index + "2");
            td2.setAttribute("class", "newtd");
            let td3 = document.createElement("td");
            td3.setAttribute("id", "newtd_" + index + "3");
            td3.setAttribute("class", "newtd");

            td1.appendChild(label1);
            td2.appendChild(label2);
            td3.appendChild(label3);

            document.getElementById("row" + index).removeChild(document.getElementById("td_" + index + "1"));
            document.getElementById("row" + index).removeChild(document.getElementById("td_" + index + "2"));
            document.getElementById("row" + index).removeChild(document.getElementById("td_" + index + "3"));

            document.getElementById("row" + index).appendChild(td1);
            document.getElementById("row" + index).appendChild(td2);
            document.getElementById("row" + index).appendChild(td3);

        }
        else if (type === "column") {
            let index = Number(msg.split(",")[2]) + 1;

            let label1 = document.createElement("Label");
            label1.setAttribute("class", "label");
            label1.setAttribute("id", "label1");
            label1.innerText = winner;

            let label2 = document.createElement("Label");
            label2.setAttribute("class", "label");
            label2.setAttribute("id", "label2");
            label2.innerText = winner;

            let label3 = document.createElement("Label");
            label3.setAttribute("class", "label");
            label3.setAttribute("id", "label3");
            label3.innerText = winner;

            let td1 = document.createElement("td");
            td1.setAttribute("id", "newtd_" + "1" + index);
            td1.setAttribute("class", "newtd");
            let td2 = document.createElement("td");
            td2.setAttribute("id", "newtd_" + "2" + index);
            td2.setAttribute("class", "newtd");
            let td3 = document.createElement("td");
            td3.setAttribute("id", "newtd_" + "3" + index);
            td3.setAttribute("class", "newtd");

            td1.appendChild(label1);
            td2.appendChild(label2);
            td3.appendChild(label3);

            if (Number(index) === 1) {

                let tmp_td12 = document.getElementById("td_" + "1" + "2");
                let tmp_td13 = document.getElementById("td_" + "1" + "3");
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "1"));
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "2"));
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "3"));


                let tmp_td22 = document.getElementById("td_" + "2" + "2");
                let tmp_td23 = document.getElementById("td_" + "2" + "3");
                document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + "1"));
                document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + "2"));
                document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + "3"));

                let tmp_td32 = document.getElementById("td_" + "3" + "2");
                let tmp_td33 = document.getElementById("td_" + "3" + "3");
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "1"));
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "2"));
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "3"));

                document.getElementById("row" + "1").appendChild(td1);
                document.getElementById("row" + "1").appendChild(tmp_td12);
                document.getElementById("row" + "1").appendChild(tmp_td13);
                document.getElementById("row" + "2").appendChild(td2);
                document.getElementById("row" + "2").appendChild(tmp_td22);
                document.getElementById("row" + "2").appendChild(tmp_td23);
                document.getElementById("row" + "3").appendChild(td3);
                document.getElementById("row" + "3").appendChild(tmp_td32);
                document.getElementById("row" + "3").appendChild(tmp_td33);

            } else if (Number(index) === 2) {


                let tmp_td13 = document.getElementById("td_" + "1" + "3");
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "2"));
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "3"));


                let tmp_td23 = document.getElementById("td_" + "2" + "3");
                document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + "2"));
                document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + "3"));

                let tmp_td33 = document.getElementById("td_" + "3" + "3");
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "2"));
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "3"));

                document.getElementById("row" + "1").appendChild(td1);
                document.getElementById("row" + "1").appendChild(tmp_td13);
                document.getElementById("row" + "2").appendChild(td2);
                document.getElementById("row" + "2").appendChild(tmp_td23);
                document.getElementById("row" + "3").appendChild(td3);
                document.getElementById("row" + "3").appendChild(tmp_td33);

            } else {
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + index));
                document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + index));
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + index));

                document.getElementById("row" + "1").appendChild(td1);
                document.getElementById("row" + "2").appendChild(td2);
                document.getElementById("row" + "3").appendChild(td3);
            }

        } else {
            let label1 = document.createElement("Label");
            label1.setAttribute("class", "label");
            label1.setAttribute("id", "label1");
            label1.innerText = winner;

            let label2 = document.createElement("Label");
            label2.setAttribute("class", "label");
            label2.setAttribute("id", "label2");
            label2.innerText = winner;

            let label3 = document.createElement("Label");
            label3.setAttribute("class", "label");
            label3.setAttribute("id", "label3");
            label3.innerText = winner;


            let td2 = document.createElement("td");
            td2.setAttribute("id", "newtd_" + "2" + "2");
            td2.setAttribute("class", "newtd");

            let tmp_td23 = document.getElementById("td_" + "2" + "3");
            document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + "2"));
            document.getElementById("row" + "2").removeChild(document.getElementById("td_" + "2" + "3"));


            td2.appendChild(label2);

            document.getElementById("row" + "2").appendChild(td2);
            document.getElementById("row" + "2").appendChild(tmp_td23);

            if (type === "left") {

                let td1 = document.createElement("td");
                td1.setAttribute("id", "newtd_" + "1" + "1");
                td1.setAttribute("class", "newtd");
                let td3 = document.createElement("td");
                td3.setAttribute("id", "newtd_" + "3" + "3");
                td3.setAttribute("class", "newtd");

                td1.appendChild(label1);
                td3.appendChild(label3);
                let tmp_td12 = document.getElementById("td_" + "1" + "2");
                let tmp_td13 = document.getElementById("td_" + "1" + "3");
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "1"));
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "2"));
                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "3"));

                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "3"));

                document.getElementById("row" + "1").appendChild(td1);
                document.getElementById("row" + "1").appendChild(tmp_td12);
                document.getElementById("row" + "1").appendChild(tmp_td13);
                document.getElementById("row" + "3").appendChild(td3);
            }

            if (type === "right") {

                let td1 = document.createElement("td");
                td1.setAttribute("id", "newtd_" + "1" + "3");
                td1.setAttribute("class", "newtd");
                let td3 = document.createElement("td");
                td3.setAttribute("id", "newtd_" + "3" + "1");
                td3.setAttribute("class", "newtd");

                td1.appendChild(label1);
                td3.appendChild(label3);
                let tmp_td32 = document.getElementById("td_" + "3" + "2");
                let tmp_td33 = document.getElementById("td_" + "3" + "3");


                document.getElementById("row" + "1").removeChild(document.getElementById("td_" + "1" + "3"));

                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "1"));
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "2"));
                document.getElementById("row" + "3").removeChild(document.getElementById("td_" + "3" + "3"));


                document.getElementById("row" + "1").appendChild(td1);
                document.getElementById("row" + "3").appendChild(td3);
                document.getElementById("row" + "3").appendChild(tmp_td32);
                document.getElementById("row" + "3").appendChild(tmp_td33);
            }
        }
    }
}


/// AI PART ____________________________________



function start(tmp_field){

    let copyfield = shallowcopyfield(tmp_field);

    tree["knot"] = copyfield;

    tree["childknots"] = createfringe(shallowcopyfield(copyfield), "O");

    treeconstructed = true;

}

function shallowcopyfield(tmp_field){
    let copyfield = [];
    for(let i = 0; i < 3; i++){
        let copyrow = [];
        for(let j = 0; j < 3; j++){
            copyrow = copyrow.concat(tmp_field[i][j]);
        }
        copyfield = copyfield.concat([copyrow]);
    }
    return copyfield;
}

function evaluatetree(){
    costtree = max(tree);
}

function trimtree(){
    let childknots = tree["childknots"];
    for(let i = 0; i < childknots.length; i++){
        let tmp_knot = childknots[i];
        let tmp_field = shallowcopyfield(tmp_knot["knot"]);
        if(comparefield(tmp_field, field)){
            tree = tmp_knot;
            costtree = costtree["childknots"][i];
        }
    }
}

function comparefield(field1, field2){
    if(differencefield(field1, field2) === null){
        return true;
    }
    else{
        return false;
    }
}


function nextmove(){
    let maxcost = Number(costtree["knot"]);
    let childknots = costtree["childknots"];
    let move = 0;
    for(let x= 0; x < childknots.length; x++){
        if(Number(childknots[x]["knot"]) === maxcost){
            move = x;
            break;
        }
    }
    let tmp_knot = tree["childknots"][move];
    let movefield = tmp_knot["knot"];
    let moveposition = differencefield(movefield, field);

    costtree = childknots[move];
    tree = tree["childknots"][move];

    buttonpressed(moveposition, false);


}

function differencefield(field1, field2){
    for(let i = 0; i <3; i++){
        for(let j = 0; j <3; j++){
            if(field1[i][j] === null && field2[i][j] !== null){
                let x = i+1;
                let y = j+1;
                return (x + "" + y);
            }
            else if(field1[i][j] !== null && field2[i][j] === null){
                let x = i+1;
                let y = j+1;
                return (x + "" + y);
            }
        }
    }
    return null;
}

function max(new_tree){
    let maxscore = Number.NEGATIVE_INFINITY;
    let currentfield = shallowcopyfield(new_tree["knot"]);
    let result = checkvictoryfield(currentfield);
    if(result === "draw"){
        return {"knot": 0};
    }
    else if(result === "none"){
        let childknots = new_tree["childknots"];
        let tmp_childknots = [];
        for(let i = 0; i < childknots.length; i++){
            let score = min(childknots[i]);
            tmp_childknots = tmp_childknots.concat(score);
            if(score["knot"] > maxscore){
                maxscore = score["knot"];
            }
        }
        let tmp_tree = {};
        tmp_tree["knot"] = maxscore;
        tmp_tree["childknots"] = tmp_childknots;
        tmp_tree["type"] = "maximize";
        return tmp_tree;
    }
    else {
        if(result.split(",")[0].includes("X")){
            return {"knot": -10};
        }
        else{
            return {"knot": 10};
        }
    }
}

function min(new_tree){
    let minscore = Number.POSITIVE_INFINITY;
    let currentfield = shallowcopyfield(new_tree["knot"]);
    let result = checkvictoryfield(currentfield);
    if(result === "draw"){
        return {"knot": 0};
    }
    else if(result === "none"){
        let childknots = new_tree["childknots"];
        let tmp_childknots = [];
        for(let i = 0; i < childknots.length; i++){
            let score = max(childknots[i]);
            tmp_childknots = tmp_childknots.concat(score);
            if(score["knot"] < minscore){
                minscore = score["knot"];
            }
        }
        let tmp_tree = {};
        tmp_tree["knot"] = minscore;
        tmp_tree["childknots"] = tmp_childknots;
        tmp_tree["type"] = "minimize";
        return tmp_tree;
    }
    else {
        if(result.split(",")[0].includes("X")){
            return {"knot": -10};
        }
        else{
            return {"knot": 10};
        }
    }
}

function createfringe(tmp_field, symbol){
    let fieldlist = [];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            fieldlist = fieldlist.concat([createfield(tmp_field,symbol, i,j)]);
        }
    }
    let finalfieldlist = [];
    for(let x = 0; x <= fieldlist.length; x++){
        if(fieldlist[x] !== null && typeof fieldlist[x] !== "undefined"){
            finalfieldlist = finalfieldlist.concat([fieldlist[x]]);
        }
    }
    let treelist = [];
    for(let y = 0; y < finalfieldlist.length; y++){
        let tmp_tree = {};
        tmp_tree["knot"] = finalfieldlist[y];
        if(symbol === "O"){
            tmp_tree["childknots"] = createfringe(shallowcopyfield(finalfieldlist[y]), "X");
        }
        else{
            tmp_tree["childknots"] = createfringe(shallowcopyfield(finalfieldlist[y]), "O");
        }
        treelist = treelist.concat(tmp_tree);
    }
    if(finalfieldlist.length === 0){
        return null;
    }
    else{
        return treelist;
    }
}

function createfield(tmp_field, symbol, row, column){
    if(tmp_field[row][column] === null){
        let shallowcopy = shallowcopyfield(tmp_field);
        shallowcopy[row][column] = symbol;
        return shallowcopy;
    }
    else{
        return null;
    }
}

function checknull(tmp_field){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(tmp_field[i][j] === null){
                return false;
            }
        }
    }
    return true;
}


function checkvictoryfield(tmp_field) {
    for (let i = 0; i < 3; i++) {
        if (!checkcolumnfield(tmp_field,i).includes("none")) {
            return checkcolumnfield(tmp_field, i) + ",column," + i;
        }
        if (!checkrow(tmp_field[i]).includes("none")) {
            return checkrow(tmp_field[i]) + ",row," + i;
        }
    }
    if (!checkdiagonalefield(tmp_field).includes("none")) {
        return checkdiagonalefield(tmp_field);
    }
    if (checknull(tmp_field)) {
        return "draw";
    } else {
        return "none";
    }
}

function checkdiagonalefield(tmp_field) {
    if (tmp_field[1][1] === null) {
        return "none";
    }
    if (String(tmp_field[1][1]).includes("X")) {
        if (tmp_field[0][0] !== null && tmp_field[2][2] !== null && String(tmp_field[0][0]).includes("X") && String(tmp_field[2][2]).includes("X")) {
            return "X,left"
        }
        if (tmp_field[0][2] !== null && tmp_field[2][0] !== null && String(tmp_field[0][2]).includes("X") && String(tmp_field[2][0]).includes("X")) {
            return "X,right"
        }
        return "none";
    }
    if (String(tmp_field[1][1]).includes("O")) {
        if (tmp_field[0][0] !== null && tmp_field[2][2] !== null && String(tmp_field[0][0]).includes("O") && String(tmp_field[2][2]).includes("O")) {
            return "O,left"
        }
        if (tmp_field[0][2] !== null && tmp_field[2][0] !== null && String(tmp_field[0][2]).includes("O") && String(tmp_field[2][0]).includes("O")) {
            return "O,right"
        }
        return "none";
    }
    return "none";
}

function checkcolumnfield(tmp_field, index) {
    let x = 0, o = 0;
    for (let k = 0; k < 3; k++) {
        let cell = tmp_field[k][index];
        if (cell !== null) {
            if (String(cell).includes("X")) {
                x++;
            } else {
                o++;
            }
        } else {
            return "none";
        }
    }
    if (x === 3) {
        return "X";
    }
    if (o === 3) {
        return "O";
    }
    return "none";
}

