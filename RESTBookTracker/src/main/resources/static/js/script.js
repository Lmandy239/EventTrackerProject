document.addEventListener('DOMContentLoaded', function () {
    console.log('script js loaded');

    document.getElementById('lookupButton').addEventListener('click', function () {
        let bookId = document.getElementById('bookIdInput').value;
        getBookById(bookId);
    });

    document.getElementById('deleteButton').addEventListener('click', function () {
        let bookId = document.getElementById('bookIdInputDelete').value;
        deleteBookById(bookId);
        location.reload();
    });

    document.getElementById('updateButton').addEventListener('click', function () {
        let bookId = document.getElementById('bookIdInputUpdate').value;
        let newTitle = document.getElementById('updateTitleInput').value;
        let newDescription = document.getElementById('updateDescriptionInput').value;

        let updatedBook = {
            title: newTitle,
            description: newDescription
        };

        updateBookById(bookId, updatedBook);
        location.reload();
    });

    document.getElementById('addBookButton').addEventListener('click', function () {
        let title = document.getElementById('titleInput').value;
        let description = document.getElementById('descriptionInput').value;

        let newBook = {
            title: title,
            description: description
        };

        addBook(newBook);
        location.reload();
    });

    function loadAllBooks() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'api/books');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let bookList = JSON.parse(xhr.responseText);
                    displayBookList(bookList);
                } else {
                    console.error('Error fetching books:', xhr.status);
                }
            }
        };
        xhr.send();
    }

    function displayBookList(books) {
        let bookDiv = document.getElementById('bookData');
        bookDiv.innerHTML = '';

        if (books && Array.isArray(books) && books.length > 0) {
            for (let book of books) {
                let li = document.createElement('li');
                li.textContent = `${book.title}: ${book.description}`;
                bookDiv.appendChild(li);
            }
        }
    }

    function getBookById(bookId) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `api/books/${bookId}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let book = JSON.parse(xhr.responseText);
                    displayBookDetails(book);
                } else {
                    console.error('Error fetching book details:', xhr.status);
                }
            }
        };
        xhr.send();
    }

    function displayBookDetails(book) {
        let bookDiv = document.getElementById('bookData');
        bookDiv.innerHTML = `<strong>${book.title}:</strong> ${book.description}`;
    }

    function addBook(newBook) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'api/books');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 201) {
                    let createdBook = JSON.parse(xhr.responseText);
                    loadAllBooks();
                } else {
                    console.error('Error adding book:', xhr.status);
                }
            }
        };

        xhr.setRequestHeader("Content-type", "application/json");
        let newBookJson = JSON.stringify(newBook)
         xhr.send(newBookJson);
    }

    function deleteBookById(bookId) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `api/books/${bookId}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Book deleted successfully.');
                    loadAllBooks();
                } else {
                    console.error('Error deleting book:', xhr.status);
                }
            }
        };
        xhr.send();
    }

    function updateBookById(bookId, updatedBook) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', `api/books/${bookId}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Book updated successfully.');
                    loadAllBooks();
                } else {
                    console.error('Error updating book:', xhr.status);
                }
            }
        };
        xhr.setRequestHeader("Content-type", "application/json");
        let updatedBookJson = JSON.stringify(updatedBook);
        xhr.send(updatedBookJson);
    }

  
});
