// helper funcion getAllBorrows returns an a singel array of borrows objects
function getAllBorrows(books) {
  const borrowedArray = [];
  let itemArray = [];
  for (let i = 0; i < books.length; i++) {
    borrowedArray.push(books[i].borrows);
  }
  for (let borrow of borrowedArray) {
    borrow.filter((item) => {
      itemArray.push(item);
    });
  }
  return itemArray;
}
// end of helper function getAllBorrows

function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
}

function numberOfBorrows(account, books) {
  // account id variable
  const accountNumber = account.id;
  // iterate through  the  books array  filtering out the elements that match id
  const count = 0;
  //const borrowsArray = books.map((book) => book.borrows);
  const borrowedItems = getAllBorrows(books);

  const result = borrowedItems.reduce((acc, item) => {
    if (item.id === accountNumber) {
      acc++;
    }
    return acc;
  }, 0);

  return result;
}
function getBooksPossessedByAccount(account, books, authors) {
  //use filter and find with if
  const theBook = books
    .filter((book) => {
      const currentBook = book.borrows[0];
      // need only false returns  of the current book and
      // need only books that match the account id
      return !currentBook.returned && currentBook.id === account.id;
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });
  return theBook;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
