/*
  Assignment 9 - Custom Validation Module (validateUser.js)
  Validates incoming user object
*/

// ── Why a separate module? ──────────────────────────────────────────────
// Q: Why is validation in its own file instead of inside the server?
// A: Separation of concerns. The server's job is handling HTTP; the
//    validator's job is checking data. Keeping them apart makes the code
//    easier to read, easier to test, and we can reuse validateUser in any
//    other file just by requiring it.
function validateUser(user) {
  // check if user object is provided at all.
  // `!user` catches null/undefined; typeof !== "object" catches strings,
  // numbers etc. sent as the body.
  if (!user || typeof user !== "object") {
    return {
      isValid: false,
      message: "Request body must be a valid JSON object"
    };
  }

  // ── 1. name must be a non-empty string ────────────────────────────────
  // `.trim()` strips whitespace from both ends — "   " alone becomes "",
  // so sneaky whitespace-only names get rejected too.
  if (typeof user.name !== "string" || user.name.trim() === "") {
    return {
      isValid: false,
      message: "Validation Error: 'name' must be a non-empty string"
    };
  }

  // ── 2. age must be a number greater than 18 ───────────────────────────
  // `<= 18` rejects 18 itself — the assignment says GREATER than 18.
  // Also blocks strings like "21" (typeof check catches those).
  if (typeof user.age !== "number" || user.age <= 18) {
    return {
      isValid: false,
      message: "Validation Error: 'age' must be a number greater than 18"
    };
  }

  // ── 3. email must include "@" ─────────────────────────────────────────
  // super minimal email check — just: is it a string and does it have an @.
  // Real apps use regex, but for this assignment includes("@") is enough.
  if (typeof user.email !== "string" || !user.email.includes("@")) {
    return {
      isValid: false,
      message: "Validation Error: 'email' must contain '@'"
    };
  }

  // if all checks passed — every return above exits early, so reaching
  // this line means the user object survived all three checks 🎉
  return {
    isValid: true,
    message: "User validation successful"
  };
}

// module.exports is how we make THIS function importable from other
// files. Without it, require("./validateUser") would give you nothing.
module.exports = validateUser;
