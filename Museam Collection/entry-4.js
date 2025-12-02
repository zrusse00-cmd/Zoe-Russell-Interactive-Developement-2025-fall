// STRING 1 — ONE BUBBLE PER LINE
let String1 = "Rnd 1 Start 6sc in Magic Loop (6)";
let String1TotalCharacterNumber = String1.length;
let String1IterationIndex = 0;

// Create ONE bubble span for the whole line
$("#typewriting-target").append('<span class="lineBubble"></span>');
let bubble1 = $("#typewriting-target .lineBubble");

let String1Interval = setInterval(function () {
    // Type characters inside the single bubble
    bubble1.append(String1.charAt(String1IterationIndex));

    String1IterationIndex++;

    if (String1IterationIndex === String1TotalCharacterNumber) {
        clearInterval(String1Interval);
    }

}, 10);


// STRING 2 — ONE BUBBLE PER LINE
let String2 = 'Rnd 2 inc 6 times (12)';
let String2TotalCharacterNumber = String2.length;
let String2IterationIndex = 0;

// Create ONE bubble span for the second line
$("#typewriting-target2").append('<span class="lineBubble"></span>');
let bubble2 = $("#typewriting-target2 .lineBubble");

let String2Interval = setInterval(function () {
    // Type characters inside the single bubble
    bubble2.append(String2.charAt(String2IterationIndex));

    String2IterationIndex++;

    if (String2IterationIndex === String2TotalCharacterNumber) {
        clearInterval(String2Interval);
    }

}, 10);

let String3 = 'Rnd 3 [sc in next st, inc in next st] repeat 6 times (16)';
let String3TotalCharacterNumber = String3.length;
let String3IterationIndex = 0;

// Create ONE bubble span for the second line
$("#typewriting-target3").append('<span class="lineBubble"></span>');
let bubble3 = $("#typewriting-target3 .lineBubble");

let String3Interval = setInterval(function () {
    // Type characters inside the single bubble
    bubble3.append(String3.charAt(String3IterationIndex));

    String3IterationIndex++;

    if (String3IterationIndex === String3TotalCharacterNumber) {
        clearInterval(String3Interval);
    }

}, 10);

let String4 = 'Rnd 4 [2sc, inc in next st] repeat 6 times (24)';
let String4TotalCharacterNumber = String4.length;
let String4IterationIndex = 0;

// Create ONE bubble span for the second line
$("#typewriting-target4").append('<span class="lineBubble"></span>');
let bubble4 = $("#typewriting-target4 .lineBubble");

let String4Interval = setInterval(function () {
    // Type characters inside the single bubble
    bubble4.append(String4.charAt(String4IterationIndex));

    String4IterationIndex++;

    if (String4IterationIndex === String4TotalCharacterNumber) {
        clearInterval(String4Interval);
    }

}, 10);

let String5 = 'Rnd 5 sc 24 times (24)';
let String5TotalCharacterNumber = String5.length;
let String5IterationIndex = 0;

// Create ONE bubble span for the second line
$("#typewriting-target5").append('<span class="lineBubble"></span>');
let bubble5 = $("#typewriting-target5 .lineBubble");

let String5Interval = setInterval(function () {
    // Type characters inside the single bubble
    bubble5.append(String5.charAt(String5IterationIndex));

    String5IterationIndex++;

    if (String5IterationIndex === String5TotalCharacterNumber) {
        clearInterval(String5Interval);
    }

}, 10);

