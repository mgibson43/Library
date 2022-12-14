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
const shelf = document.getElementById('shelf');

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = 'false';
}

Book.prototype.changeStatus = function(e) {
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
  bookCard.dataset.read = book.read;
  bookCard.addEventListener('click', book.changeStatus);


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

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />`;

  inputDiv.appendChild(pages);
  inputDiv.appendChild(deleteBtn);
 
  bookCard.appendChild(div);
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
  shelf.removeChild(this.parentNode.parentNode);
  myLibrary.splice(this.parentNode.parentNode.dataset.index, 1);
}

addBtn.addEventListener('click', openForm);

form.addEventListener('click', formClick);

formRoot.closest('body').addEventListener('click', closeForm);

addBookBtn.addEventListener('click', addBook);