// Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
	const list = document.getElementById('book-list');

	// Create table row element
	const row = document.createElement('tr');

	//Insert columns
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
	`;

	// Append row to table
	list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function(message, className) {
	// Create div
	const div = document.createElement('div');
	// Add classes
	div.className = `alert ${className}`;
	// Add text
	div.appendChild(document.createTextNode(message));
	// Get parent
	const container = document.querySelector('.container');
	// Get form
	const form = document.querySelector('#book-form');
	//Insert alert
	container.insertBefore(div, form);

	// Timeout alert after 3 secs
	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
}

// Clear fields
UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}

// Event Listeners
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

	// Show alert
	ui.showAlert('Book removed!', 'success');

	e.preventDefault();
});