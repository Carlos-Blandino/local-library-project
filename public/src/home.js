function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  const borrowedItems = _getAllBorrows(books);
  const result = borrowedItems.reduce((acc, item) => {
    if (item.returned === false) {
      acc++;
    }
    return acc;
  }, 0);
  return result;
}

// helper funcion getAllBorrows returns an a singel array of borrows objects
function _getAllBorrows(books) {
  const borrowedArray = [];
  const itemArray = [];
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

// helper function getTopFiveBooksSortedByBorrowsLength()
function _getTopFiveBooksSortedByBorrowsLength(books) {
  const newBooksArray = books.slice();
  const sorted = newBooksArray.sort((a, b) =>
    a.borrows.length < b.borrows.length ? 1 : -1
  );
  const result = sorted.slice(0, 5);
  return result;
}
// end of helper function getAllBorrows

function getMostCommonGenres(books) {
  const formatedGenres = [];
  // need a count of each genres appearance in books data and placed in an object
  const genreCounts = books.reduce((acc, { genre }) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  // need to loop thru the genreCounts array and reformat the elements with a looping statement
  // push to an array the formatted a newly formated object as part of the loop
  // avoid for in loops rather use regular for loops (for in skips undefined elements)
  for (let i = 0; i < Object.keys(genreCounts).length; i++) {
    const name = Object.keys(genreCounts)[i];
    const count = Object.values(genreCounts)[i];
    formatedGenres[i] = { name, count };
  }

  const sorted = formatedGenres
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);

  return sorted;
}

function getMostPopularBooks(books) {
  const topFiveBooks = _getTopFiveBooksSortedByBorrowsLength(books);
  return topFiveBooks.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
}

function getMostPopularAuthors(books, authors) {
  // Declarations
  const theAuthors = [];
  // the popular authors are derived from the most popular books
  const topFiveBooks = _getTopFiveBooksSortedByBorrowsLength(books);

  // extract the authors id  and the authors borrows length
  // returns array with 5 elementsd
  const authorIdAndCount = topFiveBooks.map((book) => ({
    authorsId: book.authorId,
    count: book.borrows.length,
  }));

  // get the id from author
  for (let i = 0; i < authorIdAndCount.length; i++) {
    authors.find((author) => {
      if (author.id === authorIdAndCount[i].authorsId) {
        theAuthors.push({
          name: `${author.name.first} ${author.name.last}`,
          count: authorIdAndCount[i].count,
        });
      }
      return author.id === authorIdAndCount[i].authorsId;
    });
  }
  return theAuthors;
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
