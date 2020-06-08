// ⚠⚠⚠⚠ named this file main.js
//       to prevent overwriting when the ts file is compiled
var siteNav;
var siteToggleBtn;
document.addEventListener('readystatechange', function (e) {
    if (e.target.readyState === "complete") {
        console.log('complete');
        siteNav = document.getElementById("site-nav");
        siteToggleBtn = document.getElementById("site-nav-btn");
        siteToggleBtn.addEventListener('click', toggleNav);
        siteNav.addEventListener('click', toggleNav);
    }
});
var toggleNav = function () {
    siteNav.classList.toggle("nav-open");
    siteToggleBtn.classList.toggle("active");
};
// const toggleNav = ({toggle, toggleClassName = "active", nav, navClassName = "nav-open"} = {})=>{
//     toggle.addEventListener("click", e=>{
//         nav.classList.toggle(navClassName);
//         siteToggleBtn.classList.toggle(toggleClassName);
//         console.log("toggle")
//     })
// }
