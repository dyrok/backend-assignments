/*
  Model: userModel.js
  Handles read and write operations on data/users.json
*/

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/users.json");

// ── Why is this a "model"? ──────────────────────────────────────────────
// Q: What does MVC's "M" mean here, since we're not using MongoDB?
// A: The model is whatever owns DATA access. Controllers never touch the
//    filesystem directly — they ask the model. That means swapping
//    users.json for a real database someday means changing ONLY this file.
//    It's a fake database built on fs, basically.
//
// Q: Why does __dirname have "../" in the path?
// A: __dirname is the folder of THIS file (major-assignment-3/models), and
//    the data lives one level up in major-assignment-3/data. ../ climbs up
//    one directory.

// Helper function to read users from JSON file
const readUsersFromFile = () => {
  try {
    // if the file doesn't exist yet, create it as an empty JSON array
    // and return [] — first-ever signup won't crash.
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]));
      return [];
    }
    const fileData = fs.readFileSync(DATA_FILE, "utf-8");

    // `fileData || "[]"` guards against an EMPTY file — JSON.parse("")
    // throws, but JSON.parse("[]") gives a clean empty array.
    return JSON.parse(fileData || "[]");
  } catch (error) {
    // any read/parse error → don't nuke the server, just report an empty list
    console.error("Error reading users file:", error);
    return [];
  }
};

// Helper function to write users to JSON file
const writeUsersToFile = (users) => {
  try {
    // null, 2 → pretty-print with 2-space indentation, human-readable
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing to users file:", error);
  }
};

// ── Model methods ───────────────────────────────────────────────────────
// Q: Why an object of arrow functions instead of a class?
// A: A class with new UserModel() would imply multiple instances, but we
//    only ever have ONE data source. A plain object of functions is the
//    simplest shape that does the job.
const userModel = {
  // Get all users — the raw array, passwords and all (controllers filter)
  findAll: () => {
    return readUsersFromFile();
  },

  // Find user by ID
  // String() on both sides: ids are stored as strings (Date.now().toString()),
  // but req.params gives strings anyway — the double cast makes the compare
  // bulletproof even if one side is a number.
  findById: (id) => {
    const users = readUsersFromFile();
    return users.find((user) => String(user.id) === String(id));
  },

  // Find user by Email
  // toLowerCase() on BOTH sides so "A@B.com" and "a@b.com" match —
  // emails are case-insensitive by convention.
  findByEmail: (email) => {
    const users = readUsersFromFile();
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  },

  // Create new user
  // id: Date.now() is milliseconds since 1970 — unique enough for a
  // class assignment, NOT good enough for production (real apps use UUIDs).
  create: (name, email, password) => {
    const users = readUsersFromFile();
    const newUser = {
      id: Date.now().toString(),
      name: name || "Student User",   // fallback if name is undefined
      email: email.toLowerCase(),
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsersToFile(users);
    return newUser;
  }
};

module.exports = userModel;
