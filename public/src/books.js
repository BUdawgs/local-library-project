function findAuthorById(authors, id) {
  let found = authors.find(author => author.id === id);
  return found;
}


function findBookById(books, id) {
  let found = books.find(book => book.id === id);
  return found;
}


function partitionBooksByBorrowedStatus(books) {
  let available = [];
  let unavailable = [];
  const bookStatuses = [];

  books.forEach((book) => {
    const isBookReturned = book.borrows[0].returned;
  
  if (isBookReturned) {
    unavailable.push(book);
    } else { 
    available.push(book);
    }
   });
    bookStatuses.push(available);
    bookStatuses.push(unavailable);
    return bookStatuses;
  }


function getBorrowersForBook(book, accounts) {
  return book.borrows.map(borrow => {
    let account = accounts.find(account => account.id === borrow.id);
    return {...borrow, ...account};
  }).slice(0, 10);
}
//used slice() here to return an array of 10 or fewer account objects


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};