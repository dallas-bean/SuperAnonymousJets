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

    for (let i = 1; i <= 20; i += 2) {
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

        if (depBox.value === arrBox.value) {
            continue;
        }

        lastFilledIndex += 1;
        // Move to the next pair of boxes
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
    let rowReveal = document.getElementById("TESTING5");
    let extraRow = document.getElementById("expandedRoute");
    let extraWeather = document.getElementById("weatherTwo");
    
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
        extraWeather.classList.remove("hidden");
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

function undoLastLeg() {
    for (let i = 10; i >= 1; i--) {
        let leg = document.getElementById(`TESTING${i}`);
        if (!leg) continue;

        if (leg.textContent.trim() !== "") {
            let times = document.getElementById(`TESTING${i}A`);
            let dates = document.getElementById(`TESTING${i}B`);

            let routeText = leg.textContent.trim();
            let parts = routeText.split('->').map(s => s.trim());
            let dep = parts[0] || "";
            let arr = parts[1] || "";

            let etd = "";
            let eta = "";
            if (times && times.textContent.trim() !== "") {
                const t = times.textContent.split('/').map(s => s.trim());
                if (t.length >= 2) {
                    etd = t[0];
                    eta = t[1];
                } else {
                    const compact = times.textContent.replace(/\s+/g, '');
                    etd = compact.slice(0, 4);
                    eta = compact.slice(-4);
                }
            }

            let duty = dates ? dates.textContent.trim() : "";

            const ap1E = document.getElementById('testAP1');
            const ap2E = document.getElementById('testAP2');
            const etdE = document.getElementById('testTime1');
            const etaE = document.getElementById('testTime2');
            const ddE = document.getElementById('dutyDay');

            if (ap1E) ap1E.value = dep;
            if (ap2E) ap2E.value = arr;
            if (etdE) etdE.value = etd;
            if (etaE) etaE.value = eta;
            if (ddE && duty) ddE.value = duty;

            // clear the table cells for this leg
            leg.textContent = "";
            if (times) times.textContent = "";
            if (dates) dates.textContent = "";

            // hide expanded rows if TESTING5 is now empty
            const rowReveal = document.getElementById("TESTING5");
            const extraRow = document.getElementById("expandedRoute");
            const extraWeather = document.getElementById("weatherTwo");
            if (rowReveal && rowReveal.textContent.trim() === "") {
                if (extraRow) extraRow.classList.add("hidden");
                if (extraWeather) extraWeather.classList.add("hidden");
            }

            // recompute totals and update weather fields
            timeCalc();
            weatherPop();

            if (ap2E) ap2E.focus();
            break;
        }
    }
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
                                const legRoute = legElement.textContent.trim();
                                const airports = legRoute.split("->").map(s => s.trim());
                                const depAirport = airports[0] || "";
                                const arrAirport = airports[1] || "";

                                const dutyOffset =
                                  depAirport.toUpperCase().startsWith("K") &&
                                  arrAirport.toUpperCase().startsWith("K")
                                    ? 60
                                    : 90;

                                maxDutyDayStart = timeOfDepartureConverted - dutyOffset;
                                    dutyOnConverted = convertMinutesToTime(maxDutyDayStart);
                                    dutyDayTimes.push(dutyOnConverted);
                                    currentDutyDayFlightTime = 0; // Reset flight time for the new day
                            }
                        
                            // Calculate and add the flight time to the current duty day
                            let flightTimeInMinutes = arrivalInMinutes - departureInMinutes;
                                if (flightTimeInMinutes < 0) {
                                    flightTimeInMinutes += 24 * 60;
                                }
                        
                            let flightTimeInHours = Math.round((flightTimeInMinutes / 60) * 10) / 10;
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