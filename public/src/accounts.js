function findAccountById(accounts, id) {
  let found = accounts.find(account => account.id === id);
  return found;
}


function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
  return accounts;
}
//toLowerCase() used here to account for sort() comparing by character value instead of alphabetically


function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (let i = 0; i < books.length; i++) {
  for (let j = 0; j < books[i].borrows.length; j++) {
    if (account.id === books[i].borrows[j].id) {
      totalBorrows += 1;
    }
   }  
  }
  return totalBorrows;
 }


function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  let matchingBorrow = [];
  books.forEach((item) => {
    const borrowed = item.borrows;
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {}
    };
    const {id, title, genre, authorId, author, borrows} = book;

    borrowed.forEach(borrow => {
      if (borrow.id === account.id && borrow.returned === false) {
        result.push(book); 
        matchingBorrow.push(borrow);
        book.borrows = matchingBorrow;
        book.author = authors.filter(author => author.id === book.authorId)[0];
      }
    });
  });
  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
