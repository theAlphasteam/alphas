var loaderCont = document.querySelector("div#loader-cont"),
    boxCont = document.querySelector(".loader.center"),
    effectEl = document.querySelector(".effect-element");
var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 650,
    delay: 500
});

function displayPage(){
    tl.add({
        targets: effectEl,
        scale: 1,
        translateX: "-50%",
        translateY: "-50%",
    });
    tl.add({
        targets: loaderCont,
        background: 'rgba(255,255,255, 0)'
    },"-=100");
    tl.add({
        targets: effectEl,
        scale: 0,
        translateX: "50%",
        translateY: "-50%",
        duration: 3050,
    });
    tl.add({
        targets: loaderCont,
        opacity: 0,
    },"-=3300");
    tl.add({
        targets: loaderCont,
        begin: function(){
        loaderCont.style.display = "none";    
        }
    },"-=2000");


    // setTimeout(function(){
    //     loaderCont.style.display = "none";
    // }, 2000)
}

//mobile navbar
var navBtn = document.querySelector(".nav-button-cont"),
    mobileNavBar = document.querySelector(".inner");

function toggleNav(){
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
    links = document.querySelectorAll("nav ul li");

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

var links = document.querySelectorAll("#links li a"),
    linkTarget = [];


function smoothScroll(e, dur){
    var e = document.querySelector(e),
        ePos = e.getBoundingClientRect().top,
        startPos = window.pageYOffset,
        d = ePos,
        startTime = null;
        console.table("ePos = " + ePos, "startPos = " + startPos, "d = " + d);

        function animation(currentTime){
            if(startTime === null) startTime = currentTime;
            // console.log("startTime = " + startTime);
            // console.log("currentTime = " + currentTime);
            var elapsed = currentTime - startTime,
                run = ease(elapsed, startPos, d, dur);
            // console.log("elapsed =" + elapsed);
            window.scrollTo(0, run);
            if(elapsed < dur) requestAnimationFrame(animation);
        }

        function ease (t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        };

        requestAnimationFrame(animation);
}

var curve = document.querySelector("#curve"),
    last_known_scroll_position = 0,
    defaultCurveValue = 160,
    curveRate = 2,
    ticking = false,
    curveValue;

function scrollEvent(scrollPos){
    console.log("scrollPos " + scrollPos);
    if(scrollPos >= 0 && scrollPos < defaultCurveValue * curveRate){
        curveValue = defaultCurveValue + parseFloat(scrollPos);
        console.log(curveValue);
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
})

//team-mates section scrolls
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

        setAttributes(image, {"src": teamMates[i].img, "alt" : teamMates[i].name});

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

function update(){
    console.log(contSlider.clientWidth, matesCont.clientWidth);
    var dur = teamMate.length*4 + "s";
    docStyles.setProperty("--tx", `${-(contSlider.clientWidth) + (matesCont.clientWidth)}px`);
    docStyles.setProperty("--dur", dur);
}


matesCont.addEventListener("mouseover", update);

//team-mates section data
var heading = document.querySelectorAll(".heading-cont h1"),
    description = document.querySelectorAll(".description-cont p"),
    social = document.querySelectorAll(".social-cont .social a span");

// function infoCards(){

// }

navBtn.addEventListener("click", toggleNav);
window.addEventListener("load", displayPage);

for(i = 0; i < links.length; i++){
    links[i].addEventListener("click", function(e){
        e.preventDefault();
        smoothScroll(e.target.getAttribute("href"), 1000);
    });
 };
