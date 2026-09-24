/*
  Routes: userRoutes.js
  User routes for retrieving user data
*/

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// ── Route order matters here! ───────────────────────────────────────────
// Q: Why is "/" defined before "/:id"? explain as if youre teaching a beginner.
// A: Express matches routes top to bottom and uses the FIRST hit.
//    "/" matches exactly /api/users, while "/:id" matches /api/users/<anything>
//    — the colon makes :id a wildcard segment filled into req.params.id.
//    Order matters less when paths don't overlap like this, but listing
//    specific routes before wildcard routes is the safe habit.

// Get all users → GET /api/users
router.get("/", userController.getAllUsers);

// Get user by ID → GET /api/users/12345 (req.params.id = "12345")
router.get("/:id", userController.getUserById);

module.exports = router;
