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

function autoPopulateICAO() {
    let loc1 = document.getElementById("icao1");
    let loc2 = document.getElementById("icao2");
    let loc3 = document.getElementById("icao3");
    let loc4 = document.getElementById("icao4");
    let loc5 = document.getElementById("icao5");
    let loc6 = document.getElementById("icao6");
    let loc7 = document.getElementById("icao7");
    let loc8 = document.getElementById("icao8");
    let loc9 = document.getElementById("icao9");
    let loc10 = document.getElementById("icao10");
    let loc1a = document.getElementById("icao1a");
    let loc2a = document.getElementById("icao2a");
    let loc3a = document.getElementById("icao3a");
    let loc4a = document.getElementById("icao4a");
    let loc5a = document.getElementById("icao5a");
    let loc6a = document.getElementById("icao6a");
    let loc7a = document.getElementById("icao7a");
    let loc8a = document.getElementById("icao8a");
    let loc9a = document.getElementById("icao9a");
    let loc10a = document.getElementById("icao10a");

    for (let i = 1; i <= 10; i++) {
        const locElement = document.getElementById(`icao${i}`);
        const locElementA = document.getElementById(`icao${i}a`)

        locElementA.value = locElement.value;
    }

}