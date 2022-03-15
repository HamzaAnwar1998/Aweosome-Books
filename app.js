/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

// getting books from LS
function getBooks() {
  let books;
  if (localStorage.getItem('Books') !== null) {
    books = JSON.parse(localStorage.getItem('Books'));
  } else {
    books = [];
  }
  return books;
}

// adding books to local storage
function addBook(book) {
  storedBooks.push(book);
  localStorage.setItem('Books', JSON.stringify(storedBooks));
}

// removing books from LS
function removeBook(ID) {
  const idInNum = Number(ID);
  storedBooks.forEach((storedBook, index) => {
    if (storedBook.ID === idInNum) {
      storedBooks.splice(index, 1);
    }
  });
  localStorage.setItem('Books', JSON.stringify(storedBooks));
}

// global variable
let storedBooks = getBooks();

// Book Class: Represents a book
class Book {
  constructor(ID, Title, Author) {
    this.ID = ID;
    this.Title = Title;
    this.Author = Author;
  }
}

// getting books
const displayBooks = () => {
  storedBooks.forEach((storedBook) => {
    addBookToList(storedBook);
  });
};

// adding books to list
const addBookToList = (storedBook) => {
  document.getElementById('booklist-container').innerHTML += `
  <div>
      <h4>${storedBook.Title}</h4>
      <h4>${storedBook.Author}</h4>
      <button id="${storedBook.ID}" class="remove-btn">Remove</button>
      <hr>
  </div>
  `;
};

// clear form fields
function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
}

// deleting books from UI
function deleteBook(el) {
  if (el.classList.contains('remove-btn')) {
    el.parentElement.remove();
  }
}

// Event Display Books
document.addEventListener('DOMContentLoaded', displayBooks);

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
  addBookToList(book);

  // adding book to LS
  addBook(book);

  // clearing form fields
  clearForm();
});

// Event: remove a book
document.getElementById('booklist-container').addEventListener('click', (e) => {
  deleteBook(e.target);
  removeBook(e.target.id);
});