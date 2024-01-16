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
    var checkbox = document.getElementById("f85");
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

function superman() {
    // Ask the user for a file name
    const fileName = window.prompt('Enter a file name:', 'formData');

    // If the user cancels or enters an empty name, exit
    if (!fileName) {
        return;
    }

    const saveData = {};

    for (let i = 1; i <= 151; i++) {
        const element = document.getElementById(`f${i}`);
        if (element.type === 'checkbox') {
            saveData[`f${i}`] = element.checked ? 'on' : '';
        } else {
            saveData[`f${i}`] = element.value;
        }
    }

    for (let i = 1; i <= 10; i++) {
        const element = document.getElementById(`icao${i}`);
        if (element.type === 'checkbox') {
            saveData[`icao${i}`] = element.checked ? 'on' : '';
        } else {
            saveData[`icao${i}`] = element.value;
        }
    }

    const csvContent = Object.keys(saveData).map(key => `${key},${saveData[key]}`).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Append the user-specified file name with .csv extension
    link.download = `${fileName}.csv`;

    link.click();
}

function loadDataFromCSV(fileInput) {
    const file = fileInput.files[0];

    if (file && window.FileReader) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvContent = e.target.result;
            const lines = csvContent.split('\n');

            // Iterate through the data rows
            for (let i = 0; i < lines.length; i++) {
                const data = lines[i].split(',');

                if (data.length === 2) { // Ensure there are two columns
                    const csvHeader = data[0].trim();
                    const value = data[1].trim();

                    // Assuming you have input elements with IDs matching the CSV headers
                    const element = document.getElementById(csvHeader);

                    if (element) {
                        if (element.type === 'checkbox') {
                            // For checkboxes, set the 'checked' property
                            element.checked = value === 'on' && value !== '';
                        } else {
                            // For other input types, set the 'value' property
                            element.value = value;
                        }
                    } else {
                        console.error('Element not found for ID:', csvHeader);
                    }
                }
            }
        };

        reader.readAsText(file);
    } else {
        console.error('FileReader not supported or no file selected.');
    }
}
