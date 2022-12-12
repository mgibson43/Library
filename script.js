'use strict'

let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = false;
}

Book.prototype.changeStatus = function() {
  this.status === false ? this.status = true : this.status = false;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 295);