/*
  Major Assignment 2 - E-Commerce Product Card Handlers (Modular)
  Contains all event handler functions
*/

// ── Helper: log to BOTH console and on-screen log ───────────────────────
// Q: Why log to the screen when console.log exists? explain as if youre teaching a beginner.
// A: console.log only shows up in DevTools, which the person clicking the
//    card can't see. This helper ALSO appends a <div> into the #log-output
//    box so activity is visible right on the page. Best of both worlds:
//    strings for the screen, full objects for the console.
function logMessage(msg) {
  console.log(msg);
  const logOutput = document.getElementById("log-output");
  if (logOutput) {
    // build a fresh div for each entry — document.createElement makes a
    // detached node that only APPEARS once we appendChild it.
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.textContent = "> " + msg;   // textContent, not innerHTML — safer, no parsing
    logOutput.appendChild(entry);

    // line explaination: without these two lines the log box never
    // scrolls — scrollTop pins the view to the newest entry.
    logOutput.scrollTop = logOutput.scrollHeight;
  }
}

// 1. Product card single click handler
// Demonstrates difference between event.target and event.currentTarget
// ── target vs currentTarget (classic interview question!) ───────────────
//   event.target         → the DEEPEST element actually clicked (could be the
//                          <img>, a <span>... whatever was physically under the cursor)
//   event.currentTarget  → the element the LISTENER is attached to (always the card,
//                          because this handler belongs to the card)
// This difference exists because of "event bubbling": the click happens on a
// child first, then bubbles UP to parents.
function handleCardClick(event) {
  logMessage("Product details opened");

  console.log("--- Event Target vs CurrentTarget Demonstration ---");
  console.log("event.target (the actual element that was clicked):", event.target);
  console.log("event.currentTarget (the element listening to this event - the product card):", event.currentTarget);

  // toLowerCase() on tagName because browsers report tags UPPERCASE ("IMG")
  logMessage("event.target: <" + event.target.tagName.toLowerCase() + "> | event.currentTarget: <" + event.currentTarget.tagName.toLowerCase() + ">");
}

// 2. Product card double-click handler (zooms product image)
// classList.toggle = "add the class if missing, remove it if present" —
// a perfect on/off switch for a zoom style.
function handleCardDoubleClick(event, productImage) {
  logMessage("Product image zoomed");
  productImage.classList.toggle("zoomed");
}

// 3. Mouseover handler (change card border)
// add the .card-hover class; the CSS file defines what that looks like.
// JS never draws borders directly — it just flips classes and lets CSS style.
function handleCardMouseOver(event, productCard) {
  productCard.classList.add("card-hover");
}

// 4. Mouseout handler (restore original border)
// the undo button for add() above — remove the class and the CSS rule stops applying.
function handleCardMouseOut(event, productCard) {
  productCard.classList.remove("card-hover");
}

// 5. Add to Cart button click handler
// Uses event.stopPropagation() and disables button
function handleAddToCart(event) {
  // stopPropagation = "don't let this click bubble up to the card".
  // line explaination: without it, clicking Add to Cart would ALSO fire
  // the card's own click handler (opening product details) — two actions, one click.
  event.stopPropagation();
  logMessage("Product added to cart");

  // disable the button and change its label. `disabled = true` makes the
  // button unclickable AND greys it out (the browser applies default styles).
  event.target.disabled = true;
  event.target.textContent = "Added to Cart";
}

// 6. Wishlist button click handler
// Uses event.stopPropagation() and updates text
function handleWishlist(event) {
  // same bubble-blocking as above — wishlist click must not open product details.
  event.stopPropagation();
  logMessage("Added to wishlist");

  event.target.textContent = "❤️ Wishlisted";
}

// 7. Delete button handler
// Uses event.preventDefault(), event.stopPropagation(), confirmation dialog, and removes from DOM
function handleDelete(event, productCard) {
  // preventDefault = cancel the element's DEFAULT browser behaviour.
  // line explaination: the delete button is an <a href="#"> — without
  // preventDefault the page would jump to top / add # to the URL.
  event.preventDefault();
  // stopPropagation = don't trigger the card's click handler too.
  event.stopPropagation();

  // confirm() shows a browser-native popup with OK/Cancel.
  // it returns true (OK) or false (Cancel) — blocking until the user answers.
  const userConfirmed = confirm("Are you sure you want to delete this product card?");
  if (userConfirmed) {
    logMessage("Product card removed from the DOM");
    // .remove() detaches the element from the page entirely — gone, not hidden.
    productCard.remove();
  } else {
    logMessage("Deletion cancelled by user");
  }
}
