'use strict'

let myLibrary = [];
const addBtn = document.querySelector('.new');
const form = document.querySelector('.add-book');
const formRoot = document.getElementById('form-root');
const container = document.querySelectorAll('.container');
const hidden = document.querySelector('hidden');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const addBookBtn = document.querySelector('.add-book-btn');
const shelf = document.getElementById('shelf');


class Book {
  constructor(title, author, pages) {
    this.bookTitle = title;
    this.bookAuthor = author;
    this.bookPages = pages;
    this.bookRead = 'false';
  }

  get title() {
    return this.bookTitle;
  }

  get author() {
    return this.bookAuthor;
  }

  get pages() {
    return this.bookPages;
  }

  get read() {
    return this.bookRead;
  }

  static changeStatus(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.dataset.read == 'true') {
      this.dataset.read = 'false';
      myLibrary[this.dataset.index].read = 'false';
    } else  {
      this.dataset.read = 'true';
      myLibrary[this.dataset.index].read = 'true';
    }
  }
}

function openForm(e) {
  container.forEach(el => el.classList.add('hidden'));
  form.classList.remove('hidden');
  e.stopPropagation();
}

function closeForm() {
  container.forEach(el => el.classList.remove('hidden'));
  form.classList.add('hidden');
  title.value = author.value = pages.value = '';
}

function formClick(e) {
  e.stopPropagation();
}

function createBookCards(book, i) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book');
  bookCard.dataset.index = i;
  bookCard.dataset.read = book.bookRead;
  bookCard.addEventListener('click', book.changeStatus);


  const div = document.createElement('div');

  const title = document.createElement('p');
  title.classList.add('title');
  title.textContent = book.bookTitle;

  const writer = document.createElement('p');
  writer.classList.add('writer');
  writer.textContent = `by ${book.bookAuthor}`;

  const hiddenRead = document.createElement('h2');
  hiddenRead.classList.add('hidden-read');
  hiddenRead.innerHTML = 'Read';

  div.appendChild(title);
  div.appendChild(writer);

  const inputDiv = document.createElement('div');
  inputDiv.classList.add('input-container');

  const pages = document.createElement('p');
  pages.classList.add('page-number');
  book.bookPages > 0 ? pages.textContent = `${book.bookPages} p` : pages.textContent = '';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />`;

  inputDiv.appendChild(pages);
  inputDiv.appendChild(deleteBtn);
 
  bookCard.appendChild(div);
  bookCard.appendChild(hiddenRead);
  bookCard.appendChild(inputDiv);

  shelf.appendChild(bookCard);
}

function addBooksToLibrary() {
  shelf.innerHTML = '';
  myLibrary.forEach((book, i) => createBookCards(book, i));

  const removeBookBtns = document.querySelectorAll('.delete');
  removeBookBtns.forEach(btn => btn.addEventListener('click', removeBook));
  closeForm();
}

function addBook(e) {
  e.preventDefault();
  if (title.value =='' || author.value == '') return;
  myLibrary.push(new Book(title.value, author.value, pages.value));
  addBooksToLibrary();
}

function removeBook(e) {
  e.preventDefault();
  e.stopPropagation();
  shelf.removeChild(this.parentNode.parentNode);
  myLibrary.splice(this.parentNode.parentNode.dataset.index, 1);
}

addBtn.addEventListener('click', openForm);

form.addEventListener('click', formClick);

formRoot.closest('body').addEventListener('click', closeForm);

addBookBtn.addEventListener('click', addBook);

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 432);
console.log(theHobbit);
