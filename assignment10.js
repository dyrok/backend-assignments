/*
  Assignment 10
  RTO Student Vehicle Registration System
*/

const fs = require("fs");
const path = require("path");

// ── File path setup ─────────────────────────────────────────────────────
// Q: Why path.join(__dirname, ...) instead of just "rto_data.json"?
// A: __dirname is an always-available variable in Node that holds the
//    ABSOLUTE path of the folder the current file lives in. If you run the
//    script from some other folder, a bare relative filename could point
//    to the wrong place. path.join glues paths together safely (handles
//    the slashes for us).
const FILE_PATH = path.join(__dirname, "rto_data.json");

// function to register a student vehicle
function registerVehicle(studentName, collegeId, vehicleNumber, vehicleType) {
  // get current date as registration date (YYYY-MM-DD)
  // line explaination: toISOString() gives "2024-05-10T08:30:00.000Z" —
  // .split("T")[0] chops at the "T" and keeps only the date part.
  let registrationDate = new Date().toISOString().split("T")[0];

  // create student vehicle entry
  let newEntry = {
    studentName: studentName,
    collegeId: collegeId,
    vehicleNumber: vehicleNumber,
    vehicleType: vehicleType,
    registrationDate: registrationDate
  };

  let vehicleList = [];

  // if the file already exists, read the existing data first.
  // JSON files have no "append" — we have to READ everything into memory,
  // push the new record, and WRITE the whole array back.
  if (fs.existsSync(FILE_PATH)) {
    let fileContent = fs.readFileSync(FILE_PATH, "utf-8");
    try {
      vehicleList = JSON.parse(fileContent);
    } catch (e) {
      // file exists but its contents are corrupt — start fresh instead
      // of crashing. not elegant, but survivable.
      vehicleList = [];
    }
  }

  // append new vehicle record (in memory, for now)
  vehicleList.push(newEntry);

  // write the FULL updated list back to rto_data.json.
  // the second argument `null` and third `2` format the JSON with 2-space
  // indentation so a human can actually read the file.
  fs.writeFileSync(FILE_PATH, JSON.stringify(vehicleList, null, 2));

  console.log(`Registered: ${studentName} | ${vehicleType} (${vehicleNumber})`);
}

// ── Sample registrations (via code input) ───────────────────────────────
// Every call: read file → push new entry → write file. Run it 3 times and
// rto_data.json ends up with 3 objects in an array.
registerVehicle("Rahul Sharma", "COL-101", "MH-01-AB-1234", "Bike");
registerVehicle("Priya Patel", "COL-102", "MH-02-CD-5678", "Scooter");
registerVehicle("Amit Verma", "COL-103", "MH-04-EF-9012", "Car");
