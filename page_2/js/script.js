function closeout() {
    var reset = document.getElementById("warning1");
    reset.style.display = "none";
}
function closeout2() {
    var reset = document.getElementById("warning2");
    reset.style.display = "none";
}
function closeout3() {
    var reset = document.getElementById("warning3");
    reset.style.display = "none";
}
function closeout4() {
    var reset = document.getElementById("warning4");
    reset.style.display = "none";
}
function closeout5() {
    var resetOne = document.getElementById("picStandards");
    var myTurn = document.getElementById("sicStandards");
    resetOne.style.display = "none";
    myTurn.style.display = "block";
}
function closeout6() {
    var resetOne = document.getElementById("sicStandards");
    var myTurn = document.getElementById("picStandards");
    resetOne.style.display = "none";
    myTurn.style.display = "block";
}
function closeout7() {
    var resetOne = document.getElementById("sicStandards");
    var resetTwo = document.getElementById("picStandards");
    resetOne.style.display = "none";
    resetTwo.style.display = "none";
}
// 
function popup() {
    var checkbox = document.getElementById("q1");
    var prompt = document.getElementById("warning1");

    if (checkbox.checked == true){
        prompt.style.display = "block";}
        else {
            prompt.style.display = "none"
        }
    }
function popup2() {
    var checkbox = document.getElementById("q2");
    var prompt = document.getElementById("warning2");

    if (checkbox.checked == true){
        prompt.style.display = "block";}
        else {
            prompt.style.display = "none"
        }
    }
    function popup3() {
        var checkbox = document.getElementById("q3");
        var prompt = document.getElementById("warning3");
    
        if (checkbox.checked == true){
            prompt.style.display = "block";}
            else {
                prompt.style.display = "none"
            }
        }
    function popup4() {
        var checkbox = document.getElementById("q4");
        var prompt = document.getElementById("warning4");
    
        if (checkbox.checked == true){
            prompt.style.display = "block";}
            else {
                prompt.style.display = "none"
            }
        }
        function popup5() {
            var clickable = document.getElementById("crewStandardsPopup");
            clickable.addEventListener("click", showMe());
        
            function showMe() {
                var one = document.getElementById("picStandards");
                one.style.display = "block";   
            }
        }
        function popup6() {
            var clickable = document.getElementById("populateFBOQuestions");
            clickable.addEventListener("click", showMe());
        
            function showMe() {
                var one = document.getElementById("fboQuestionList");
                one.style.display = "block";   
            }
        }
// 
function one() {
    var element = document.getElementById('one');
    element.classList.toggle("collapse");
}
function two() {
    var element = document.getElementById('two');
    element.classList.toggle("collapse");
}
function three() {
    var element = document.getElementById('ejm');
    element.classList.toggle("collapse");
}
// 

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