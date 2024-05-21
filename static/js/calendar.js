// Constants
const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

// Function to make AJAX request to get calendar data
function getCalendar(value) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        value.years.forEach(year => formData.append('years', year));
        $.ajax({
            url: '/get_calendar',
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
async function generateCalendarAsync(data, userInput) {
    try {
        // Get calendar body element
        var calendarBody = document.getElementById("calendar-body");
        var html = '';

        // Get index of user input month
        var index = MONTHS.indexOf(userInput);

        // Check if the user input month is valid
        if (index === -1) {
            throw new Error("Invalid month entered.");
        }

        // Loop through each date in the data array
        for (var i = 0; i < data[index].length; i++) {
            var parts = data[index][i].split(",");
            var dayOfWeek = parseInt(parts[0]);
            var day = parseInt(parts[1]);

            // Start a new row for each Sunday
            if (dayOfWeek === 0) {
                html += '<tr>';
            }

            // Add an empty cell for days before the start of the month
            if (dayOfWeek > 0 && day === 1) {
                for (var j = 0; j < dayOfWeek; j++) {
                    html += '<td></td>';
                }
            }

            // Add the day cell with the date
            html += '<td>' + day + '</td>';

            // End the row for each Saturday
            if (dayOfWeek === 6) {
                html += '</tr>';
            }

            // Fill the remaining cells if the month ends before Saturday
            if (i === data[index].length - 1 && dayOfWeek < 6) {
                for (var k = dayOfWeek; k < 6; k++) {
                    html += '<td></td>';
                }
                html += '</tr>';
            }
        }

        // Append the generated HTML to the calendar body
        calendarBody.innerHTML = html;
    } catch (error) {
        console.error("generateCalendarAsync Error:", error.message);
    }
}




const years_input = { years: [2024] };
const month_input = "April";

(async () => {
    try {
        const response = await getCalendar(years_input);
        await generateCalendarAsync(response, month_input);
    } catch (error) {
        console.error("Async Error:", error);
    }
})();
