export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  borrowedBy?: string;
}

export interface User {
  username: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}