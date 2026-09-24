/*
  Controller: userController.js
  Handles Get All Users and Get User By ID
*/

const userModel = require("../models/userModel");

// ── Get all users ───────────────────────────────────────────────────────
const getAllUsers = (req, res) => {
  try {
    const users = userModel.findAll();

    // Remove passwords before returning.
    // Q: Why map to a new object instead of deleting the password field?
    // A: delete user.password mutates the objects (and the in-memory copy
    //    could get rewritten to disk later — yikes). Building fresh safe
    //    objects is non-destructive and also whitelists exactly what we expose.
    const safeUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }));

    return res.status(200).json({
      success: true,
      count: safeUsers.length,
      users: safeUsers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

// ── Get user by ID ──────────────────────────────────────────────────────
// :id in the route ("/:id") becomes req.params.id here — Express fills it
// from the URL automatically.
const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = userModel.findById(id);

    // findById returns undefined when nothing matches — falsy, so !user is true
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with ID: " + id
      });
    }

    // same password-stripping pattern as getAllUsers
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById
};
