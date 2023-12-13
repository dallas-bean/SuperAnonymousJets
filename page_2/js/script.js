// TABLE EXPANSIONS

// EJM Table display
    function addTableOne() {
        document.getElementById("ejmTablePlus").classList.toggle("hide");
    }

// Routing Table display
    function reveal() {
        let routeRowTwo = document.getElementById("routeRowTwo");
        let weatherRowTwo = document.getElementById("weatherRowTwo");
        let legButtonOne = document.getElementById("legButtonOne");
        let legButtonTwo = document.getElementById("legButtonTwo");

        routeRowTwo.classList.toggle("hide");
        legButtonOne.classList.toggle("hide");
        legButtonTwo.classList.toggle("hide");
        weatherRowTwo.classList.toggle("hide");
    }

// IS-BAH Table display
    function revealThree() {
        document.getElementById("isBahQuestions").classList.toggle("hide");
    }

// International table display
    function revealFour() {
        document.getElementById("intnlTable").classList.toggle("hide");
        document.getElementById("r4b1").classList.toggle("hide");
        document.getElementById("r4b2").classList.toggle("hide")
    }

// WARNING MESSAGES

// Reference line # 29
function popup1() {
    var checkbox = document.getElementById("pop1");
    var prompt = document.getElementById("warn1");

    if (checkbox.checked == true){
        prompt.style.display = "block";}
        else {
            prompt.style.display = "none"
        }
    }
function close1() {
    var popup = document.getElementById("warn1");
    popup.style.display = "none";
}
// ~~~~~~~~~
// Reference line # 35
function popup2() {
    var clickable = document.getElementById("crewStandardsPopup");
    clickable.addEventListener("click", showMe());

    function showMe() {
        var one = document.getElementById("picStandards");
        one.style.display = "block";   
    }
}
function close2() {
    var resetOne = document.getElementById("sicStandards");
    var resetTwo = document.getElementById("picStandards");
    resetOne.style.display = "none";
    resetTwo.style.display = "none";
}
function swap1() {
    var resetOne = document.getElementById("picStandards");
    var myTurn = document.getElementById("sicStandards");
    resetOne.style.display = "none";
    myTurn.style.display = "block";
}
function swap2() {
    var resetOne = document.getElementById("sicStandards");
    var myTurn = document.getElementById("picStandards");
    resetOne.style.display = "none";
    myTurn.style.display = "block";
}
// ~~~~~~~~~
// Reference line # 128

function popup3() {
    var checkbox = document.getElementById("pop3");
    var prompt = document.getElementById("warn3");

    if (checkbox.checked == true){
        prompt.style.display = "block";}
        else {
            prompt.style.display = "none"
        }
    }
function close3() {
    var popup = document.getElementById("warn3");
    popup.style.display = "none";
}
// ~~~~~~~~~
// Reference line # 134

function popup4() {
    var checkbox = document.getElementById("pop4");
    var prompt = document.getElementById("warn4");

    if (checkbox.checked == true){
        prompt.style.display = "block";}
        else {
            prompt.style.display = "none"
        }
    }
function close4() {
    var popup = document.getElementById("warn4");
    popup.style.display = "none";
}
// ~~~~~~~~~
// Reference line # 216

function popup5() {
    var checkbox = document.getElementById("pop5");
    var prompt = document.getElementById("warn5");

    if (checkbox.checked == true){
        prompt.style.display = "block";}
        else {
            prompt.style.display = "none"
        }
    }
function close5() {
    var popup = document.getElementById("warn5");
    popup.style.display = "none";
}
// ~~~~~~~~~
// Reference line # 216

function popup6() {
    document.getElementById("whoseWhoOne").classList.toggle("hide");
}

function popup7() {
    document.getElementById("whoseWhoTwo").classList.toggle("hide");
}