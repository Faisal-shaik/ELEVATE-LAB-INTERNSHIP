// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse JSON bodies

// In-memory store
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien' }
];
let nextId = 3;

// GET /books -> return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id -> return book by id
app.get('/books/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /books -> add a new book { title, author }
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' });
  }
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id -> update book by id (partial or full)
app.put('/books/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  // keep existing values when not provided
  books[index] = {
    ...books[index],
    title: title ?? books[index].title,
    author: author ?? books[index].author
  };
  res.json(books[index]);
});

// DELETE /books/:id -> delete book
app.delete('/books/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const deleted = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted', book: deleted });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
