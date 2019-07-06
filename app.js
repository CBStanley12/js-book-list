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