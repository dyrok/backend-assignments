/*
  Middleware: loggerMiddleware.js
  Logs all incoming HTTP requests
*/

// ── Why log requests at all? ────────────────────────────────────────────
// Q: What's the point of this middleware? explain as if youre teaching a beginner.
// A: While developing, you want to SEE traffic fly by — every request's
//    method, path and time. Without it, a 404 or a crashed route is just
//    silence in the terminal. With it, you can watch exactly what the
//    client (Postman, browser) sent and when. This is basically a tiny
//    version of morgan, the popular logging middleware.
const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();

  // template literal → e.g. "[2024-05-10T08:30:00.000Z] POST /api/auth/signup"
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

  // MUST call next() — without it the request hangs forever because
  // nothing ever tells Express to move to the next step. Classic bug. 🫠
  next();
};

module.exports = loggerMiddleware;
