const canvas = document.getElementById("canvas");

const floor_1 = document.getElementById("floor_1");
const floor_2 = document.getElementById("floor_2");
const floor_3 = document.getElementById("floor_3");
const floor_4 = document.getElementById("floor_4");
const floor_5 = document.getElementById("floor_5");
const floor_6 = document.getElementById("floor_6");
const floor_7 = document.getElementById("floor_7");
const floors = [floor_1, floor_2, floor_3, floor_4, floor_5, floor_6, floor_7]

const floor_1_button = document.getElementById("floor_1_button");
const floor_2_button = document.getElementById("floor_2_button");
const floor_3_button = document.getElementById("floor_3_button");
const floor_4_button = document.getElementById("floor_4_button");
const floor_5_button = document.getElementById("floor_5_button");
const floor_6_button = document.getElementById("floor_6_button");
const floor_7_button = document.getElementById("floor_7_button");

const buttons = [floor_1_button, floor_2_button, floor_3_button, floor_4_button, floor_5_button, floor_6_button, floor_7_button];

var new_ = document.querySelectorAll("[id^='select_']");
buttons.push(...new_);

new_ = document.querySelectorAll("[id^='handler_']");
buttons.push(...new_);

new_ = document.querySelectorAll("[id^='room_']");
buttons.push(...new_);



//document.getElementById('output2').textContent = `all buttons: ${buttons.length}, added: ${new_.length}`;


const ctx = canvas.getContext('2d');
ctx.drawImage(floor_1, 0, 0);
document.getElementById('output1').textContent = '1';
ctx.lineWidth = 10;
ctx.strokeStyle = "red";



function line(x1, y1, x2, y2) {
    ctx.beginPath();
    const d = 0; // 235
    ctx.moveTo(x1, y1+d);
    ctx.lineTo(x2, y2+d);
    ctx.stroke();
}



function distance(p1, p2) {
    if ((p1 === null) || (p2 === null)) {return 12345678901234567890; }
    p1 = p1.getBoundingClientRect();
    p2 = p2.getBoundingClientRect();

    const dx = (p1.left - p2.left)**2;
    const dy = (p1.top - p2.top)**2;
    return (dx + dy)**0.5;
}



function min(a, b) {
    if (a < b) { return a; }
    else { return b; }
}



function include(list, val) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == val) { return true; }
    }
    return false;
}



function way(start, end, path=[], memory={}, iter=0) {
    iter += 1;
    var closest = start.value;
    var closest = closest.split('| ');
    if (closest.length > 1) { closest = closest[1].split("; "); }
    else { closest = []; }

    if (iter == 1) {
        path = [start];
        memory[start] = [0, path];
    }

    var ans = [];

    for (let i = 0; i < closest.length; i++) {
        var p = document.getElementById(`room_${closest[i]}_button`);
        if (p === null) { continue; }
        if (include(path, p)) { 
            continue;
            //memory[p] = [min(memory[p], memory[start][0] + distance(start, p)), [...path, p]];
        }
        else {
            //document.getElementById('output2').textContent += closest[i];
            if (iter == 1) {
                memory[p] = [distance(start, p), [...path, p]];
            } else {
                var len = memory[start][0] + distance(start, p);
                var pat = [...path, p];
                memory[p] = [len, pat];
            }
        }

        if (p == end) {
            return memory[end];
        }
        else {
            ans.push(way(p, end, [...path, p], memory, iter+1));
        }
    }


    var m = 12345678901234567890;
    var answer = [];

    for (let i = 0; i < ans.length; i++) {
        if (ans[i][0] < m) {
            m = ans[i][0];
            answer = ans[i];
        }
    }

    return answer;
}



function way_draw(start, end) {
    const w = way(start, end)[1];
    var ans = "";

    for (let i = 1; i < w.length; i++) {
        ans += w[i].id;
        var p1 = w[i-1].value;
        p1 = p1.split("| ");

        if (p1.length > 2) {
            p1 = p1[2].split("; ");
            x1 = parseInt(p1[0]);
            y1 = parseInt(p1[1]);
        } else {
            p1 = w[i-1].getBoundingClientRect();
            x1 = p1.left;
            y1 = p1.top;
        }

        var p2 = w[i].value;
        p2 = p2.split("| ");
        
        if (p2.length > 2) {
            p2 = p2[2].split("; ");
            x2 = parseInt(p2[0]);
            y2 = parseInt(p2[1]);
        } else {
            p2 = w[i].getBoundingClientRect();
            x2 = p2.left;
            y2 = p2.top;
        }

        line(x1, y1, x2, y2);
        console.log(x1, y1, x2, y2)
    }

    document.getElementById('output2').textContent += ans;
}



function handleClick(buttonElement) {
    const data = buttonElement.value;
    const id = buttonElement.id;

    buttons[7].visibility = "hidden";
    buttons[7].value = "";
    buttons[8].visibility = "hidden";
    buttons[8].value = "";

    if (id.includes("floor")) {
        const clear = document.getElementById("clear");
        clear.visibility = "visible";
        ctx.drawImage(clear, 0, 0);

        document.getElementById('output1').textContent = data;
        ctx.drawImage(floors[parseInt(data) - 1], 0, 0);

        for (let i = 11; i < buttons.length; i ++) {
            if ((buttons[i].id.includes("room")) && (buttons[i].id[5] === data)) {
                buttons[i].style.visibility = "visible";
            } else {
                buttons[i].style.visibility = "hidden";
            }
        }
    } 
    else if (id.includes("room")) {
        document.getElementById('output2').textContent = data;
        buttons[7].style.visibility = "visible";
        buttons[7].value = id.slice(5, 10);
        buttons[8].style.visibility = "visible";
        buttons[8].value = id.slice(5, 10);
    } 
    else if (id.includes("select")) {
        if (id.includes("end")) { buttons[10].value = data; }
        else { buttons[9].value = data; }

        const start_num = buttons[9].value;
        const end_num = buttons[10].value;
        if ((start_num != "") && (end_num != "")) {
            const pstart = document.getElementById(`room_${start_num}_button`).getBoundingClientRect();
            const start = document.getElementById(`room_${start_num}_button`);
            const pend = document.getElementById(`room_${end_num}_button`).getBoundingClientRect();
            const end = document.getElementById(`room_${end_num}_button`);

            //line(pstart.left, pstart.top, pend.right, pend.bottom);
            way_draw(start, end);
        }
    }
}



ctx.drawImage(floor_1, 0, 0);
