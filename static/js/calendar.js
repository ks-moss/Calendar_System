// Constants
const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];






// //////// BY YEAR /////////////

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



// function generateCalendarForYear(response) {
//     var calendarHTML = ''; // Initialize an empty string to store the HTML

//     // Days of the week
//     var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     // Append HTML for days of the week
    
//     // Iterate through the response data
//     for (var i = 0; i < response.length; i++) {

//         for (var j = 0; j < response[i].length; j++) {
            
//             var getYearMonth = response[i][j][0].split(",");
//             var year = parseInt(getYearMonth[3]);
//             var month = getYearMonth[2];
        
//             // Append year-month div inside the table
//             calendarHTML += '<table class="calendar"> <caption class="year-month">' + year + " - " + month +'</caption>'
//             calendarHTML += '<thead><tr>';
        
//             daysOfWeek.forEach(function(day) {
//                 calendarHTML += '<th>' + day + '</th>';
//             });
//             calendarHTML += '</tr></thead><tbody>';


        
//             for(var k=0; k<response[i][j].length; k++){

//                 var parts = response[i][j][k].split(",");
       
//                 var dayOfWeek = parseInt(parts[0]);
//                 var day = parseInt(parts[1]);


//                 if (dayOfWeek === 0) {
//                     calendarHTML += '<tr>';
//                 }

//                 if (dayOfWeek > 0 && day === 1) {
//                     for (var l = 0; l < dayOfWeek; l++) {
//                         calendarHTML += '<td></td>';
//                     }
//                 }

//                 // Add data attributes to the td element
//                 calendarHTML += '<td data-year="' + year + '" data-month="' + month + '" data-day="' + day + '">' + day + '</td>';

//                 if (dayOfWeek === 6) {
//                     calendarHTML += '</tr>';
//                 }

//                 if (k === response[i][j].length - 1 && dayOfWeek < 6) {
                    
//                     for (var m = dayOfWeek; m < 6; m++) {
//                         calendarHTML += '<td></td>';
//                     }
//                     calendarHTML += '</tr>';
//                 }
   
//             }

//             calendarHTML += '</tbody></table>';

//         }

        
//     }
    
//     return calendarHTML; // Return the generated HTML
// }




// // Main function for fetching data by year and generating calendar
// async function fetchAndGenerateCalendarByYear(years) {
//     const years_input = { years };

//     try {
//         const response = await getCalendarByYear(years_input);
        
//         var calendarHTML = generateCalendarForYear(response);
//         $('.calendar-container').html(calendarHTML);

//         // Attach click event listeners to each date cell
//         $('.calendar td').on('click', function() {
//             var year = $(this).data('year');
//             var month = $(this).data('month');
//             var day = $(this).data('day');
//             if (day) { // Ensure the cell is not empty
//                 console.log(year, month, day);
//             }
//         });

        
//     } catch (error) {
//         console.error("Async Error:", error);
//     }
// }


// // Usage
// const years = [2024, 2025];
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


function generateCalendarForYear(response) {
    var calendarHTML = ''; // Initialize an empty string to store the HTML

    // Days of the week
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var getYearMonth = response[0].split(",");
    var year = parseInt(getYearMonth[3]);
    var month = getYearMonth[2];

    // Append year-month div inside the table
    calendarHTML += '<table class="calendar"> <caption class="year-month">' + year + " - " + month +'</caption>'
    calendarHTML += '<thead><tr>';

    daysOfWeek.forEach(function(day) {
        calendarHTML += '<th>' + day + '</th>';
    });
    calendarHTML += '</tr></thead><tbody>';
    
    
    for (var i = 0; i < response.length; i++) {

        var parts = response[i].split(",");
        var dayOfWeek = parseInt(parts[0]);
        var day = parseInt(parts[1]);
    

        if (dayOfWeek === 0) {
            calendarHTML += '<tr>';
        }

        

        if (dayOfWeek > 0 && day === 1) {
            for (var j = 0; j < dayOfWeek; j++) {
                calendarHTML += '<td></td>';
                
            }
        }

        // Add data attributes to the td element
        calendarHTML += '<td data-year="' + year + '" data-month="' + month + '" data-day="' + day + '">' + day + '</td>';

        if (dayOfWeek === 6) {
            calendarHTML += '</tr>';
        }

        if (i === response.length - 1 && dayOfWeek < 6) {
            
            for (var m = dayOfWeek; m < 6; m++) {
                calendarHTML += '<td></td>';
            }
            calendarHTML += '</tr>';
        }
   

    }

    calendarHTML += '</tbody></table>';
    
    return calendarHTML; // Return the generated HTML
}


// Main function for fetching data by month and generating calendar
async function fetchAndGenerateCalendarByMonth(data_input) {
    try {
        const response = await getCalendarByMonth(data_input);

        var calendarHTML = generateCalendarForYear(response);
        $('.calendar-container').html(calendarHTML);

        // Attach click event listeners to each date cell
        $('.calendar td').on('click', function() {
            var year = $(this).data('year');
            var month = $(this).data('month');
            var day = $(this).data('day');
            if (day) { // Ensure the cell is not empty
                console.log(year, month, day);
            }
        });

        
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