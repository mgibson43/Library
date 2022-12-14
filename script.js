'use strict'

let myLibrary = [];
const addBtn = document.querySelector('.new');
const form = document.querySelector('.add-book');
const formRoot = document.getElementById('form-root');
const container = document.querySelectorAll('.container');
const body = document.querySelector('body');
const hidden = document.querySelector('hidden');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const addBookBtn = document.querySelector('.add-book-btn');
const notReadShelf = document.getElementById('not-read-shelf');
const readShelf = document.getElementById('read-shelf')

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = false;
}

Book.prototype.changeStatus = function() {
  this.status === false ? this.status = true : this.status = false;
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

function createBookCards(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book');

  const div = document.createElement('div');

  const title = document.createElement('p');
  title.classList.add('title');
  title.textContent = book.title;

  const writer = document.createElement('p');
  writer.classList.add('writer');
  writer.textContent = `by ${book.author}`;

  div.appendChild(title);
  div.appendChild(writer);

  const inputDiv = document.createElement('div');
  inputDiv.classList.add('input-container');

  const pages = document.createElement('p');
  pages.classList.add('page-number');
  book.pages > 0 ? pages.textContent = `${book.pages} p` : pages.textContent = '';

  const input = document.createElement('input');
  input.classList.add('checkmark');
  input.type = 'checkbox';

  inputDiv.appendChild(pages);
  inputDiv.appendChild(input);
 
  bookCard.appendChild(div);
  bookCard.appendChild(inputDiv);

  book.status === true ? readShelf.appendChild(bookCard) : notReadShelf.appendChild(bookCard);
}

function addBooksToLibrary() {
  notReadShelf.innerHTML = readShelf.innerHTML = '';
  myLibrary.forEach(book => createBookCards(book));
  closeForm();
}

function addBook(e) {
  e.preventDefault();
  myLibrary.push(new Book(title.value, author.value, pages.value));
  addBooksToLibrary();
}

addBtn.addEventListener('click', openForm);

form.addEventListener('click', formClick);

formRoot.closest('body').addEventListener('click', closeForm);

addBookBtn.addEventListener('click', addBook);