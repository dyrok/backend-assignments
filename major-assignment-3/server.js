/*
  Major Assignment 3 - User Registration & Authentication API
  Main Express Server: server.js
*/

const express = require("express");

// ── Imports ─────────────────────────────────────────────────────────────
// Import modular components — each folder has ONE job:
//   middleware/  → functions that run on every request BEFORE handlers
//   routes/      → URL → controller mapping ("traffic cops")
//   controllers/ → the actual request logic
const loggerMiddleware = require("./middleware/loggerMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in Express middleware to parse incoming JSON payloads.
// Q: Why do we even need express.json()? explain as if youre teaching a beginner.
// A: The raw HTTP body arrives as a stream of bytes — useless as-is.
//    Without this middleware, req.body would be `undefined`. express.json()
//    reads the whole body, parses the JSON, and attaches it to req.body so
//    controllers can just do `req.body.email`. Order matters: it must run
//    BEFORE any route that needs a body.
app.use(express.json());

// Custom Express middleware for request logging.
// app.use with NO path means: run for EVERY request, every method.
app.use(loggerMiddleware);

// ── Routes ──────────────────────────────────────────────────────────────
// app.use("/api/auth", ...) means "any request starting with /api/auth →
// let authRoutes decide the rest". The router then matches /signup, /login...
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Root route — acts as the API's front door / documentation page.
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to User Registration & Authentication API",
    endpoints: {
      signup: "POST /api/auth/signup",
      login: "POST /api/auth/login",
      getAllUsers: "GET /api/users",
      getUserById: "GET /api/users/:id"
    }
  });
});

// 404 handler for undefined routes.
// line explaination: app.use with no path placed AFTER all real routes
// only runs when nothing above matched — so it's effectively a catch-all.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// ── Start the server ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("==================================================");
  console.log(` Major Assignment 3 - Auth server is running on port ${PORT} 😘`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log("==================================================");
});
