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
//         value.years.forEach(year => formData.append('years', year));
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

//         for (var i = 0; i < data[index].length; i++) {
//             var parts = data[index][i].split(",");
//             var dayOfWeek = parseInt(parts[0]);
//             var day = parseInt(parts[1]);

//             if (dayOfWeek === 0) {
//                 html += '<tr>';
//             }

//             if (dayOfWeek > 0 && day === 1) {
//                 for (var j = 0; j < dayOfWeek; j++) {
//                     html += '<td></td>';
//                 }
//             }

//             html += '<td>' + day + '</td>';

//             if (dayOfWeek === 6) {
//                 html += '</tr>';
//             }

//             if (i === data[index].length - 1 && dayOfWeek < 6) {
//                 for (var k = dayOfWeek; k < 6; k++) {
//                     html += '<td></td>';
//                 }
//                 html += '</tr>';
//             }
//         }

//         calendarBody.innerHTML = html;
//     } catch (error) {
//         console.error("generateCalendarAsync Error:", error.message);
//     }
// }

// // Main function for fetching data by year and generating calendar
// async function fetchAndGenerateCalendarByYear(years, month) {
//     const userInput = month || "January"; // Default month is January
//     const years_input = { years };
    
//     try {
//         const response = await getCalendarByYear(years_input);
//         await generateCalendarAsyncByYear(response, userInput);
//     } catch (error) {
//         console.error("Async Error:", error);
//     }
// }







////////// BY MONTH /////////////

// Function to make AJAX request to get calendar data
function getCalendarByMonth(value) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        value.years.forEach(year => formData.append('years', year));
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

// Main function for fetching data by month and generating calendar
async function fetchAndGenerateCalendarByMonth(years, month) {
    const yearMonth = { years, month };
    try {
        const response = await getCalendarByMonth(yearMonth);
        await generateCalendarAsyncByMonth(response);
    } catch (error) {
        console.error("Async Error:", error);
    }
}




// Usage
const years = [2024];
const month = "May";
// fetchAndGenerateCalendarByYear(years, month);
fetchAndGenerateCalendarByMonth(years, month);
