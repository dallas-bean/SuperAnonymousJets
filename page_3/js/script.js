// window.jsPDF = window.jspdf.jsPDF;

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

    for (let i = 1; i <= 20; i += 2) {
        const routeString = document.getElementById(`TESTING${(i + 1) / 2}`).textContent;
        const depAP = routeString.slice(0, 4);
        const arrAP = routeString.slice(-4);

        const depBox = document.getElementById(`ICAO${lastFilledIndex}a`);
        const arrBox = document.getElementById(`ICAO${lastFilledIndex + 1}a`);

        // Populate the departure box if it's empty (force uppercase)
        if (depBox && (!depBox.value || depBox.value.trim() === '')) {
            depBox.value = (depAP || '').toUpperCase();
        }

        // Populate the arrival box if it's empty (force uppercase)
        if (arrBox && (!arrBox.value || arrBox.value.trim() === '')) {
            arrBox.value = (arrAP || '').toUpperCase();
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
})

// Attach replacement listeners for formerly inline handlers
document.addEventListener('DOMContentLoaded', function() {
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.addEventListener('click', function(e) {
            e.preventDefault();
            populate('testAP1', 'testAP2', 'testTime1', 'testTime2', 'dutyDay');
            timeCalc();
            weatherPop();
        });
    }

    const genWeatherBtn = document.getElementById('genWeatherButton');
    if (genWeatherBtn) genWeatherBtn.addEventListener('click', function(e) { e.preventDefault(); genWeather(); });

    const timesWarningExit = document.getElementById('timesWarningExit');
    if (timesWarningExit) timesWarningExit.addEventListener('click', function(e) { e.preventDefault(); hide('warningPrompt'); });

    const overWaterYes = document.getElementById('overWaterYes');
    if (overWaterYes) {
        overWaterYes.addEventListener('change', function() {
            const target = document.getElementById('overWater');
            if (!target) return;
            if (this.checked) target.classList.remove('hidden'); else target.classList.add('hidden');
        });
    }

    const internationalToggle = document.getElementById('internationalToggleButton');
    if (internationalToggle) internationalToggle.addEventListener('click', function(e) { e.preventDefault(); reveal('international'); });

    const printBtn = document.getElementById('PrintButton');
    if (printBtn) printBtn.addEventListener('click', function(e) { e.preventDefault(); window.print(); });

    const crewStandardsExit = document.getElementById('crewStandardsExit');
    if (crewStandardsExit) crewStandardsExit.addEventListener('click', function(e) { e.preventDefault(); hide('crewStandards'); });
    
    // initialize AP/ICAO enforcement (alphanumeric, uppercase, exact 4 chars)
    if (typeof setupAPEnforcement === 'function') setupAPEnforcement();

    // attach undo listener if present
    const undoButton = document.getElementById('undoButton');
    if (undoButton) undoButton.addEventListener('click', function(e) { e.preventDefault(); undoLastLeg(); });
});

// Attach listeners for data- attributes (replacing former inline onclicks)
document.addEventListener('DOMContentLoaded', function() {
    try {
        // data-reveal: toggles visibility of target element; non-checkbox triggers will position the popup near the trigger
        document.querySelectorAll('[data-reveal]').forEach(el => {
            const targetId = el.getAttribute('data-reveal');
            const target = document.getElementById(targetId);
            if (!target) return;

            if (el.tagName.toLowerCase() === 'input' && el.type === 'checkbox') {
                el.addEventListener('change', () => {
                    if (el.checked) {
                        target.classList.remove('hidden');
                    } else {
                        target.classList.add('hidden');
                        // reset any inline positioning
                        target.style.top = '';
                        target.style.left = '';
                        target.style.position = '';
                    }
                });
            } else {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    const wasHidden = target.classList.contains('hidden');
                    if (wasHidden) {
                        // Only perform absolute anchoring for small popup-like elements.
                        const isPopup = target.classList.contains('popup2') || target.classList.contains('popup') || target.getAttribute('role') === 'dialog' || target.hasAttribute('data-popup');
                        // If it's not a popup (e.g. large inline sections like #international), just reveal inline.
                        if (!isPopup) {
                            target.classList.remove('hidden');
                            return;
                        }

                        // show and anchor near the trigger element in document coordinates
                        target.classList.remove('hidden');
                        try {
                            const rect = el.getBoundingClientRect();
                            const top = rect.bottom + window.scrollY + 6; // 6px gap from viewport element
                            let left = rect.left + window.scrollX;

                            // avoid overflowing the right edge of the page
                            const popupWidth = target.offsetWidth || 220;
                            const maxLeft = document.documentElement.clientWidth + window.scrollX - popupWidth - 8;
                            if (left > maxLeft) left = Math.max(8 + window.scrollX, maxLeft);
                            if (left < 8 + window.scrollX) left = 8 + window.scrollX;

                            // store original parent/nextSibling so we can restore when hidden
                            if (!target.__origParent) {
                                target.__origParent = target.parentNode;
                                target.__origNext = target.nextSibling;
                            }

                            // append to body so absolute positioning is relative to document
                            if (target.parentNode !== document.body) document.body.appendChild(target);

                            target.style.position = 'absolute';
                            target.style.top = top + 'px';
                            target.style.left = left + 'px';
                        } catch (err) {
                            console.warn('Popup positioning failed', err);
                        }
                    } else {
                        // hide and restore inline positioning and original DOM placement
                        target.classList.add('hidden');
                        target.style.top = '';
                        target.style.left = '';
                        target.style.position = '';
                        try {
                            if (target.__origParent) {
                                if (target.__origNext && target.__origNext.parentNode === target.__origParent) {
                                    target.__origParent.insertBefore(target, target.__origNext);
                                } else {
                                    target.__origParent.appendChild(target);
                                }
                                // keep the stored refs in case user toggles repeatedly
                            }
                        } catch (err) {
                            // non-critical
                        }
                    }
                });
            }
        });

        // data-hide: hides the target element on click and clears inline positioning
        document.querySelectorAll('[data-hide]').forEach(el => {
            const targetId = el.getAttribute('data-hide');
            const target = document.getElementById(targetId);
            if (!target) return;
            el.addEventListener('click', (e) => {
                e.preventDefault();
                target.classList.add('hidden');
                target.style.top = '';
                target.style.left = '';
                target.style.position = '';
            });
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
});

// Enforce exact 4-character alphanumeric requirement for AP/ICAO inputs
function setupAPEnforcement() {
    const ap1 = document.getElementById('testAP1');
    const ap2 = document.getElementById('testAP2');
    const addBtn = document.getElementById('testButton');
    if (!ap1 || !ap2 || !addBtn) return;

    ap1.setAttribute('maxlength', '4');
    ap2.setAttribute('maxlength', '4');

    const sanitizeAndValidate = (el) => {
        // allow letters and numbers only, force uppercase
        const cleaned = (el.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (cleaned !== el.value) el.value = cleaned;

        return el.value.trim().length === 4;
    };

    const validate = () => {
        const ok1 = sanitizeAndValidate(ap1);
        const ok2 = sanitizeAndValidate(ap2);

        if (!ok1) ap1.setCustomValidity("please use 4-letter ID's"); else ap1.setCustomValidity('');
        if (!ok2) ap2.setCustomValidity("please use 4-letter ID's"); else ap2.setCustomValidity('');

        addBtn.disabled = !(ok1 && ok2);
    };

    ap1.addEventListener('input', validate);
    ap2.addEventListener('input', validate);

    ap1.addEventListener('blur', () => { if (ap1.value.trim().length !== 4) ap1.reportValidity(); });
    ap2.addEventListener('blur', () => { if (ap2.value.trim().length !== 4) ap2.reportValidity(); });

    validate();
}

// Undo last leg (mirrors fere.html implementation)
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
            if (typeof timeCalc === 'function') timeCalc();
            // clear auto-populated ICAO boxes then repopulate from remaining legs
            for (let j = 1; j <= 11; j++) {
                const ica = document.getElementById(`ICAO${j}a`);
                if (ica) ica.value = '';
            }
            if (typeof weatherPop === 'function') weatherPop();

            if (ap2E) ap2E.focus();
            break;
        }
    }
}

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

        const dateOfDepartureConverted = getDayNumber(dateOfDepartureRaw) * 24 * 60;

        const timesText = safeTextContent(`TESTING${i}A`);
        if (!timesText) continue;

        // parse times robustly
        const split = timesText.split('/').map(s => s.trim()).filter(Boolean);
        const departureTimeStr = split[0] || timesText.slice(0, 4);
        const arrivalTimeStr = split[1] || timesText.slice(-4);

        const departureMinutesOfDay = minutesOfDayFromHHMMString(departureTimeStr);
        const arrivalMinutesOfDay = minutesOfDayFromHHMMString(arrivalTimeStr);
        if (departureMinutesOfDay === null || arrivalMinutesOfDay === null) continue;

        let departureInMinutes = departureMinutesOfDay;
        let arrivalInMinutes = arrivalMinutesOfDay;

        if (arrivalInMinutes < departureInMinutes) arrivalInMinutes += 24 * 60; // handle midnight rollover

        const timeOfDepartureConverted = dateOfDepartureConverted + departureInMinutes;
        const dateOfArrivalConverted = dateOfDepartureConverted + arrivalInMinutes;

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

            // Start a new duty day adjusted by computed offset
            const depAP = safeTextContent(`TESTING${i}`).slice(0,4) || '';
            const arrAP = safeTextContent(`TESTING${i}`).slice(-4) || '';
            const offset = computeDutyOffset(depAP, arrAP);
            maxDutyDayStart = timeOfDepartureConverted - offset;
            dutyOnConverted = convertMinutesToTime(maxDutyDayStart);
            dutyDayTimes.push(dutyOnConverted);
            currentDutyDayFlightTime = 0;
        }

        // flight time
        let flightTimeInMinutes = arrivalInMinutes - departureInMinutes;
        if (flightTimeInMinutes < 0) flightTimeInMinutes += 24 * 60;
        const flightTimeInHours = Math.round((flightTimeInMinutes / 60) * 10) / 10;
        currentDutyDayFlightTime += flightTimeInHours;

        lastArrivalTimeInMinutes = dateOfArrivalConverted;

        const totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
        if (totalDutyTimes.length > 0) totalDutyTimes[totalDutyTimes.length - 1] = totalDutyTime; else totalDutyTimes.push(totalDutyTime);

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

    if (lastArrivalTimeInMinutes !== null) {
        const totalDutyTime = totalDutyTimeCalc(maxDutyDayStart, lastArrivalTimeInMinutes);
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

    const flightTimeElement = document.getElementById('flightTime');
    if (flightTimeElement) flightTimeElement.value = dutyDayFlightTimes.join(' | ');

    const dutyTimeElement = document.getElementById('timeEntry');
    if (dutyTimeElement) dutyTimeElement.value = dutyDayTimes.join(' | ');

    const dutyOffElement = document.getElementById('timeExit');
    if (dutyOffElement) dutyOffElement.textContent = dutyOffTimes.join(' | ');

    const totalDutyElement = document.getElementById('dutyTime');
    if (totalDutyElement) totalDutyElement.value = totalDutyTimes.join(' | ');
}