/*
  Assignment 9
  Validate JSON Payload in POST Request using Custom Module
*/

// ── Imports ─────────────────────────────────────────────────────────────
// Q: What is require() and why do we use it? explain as if youre teaching a beginner.
// A: `require()` is Node.js's way of importing code from another file.
//    "http" is a BUILT-IN module that ships with Node (no install needed),
//    while "./validateUser" is OUR own local module — the ./ means
//    "look in the same folder as this file". That's the whole point of this
//    assignment: keeping validation logic in a separate file so the server
//    stays clean.
const http = require("http");
const validateUser = require("./validateUser");

const PORT = 3000;

// ── Create native http server ───────────────────────────────────────────
// createServer gives us a function that runs for EVERY incoming request.
// `req` = what the client sent (method, URL, body...), `res` = what we send back.
const server = http.createServer((req, res) => {
  // only handle POST requests — anything else gets a 404.
  if (req.method === "POST") {
    // The request body doesn't arrive all at once! It arrives in small
    // PIECES called chunks (because of how networks work). We collect
    // them into one string.
    let body = "";

    // every time a chunk arrives, glue it onto our body string
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // `end` fires when ALL chunks have arrived and the body is complete.
    // Only NOW is it safe to parse the JSON.
    req.on("end", () => {
      try {
        const userData = JSON.parse(body);

        // hand the parsed object to our custom local validation module
        const result = validateUser(userData);

        if (!result.isValid) {
          // validation failed → HTTP 400 Bad Request
          // line explaination: 400 is the HTTP status code that means
          // "the client sent something we can't accept".
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            status: "error",
            message: result.message
          }));
          return;
        }

        // validation succeeded → HTTP 200 OK
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          status: "success",
          message: "User payload is valid!",
          user: userData
        }));

      } catch (err) {
        // JSON.parse THROWS if the body isn't valid JSON at all
        // (like random gibberish). The try/catch catches that throw so
        // the server doesn't crash — we just reply with a 400.
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          status: "error",
          message: "Invalid JSON format"
        }));
      }
    });

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Please send a POST request with JSON body" }));
  }
});

server.listen(PORT, () => {
  console.log(`assignment 9 server is running on http://localhost:${PORT} 😘`);
});
