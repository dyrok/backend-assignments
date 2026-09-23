/*
  Major Assignment 2 - E-Commerce Product Card Application Setup
  Attaches event listeners to DOM elements using addEventListener()
*/

// ── The DOMContentLoaded wrapper ─────────────────────────────────────────
// Q: Why is EVERYTHING inside document.addEventListener("DOMContentLoaded", ...)? explain as if youre teaching a beginner.
// A: The <script> tags load BEFORE the browser finishes building the page.
//    If we grabbed elements immediately, they might not exist yet and we'd
//    get null. DOMContentLoaded fires when the browser has finished parsing
//    the HTML — so by the time this runs, every element is guaranteed to
//    be in the DOM and safely grabbable.
document.addEventListener("DOMContentLoaded", () => {
  // ── DOM element references ────────────────────────────────────────────
  // grab each element ONCE by id and stash the references. getElementById
  // returns the actual element object (not a copy) — so later calls like
  // .classList.toggle() change the real page.
  const productCard = document.getElementById("product-card");
  const productImage = document.getElementById("product-image");
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const wishlistBtn = document.getElementById("wishlist-btn");
  const deleteBtn = document.getElementById("delete-btn");

  // guard clause: if the card isn't on the page (typo'd id, wrong html),
  // bail out instead of crashing on the very next line.
  if (!productCard) return;

  // ── Wiring listeners ──────────────────────────────────────────────────
  // Q: Why pass event as an argument to handlers that don't always use it?
  // A: Consistency. Every handler receives the event object automatically —
  //    it carries info like WHICH element was clicked. Some handlers need
  //    it (delete's stopPropagation), some don't, but keeping the signature
  //    uniform makes the wiring below read like a table of contents.
  //
  // The actual logic lives in handlers.js — this file is just the wiring.

  // 1. Click on product card
  productCard.addEventListener("click", (event) => {
    handleCardClick(event);
  });

  // 2. Double-click on product card (zoom image)
  productCard.addEventListener("dblclick", (event) => {
    handleCardDoubleClick(event, productImage);
  });

  // 3. Mouseover on product card (change border)
  productCard.addEventListener("mouseover", (event) => {
    handleCardMouseOver(event, productCard);
  });

  // 4. Mouseout from product card (restore border)
  productCard.addEventListener("mouseout", (event) => {
    handleCardMouseOut(event, productCard);
  });

  // 5. Click on Add to Cart button
  addToCartBtn.addEventListener("click", (event) => {
    handleAddToCart(event);
  });

  // 6. Click on Wishlist button
  wishlistBtn.addEventListener("click", (event) => {
    handleWishlist(event);
  });

  // 7. Click on Delete button
  deleteBtn.addEventListener("click", (event) => {
    handleDelete(event, productCard);
  });
});
