document.addEventListener('DOMContentLoaded', loadBooks);

document.getElementById('booksform').addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  const title = titleInput.value;
  const author = authorInput.value;

  const book = { title, author };

  addBook(book);
  saveBook(book);

  titleInput.value = '';
  authorInput.value = '';
});

function addBook(book) {
  const list = document.querySelector('.list');
  const bookDiv = document.createElement('div');
  const titleP = document.createElement('p');
  const authorP = document.createElement('p');
  const removeBtn = document.createElement('button');

  titleP.textContent = book.title;
  authorP.textContent = book.author;
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    removeBook(book);
  });

  bookDiv.appendChild(titleP);
  bookDiv.appendChild(authorP);
  bookDiv.appendChild(document.createElement('br'));
  bookDiv.appendChild(document.createElement('br'));
  bookDiv.appendChild(removeBtn);

  list.appendChild(bookDiv);
}

function removeBook(book) {
  const list = document.querySelector('.list');
  const bookDivs = Array.from(list.querySelectorAll('div'));

  for (const bookDiv of bookDivs) {
    const titleP = bookDiv.querySelector('p');
    if (titleP.textContent === book.title) {
      bookDiv.remove();
      break;
    }
  }

  removeBookFromStorage(book);
}

function saveBook(book) {
  let books = localStorage.getItem('books');
  if (!books) {
    books = [];
  } else {
    books = JSON.parse(books);
  }

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
  let books = localStorage.getItem('books');
  if (books) {
    books = JSON.parse(books);

    for (const book of books) {
      addBook(book);
    }
  }
}

function removeBookFromStorage(book) {
  let books = localStorage.getItem('books');
  if (books) {
    books = JSON.parse(books);

    books = books.filter((storedBook) => storedBook.title !== book.title);

    localStorage.setItem('books', JSON.stringify(books));
  }
}
