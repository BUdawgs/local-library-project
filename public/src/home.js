function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function bookBorrows(books) {
  return (book => book.borrows.filter(record => record.returned === false).length > 0);
}

  
function getBooksBorrowedCount(books) {
  let booksUnreturned = books.filter(bookBorrows(books));
  return booksUnreturned.length;
}
//helper function used above to make this code more readable

    
function getMostCommonGenres(books) {
  let map = {};
  books.forEach(num => {
    if (map[num.genre]) {
      map[num.genre]++;
    } else {
      map[num.genre] = 1;
    }
  });
  return Object.entries(map).map(([name, count]) => {
    return {
      name,
      count
    }
  }).sort((alpha, beta) => beta.count - alpha.count).slice(0, 5)
}


function getMostPopularBooks(books) {
  return books.map(book => {
    return {name: book.title, count: book.borrows.length}
   }).sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1)).slice(0, 5)
}


function getMostPopularAuthors(books,authors) {
  const topAuthors = authors.map(author => ({
  ...author,
  bookCount: books.filter(book => book.authorId === author.id).length,
  borrowCount: books.filter(book => book.authorId === author.id).reduce((acc, cur) => acc + cur.borrows.length, 0)
  })).sort((alpha, beta) => beta.borrowCount - alpha.borrowCount);
  topAuthors.length = 5;
  return topAuthors.map(ta => {
  return {count: ta.borrowCount, name: ta.name.first + " " + ta.name.last};
  })
  }


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
