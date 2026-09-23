/*
  Assignment 8
  College Grading System
*/

// function to calculate grade based on student score
// ── How the if/else-if ladder works ─────────────────────────────────────
// The conditions are checked TOP to BOTTOM, and the FIRST one that's true
// wins — everything after it is skipped. That's why we can write
// `score >= 80` for a B without saying `&& score < 90`: if the score were
// 90+, the first condition would have caught it already.
function getGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    // the final else needs no condition — if we got here, the score is
    // below 60. RIP 💀
    return "F";
  }
}

// sample testing — one score per grade band to prove every branch works
console.log(`Score 95: Grade ${getGrade(95)}`);
console.log(`Score 85: Grade ${getGrade(85)}`);
console.log(`Score 72: Grade ${getGrade(72)}`);
console.log(`Score 65: Grade ${getGrade(65)}`);
console.log(`Score 50: Grade ${getGrade(50)}`);
