// Constants
const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const DAYS_OF_THE_WEEK = [
    "Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"
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










// ////////// BY MONTH /////////////


function generateYears(currentYear) {

    minus_year = currentYear - 4;
    plus_year = currentYear + 4;
    temp = [];

    if(minus_year < 1500){
        minus_year = 1500;
    }

    for(var i=minus_year; i<=plus_year; i++){
        temp.push(i);
    }
   
    return temp;
}




function displayYears(currentYear) {

    YEARS_OPTIONS = generateYears(currentYear);

    // console.log(YEARS_OPTIONS);

    let yearsHtml = '<div class="years-selection">';

    yearsHtml += '<div class="years-display">' +
                    '<div class="arrow left">&lt;</div>' + 
                    YEARS_OPTIONS[0] + " - " + YEARS_OPTIONS[YEARS_OPTIONS.length-1] + 
                    '<div class="arrow right">&gt;</div>' +
                 '</div>';
    
    for (let i = 0; i < YEARS_OPTIONS.length; i++) {

        if(i % 3 === 0) {
            yearsHtml += '<div class="years-row">'
        }
        
        yearsHtml += `<div class="years-options" data-year="${YEARS_OPTIONS[i]}">${YEARS_OPTIONS[i]}</div>`;

        if ((i + 1) % 3 === 0) {
            yearsHtml += '</div>';
        }
    
    }

    // Close the last row if it wasn't closed already
    if (YEARS_OPTIONS.length % 3 !== 0) {
        yearsHtml += '</div>';
    }

    yearsHtml += '</div>';


    $('.years-container').html(yearsHtml);

    $('.years-container').addClass('display-flex');


    if(YEARS_OPTIONS[0] === 1500) {
        $('.arrow.left').removeClass('display-flex');
        $('.arrow.left').addClass('display-none');
    }
    else {
        $('.arrow.left').removeClass('display-none');
        $('.arrow.left').addClass('display-flex');
    }

    // Attach click event listeners to each year option
    $('.years-options').on('click', function() {
        const selectedYear = $(this).data('year');
        // console.log(selectedYear);
     
        $('.years-container').removeClass('display-flex');
        $('.years-container').addClass('display-none');
    
        displayMonths(selectedYear);
    });

    // Attach click event listeners to the arrow buttons
    let temp_year = currentYear;
    $('.arrow.left').on('click', function() {    
        temp_year -= 8;
        displayYears(temp_year); 
    });

    $('.arrow.right').on('click', function() {
        temp_year += 8;
        displayYears(temp_year);
    });

}








function displayMonths(selectedYear) {

    let monthsHtml = '<div class="months-selection">';

    monthsHtml +=   '<div class="yearMonths-display">' +
                            selectedYear + '<div class="carrot"></div>' +
                    '</div>';
    
    for (let i = 0; i < MONTHS.length; i++) {
        

        if(i % 3 === 0) {
            monthsHtml += '<div class="months-row">'
        }
        
        monthsHtml += `<div class="months-options" data-month="${MONTHS[i]}">${MONTHS[i].slice(0,3) + "."}</div>`;

        if ((i + 1) % 3 === 0) {
            monthsHtml += '</div>';
        }
    
    }

    // Close the last row if it wasn't closed already
    if (MONTHS.length % 3 !== 0) {
        monthsHtml += '</div>';
    }

    monthsHtml += '</div>';

  

    $('.months-container').html(monthsHtml);

    $('.months-container').removeClass('display-none');
    $('.months-container').addClass('display-flex');

    $('.months-options').on('click', function() {
        const selectedMonth = $(this).data('month');
        // console.log(selectedMonth);

        // Usage
        const data_input = {
            year: selectedYear,
            month: selectedMonth
        }

        $('.months-container').removeClass('display-flex');
        $('.months-container').addClass('display-none');
        
        fetchAndGenerateCalendarByMonth(data_input);

    });

    $('.yearMonths-display').on('click', function() {
        
        $('.months-container').removeClass('display-flex');
        $('.months-container').addClass('display-none');

        displayYears(selectedYear);

    });

    


}







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

    var getYearMonth = response[0].split(",");
    var year = parseInt(getYearMonth[3]);
    var month = getYearMonth[2];

    // Append year-month div inside the table
    calendarHTML += '<table class="calendar">';
    calendarHTML += '<caption>';
    calendarHTML += '<div class="month-year" data-year="' + year + '">' + year + " - " + month;
    calendarHTML += '<div class="carrot"></div>' + '</div>';
    calendarHTML += '</caption>';
    calendarHTML += '<thead><tr>';

    DAYS_OF_THE_WEEK.forEach(function(day) {
        calendarHTML += '<th>' + day.slice(0,3) + '</th>';
    });
    calendarHTML += '</tr></thead><tbody>';
    
    
    for (var i = 0; i < response.length; i++) {

        var parts = response[i].split(",");
        var dfw = parseInt(parts[0]);
        var day = parseInt(parts[1]);
    

        if (dfw === 0) {
            calendarHTML += '<tr>';
        }

        if (dfw > 0 && day === 1) {
            for (var j = 0; j < dfw; j++) {
                calendarHTML += '<td></td>';
                
            }
        }

        // Add data attributes to the td element
        calendarHTML += '<td data-year="' + year + '" data-month="' + month + '" data-day="' + day + '" data-dfw="' + DAYS_OF_THE_WEEK[dfw] + '">' + day + '</td>';

        if (dfw === 6) {
            calendarHTML += '</tr>';
        }

        if (i === response.length - 1 && dfw < 6) {
            
            for (var m = dfw; m < 6; m++) {
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

        $('.years-container').removeClass('display-flex');
        $('.years-container').addClass('display-none');

        $('.months-container').removeClass('display-flex');
        $('.months-container').addClass('display-none');

        
        const response = await getCalendarByMonth(data_input);
        

        var calendarHTML = generateCalendarForYear(response);
        $('.calendar-container').html(calendarHTML);
        $('.calendar-container').addClass('display-flex');

        // Attach click event listeners to each date cell
        $('.calendar td').on('click', function() {
            var year = $(this).data('year');
            var month = $(this).data('month');
            var day = $(this).data('day'); 
            var dfw = $(this).data('dfw'); 

            if (day) { // Ensure the cell is not empty
                console.log(year, month, day, dfw);
            }
        });

        $('.calendar .month-year').on('click', function() {
            var selectedYear = $(this).data('year');
            // console.log(selectedYear);

            $('.calendar-container').removeClass('display-flex');
            $('.calendar-container').addClass('display-none');

            displayMonths(selectedYear)
        
        });

        
    } catch (error) {
        console.error("Async Error:", error);
    }
}





// Create a new Date object
const currentDate = new Date();
// Get the individual components of the date
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based
const day = currentDate.getDate();

console.log("Today date is: " + year + "-" + month + "-"  + day); // Output the formatted date

const data_input = {
    year: year,
    month: MONTHS[month-1]
}
fetchAndGenerateCalendarByMonth(data_input);