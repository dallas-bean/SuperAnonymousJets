function unhide(buttonId, divId) {
    const divs = document.querySelectorAll('.navToggle');

    divs.forEach((div) => {
        if (div.id !== divId && !div.classList.contains("collapse")) {
            div.classList.add("collapse");
        }
    });

    const displayMe = document.getElementById(divId);
    const hidden = displayMe.classList.contains("collapse");

    divs.forEach((div) => {
        if (div.id !== divId && !hidden) {
            div.classList.add('collapse');
            div.classList.remove('fadeIn')
        }
    });

    displayMe.classList.toggle("collapse", !hidden);
}

function fade() {
    document.getElementById("portals").classList.toggle("fadeIn");
}

function phones() {
    document.getElementById("phones").classList.toggle("collapse");
}