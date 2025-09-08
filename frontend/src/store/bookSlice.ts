import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookState, Book } from '../types';
import { booksAPI } from '../services/api';

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await booksAPI.getAllBooks();
  return response.data;
});

export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async (query: string) => {
    const response = await booksAPI.searchBooks(query);
    return response.data;
  }
);

export const borrowBook = createAsyncThunk(
  'books/borrowBook',
  async (id: string) => {
    const response = await booksAPI.borrowBook(id);
    return response.data;
  }
);

export const returnBook = createAsyncThunk(
  'books/returnBook',
  async (id: string) => {
    const response = await booksAPI.returnBook(id);
    return response.data;
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (book: Omit<Book, 'id'>) => {
    const response = await booksAPI.addBook(book);
    return response.data;
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, book }: { id: string; book: Omit<Book, 'id'> }) => {
    const response = await booksAPI.updateBook(id, book);
    return response.data;
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id: string) => {
    await booksAPI.deleteBook(id);
    return id;
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
      })
      .addCase(searchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
      })
      .addCase(borrowBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to borrow book';
      })
      .addCase(returnBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to return book';
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.books = state.books.filter(book => book.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;