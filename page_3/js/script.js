window.jsPDF = window.jspdf.jsPDF;

// function superman() {
//     // Ask the user for a file name
//     const fileName = window.prompt('Enter a file name:', 'formData');

//     // If the user cancels or enters an empty name, exit
//     if (!fileName) {
//         return;
//     }

//     const saveData = {};

//     for (let i = 1; i <= 139; i++) {
//         const element = document.getElementById(`f${i}`);
//         if (element) {
//             if (element.type === 'checkbox') {
//                 saveData[`f${i}`] = element.checked ? 'on' : '';
//             } else if (element.tagName.toLowerCase() === 'div' && element.isContentEditable) {
//                 // Handle contenteditable div
//                 saveData[`f${i}`] = element.innerText;
//             } else {
//                 saveData[`f${i}`] = element.value;
//             }
//         }
//     }

//     for (let i = 1; i <= 10; i++) {
//         const element = document.getElementById(`icao${i}`);
//         if (element) {
//             if (element.type === 'checkbox') {
//                 saveData[`icao${i}`] = element.checked ? 'on' : '';
//             } else {
//                 saveData[`icao${i}`] = element.value;
//             }
//         }

//         const elementA = document.getElementById(`icao${i}a`);
//         saveData[`icao${i}a`] = elementA.value;
//     }

//     const csvContent = Object.keys(saveData).map(key => `${key},${saveData[key]}`).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);

//     // Append the user-specified file name with .csv extension
//     link.download = `${fileName}.csv`;

//     link.click();
// }

// function loadDataFromCSV(fileInput) {
//     const file = fileInput.files[0];

//     if (file && window.FileReader) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             const csvContent = e.target.result;
//             const lines = csvContent.split('\n');

//             // Iterate through the data rows
//             for (let i = 0; i < lines.length; i++) {
//                 const data = lines[i].split(',');

//                 if (data.length === 2) { // Ensure there are two columns
//                     const csvHeader = data[0].trim();
//                     const value = data[1].trim();

//                     // Assuming you have input elements with IDs matching the CSV headers
//                     const element = document.getElementById(csvHeader);

//                     if (element) {
//                         if (element.type === 'checkbox') {
//                             // For checkboxes, set the 'checked' property
//                             element.checked = value === 'on' && value !== '';
//                         } else if (element.tagName.toLowerCase() === 'div' && element.isContentEditable) {
//                             // Handle contenteditable div
//                             element.innerText = value;
//                         } else {
//                             // For other input types, set the 'value' property
//                             element.value = value;
//                         }
//                     } else {
//                         console.error('Element not found for ID:', csvHeader);
//                     }
//                 }
//             }
//         };

//         reader.readAsText(file);
//     } else {
//         console.error('FileReader not supported or no file selected.');
//     }
// }

// for (let i = 1; i <= 10; i++) {
//     let inputId = "icao" + i;
//     let inputElement = document.getElementById(inputId);

//     if (inputElement) {
//         inputElement.addEventListener("input", function() {
//             if (this.value.length !== 4) {
//                 alert("4 LETTER ID's");
//                 this.value = "";
//             }
//         })
//     }
// }

// function handleFileUpload(event) {
//     const fileInput = event.target;
//     const csvFile = fileInput.files[0];

//     if (csvFile && (csvFile.type === 'text/csv' || csvFile.type === 'application/vnd.ms-excel')) {
//         loadDataFromCSV(fileInput);  // Call function to load CSV data
//     } else {
//         alert('Please upload a valid CSV file.');
//     }
// }

function genWeather() {

    const baseUrl = "https://aviationweather.gov/data/taf/?id=";
    const route = [];

    for (let i = 1; i <= 10; i++) {
        const ap = document.getElementById(`ICAO${i}a`).value;
        if (ap.trim() !== '') {
            route.push(ap);
        }}
        if (route.length > 0) {
            const url = `${baseUrl}${route.join(',')}`;
            window.open(url, '_blank');
        }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function reveal(elID) {
    let target = document.getElementById(elID);

    target.classList.toggle("hidden");
}

function hide(elID) {
    let target = document.getElementById(elID);

    target.classList.add("hidden");
}

function reveal2(elID, elID2) {
    let target = document.getElementById(elID);
    let trigger = document.getElementById(elID2);

    if (trigger.checked) {
        target.classList.remove("hidden");
    }
    else {
        target.classList.add("hidden");
    }
}

function revealClass(classID) {
    let targets = document.getElementsByClassName(classID);

    Array.from(targets).forEach(target => {
        target.classList.toggle("hidden");
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function weatherPop() {
    let lastFilledIndex = 1; // Start tracking from the first ICAO box

    for (let i = 1; i <= 10; i += 2) {
        const routeString = document.getElementById(`TESTING${(i + 1) / 2}`).textContent;
        const depAP = routeString.slice(0, 4);
        const arrAP = routeString.slice(-4);

        const depBox = document.getElementById(`ICAO${lastFilledIndex}a`);
        const arrBox = document.getElementById(`ICAO${lastFilledIndex + 1}a`);

        // Populate the departure box if it's empty
        if (depBox && depBox.value === "") {
            depBox.value = depAP;
        }

        // Populate the arrival box if it's empty
        if (arrBox && arrBox.value === "") {
            arrBox.value = arrAP;
        }

        if (depBox === arrBox.value) {
            continue;
        }

        lastFilledIndex += 1; // Move to the next pair of boxes
    }
}

// remove external styling on copy/paste data
document.addEventListener("DOMContentLoaded", function() {
    const editDivs = document.querySelectorAll('[contenteditable="true"]');

    editDivs.forEach(div => {
        div.addEventListener('paste', function (e) {
            e.preventDefault();

            let text = (e.clipboardData || window.clipboardData).getData('text');

            document.execCommand('insertText', false, text);
        });
    });
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function populate(var1, var2, var3, var4, var5) {
    let ap1E = document.getElementById(var1);
    let ap2E = document.getElementById(var2);
    let etdE = document.getElementById(var3);
    let etaE = document.getElementById(var4);
    let ddE = document.getElementById(var5);
    let rowReveal = document.getElementById("TESTING6");
    let extraRow = document.getElementById("expandedRoute");
    
    let ap1 = ap1E.value;
    let ap2 = ap2E.value;
    let etd = etdE.value;
    let eta = etaE.value;
    let dd = (ddE.value);

    for (let i = 1; i <= 10; i++) {
        let leg = document.getElementById(`TESTING${i}`);
        let times = document.getElementById(`TESTING${i}A`);
        let dates = document.getElementById(`TESTING${i}B`);

        if (leg.textContent === "") {
            leg.textContent = ap1 + " -> " + ap2;
            times.textContent = etd + " / " + eta;
            dates.textContent = ddE.value;
            leg.setAttribute("name", dd);
            break;
        }
    }

    if (rowReveal.textContent !== "") {
        extraRow.classList.remove("hidden");
    }
    
    ap1E.value = ap2;
    ap2E.value = "";
    etdE.value = "";
    etaE.value = "";

    ap2E.focus();
    let ddDate = new Date(ddE.value);
    let etdNumber = parseInt(etd, 10);
    let etaNumber = parseInt(eta, 10);
        if (etaNumber < etdNumber) {
            ddDate.setDate(ddDate.getDate() + 1);
        }
        ddE.value = ddDate.toISOString().split('T')[0];
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function getDayNumber(dateString) {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
}

function dutyCalculator(startTime) {
    const window = startTime + 840;
        // startTime = duty On time in Epoch. ||| window = duty off time in Epoch.
    return window;
}

function convertTimeToHours(timeString) {
    let [hours, minutes] = timeString.split(':').map(Number);
    return hours + (minutes / 60);
}

function totalDutyTimeCalc(dutyOn, lastArrival) {
        let dutyOffTime = lastArrival + 30;
        let totalDutyTimeInMinutes = dutyOffTime - dutyOn;

        return convertMinutesToTime2(totalDutyTimeInMinutes);
}

function convertMinutesToTime(convertedValue) {
    let milliseconds = convertedValue * 60 * 1000;

    let date = new Date(milliseconds);

    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

function convertMinutesToTime2(convertedValue) {
    let totalHours = Math.floor(convertedValue / 60);
    let minutes = convertedValue % 60;
    
    let hourString = totalHours.toString().padStart(2, '0');
    let minuteString = minutes.toString().padStart(2, '0');

    return `${hourString}:${minuteString}`;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function timeCalc() {
    let currentDutyDayFlightTime = 0;
    let lastArrivalTimeInMinutes = null;
    let maxDutyDayStart = null;
    let dutyDayCount = 1;
    let dutyDayFlightTimes = [];
    let dutyDayTimes = [];
    let dutyOffTimes = [];
    let totalDutyTimes = [];

    for (let i = 1; i <= 10; i++) {
        let legElement = document.getElementById(`TESTING${i}`);
            let dateOfDepartureRaw = legElement.getAttribute("name");
                // Date of departure is entered by user and assigned as name attribute. 
                if (!dateOfDepartureRaw) continue;

            let dateOfDepartureConverted = getDayNumber(dateOfDepartureRaw) * 24 * 60;
                // converting raw to epoch.

        let departureAndArrivalTimes = document.getElementById(`TESTING${i}A`).textContent;
            // User enters in hhmm format & etd/eta are concat'd. EG "hhmm hhmm".
            if (!departureAndArrivalTimes) continue;

            let departureTime = departureAndArrivalTimes.slice(0, 4);
            let arrivalTime = departureAndArrivalTimes.slice(-4);

                let departureHours = parseInt(departureTime.slice(0, 2));
                let departureMinutes = parseInt(departureTime.slice(2, 4));
                let arrivalHours = parseInt(arrivalTime.slice(0, 2));
                let arrivalMinutes = parseInt(arrivalTime.slice(2, 4));

                    let departureInMinutes = departureHours * 60 + departureMinutes;
                    let arrivalInMinutes = arrivalHours * 60 + arrivalMinutes;
                        // converting hh to mmm & adding resultant mm's for total mmm of ETD & ETA.
                    
                        if (arrivalHours < departureHours || (arrivalHours === departureHours && arrivalMinutes < departureMinutes)) {
                            arrivalInMinutes += 24 * 60;
                        }
                            // accounting for midnight rollover

                        let timeOfDepartureConverted = dateOfDepartureConverted + departureInMinutes;
                        let dateOfArrivalConverted = dateOfDepartureConverted + arrivalInMinutes;
                            // adding mmm's to Epoch value of date.

                            if (lastArrivalTimeInMinutes === null || (timeOfDepartureConverted - lastArrivalTimeInMinutes) >= 12 * 60) {
                                if (lastArrivalTimeInMinutes !== null) {
                                        // Log the total duty time for the previous day
                                    let totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
                                    totalDutyTimes.push(totalDutyTime); 
                                        // Push a new entry for the previous day

                                        // Log the flight time for the previous duty day
                                    dutyDayFlightTimes.push(currentDutyDayFlightTime); 
                                        // Store the current day's flight time
                                }
                        
                                // Start a new duty day
                                maxDutyDayStart = timeOfDepartureConverted - 90; // Start new duty day
                                    dutyOnConverted = convertMinutesToTime(maxDutyDayStart);
                                    dutyDayTimes.push(dutyOnConverted);
                                    currentDutyDayFlightTime = 0; // Reset flight time for the new day
                            }
                        
                            // Calculate and add the flight time to the current duty day
                            let flightTimeInMinutes = arrivalInMinutes - departureInMinutes;
                                if (flightTimeInMinutes < 0) {
                                    flightTimeInMinutes += 24 * 60;
                                }
                        
                            let flightTimeInHours = flightTimeInMinutes / 60;
                            currentDutyDayFlightTime += flightTimeInHours;
                        
                            // Update lastArrivalTimeInMinutes for the next iteration
                            lastArrivalTimeInMinutes = dateOfArrivalConverted;
                        
                            // Update the total duty time for the current duty day
                            let totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
                                if (totalDutyTimes.length > 0) {
                                    totalDutyTimes[totalDutyTimes.length - 1] = totalDutyTime; // Update the last entry
                                } else {
                                    totalDutyTimes.push(totalDutyTime); // Start the first entry
                                }
                        
                            // Check if the current duty day exceeds the allowed flight time and warn if necessary
                            if (currentDutyDayFlightTime >= 10) {
                                let warning1 = document.getElementById("warningPrompt");
                                let flightWarning = document.getElementById("flight1");
                                    warning1.classList.remove("hidden");
                                    flightWarning.classList.remove("hidden");
                            }

                            let totalDutyTimeInHours = convertTimeToHours(totalDutyTime);
                                if (totalDutyTimeInHours >= 13.5) {
                                    let warning2 = document.getElementById("warningPrompt");
                                    let dutyWarning = document.getElementById("duty1");
                                        warning2.classList.remove("hidden");
                                        dutyWarning.classList.remove("hidden");
                                }
                        }
                        
                        // After loop ends, log the final day's duty time and flight time if there are remaining legs
                        if (lastArrivalTimeInMinutes !== null) {
                            let totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
                                totalDutyTimes[totalDutyTimes.length - 1] = totalDutyTime;
                        
                            // Log the final day's flight time
                            dutyDayFlightTimes.push(currentDutyDayFlightTime);
                        }
                        
                        // Update the DOM elements with the results
                        let flightTimeElement = document.getElementById("flightTime");
                        flightTimeElement.value = dutyDayFlightTimes.join(" | ");
                        
                        let dutyTimeElement = document.getElementById("timeEntry");
                        dutyTimeElement.value = dutyDayTimes.join(" | ");
                        
                        let dutyOffElement = document.getElementById("timeExit");
                        dutyOffElement.textContent = dutyOffTimes.join(" | ");
                        
                        let totalDutyElement = document.getElementById("dutyTime");
                        totalDutyElement.value = totalDutyTimes.join(" | ");
}