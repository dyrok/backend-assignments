/*
  Assignment 7
  Print Day using Switch and Date Function
*/

// function to print day of the week
function printDayOfWeek() {
  // get current date
  // Q: What is `new Date()`? explain as if youre teaching a beginner.
  // A: `Date` is a built-in JavaScript class. `new Date()` creates an object
  //    representing the EXACT moment the code runs — date, time, everything.
  //    From this one object we can ask questions like "what day is it?"
  //    or "what hour is it?" using its built-in methods.
  let today = new Date();

  // getDay() returns a NUMBER, not a name: 0 is Sunday, 1 is Monday,
  // ..., 6 is Saturday. Yes, the week starts on Sunday — blame history.
  let dayIndex = today.getDay();
  let dayName = "";

  // ── Why switch instead of if/else? ─────────────────────────────────────
  // A switch is cleaner when you're comparing ONE variable against MANY
  // fixed values. Each `case` is a possible value of dayIndex, and `break`
  // stops the fall-through (without break, execution would leak into the
  // next case and you'd end up with weird results).
  switch (dayIndex) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
    // `default` is the catch-all — runs when nothing above matched.
    // (getDay() can only return 0-6, so this never really fires, but
    // it's good defensive habit.)
    default:
      dayName = "Invalid day";
  }

  console.log(`Today is: ${dayName}`);
}

// sample testing
printDayOfWeek();
