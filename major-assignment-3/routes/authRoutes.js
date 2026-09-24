/*
  Routes: authRoutes.js
  Authentication routes for Signup and Login
*/

// ── What is express.Router()? ───────────────────────────────────────────
// Q: Why use a Router instead of app.post directly in server.js? explain as if youre teaching a beginner.
// A: express.Router() creates a MINI app that only knows its own routes.
//    server.js mounts it with app.use("/api/auth", router), so "/signup"
//    here really means "/api/auth/signup". This keeps route files small
//    and lets you mount the same router anywhere (v2, staging, whatever).
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { validateSignup } = require("../middleware/validationMiddleware");

// Signup Route with validation middleware.
// Q: Why is validateSignup sandwiched between the path and the controller?
// A: That's Express middleware chaining! Requests flow left → right:
//    validateSignup runs first; if it calls next(), the signup handler
//    runs; if it responds with a 400 instead, the controller never sees it.
//    A bouncer standing before the party. 🚪
router.post("/signup", validateSignup, authController.signup);

// Login Route — no middleware, login does its own existence checks
router.post("/login", authController.login);

module.exports = router;
