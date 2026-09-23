/*
  Assignment 3
  Library Management System
*/

// library object to manage books
// Q: Why is `library` an object full of functions instead of separate functions?
// A: Because it groups related behaviour together — like a real librarian.
//    Everything about managing books (add, borrow, return, display) lives in
//    ONE place, and inside those functions `this` refers to the library
//    itself, so we can reach `this.books` without passing anything around.
let library = {
  books: [],

  // ── 1. Add new books to the library ────────────────────────────────────
  // Builds a book object and pushes it into the books array.
  addBook: function (title, author, isbn) {
    let newBook = {
      title: title,           // shorthand would be just `title`, but explicit is clearer for learning
      author: author,
      isbn: isbn,             // ISBN is the unique ID of a book, like a number plate
      isAvailable: true       // freshly added books are always available... obviously 😄
    };
    this.books.push(newBook);
    console.log(`Book added: ${title}`);
  },

  // ── 2. Borrow a book (set isAvailable to false) ────────────────────────
  // Loops through the books array looking for a matching ISBN.
  borrowBook: function (isbn) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isbn === isbn) {
        // found the book! now check if someone already has it
        if (this.books[i].isAvailable === true) {
          // flip the flag to false so nobody else can borrow it
          this.books[i].isAvailable = false;
          console.log(`You have borrowed: ${this.books[i].title}`);
        } else {
          console.log(`Sorry, ${this.books[i].title} is already borrowed.`);
        }
        // `return` exits the function immediately — no point checking
        // more books once we found our match.
        return;
      }
    }
    // if we reach here, the loop finished without finding the ISBN
    console.log(`Book with ISBN ${isbn} not found.`);
  },

  // ── 3. Return a book (set isAvailable to true) ─────────────────────────
  // The mirror image of borrowBook: this time we want the flag to be
  // FALSE (someone has it) so we can flip it back to true.
  returnBook: function (isbn) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isbn === isbn) {
        if (this.books[i].isAvailable === false) {
          this.books[i].isAvailable = true;
          console.log(`You have returned: ${this.books[i].title}`);
        } else {
          console.log(`${this.books[i].title} was not borrowed.`);
        }
        return;
      }
    }
    console.log(`Book with ISBN ${isbn} not found.`);
  },

  // ── 4. Display the list of books with their availability ───────────────
  displayBooks: function () {
    console.log("\n--- List of Books ---");
    for (let i = 0; i < this.books.length; i++) {
      let book = this.books[i];

      // ternary operator: condition ? valueIfTrue : valueIfFalse
      // line explaination: if book.isAvailable is true, status becomes
      // "Available", otherwise "Not Available" — an if/else squeezed into one line.
      let status = book.isAvailable ? "Available" : "Not Available";
      console.log(`${book.title} by ${book.author} (ISBN: ${book.isbn}) - ${status}`);
    }
    console.log("---------------------\n");
  }
};

// ── Sample testing ──────────────────────────────────────────────────────
// Q: Why do we add books before doing anything else?
// A: The books array starts EMPTY. Borrowing/returning from an empty
//    library would just print "not found", so we stock the shelves first.
library.addBook("The Alchemist", "Paulo Coelho", "101");
library.addBook("Atomic Habits", "James Clear", "102");
library.addBook("Harry Potter", "J.K. Rowling", "103");

// display initial list of books
library.displayBooks();

// borrow a book
library.borrowBook("101");

// try borrowing the same book again — should print "already borrowed"
library.borrowBook("101");

// display list to see updated status
library.displayBooks();

// return the book
library.returnBook("101");

// display list after returning
library.displayBooks();
