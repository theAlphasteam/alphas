var loaderCont = document.querySelector("div#loader-cont"),
    boxCont = document.querySelector(".loader.center"),
    effectEl = document.querySelector(".effect-element");

var footer = document.querySelector("#footer"),
    footerHeight;

var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 650,
    delay: 100
});

function displayPage(){
    tl.add({
        targets:".main-body-wrapper",
        opacity: 0
    });
    tl.add({
        targets: "#menu",
        begin: function(){
            menu.style.transform = "translateY(-100%)" ;
        }
    });
    // tl.add({
    //     targets: effectEl,
    //     scale: 1,
    //     translateX: "-50%",
    //     translateY: "-50%",
    // });
    tl.add({
        targets: loaderCont,
        background: 'rgba(255,255,255, 0)'
    },"-=100");
    tl.add({
        targets: loaderCont,
        scale: 0,
    });
    // tl.add({
    //     targets: boxCont,
    //     scale: 2
    //     // begin: function(){
    //     //     boxCont.style.display = "none";
    //     // }
    // });
    tl.add({
        targets: loaderCont,
        scale: 1
    });
    tl.add({
        targets: loaderCont,
        opacity: 0
    }, "-=1000");
    tl.add({
        targets: loaderCont,
        begin: function(){
        loaderCont.style.display = "none";    
        }
    },"-=200");
    tl.add({
        targets: "#menu",
        begin: function(){
            menu.style.transform = "translateY(0)" ;
        }
    });
    tl.add({
        targets:".main-body-wrapper",
        opacity: "1"
    }, "-=1000")

}

//mobile navbar
var navBtn = document.querySelector(".nav-button-cont"),
    mainBody = document.querySelector(".main-body-wrapper"),
    mobileNavBarCont = document.querySelector("#menu nav");
    mobileNavBar = document.querySelector(".inner");

function toggleNav(){
    mobileNavBarCont.classList.toggle("blurbody");
    mobileNavBar.classList.toggle("shownav");
    for(i = 0; i < navBtn.children.length; i++){
        navBtn.children[i].classList.toggle("animatebars");
    }
}

//code display functionalities
var texts = document.querySelectorAll(".codes p"),
    code = [],
    count = texts.length,
    index = 0,
    currentText = "",
    letter = "";
;
for(var i = 0; i < texts.length; i++){
    // for(x = 0; x < code[i].children.length; x++){
    //     texts[i] = [code[x].textContent];
    // }
    // texts[i] = code[i];
    for(x = 0; x < texts[i].children.length; x++){
        code[i] = texts[i].children[x];
    }
};

(function type(){
    if(count === code.length){
        count = 0;
        for(var i = 0; i < texts.length; i++){
            texts[i].innerHTML = "";
        };
    }
    
    currentText = code[count].innerHTML;
    letter = currentText.slice(0, ++index);

    texts[count].classList.add("blink");
    texts[count].innerHTML = letter;

    if(letter.length === currentText.length){
        count++;
        index = 0;
        texts[count - 1].classList.remove("blink");
    }
    setTimeout(type, 100);  
}());

//desktop nav bar functionalities
var slider = document.querySelector(".slider"),
    links = document.querySelectorAll("nav ul li"),
    menu = document.querySelector("#menu"),
    prevScrollPos = window.pageYOffset;

function hideBar(){
    var currentScrollPos = window.pageYOffset;
    if(prevScrollPos > currentScrollPos){
        menu.style.transform = "translateY(0)" ;
        anime({
            targets: '#menu nav ul li',
            translateY: 0,
            delay: anime.stagger(100)
        });
    }
    else if(prevScrollPos < currentScrollPos){
        menu.style.transform = "translateY(-100%)" ;
    }
    prevScrollPos = currentScrollPos;
}

(function navigate(){
    for(var i = 0; i < links.length; i++){
        links[i].addEventListener("click", positionSlider);
    }
}());

function positionSlider(e){
    var slider = document.querySelector(".slider"),
        slide = document.querySelector(".slide"),
        navBarWidth = document.querySelector("nav").getBoundingClientRect().width,
        navBarLeft = document.querySelector("nav").getBoundingClientRect().left
    ;


    console.log(e.target);
    slider.style.width = e.target.parentElement.getBoundingClientRect().width + 32 + "px";
    slider.style.left = -32 / 2 + "px";
    slide.style.left = e.target.getBoundingClientRect().x - navBarLeft - (e.target.clientWidth / 2) + "px";

    if( e.target.parentElement.getAttribute("class") == "contact-us"){
        slider.style.opacity = 0;
    }
    else{
        slider.style.opacity = 1;
    }
}

//smoothScrolls

var curve = document.querySelector("#curve"),
    last_known_scroll_position = 0,
    defaultCurveValue = 160,
    curveRate = 2,
    ticking = false,
    curveValue;

function scrollEvent(scrollPos){
    // console.log("scrollPos " + scrollPos);
    if(scrollPos >= 0 && scrollPos < defaultCurveValue * curveRate){
        curveValue = defaultCurveValue + parseFloat(scrollPos);
        // console.log(curveValue);
        curve.setAttribute("d", "M 800 300 Q 400 " + curveValue + " 0 300 L 0 0 L 800 0 L 800 300 Z");
    }
}

window.addEventListener("scroll", function(e){
    last_known_scroll_position = window.scrollY;
    if(!ticking){
        window.requestAnimationFrame(function(){
            scrollEvent(last_known_scroll_position);
            ticking = false;
        });
    }

    ticking = true;
});

//team-mates section data
var docStyles = document.documentElement.style,
    matesCont = document.querySelector("#mates-cont"),
    contSlider = document.querySelector("#cont-slider"),
    teamMate = document.querySelectorAll(".team-mate"),
    crntSocial = document.querySelectorAll(".social"),
    requestURL = './team.json',
    request = new XMLHttpRequest();

    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        var team = request.response;
        populateHeader(team);
        showTeam(team);
        update();
    }

function populateHeader(jsonObj) {
    console.log(jsonObj.teamName);
};

function showTeam(jsonObj){

    var teamMates = jsonObj.members;

    //set attribute helper function
    function setAttributes(el, attrs){
        for(k in attrs){
            el.setAttribute(k, attrs[k]);
        }
    }


    for(i = 0; i < teamMates.length; i++){

        for(s = 0; s < crntSocial.length; s++){
            crntSocial[s].remove();
        }

        var teamClone = teamMate[0].cloneNode(true);
        contSlider.appendChild(teamClone);
        teamMate[0].remove();
        var newTeamMate = document.querySelectorAll(".team-mate")[i];
        var image = newTeamMate.querySelector(".profile-cont .profile img");
        var alt = newTeamMate.querySelector(".profile-cont .profile h1");
        var newAlt = "";
        // newAlt += teamMates[i].name.split(" ")[n][0];
        // console.log(alt);

        if(teamMates[i].img == ""){
            for(n = 0; n < teamMates[i].name.split(" ").length; n++){
                console.log(teamMates[i].name.split(" ")[n][0]);
                newAlt += teamMates[i].name.split(" ")[n][0];
                console.log(newAlt)
            }
            setAttributes(image, { "alt" : teamMates[i].name});
            alt.textContent = newAlt;
        }
        else{
            setAttributes(image, {"src": teamMates[i].img, "alt" : teamMates[i].name});
        }

        console.log(newTeamMate.querySelector(".heading-cont h1"));
        newTeamMate.querySelector(".heading-cont h1").textContent = teamMates[i].name;
        var newDescription = newTeamMate.querySelector(".description-cont");
        newDescription.querySelector(".title").textContent = teamMates[i].role;
        newDescription.querySelector(".company").textContent = teamMates[i].company;
        newDescription.querySelector(".bio").textContent = teamMates[i].bio;

                    
        var newSocial = newTeamMate.querySelector(".social-cont");
        var socials = teamMates[i].social;
        var icons = teamMates[i].icons;

        for(s = 0; s < socials.length; s++){
            var socialCont = document.createElement("div");
            var socialLink = document.createElement("a");
            var socialIcon = document.createElement("span");

            // socialLink.setAttribute("href", socials[i]);
            console.log(socials[s]);
            console.log(icons[s]);

            setAttributes(socialCont, {"class": "social"});
            setAttributes(socialLink, {"href": socials[s], "target": "_blank", })
            setAttributes(socialIcon, {"class": icons[s]});
        
            newSocial.appendChild(socialCont);
            socialCont.appendChild(socialLink);
            socialLink.appendChild(socialIcon);

        }
        
    }
}

var leftBtn = document.querySelector(".direction-btn.left");
var rightBtn = document.querySelector(".direction-btn.right");
var teamMateCount;
var teamMatewidth;
var teamMatesVisible;

function updateValues(){
    teamMateCount = contSlider.children.length;
    teamMatewidth = contSlider.getBoundingClientRect().width / teamMateCount;
    teamMatesVisible = matesCont.getBoundingClientRect().width / teamMatewidth;  

    //set the value that will determine how many times the right button can be clicked
    directionCount = teamMateCount;

    docStyles.setProperty("--twidth", `${teamMatewidth}px`);

}
//set the slide to be moved by 0 amount
let teamCount = 0;

//initialize the value that will determine how many times the right button can be clicked, 
//value updated in updateValues()
let directionCount;

// let limit = teamMatewidth;

function moveSlide(e, direction, limit){
    
//determine the direction btn's action, "+" for left, "-" for right

    if (direction === "+"){

        //if the number of times the slide has moved to show more elements
        //(number of times the rightBtn has been clicked),
        //is == 0, that means we're on the first elements,
        //disabled the left bottom from taking the slide backwards
        if(teamCount >= 0){
            leftBtn.disabled = true;
            //reset the value that will determine how many times the right button can be clicked
            directionCount = teamMateCount;
        }

        //re-enable the right button
        rightBtn.disabled = false;

        //increase the amount of units that will multiply the width to translate(move) the slide back
        teamCount ++;
        
        docStyles.setProperty("--teamCount", teamCount);

    } 


    if (direction === "-"){ 
        //disable the right button for the slide when the amount moved is equal to the ampunt movable(number of elements)
        //dealing with negative values is tricky

        if(teamCount <= -(directionCount - teamMatesVisible)){
            rightBtn.disabled = true;
        }

        //re-enable the left button
        leftBtn.disabled = false;

        //reduce the amount of units that will multiply the width to translate(move) the slide back
        teamCount --;
        //as long as the amount movable is less than amount of items, increase the amount movable
        if (directionCount < teamMateCount) directionCount++;

        docStyles.setProperty("--teamCount", teamCount);
    }
    console.log({"directionCount" : directionCount, "teamCount": teamCount, "limit": limit})
}


//team-mates section scrolls
function update(){

    console.log(contSlider.clientWidth, matesCont.clientWidth);
    var dur = document.querySelectorAll(".team-mate").length*4 + "s";
    docStyles.setProperty("--tx", `${((-contSlider.clientWidth) + (matesCont.clientWidth))}px`);
    docStyles.setProperty("--dur", dur);

    updateValues();
}

function MiParallax(e){
    var Milax = document.querySelectorAll(".Milax");
    var rate;
    for(i = 0; i < Milax.length; i++){
        var scrolled = window.pageYOffset,
            elRate = parseFloat(Milax[i].getAttribute("data-rate")),
            translateY = Milax[i].getAttribute("");
        if(Milax[i].getAttribute("data-rate") == null){
           elRate = -2;
        }
        rate = scrolled / elRate;
        // console.log(rate);
        Milax[i].style.transform = 'translate3d(0, '+ rate + 'px, 0px)';    
    }
    
};

//copyright year
var copyrightYear = document.getElementById("year");

function getYear(){
    var date = new Date(),
        year = date.getFullYear();
    copyrightYear.textContent = year;
    console.log(year);
}

getYear();
// window.addEventListener("load", update);


// function infoCards(){

// }

navBtn.addEventListener("click", toggleNav);
window.addEventListener("load", displayPage);

leftBtn.addEventListener("click", function(e){
    console.log("some");
    moveSlide(e, "+", teamMateCount);
});
rightBtn.addEventListener("click", function(e){
    console.log("some");
    moveSlide(e, "-", teamMateCount);
});

window.addEventListener("scroll", MiParallax);
window.addEventListener("scroll", function(){
    if(screen.width < 700){
        console.log("small");
    } else{
        hideBar();
    // window.addEventListener("scroll", hideBar);
    }
    footerHeight= footer.clientHeight;

    docStyles.setProperty("--footer-height", `${footerHeight}px`);
    console.log(`${window.scrollY} >= ${document.body.scrollHeight} - ${footerHeight}`)
    if(window.scrollY >= (document.body.scrollHeight - (footerHeight + 800))){
         footer.style.zIndex = 0;
        } else{
            footer.style.zIndex = -1;            
    }
});
window.addEventListener("resize", updateValues);
