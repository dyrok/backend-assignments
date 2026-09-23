/*
  Assignment 5
  ATM Withdrawal Simulation (While Loop & Break Statement)
*/

// function to simulate ATM withdrawal
function atmWithdrawal(balance, withdrawAmount) {
  console.log(`Initial Balance: ₹${balance}`);
  console.log(`Withdrawal Amount per transaction: ₹${withdrawAmount}`);
  console.log("-----------------------------------------");

  // ── The while(true) pattern ─────────────────────────────────────────────
  // Q: Why `while (true)`? Is that an infinite loop? explain as if youre teaching a beginner.
  // A: Yes, technically it IS an infinite loop — the condition `true` can
  //    never become false. But it's a legit pattern when you don't know in
  //    advance how many times the loop should run. We just promise to EXIT
  //    ourselves with `break` when a condition is met (here: balance too low).
  while (true) {
    // check BEFORE attempting to withdraw
    if (balance < withdrawAmount) {
      console.log(`Insufficient balance! Cannot withdraw ₹${withdrawAmount}`);
      console.log(`Final Remaining Balance: ₹${balance}`);
      // break = smash the exit door and jump out of the loop entirely.
      // line explaination: without break, this while(true) would run forever and freeze the program.
      break;
    }

    // deduct withdrawal amount from balance
    balance = balance - withdrawAmount;
    console.log(`Withdrawn: ₹${withdrawAmount} | Remaining Balance: ₹${balance}`);
  }
}

// sample testing
// ₹500 balance, withdrawing ₹150 at a time → 500, 350, 200, 50 → stops at 50
atmWithdrawal(500, 150);
