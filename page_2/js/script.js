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
    let lastFilledIndex = 1; // index for ICAO input pairs (ICAO1a/ICAO2a, ICAO3a/ICAO4a ...)

    for (let i = 1; i <= 10; i++) {
        const testingEl = document.getElementById(`TESTING${i}`);
        if (!testingEl) continue;

        const routeString = testingEl.textContent ? testingEl.textContent.trim() : "";
        if (!routeString) continue;

        const parts = routeString.split('->').map(s => s.trim()).filter(Boolean);
        if (parts.length < 2) continue;

        const depAP = parts[0].slice(0, 4).toUpperCase();
        const arrAP = parts[1].slice(0, 4).toUpperCase();

        const depBox = document.getElementById(`ICAO${lastFilledIndex}a`);
        const arrBox = document.getElementById(`ICAO${lastFilledIndex + 1}a`);

        if (depBox && !depBox.value) depBox.value = depAP;
        if (arrBox && !arrBox.value) arrBox.value = arrAP;

        lastFilledIndex += 2; // advance to the next pair
    }
}

// remove external styling on copy/paste data
document.addEventListener("DOMContentLoaded", function() {
    const editDivs = document.querySelectorAll('[contenteditable="true"]');

    editDivs.forEach(div => {
        div.addEventListener('paste', function (e) {
            e.preventDefault();

            let text = (e.clipboardData || window.clipboardData).getData('text');

            try {
                if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
                    document.execCommand('insertText', false, text);
                } else if (navigator.clipboard && navigator.clipboard.readText) {
                    // Fallback if insertText not supported — attempt safe insert
                    const sel = window.getSelection();
                    if (sel && sel.rangeCount > 0) {
                        sel.deleteFromDocument();
                        sel.getRangeAt(0).insertNode(document.createTextNode(text));
                    }
                } else {
                    // Last resort
                    const sel = window.getSelection();
                    if (sel && sel.rangeCount > 0) {
                        sel.getRangeAt(0).insertNode(document.createTextNode(text));
                    }
                }
            } catch (err) {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                    sel.getRangeAt(0).insertNode(document.createTextNode(text));
                }
            }
        });
    });

    // Attach primary button listeners (replace inline onclicks)
    try {
        const testButton = document.getElementById('testButton');
        if (testButton) {
            testButton.addEventListener('click', function (e) {
                e.preventDefault();
                populate('testAP1', 'testAP2', 'testTime1', 'testTime2', 'dutyDay');
                timeCalc();
                weatherPop();
            });
        }

        const undoButton = document.getElementById('undoButton');
        if (undoButton) undoButton.addEventListener('click', function (e) { e.preventDefault(); undoLastLeg(); });

        const printBtn = document.getElementById('PrintButton') || document.getElementById('printButton');
        if (printBtn) printBtn.addEventListener('click', function (e) { e.preventDefault(); window.print(); });
    } catch (err) {
        // fail silently — attaching listeners is non-critical
        console.error('Failed to attach button listeners', err);
    }

    // Attach listeners for data- attributes (replacing former inline onclicks)
    try {
        // data-reveal: toggles visibility of target element
        document.querySelectorAll('[data-reveal]').forEach(el => {
            const targetId = el.getAttribute('data-reveal');
            const target = document.getElementById(targetId);
            if (!target) return;

            if (el.tagName.toLowerCase() === 'input' && el.type === 'checkbox') {
                el.addEventListener('change', () => {
                    if (el.checked) target.classList.remove('hidden'); else target.classList.add('hidden');
                });
            } else {
                el.addEventListener('click', (e) => { e.preventDefault(); target.classList.toggle('hidden'); });
            }
        });

        // data-hide: hides the target element on click
        document.querySelectorAll('[data-hide]').forEach(el => {
            const targetId = el.getAttribute('data-hide');
            const target = document.getElementById(targetId);
            if (!target) return;
            el.addEventListener('click', (e) => { e.preventDefault(); target.classList.add('hidden'); });
        });

        // data-reveal2-target + data-reveal2-trigger: show/hide target based on trigger checkbox state
        document.querySelectorAll('[data-reveal2-target]').forEach(el => {
            const targetId = el.getAttribute('data-reveal2-target');
            const triggerId = el.getAttribute('data-reveal2-trigger');
            const target = document.getElementById(targetId);
            let trigger = null;
            if (triggerId) trigger = document.getElementById(triggerId);
            // If no external trigger specified, el itself is likely the checkbox
            if (!trigger) {
                trigger = el;
            }
            if (!target || !trigger) return;

            trigger.addEventListener('change', () => {
                if (trigger.checked) target.classList.remove('hidden'); else target.classList.add('hidden');
            });
        });
    } catch (err) {
        console.error('Failed to attach data- attribute listeners', err);
    }
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
    
    if (!ap1E || !ap2E || !etdE || !etaE || !ddE) return;

    let ap1 = ap1E.value;
    let ap2 = ap2E.value;

    let etd = etdE.value;
    let eta = etaE.value;
    let dd = ddE.value;

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

// --- Helper functions to break down timeCalc responsibilities ---
function parseHHMM(timeString) {
    const clean = (timeString || '').trim();
    if (!clean) return null;
    // accept formats like "HHMM", "HH:MM", or "HHMM / HHMM"
    const digits = clean.replace(/[^0-9]/g, '');
    if (digits.length < 3) return null;
    const hh = parseInt(digits.slice(0, 2), 10);
    const mm = parseInt(digits.slice(2, 4) || '0', 10);
    return { hours: hh, minutes: mm, totalMinutes: hh * 60 + mm };
}

function computeDutyOffset(depAirport, arrAirport) {
    if (!depAirport || !arrAirport) return 90;
    const depIsK = depAirport.toUpperCase().startsWith('K');
    const arrIsK = arrAirport.toUpperCase().startsWith('K');
    return (depIsK && arrIsK) ? 60 : 90;
}

function safeTextContent(id) {
    const el = document.getElementById(id);
    return el && el.textContent ? el.textContent.trim() : '';
}

function minutesSinceEpochForDateAndMinutes(dateString, minutesOfDay) {
    return getDayNumber(dateString) * 24 * 60 + minutesOfDay;
}

function minutesOfDayFromHHMMString(hhmm) {
    const parsed = parseHHMM(hhmm);
    return parsed ? parsed.totalMinutes : null;
}

// -----------------------------------------------------------------

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function timeCalc() {
    let currentDutyDayFlightTime = 0;
    let lastArrivalTimeInMinutes = null;
    let maxDutyDayStart = null;
    let dutyOnConverted = null;
    let dutyDayCount = 1;
    let dutyDayFlightTimes = [];
    let dutyDayTimes = [];
    let dutyOffTimes = [];
    let totalDutyTimes = [];

        for (let i = 1; i <= 10; i++) {
            const legElement = document.getElementById(`TESTING${i}`);
            if (!legElement) continue;

            const dateOfDepartureRaw = legElement.getAttribute('name');
            if (!dateOfDepartureRaw) continue;

            const timesText = safeTextContent(`TESTING${i}A`);
            if (!timesText) continue;

            // parse times robustly
            const split = timesText.split('/').map(s => s.trim()).filter(Boolean);
            const departureTimeStr = split[0] || timesText.slice(0, 4);
            const arrivalTimeStr = split[1] || timesText.slice(-4);

            const departureMinutesOfDay = minutesOfDayFromHHMMString(departureTimeStr);
            const arrivalMinutesOfDayRaw = minutesOfDayFromHHMMString(arrivalTimeStr);
            if (departureMinutesOfDay === null || arrivalMinutesOfDayRaw === null) continue;

            let departureInMinutes = departureMinutesOfDay;
            let arrivalInMinutes = arrivalMinutesOfDayRaw;

            // account for overnight arrival
            if (arrivalInMinutes < departureInMinutes) arrivalInMinutes += 24 * 60;

            const timeOfDepartureConverted = minutesSinceEpochForDateAndMinutes(dateOfDepartureRaw, departureInMinutes);
            const dateOfArrivalConverted = minutesSinceEpochForDateAndMinutes(dateOfDepartureRaw, arrivalInMinutes);

            if (lastArrivalTimeInMinutes === null || (timeOfDepartureConverted - lastArrivalTimeInMinutes) >= 12 * 60) {
                if (lastArrivalTimeInMinutes !== null) {
                    const totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
                    totalDutyTimes.push(totalDutyTime);
                    dutyDayFlightTimes.push(currentDutyDayFlightTime);

                    try {
                        if (typeof maxDutyDayStart === 'number') {
                            const minDutyOffMinutes = maxDutyDayStart + Math.round(13.5 * 60);
                            dutyOffTimes.push(convertMinutesToTime2(minDutyOffMinutes % (24 * 60)));
                        } else {
                            dutyOffTimes.push('');
                        }
                    } catch (e) {
                        dutyOffTimes.push('');
                    }
                }

                // Start a new duty day
                const legRoute = legElement.textContent.trim();
                const airports = legRoute.split('->').map(s => s.trim());
                const depAirport = airports[0] || '';
                const arrAirport = airports[1] || '';

                const dutyOffset = computeDutyOffset(depAirport, arrAirport);

                maxDutyDayStart = timeOfDepartureConverted - dutyOffset;
                dutyOnConverted = convertMinutesToTime(maxDutyDayStart);
                dutyDayTimes.push(dutyOnConverted);
                currentDutyDayFlightTime = 0;
            }

            // Calculate and add the flight time to the current duty day
            let flightTimeInMinutes = arrivalInMinutes - departureInMinutes;
            if (flightTimeInMinutes < 0) flightTimeInMinutes += 24 * 60;

            let flightTimeInHours = Math.round((flightTimeInMinutes / 60) * 10) / 10;
            currentDutyDayFlightTime += flightTimeInHours;

            lastArrivalTimeInMinutes = dateOfArrivalConverted;

            // Update the total duty time for the current duty day
            let totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
            if (totalDutyTimes.length > 0) {
                totalDutyTimes[totalDutyTimes.length - 1] = totalDutyTime;
            } else {
                totalDutyTimes.push(totalDutyTime);
            }

            // warnings
            if (currentDutyDayFlightTime >= 10) {
                const warning1 = document.getElementById('warningPrompt');
                const flightWarning = document.getElementById('flight1');
                if (warning1) warning1.classList.remove('hidden');
                if (flightWarning) flightWarning.classList.remove('hidden');
            }

            const totalDutyTimeInHours = convertTimeToHours(totalDutyTime);
            if (totalDutyTimeInHours >= 13.5) {
                const warning2 = document.getElementById('warningPrompt');
                const dutyWarning = document.getElementById('duty1');
                if (warning2) warning2.classList.remove('hidden');
                if (dutyWarning) dutyWarning.classList.remove('hidden');
            }
        }

        // After loop ends, log the final day's duty time and flight time if there are remaining legs
        if (lastArrivalTimeInMinutes !== null) {
            let totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
            totalDutyTimes[totalDutyTimes.length - 1] = totalDutyTime;
            dutyDayFlightTimes.push(currentDutyDayFlightTime);

            try {
                if (typeof maxDutyDayStart === 'number') {
                    const minDutyOffMinutes = maxDutyDayStart + Math.round(13.5 * 60);
                    dutyOffTimes.push(convertMinutesToTime2(minDutyOffMinutes % (24 * 60)));
                } else {
                    dutyOffTimes.push('');
                }
            } catch (e) {
                dutyOffTimes.push('');
            }
        }

        // Update the DOM elements with the results
        const flightTimeElement = document.getElementById('flightTime');
        if (flightTimeElement) flightTimeElement.value = dutyDayFlightTimes.join(' | ');

        const dutyTimeElement = document.getElementById('timeEntry');
        if (dutyTimeElement) dutyTimeElement.value = dutyDayTimes.join(' | ');

        const dutyOffElement = document.getElementById('timeExit');
        if (dutyOffElement) dutyOffElement.textContent = dutyOffTimes.join(' | ');

        const totalDutyElement = document.getElementById('dutyTime');
        if (totalDutyElement) totalDutyElement.value = totalDutyTimes.join(' | ');
    }
