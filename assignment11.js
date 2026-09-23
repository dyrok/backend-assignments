/*
  Assignment 11
  College Backend System - Student Registration Server
  Accepts POST requests, parses JSON, and saves to students.json with registeredAt timestamp
*/

const http = require("http");
const fs = require("fs");
const path = require("path");

// PORT comes from the environment if provided, otherwise 4000.
// Q: What is process.env.PORT and why `|| 4000`? explain as if youre teaching a beginner.
// A: process.env is an object holding environment variables — settings the
//    operating system/shell passes to the program. Deploy platforms often
//    pick the port FOR you through this variable. The `||` (or) fallback
//    means: "if process.env.PORT is undefined/falsey, use 4000 instead".
const PORT = process.env.PORT || 4000;
const FILE_PATH = path.join(__dirname, "students.json");

// ── Create native http server (no express) ──────────────────────────────
// Express is just a layer on top of this — underneath, it's all req/res.
const server = http.createServer((req, res) => {
  // only process POST requests — GET requests here make no sense since
  // we're registering students, not fetching a webpage.
  if (req.method === "POST") {
    // request bodies arrive in chunks over the network, so we collect
    // them into one string before parsing.
    let body = "";

    // collect incoming data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // when the ENTIRE payload has arrived, `end` fires once.
    req.on("end", () => {
      try {
        let studentData = JSON.parse(body);

        // add registration timestamp — ISO format like 2024-05-10T08:30:00.000Z.
        // the Z at the end means UTC (zero timezone offset).
        studentData.registeredAt = new Date().toISOString();

        let studentsList = [];

        // if students.json exists, read the existing students first.
        // same pattern as a tiny database: load → modify → save.
        if (fs.existsSync(FILE_PATH)) {
          let fileContent = fs.readFileSync(FILE_PATH, "utf-8");
          try {
            studentsList = JSON.parse(fileContent);
          } catch (e) {
            // file was unreadable/corrupt — reset to empty rather than crash
            studentsList = [];
          }
        }

        // append the new student to the in-memory list
        studentsList.push(studentData);

        // write the whole list back. `null, 2` = pretty-print with 2-space indent.
        fs.writeFileSync(FILE_PATH, JSON.stringify(studentsList, null, 2));

        // `||` fallback chain: use studentName, else name, else a placeholder.
        // line explaination: handles payloads that use either key name — avoids logging "undefined".
        console.log(`Student registered: ${studentData.studentName || studentData.name || "New Student"}`);

        // send response back to Postman — 201 means "Created", not just OK.
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          status: "success",
          message: "Student registered successfully!",
          data: studentData
        }));

      } catch (err) {
        // JSON.parse throws on invalid JSON — catch it so the server stays alive.
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          status: "error",
          message: "Invalid JSON format"
        }));
      }
    });

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Please send a POST request to register a student."
    }));
  }
});

// start server
server.listen(PORT, () => {
  console.log(`assignment 11 server is running on http://localhost:${PORT} 😘`);
});
