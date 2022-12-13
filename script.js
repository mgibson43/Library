'use strict'

let myLibrary = [];
const addBtn = document.querySelector('.new');
const form = document.querySelector('.add-book');
const formRoot = document.getElementById('form-root');
const container = document.querySelectorAll('.container');
const body = document.querySelector('body');
const hidden = document.querySelector('hidden');

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = false;
}

Book.prototype.changeStatus = function() {
  this.status === false ? this.status = true : this.status = false;
}

addBtn.addEventListener('click', openForm);

form.addEventListener('click', formClick);

formRoot.closest('body').addEventListener('click', closeForm);

function openForm(e) {
  container.forEach(el => el.classList.add('hidden'));
  form.classList.remove('hidden');
  e.stopPropagation();
}

function closeForm() {
  container.forEach(el => el.classList.remove('hidden'));
  form.classList.add('hidden');
  console.log('closing');
}

function formClick(e) {
  e.stopPropagation();;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 295);