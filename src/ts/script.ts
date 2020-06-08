// ⚠⚠⚠⚠ named this file main.js
//       to prevent overwriting when the ts file is compiled

let siteNav;
let siteToggleBtn;

document.addEventListener('readystatechange', (e)=>{
    if((e.target as HTMLDocument).readyState === "complete"){
        console.log('complete');
        siteNav = document.getElementById("site-nav");
        siteToggleBtn = document.getElementById("site-nav-btn");
        siteToggleBtn.addEventListener('click', toggleNav);
        siteNav.addEventListener('click', toggleNav);

    }
});

const toggleNav = ()=>{
    siteNav.classList.toggle("nav-open");
    siteToggleBtn.classList.toggle("active");
}


// const toggleNav = ({toggle, toggleClassName = "active", nav, navClassName = "nav-open"} = {})=>{
//     toggle.addEventListener("click", e=>{
//         nav.classList.toggle(navClassName);
//         siteToggleBtn.classList.toggle(toggleClassName);
//         console.log("toggle")
//     })
// }