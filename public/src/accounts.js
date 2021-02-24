// helper funcion getAllBorrows returns an a singel array of borrows objects
function getAllBorrows(books) {
  const itemArray = books.map((book) => {
    return book.borrows;
  }).filter((item) => {
    return item;
  })
  // const borrowedArray = [];
  // let itemArray = [];
  // for (let i = 0; i < books.length; i++) {
  //   borrowedArray.push(books[i].borrows);
  // }
  // for (let borrow of borrowedArray) {
  //   borrow.filter((item) => {
  //     itemArray.push(item);
  //   });
  // }
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

  //use filter, map with find 
  const theCurrentOutBooks = books
    .filter((book) => {
      // first book in the array represents  the current transaction
      const lastBorrowedBook = book.borrows[0];
      // need only false returns  of the current book and
      // need only books that match the account id
      return !lastBorrowedBook.returned && lastBorrowedBook.id === account.id;
    })
    .map((book) => {
      //need the book with the authors info
      const author = authors.find((author) => author.id === book.authorId);
      return {
        ...book,
        author
      };
    });
  return theCurrentOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};