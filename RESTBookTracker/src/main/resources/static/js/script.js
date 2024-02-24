document.addEventListener('DOMContentLoaded', function() {
	console.log('script js loaded');

	window.addEventListener('load', function(evt) {
		console.log('page loaded');
		loadAllBooks();
	});

	function loadAllBooks() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/books');
		xhr.onreadystatechange = function() {
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
		if (books && Array.isArray(books) && books.length > 0) {
			let bookDiv = document.getElementById('bookData');
			bookDiv.textContent = '';

			for (let book of books) {
				let li = document.createElement('li');
				li.textContent = book.title;
				bookDiv.appendChild(li);
			}
		}
	}

	function addBook(newBook) {

		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/books');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 201) {
					let createdBook = JSON.parse(xhr.responseText);
					loadAllBooks(createdBook);
				} else {
					console.error('Error adding book:', xhr.status);
				}
			}
		};

		xhr.setRequestHeader("Content-type", "application/json");
		let newBookJson = JSON.stringify(newBook);
		xhr.send(newBookJson);
	}

	document.getElementById('lookupButton').addEventListener('click', function() {
	});

	document.getElementById('addBookButton').addEventListener('click', function() {
		let title = document.getElementById('titleInput').value;
		let description = document.getElementById('descriptionInput').value;

		let newBook = {
			title: title,
			description: description
		};

		addBook(newBook);
	});
});
