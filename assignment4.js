/*
  Assignment 4
  Generate a Multiplication Table (For Loop)
*/

// function to print multiplication table of a number n
function generateMultiplicationTable(n) {
  console.log(`Multiplication Table of ${n}:`);

  // ── The for loop anatomy (beginner refresher) ──────────────────────────
  // A for loop has THREE parts separated by semicolons:
  //   1. `let i = 1`        → runs ONCE before the loop starts (initialise counter)
  //   2. `i <= 10`          → checked before EVERY iteration; loop keeps running while true
  //   3. `i++`              → runs after each iteration (increments i by 1)
  // We loop 1 to 10 because tables traditionally go up to 10 in school.
  for (let i = 1; i <= 10; i++) {
    let result = n * i;
    console.log(`${n} * ${i} = ${result}`);
  }
}

// sample testing
generateMultiplicationTable(5);
