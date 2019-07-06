class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		const list = document.getElementById('book-list');

		// Create tr element
		const row = document.createElement('tr');

		//Insert cols
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="delete">X</a></td>
		`;

		list.appendChild(row);
	}
}

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
	// Get form values
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value;
	
	// Instantiate a book
	const book = new Book(title, author, isbn);

	// Instantiate UI
	const ui = new UI();

	// Validate
	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		// Add book to list
		ui.addBookToList(book);
		// Add to localStorage
		Store.addBook(book);
		// Show success alert
		ui.showAlert('Book Added!', 'success');
		// Clear fields
		ui.clearFields();
	}

	e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
	// Instantiate uiUI
	const ui = new UI;

	// Delete book
	ui.deleteBook(e.target);

	// Remove from localStorage
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	// Show alert
	ui.showAlert('Book removed!', 'success');

	e.preventDefault();
});