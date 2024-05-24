// Constants
const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];






////////// BY YEAR /////////////

// // Function to make AJAX request to get calendar data
// function getCalendarByYear(value) {
//     return new Promise((resolve, reject) => {
//         const formData = new FormData();

//         value.years.forEach(years => formData.append('years', years));

//         $.ajax({
//             url: '/get_calendar_year',
//             type: 'POST',
//             processData: false,
//             contentType: false,
//             data: formData,
//             success: response => resolve(response),
//             error: reject
//         });
//     });
// }

// // Function to generate the calendar HTML dynamically
// async function generateCalendarAsyncByYear(data, userInput) {
//     try {
//         const index = MONTHS.indexOf(userInput);
//         if (index === -1) {
//             throw new Error("Invalid month entered.");
//         }

//         console.log(data) // 12 months

//         var calendarBody = document.getElementById("calendar-body");
//         var html = '';

//         for (var i = 0; i < data.length-1; i++) {   // -1 to get year 2024 from [2024, 2025]
    
//             for (var j = 0; j < data[i][index].length; j++) {    // [index] to get the selected month

//                 var parts = data[i][index][j].split(",");
//                 var dayOfWeek = parseInt(parts[0]);
//                 var day = parseInt(parts[1]);


//                 if (dayOfWeek === 0) {
//                     html += '<tr>';
//                 }

//                 if (dayOfWeek > 0 && day === 1) {
//                     for (var k = 0; k < dayOfWeek; k++) {
//                         html += '<td></td>';
//                     }
//                 }

//                 html += '<td>' + day + '</td>';

//                 if (dayOfWeek === 6) {
//                     html += '</tr>';
//                 }


//                 if (j === data[i][index].length - 1 && dayOfWeek < 6) {
//                     for (var l = dayOfWeek; l < 6; l++) {
//                         html += '<td></td>';
//                     }
//                     html += '</tr>';
//                 }

//             }  
//         }

//         calendarBody.innerHTML = html;
//     } catch (error) {
//         console.error("generateCalendarAsync Error:", error.message);
//     }
// }


// // Main function for fetching data by year and generating calendar
// async function fetchAndGenerateCalendarByYear(years) {
//     const years_input = { years };
    
//     try {
//         const response = await getCalendarByYear(years_input);
//         await generateCalendarAsyncByYear(response, display_month);
//     } catch (error) {
//         console.error("Async Error:", error);
//     }
// }




// // Usage
// const years = [2024, 2025];
// const display_month = "May"
// fetchAndGenerateCalendarByYear(years);









////////// BY MONTH /////////////

// Function to make AJAX request to get calendar data
function getCalendarByMonth(value) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('year', value.year);
        formData.append('month', value.month);
        
        $.ajax({
            url: '/get_calendar_month',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: response => resolve(response),
            error: reject
        });
    });
}

// Function to generate the calendar header
function generateCalendarHeader() {
    // Array containing the days of the week
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get the table head element
    var calendarHead = $("#calebdar-head");

    // Create a table row element
    var tr = $("<tr>");

    // Loop through the daysOfWeek array to create th elements
    daysOfWeek.forEach(function(day) {
        // Create a th element for each day
        var th = $("<th>").text(day);
        // Append the th element to the table row
        tr.append(th);
    });

    // Append the table row to the table head
    calendarHead.append(tr);
}

// Function to generate the calendar HTML dynamically
async function generateCalendarAsyncByMonth(data) {

    console.log(data) // 1 month

    var calendarBody = document.getElementById("calendar-body");
    var html = '';

    for (var i = 0; i < data.length; i++) {
        var parts = data[i].split(",");
        var dayOfWeek = parseInt(parts[0]);
        var day = parseInt(parts[1]);

        if (dayOfWeek === 0) {
            html += '<tr>';
        }

        if (dayOfWeek > 0 && day === 1) {
            for (var j = 0; j < dayOfWeek; j++) {
                html += '<td></td>';
            }
        }

        html += '<td>' + day + '</td>';

        if (dayOfWeek === 6) {
            html += '</tr>';
        }

        if (i === data.length - 1 && dayOfWeek < 6) {
            for (var k = dayOfWeek; k < 6; k++) {
                html += '<td></td>';
            }
            html += '</tr>';
        }
    }

    calendarBody.innerHTML = html;
}

// Function to create the calendar structure
function createCalendarStructure() {
    var calendarContainer = $(".calendar");
    var calendarHTML = `
            <thead id="calebdar-head">
                <!-- Dynamic Sun-Sat will be appended here -->
            </thead>
            <tbody id="calendar-body">
                <!-- Dynamic rows will be appended here -->
            </tbody>
    `;
    calendarContainer.html(calendarHTML);
}


// Main function for fetching data by month and generating calendar
async function fetchAndGenerateCalendarByMonth(data_input) {
    try {
        const response = await getCalendarByMonth(data_input);
        createCalendarStructure();
        generateCalendarHeader();
        await generateCalendarAsyncByMonth(response);
    } catch (error) {
        console.error("Async Error:", error);
    }
}

// Usage
const data_input = {
    year: 2024,
    month: "May"
}

fetchAndGenerateCalendarByMonth(data_input);