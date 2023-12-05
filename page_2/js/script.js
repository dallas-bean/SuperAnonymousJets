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
