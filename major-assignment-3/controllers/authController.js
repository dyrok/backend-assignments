/*
  Controller: authController.js
  Handles Signup and Login logic
*/

const userModel = require("../models/userModel");

// ── What IS a controller? ───────────────────────────────────────────────
// Q: What does a controller actually do? explain as if youre teaching a beginner.
// A: It's the function that runs when a request hits a route. It receives
//    the prepared req (with req.body filled in by express.json()) and the
//    res object to send back a response. Controller = decide what to do,
//    ask the model for data, send back a status code + JSON. Nothing else.
//
// Q: Why `return res.status(...)` and not just `res.status(...)`?
// A: res.json() doesn't stop the function — without return, code below
//    could run and try to send ANOTHER response, which throws
//    "Cannot set headers after they are sent". Returning exits immediately.

// ── Signup Handler ──────────────────────────────────────────────────────
// Note: most field validation already ran in validateSignup middleware,
// so this handler can trust the inputs a little.
const signup = (req, res) => {
  // destructuring: pull name, email, password straight out of req.body
  const { name, email, password } = req.body;

  try {
    // Create new user in the JSON "database"
    const newUser = userModel.create(name, email, password);

    // Return response WITHOUT exposing the password.
    // line explaination: we rebuild the user object field by field instead
    // of sending newUser — leaking a password in an API response is a classic bug.
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    // 500 = "something broke on OUR side" (as opposed to 4xx = client's fault)
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message
    });
  }
};

// ── Login Handler ───────────────────────────────────────────────────────
const login = (req, res) => {
  const { email, password } = req.body;

  // cheap pre-check: without both fields there's nothing to compare
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  // Find user by email (model handles the case-insensitive lookup)
  const user = userModel.findByEmail(email);

  // Check if user exists and password matches.
  // Q: Why one combined "Invalid email or password" message instead of two separate ones?
  // A: Deliberate security choice. If we said "email not found", attackers
  //    could probe which emails are registered. One vague message hides both failures.
  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  // Successful login — 200 OK, again without the password
  return res.status(200).json({
    success: true,
    message: "Login successful!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
};

module.exports = {
  signup,
  login
};
