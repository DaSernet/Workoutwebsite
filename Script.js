// set a key in local storage to store the date of last exercise completion
const LAST_EXERCISE_DATE_KEY = "lastExerciseDate";

// set a function to check if the current date is at least 6 hours past the last exercise completion date
function checkReset() {
    const lastExerciseDate = localStorage.getItem(LAST_EXERCISE_DATE_KEY);
    if (!lastExerciseDate) {
        // if there is no last exercise date in local storage, set it to the current date and time
        localStorage.setItem(LAST_EXERCISE_DATE_KEY, new Date().toISOString());
    } else {
        const lastExerciseTime = new Date(lastExerciseDate).getTime();
        const currentTime = new Date().getTime();
        const hoursSinceLastExercise = (currentTime - lastExerciseTime) / (1000 * 60 * 60);
        if (hoursSinceLastExercise >= 6) {
            // if it's been at least 6 hours since the last exercise completion, reset the checkboxes
            $('input[type="checkbox"]').prop("checked", false);
            localStorage.setItem(LAST_EXERCISE_DATE_KEY, new Date().toISOString());
        }
    }
}

// run the checkReset function on page load
checkReset();

// add an event listener to each checkbox to update the last exercise completion date in local storage
$('input[type="checkbox"]').on("click", function () {
    localStorage.setItem(LAST_EXERCISE_DATE_KEY, new Date().toISOString());
});