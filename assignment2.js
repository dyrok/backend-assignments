/*
  Assignment 2
  User Profile Management
*/

// ── 1. Primitive Data Types ─────────────────────────────────────────────
// Q: What are primitive data types? explain as if youre teaching a beginner.
// A: Primitives are the SIMPLEST values in JavaScript — they hold just one
//    piece of data, and when you copy them, the value itself is copied.
//    There are 7 of them: string, number, boolean, null, undefined,
//    symbol, and bigint.
let userName = "Rahul";        // string → text wrapped in quotes
let userAge = 21;              // number → any number, decimals included
let isPremiumUser = true;      // boolean → only true or false, like a light switch
let userBio = null;            // null → "deliberately empty". The developer set it to nothing on purpose
let userId = Symbol("id");     // symbol → a unique, hidden-ish identifier. Even two Symbol("id") are NEVER equal

// ── 2. Non-Primitive Data Types ─────────────────────────────────────────
// Q: How are non-primitives different from primitives?
// A: Non-primitives (objects, arrays, functions) hold COLLECTIONS or
//    references to data. When you copy one, you don't copy the data —
//    you copy the ADDRESS pointing to it (like sharing a Google Doc link
//    instead of emailing the file).
let userAddress = {
  city: "Mumbai",
  country: "India"
};

// An array is also a non-primitive. Indexing starts at 0:
// index 0 = "Laptop", index 1 = "Book", index 2 = "Headphones", index 3 = "Watch"
let favoriteItems = ["Laptop", "Book", "Headphones", "Watch"];

// ── 3. Function to return greeting ──────────────────────────────────────
// Builds a greeting string by joining the global userName with some text.
function getUserGreeting() {
  return "Hello " + userName + ", welcome back!";
}

// ── 4. Logging output ───────────────────────────────────────────────────
// line explaination: each log demonstrates accessing a different kind of data —
// a primitive string, a property inside an object, an array element by index,
// and the return value of a function.
console.log(userName);              // the string primitive
console.log(userAddress.city);      // dot notation digs INTO the object
console.log(favoriteItems[2]);      // index 2 → "Headphones" (0-based!)
console.log(getUserGreeting());     // calls the function, logs what it returns
