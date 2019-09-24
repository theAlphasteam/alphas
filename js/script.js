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
    slide = document.querySelector(".slide"),
    navBarWidth = document.querySelector("nav").getBoundingClientRect().width,
    navBarLeft = document.querySelector("nav").getBoundingClientRect().left,
    links = document.querySelectorAll("nav ul li");

(function navigate(){
    for(var i = 0; i < links.length; i++){
        links[i].addEventListener("click", positionSlider);
    }
}());

function positionSlider(e){
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

navBtn.addEventListener("click", toggleNav);
window.addEventListener("load", displayPage);
