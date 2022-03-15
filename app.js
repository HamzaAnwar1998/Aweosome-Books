/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

// Storage Class: handle storage
class Store {
  // getting books from LS
  static getBooks() {
    let books;
    if (localStorage.getItem('Books') !== null) {
      books = JSON.parse(localStorage.getItem('Books'));
    } else {
      books = [];
    }
    return books;
  }

  // adding books to local storage
  static addBook(book) {
    storedBooks.push(book);
    localStorage.setItem('Books', JSON.stringify(storedBooks));
  }
}

// global variable
let storedBooks = Store.getBooks();

// Book Class: Represents a book
class Book {
  constructor(ID, Title, Author) {
    this.ID = ID;
    this.Title = Title;
    this.Author = Author;
  }
}

// UI Class: handles UI tasks
class UI {
  // getting books
  static displayBooks() {
    storedBooks.forEach((storedBook, index) => {
      UI.addBookToList(storedBook, index);
    });
  }

  // adding book to list
  static addBookToList(storedBook, index) {
    document.getElementById('booklist-container').innerHTML += `
    <div>
        <h3>${storedBook.Title}</h3>
        <h5>${storedBook.Author}</h5>
        <button onclick="deleteBook(storedBooks[${index}])">Remove</button>
    </div>
    `;
  }

  // clear form fields
  static clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

// Event Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event Add a book
document.getElementById('addBooks-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // creating an unique id
  const date = new Date();
  const time = date.getTime();
  // end of creating an unique id

  // getting input values
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;

  // instantiate book
  const book = new Book(time, bookTitle, bookAuthor);

  // adding new book to UI
  UI.addBookToList(book);

  // adding book to LS
  Store.addBook(book);

  // clearing form fields
  UI.clearForm();
});

// Event Remove a book
function deleteBook(book) {
  const updatedBooks = storedBooks.filter((individualBook) => individualBook.ID !== book.ID);
  localStorage.setItem('Books', JSON.stringify(updatedBooks));
  storedBooks = updatedBooks;
}