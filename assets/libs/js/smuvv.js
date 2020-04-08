
//initialize smuvv
// function smuvvInit({linkEl, dur, ease}){
//using es6 object destructuring to pass default values to parameters
//also pass an empty object by default, for when the function is called without any object
function smuvvInit({linkEl = ".smuvvLink", dur = 800, ease = easing} = {}){
    //run code when the dom is interactive - complete
    document.addEventListener('readystatechange', function(e){
        if(e.target.readyState === "complete"){
            console.log(linkEl, dur, ease);
            // check if the function parameters have values
            // if not, assign default values
            // linkEl == undefined ? linkEl = document.querySelectorAll(".smuvvLink") : linkEl = document.querySelectorAll(linkEl)
            // dur == undefined ? dur = 800 : dur = dur;
            // ease == undefined ? ease = easing : ease = ease;
            
            //get the link elements
            linkEl = document.querySelectorAll(linkEl);
            for(i = 0; i < linkEl.length; i++){
                linkEl[i].addEventListener("click", function(e){
                    e.preventDefault();
                    smoothScroll(e.target.getAttribute("href"), dur);
                });
            };    
            console.log(linkEl, dur, ease);
            //smuvv has been initialized!
            smuvvd = true;
        
        }
    });
}

//default easing
function easing (t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t + 1) + b;
};

//smooth scroll func for links
function smoothScroll(e, dur){
    var e = document.querySelector(e),
    ePos = e.getBoundingClientRect().top,
    startPos = window.pageYOffset,
    d = ePos,
    startTime = null;
    
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var elapsed = currentTime - startTime,
        run = easing(elapsed, startPos, d, dur);
        window.scrollTo(0, run);
        if(elapsed < dur) requestAnimationFrame(animation);
    };
    
    requestAnimationFrame(animation);
};

window.addEventListener('load', ()=>{smuvvd ? smuvvd = true : console.log("smuvv Tip: For smuvv to work on your site, you need to initialize it:\n \n <script> \n   smuvvInit(); \n </script>");})
//boolean for smuvv to check if it's been initialized 
let smuvvd = false;