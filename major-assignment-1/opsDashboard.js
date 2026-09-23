/*
  Major Assignment 1 - RailConnect Live Ops Dashboard
  Train 12951 - Mumbai Rajdhani Express
  Rules:
  - Use Fat Arrow Functions
  - Do not use for or while loops
  - Use appropriate JavaScript array methods
  - Print the final dashboard using console.log()
*/

// ── Imports ─────────────────────────────────────────────────────────────
// modular sample booking data — lives in bookingData.js so logic and
// dataset stay separate.
const sampleBookings = require("./bookingData");

// ── Array-method cheat sheet (since loops are BANNED here 😅) ───────────
// Every function below is built on these, so here's the beginner intro:
//   .filter(fn)  → keeps only the elements where fn returns true. Returns a NEW array.
//   .map(fn)     → transforms every element, returns a NEW array of the same length.
//   .reduce(fn, start) → boils the whole array down to ONE value (sum, object, whatever).
//   .sort(fn)    → orders elements; fn(a, b) negative means a comes first.
// Q: Why is no-loop code often BETTER here?
// A: These methods state INTENT — `.filter()` reads as "keep some", `.reduce()`
//    reads as "collapse to one value" — where a for-loop makes you mentally
//    simulate index math. Bonus: they never mutate the original array
//    (except sort, which is why we `.slice()` a copy first).

// 1. getOccupancySummary
// Returns confirmed, waitlisted, RAC, total passengers and occupancy rate
const getOccupancySummary = (bookings) => {
  // filter keeps ONLY the bookings matching each status, then .length
  // counts them. It's a "count how many pass this test" one-liner.
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const waitlisted = bookings.filter((b) => b.status === "Waitlisted" || b.status === "WL").length;
  const rac = bookings.filter((b) => b.status === "RAC").length;
  const totalPassengers = bookings.length;

  // ternary guard: dividing by 0 would give NaN, so if the train is
  // empty we just report "0.00%".
  const occupancyRate = totalPassengers > 0
    ? ((confirmed / totalPassengers) * 100).toFixed(2) + "%"
    : "0.00%";

  return {
    confirmed,
    waitlisted,
    rac,
    totalPassengers,
    occupancyRate
  };
};

// 2. getRevenueBreakdown
// Returns total revenue and revenue breakdown by coach class and booking status
const getRevenueBreakdown = (bookings) => {
  // reduce with 0 as the starting sum: for each booking, add its fare.
  // `sum` is the running total, `b` is the current booking.
  const totalRevenue = bookings.reduce((sum, b) => sum + b.fare, 0);

  // ── The "group into an object" reduce pattern ─────────────────────────
  // Q: How can reduce produce an OBJECT instead of a number?
  // A: The starting value doesn't have to be 0 — here it's {} (empty
  //    object). Each iteration: look up `acc[coachClass]` (0 if new via
  //    `|| 0`), add this fare, and store it back. One pass, grouped sums.
  const byCoachClass = bookings.reduce((acc, b) => {
    acc[b.coachClass] = (acc[b.coachClass] || 0) + b.fare;
    return acc;  // MUST return acc each time or the next iteration loses everything
  }, {});

  // identical pattern, but grouping by booking status instead
  const byStatus = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + b.fare;
    return acc;
  }, {});

  return {
    totalRevenue,
    byCoachClass,
    byStatus
  };
};

// 3. getStationLoad
// Returns the number of passengers boarding from each station
// same reduce-into-object trick, but adding 1 per booking (a tally).
const getStationLoad = (bookings) => {
  return bookings.reduce((acc, b) => {
    acc[b.boardingStation] = (acc[b.boardingStation] || 0) + 1;
    return acc;
  }, {});
};

// 4. getVulnerablePassengers
// Returns confirmed passengers who are below 12 or 60+, with name, age, coach and seat
// filter first (narrow it down), THEN map (reshape the objects).
// The map picks only the fields we care about — passengers don't need
// their fare or PNR broadcast to an ops dashboard.
const getVulnerablePassengers = (bookings) => {
  return bookings
    .filter((b) => b.status === "Confirmed" && (b.age < 12 || b.age >= 60))
    .map((b) => ({
      name: b.passengerName,
      age: b.age,
      coach: b.coachClass,
      seat: b.seatNo
    }));
};

// 5. getWaitlistClearancePlan
// Returns WL passengers sorted by lowest PNR, with a clearanceRank
const getWaitlistClearancePlan = (bookings) => {
  return bookings
    .filter((b) => b.status === "Waitlisted" || b.status === "WL")

    // line explaination: .slice() with no arguments copies the array.
    // Needed because .sort() MUTATES the original — sorting a copy keeps
    // the source data untouched.
    .slice()

    // comparator: if a.pnr - b.pnr is negative, a sorts before b —
    // i.e. lowest PNR (longest wait) comes first.
    .sort((a, b) => a.pnr - b.pnr)

    // map uses the SECOND argument (index) to stamp clearanceRank:
    // index 0 → rank 1, index 1 → rank 2, and so on.
    .map((b, index) => ({
      pnr: b.pnr,
      passengerName: b.passengerName,
      coachClass: b.coachClass,
      fare: b.fare,
      clearanceRank: index + 1
    }));
};

// 6. generateFullDashboard
// Returns all the above information in one combined dashboard object
// this is just orchestration — call every analyzer, bundle the results.
const generateFullDashboard = (bookings) => {
  const dashboard = {
    train: "Train 12951 - Mumbai Rajdhani Express",
    generatedAt: new Date().toISOString(),
    occupancySummary: getOccupancySummary(bookings),
    revenueBreakdown: getRevenueBreakdown(bookings),
    stationLoad: getStationLoad(bookings),
    vulnerablePassengers: getVulnerablePassengers(bookings),
    waitlistClearancePlan: getWaitlistClearancePlan(bookings)
  };

  return dashboard;
};

// ── Execute and print the final dashboard ───────────────────────────────
const finalDashboard = generateFullDashboard(sampleBookings);
console.log("==================================================");
console.log("   RAILCONNECT LIVE OPS DASHBOARD - TRAIN 12951   ");
console.log("==================================================");
console.log(JSON.stringify(finalDashboard, null, 2));

// export functions for modular usage — tests or other files can require
// individual functions instead of the whole dashboard.
module.exports = {
  getOccupancySummary,
  getRevenueBreakdown,
  getStationLoad,
  getVulnerablePassengers,
  getWaitlistClearancePlan,
  generateFullDashboard
};
