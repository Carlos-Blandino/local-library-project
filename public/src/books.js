function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // obtain array of unreturned books
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  //obtain array of returned books
  const returned = books.filter((book) => books.borrow[0].returned === true);
  // resulting array will hold an array of book objects of unreturned book and 
  // and hold a second array of returned book objects
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  // filter out each  borrow from the book borrows array that has matchihg id to the account id
  // and map it out 
  const bookBorrowers = book.borrows.filter((borrowElement) => {
    const account = accounts.find((account) => account.id === borrowElement.id)
    return account.id === borrowElement.id
  }).map((borrowElement) => {
    const account = accounts.find((account) => account.id === borrowElement.id);
    return {
      ...borrowElement,
      ...account
    }
  })

  return bookBorrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};