function one() {
    var element = document.getElementById('international');
    element.classList.toggle("collapse");
    element.classList.toggle("fadeIn");
}
function expand() {
    var element = document.getElementById('addLegs');
    element.classList.toggle("collapse");
}
function expandtwo() {
    var element = document.getElementById('addWeather');
    element.classList.toggle("collapse");
} 
                
function closeout3() {
var reset = document.getElementById("warning3");
reset.style.display = "none";
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
}}

function genWeather() {

    const baseUrl = "https://aviationweather.gov/data/taf/?id=";
    const route = [];

    for (let i = 1; i <= 10; i++) {
        const ap = document.getElementById(`icao${i}`).value;
        if (ap.trim() !== '') {
            route.push(ap);
        }}
        if (route.length > 0) {
            const url = `${baseUrl}${route.join(',')}`;
            window.open(url, '_blank');
        }
}