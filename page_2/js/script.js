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
// 
function one() {
    var element = document.getElementById('one');
    element.classList.toggle("collapse");
}
function two() {
    var element = document.getElementById('two');
    element.classList.toggle("collapse");
}