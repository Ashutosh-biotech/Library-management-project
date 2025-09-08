import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchBooks, searchBooks, borrowBook, returnBook, addBook, updateBook, deleteBook } from '../store/bookSlice';
import type { Book } from '../types';

const BookList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading } = useSelector((state: RootState) => state.books);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '' });
  
  // Decode JWT to get user role
  const getUserRole = () => {
    if (!user?.token) return null;
    try {
      const payload = JSON.parse(atob(user.token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  };
  
  const userRole = getUserRole();
  const isAdmin = userRole === 'ADMIN';

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchBooks(searchQuery));
    } else {
      dispatch(fetchBooks());
    }
  };

  const handleBorrow = (id: string) => {
    dispatch(borrowBook(id));
  };

  const handleReturn = (id: string) => {
    dispatch(returnBook(id));
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addBook({ ...newBook, available: true }));
    setNewBook({ title: '', author: '', isbn: '' });
    setShowAddForm(false);
  };

  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      dispatch(updateBook({ id: editingBook.id, book: { title: editingBook.title, author: editingBook.author, isbn: editingBook.isbn, available: editingBook.available } }));
      setEditingBook(null);
    }
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(id));
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">📚 Library Books</h2>
        {isAuthenticated && isAdmin && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="btn btn-success">
            {showAddForm ? 'Cancel' : '+ Add Book'}
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">📝 Add New Book</h3>
            <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="input border"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Author"
                className="input border"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="ISBN"
                className="input border"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                required
              />
              <button type="submit" className="btn btn-primary md:col-span-3">
                ➕ Add Book
              </button>
            </form>
          </div>
        </div>
      )}

      {editingBook && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">✏️ Edit Book</h3>
            <form onSubmit={handleUpdateBook} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="input border"
                value={editingBook.title}
                onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Author"
                className="input border"
                value={editingBook.author}
                onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="ISBN"
                className="input border"
                value={editingBook.isbn}
                onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })}
                required
              />
              <div className="flex gap-2 md:col-span-3">
                <button type="submit" className="btn btn-primary flex-1">
                  💾 Update Book
                </button>
                <button type="button" onClick={() => setEditingBook(null)} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="🔍 Search by title or author..."
              className="input border flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              <button 
                type="button" 
                onClick={() => { setSearchQuery(''); dispatch(fetchBooks()); }}
                className="btn btn-outline"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book: Book) => (
          <div key={book.id} className={`card bg-base-100 shadow-lg hover:shadow-xl transition-shadow ${
            !book.available ? 'border-l-4 border-error' : 'border-l-4 border-success'
          }`}>
            <div className="card-body">
              <h3 className="card-title text-lg">📖 {book.title}</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">👤 Author:</span> {book.author}</p>
                <p><span className="font-semibold">📝 ISBN:</span> {book.isbn}</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📊 Status:</span>
                  <div className={`badge ${book.available ? 'badge-success' : 'badge-error'}`}>
                    {book.available ? 'Available' : 'Borrowed'}
                  </div>
                </div>
                {!book.available && book.borrowedBy && (
                  <p><span className="font-semibold">👤 Borrowed by:</span> {book.borrowedBy}</p>
                )}
              </div>
              <div className="card-actions justify-between mt-4">
                <div className="flex gap-1">
                  {isAuthenticated && isAdmin && (
                    <>
                      <button 
                        onClick={() => setEditingBook(book)} 
                        className="btn btn-info btn-xs"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteBook(book.id)} 
                        className="btn btn-error btn-xs"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
                <div>
                  {isAuthenticated && (
                    book.available ? (
                      <button 
                        onClick={() => handleBorrow(book.id)} 
                        className="btn btn-warning btn-sm"
                      >
                        📚 Borrow
                      </button>
                    ) : (
                      book.borrowedBy === user?.username && (
                        <button 
                          onClick={() => handleReturn(book.id)} 
                          className="btn btn-success btn-sm"
                        >
                          ✅ Return
                        </button>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;