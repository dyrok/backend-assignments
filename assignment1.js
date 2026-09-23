/*
  Assignment 1
  Shopping cart system
*/

// Q: Why is `totalCartValue` declared with `var` here? explain as if youre teaching a beginner.
// A: `var` is the OLD way of declaring variables in JavaScript. It makes the variable
//    "global" in scope, meaning any function in this file can read it and change it.
//    We WANT that here — every time we add an item to the cart, `addToCart` needs to
//    update this one shared total. Modern code usually prefers `let`/`const`, but the
//    assignment explicitly asks for a global variable, so `var` it is.
var totalCartValue = 0;

// 10% fixed tax rate — stored as a decimal (0.1 = 10%) so we can just multiply.
// Keeping it in one constant means if the tax rate ever changes we fix ONE line.
const taxRate = 0.1;

function addToCart(itemPrice, discount) {
  // ── Step 1: subtract discount ───────────────────────────────────────
  // The shop gives a flat discount, so first peel that off the price.
  let priceAfterDiscount = itemPrice - discount;

  // ── Step 2: calculate tax on the DISCOUNTED price ───────────────────
  // Tax is charged on what you actually pay, not the original price.
  // Multiplying by 0.1 is the same as dividing by 10 (that's what 10% means).
  let tax = priceAfterDiscount * taxRate;

  // ── Step 3: final price = discounted price + tax ────────────────────
  let finalPrice = priceAfterDiscount + tax;

  // ── Step 4: add this item's final price to the running cart total ───
  // `+=` is shorthand for `totalCartValue = totalCartValue + finalPrice`.
  // line explaination: this works even though totalCartValue is declared with var
  // outside the function, because it's global.
  totalCartValue += finalPrice;

  console.log(`Final Price of Item: ₹${finalPrice.toFixed(2)}`);
}

// ── Sample items ────────────────────────────────────────────────────────
// Two demo purchases: a ₹1000 item with ₹100 discount, and a ₹2000 item
// with ₹200 discount. Both should get the same 10% tax treatment.
addToCart(1000, 100);
addToCart(2000, 200);

// Print the grand total.
// Q: What does .toFixed(2) actually do?
// A: It converts a number into a STRING with exactly 2 decimal places
//    (like money: 909.00). Since money always has 2 decimals, we use it
//    before printing. The ₹ symbol gets glued on with template literal.
console.log(`Total Cart Value: ₹${totalCartValue.toFixed(2)}`);
