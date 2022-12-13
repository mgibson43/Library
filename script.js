'use strict'

let read = [];
let notRead = [];
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
const shelf = document.getElementById('not-read-shelf');

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
  const div = document.createElement('div');
  div.classList.add('book');
  const p = document.createElement('p');
  p.classList.add('title');
  p.textContent = book.title;
  const input = document.createElement('input');
  input.classList.add('checkmark');
  input.type = 'checkbox';
  div.appendChild(p);
  div.appendChild(input);
  shelf.appendChild(div);
}

function addBooksToLibrary() {
  notRead.forEach(book => createBookCards(book));
  closeForm();
}

function addBook(e) {
  e.preventDefault();
  notRead.push(new Book(title.value, author.value, pages.value));
  addBooksToLibrary();
}

addBtn.addEventListener('click', openForm);

form.addEventListener('click', formClick);

formRoot.closest('body').addEventListener('click', closeForm);

addBookBtn.addEventListener('click', addBook);



const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 295);
console.log(theHobbit);