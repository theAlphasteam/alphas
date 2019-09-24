var button = document.querySelector("#glare-button"),
btncoords = button.getBoundingClientRect(),
glare = document.querySelector("#glare-button .glare"),
posX, 
posY
styles = document.documentElement.style;
button2 = document.querySelector("#button2"),
// btncoords2 = button2.getBoundingClientRect(),
glare2 = document.querySelector("#button2 .glare2");


function follow(e){
    posX = ((e.clientX - btncoords.left) - 25) / 1 + "px";
    posY = ((e.clientY - btncoords.top) - 50) / 1 + "px";
    // rotX = ((e.clientX - btncoords.left) - 50) / 8 + "deg";
    // rotY = ((e.clientX - btncoords.top) - 50) / 8 + "deg";

    styles.setProperty("--tx", `${posX}`);  
    styles.setProperty("--ty", `${posY}`);  
    console.log("translate(" + posX + "," + posY + ")");
}

button.addEventListener('mousemove', follow);

// function rotate(e){
//     console.log({clntX:e.clientX, clntY:e.clientY, scrnX:e.screenX, scrnY:e.screenY});
//     var 
//     x = e.clientX - btncoords2.left, 
//     y = e.clientY - btncoords2.top,
//     cx = btncoords2.width / 2,
//     cy = btncoords2.height / 2,
//     dx = x - cx,
//     dy = y - cy;

//     console.log({x: x, y: y, cx: cx, cy: cy, dx: dx, dy: dy});

//     styles.setProperty("--rx", `${(dy / -1.5)}deg`);
//     styles.setProperty("--ry", `${(dx / 10)}deg`);

//     // button2.style.transform = "translate(-50%, -50%) rotateX(" + (dy / -2) + "deg) rotateY(" + (dx / 10) + "deg)" 
//     glare2.style.transform = "translate(" + (-x / 2) + "%, " + -y + "%)";
// };

function restore(e){
    styles.setProperty("--rx", `${0}deg`);
    styles.setProperty("--ry", `${0}deg`);

    // button2.style.transform = "translate(-50%, -50%) rotateX(" + (dy / -2) + "deg) rotateY(" + (dx / 10) + "deg)" 
    glare2.style.transform = "translate(" + (-50) + "%, " + -50 + "%)";
 
}
// button2.addEventListener('mousemove', rotate);
// button2.addEventListener('mouseleave', restore);
