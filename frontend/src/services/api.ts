import axios from 'axios';
import type { Book } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  register: (username: string, password: string, role: string = 'MEMBER') =>
    api.post('/auth/register', { username, password, role }),
};

// Books API
export const booksAPI = {
  getAllBooks: () => api.get<Book[]>('/books'),
  getAvailableBooks: () => api.get<Book[]>('/books/available'),
  searchBooks: (query: string) => api.get<Book[]>(`/books/search?query=${query}`),
  addBook: (book: Omit<Book, 'id'>) => api.post<Book>('/books', book),
  updateBook: (id: string, book: Omit<Book, 'id'>) => api.put<Book>(`/books/${id}`, book),
  deleteBook: (id: string) => api.delete(`/books/${id}`),
  borrowBook: (id: string) => api.put<Book>(`/books/${id}/borrow`),
  returnBook: (id: string) => api.put<Book>(`/books/${id}/return`),
};