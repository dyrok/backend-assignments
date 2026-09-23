/*
  Assignment 6
  Find the First Even Number (Do-While & Continue)
*/

// function to find first even number from an array
function findFirstEven(arr) {
  // check if array is empty — otherwise the do block would read arr[0]
  // of nothing and crash on arr.length checks.
  if (arr.length === 0) {
    console.log("Array is empty");
    return null;
  }

  let i = 0;
  let firstEven = null;

  // ── Do-while vs while (beginner refresher) ─────────────────────────────
  // Q: What makes do-while different from a normal while loop?
  // A: A do-while ALWAYS runs its body at least once — the condition is
  //    checked AFTER the body, not before. Think of it as "do the thing,
  //    THEN ask if we should do it again". A plain while might run 0 times
  //    if the condition is false from the start.
  do {
    // if number is odd, skip it using continue.
    // Q: What does `continue` actually do here?
    // A: `continue` skips the REST of the loop body and jumps straight to
    //    the condition check. It's like saying "this one's odd, not my
    //    problem, next!". Notice we still do i++ BEFORE continue — otherwise
    //    we'd check the same odd number forever (infinite loop 🙃).
    if (arr[i] % 2 !== 0) {
      i++;
      continue;
    }

    // if even number is found, store it and break.
    // `% 2 !== 0` means "remainder when divided by 2 is not 0" → odd.
    // Reaching here means the number IS even, so remember it...
    firstEven = arr[i];
    // ...and break immediately — we only want the FIRST even number.
    break;
  } while (i < arr.length);

  // log result
  if (firstEven !== null) {
    console.log(`First even number: ${firstEven}`);
  } else {
    console.log("No even number found in the array");
  }

  return firstEven;
}

// ── Sample testing ──────────────────────────────────────────────────────
// Case 1: mixed odd numbers, first even is 8 (at index 3)
let numbers1 = [1, 3, 5, 8, 11, 14];
findFirstEven(numbers1);

// Case 2: ALL odd → loop exhausts the array, firstEven stays null
let numbers2 = [3, 7, 9, 15];
findFirstEven(numbers2);
