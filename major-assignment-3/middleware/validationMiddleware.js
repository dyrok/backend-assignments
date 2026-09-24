/*
  Middleware: validationMiddleware.js
  Validates signup request body:
  - Valid email format
  - Password min 8 chars
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 digit
  - At least 1 special character
  - Prevent registration with already registered email
*/

const userModel = require("../models/userModel");

// ── What is middleware, precisely? ──────────────────────────────────────
// Q: What makes a function "middleware" in Express? explain as if youre teaching a beginner.
// A: Any function with the (req, res, next) signature that sits between
//    the request arriving and the final handler. Its two options:
//      1. Call next()         → "checks out, pass it along the chain"
//      2. Respond with res.*  → "rejected, chain stops here"
//    This one bounces bad signups with a 400 before the controller ever runs.
const validateSignup = (req, res, next) => {
  const { email, password } = req.body;

  // ── 1. Check if email and password are provided ───────────────────────
  // !email catches undefined, null AND "" in one shot (all falsy).
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  // ── 2. Validate email format ──────────────────────────────────────────
  // Q: How do you read this regex? /^^...$/ looks like line noise 😵
  // A: ^  → must START here
  //    [^\s@]+ → one or more chars that are NOT whitespace and NOT @
  //    @   → a literal @ (duh)
  //    [^\s@]+\.[^\s@]+$ → domain, a dot, then something like "com"
  //    Not bulletproof (RFC-compliant email regexes are monsters), but
  //    catches the obvious garbage like "hello" or "a@b".
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  // ── 3. Prevent registration with already registered email ────────────
  // Q: Why check THIS here and not in the controller?
  // A: It's a validation concern — reject duplicates before doing any work.
  //    The middleware has access to the model, so the controller stays dumb
  //    and just creates the user.
  const existingUser = userModel.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already registered"
    });
  }

  // ── 4. Password length (minimum 8 characters) ─────────────────────────
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long"
    });
  }

  // ── 5-8. Character-class checks ───────────────────────────────────────
  // Q: Why four separate checks instead of one giant regex?
  // A: ERROR MESSAGES. With one regex you can only say "bad password";
  //    separate checks let us tell the user EXACTLY which rule failed.
  //    Each test() just asks "does the password contain at least one X?"

  // 5. At least 1 uppercase letter (no ^/$ needed — .test() searches anywhere)
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 1 uppercase letter"
    });
  }

  // 6. At least 1 lowercase letter
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 1 lowercase letter"
    });
  }

  // 7. At least 1 digit
  if (!/[0-9]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 1 digit"
    });
  }

  // 8. At least 1 special character.
  // The [...] lists every allowed symbol; inside a character class most
  // symbols are literal, which is why \- and \/ need backslash escapes.
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (!specialCharRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 1 special character"
    });
  }

  // ── All validation checks passed ──────────────────────────────────────
  // reaching this line means the user object survived every check —
  // green-light it to the controller. 🎉
  next();
};

module.exports = {
  validateSignup
};
