function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((books) => books.borrows[0].returned === false);
  const returned = books.filter((books) => books.borrows[0].returned === true);
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const results = [];
  book.borrows.forEach((element) => {
    const acc = accounts.find((account) => account.id === element.id);
    results.push({
      ...element,
      ...acc,
    });
  });

  return results.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
