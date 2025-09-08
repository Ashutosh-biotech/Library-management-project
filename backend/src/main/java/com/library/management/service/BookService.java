package com.library.management.service;

import com.library.management.model.Book;
import com.library.management.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;
    
    // Add new book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }
    
    // Get all available books
    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailable(true);
    }
    
    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    // Search books by title or author
    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }
    
    // Borrow book
    public Book borrowBook(String bookId, String username) {
        Optional<Book> bookOpt = bookRepository.findById(bookId);
        if (bookOpt.isPresent() && bookOpt.get().isAvailable()) {
            Book book = bookOpt.get();
            book.setAvailable(false);
            book.setBorrowedBy(username);
            return bookRepository.save(book);
        }
        throw new RuntimeException("Book not available or not found");
    }
    
    // Return book
    public Book returnBook(String bookId, String username) {
        Optional<Book> bookOpt = bookRepository.findById(bookId);
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            if (book.getBorrowedBy() == null || !book.getBorrowedBy().equals(username)) {
                throw new RuntimeException("You can only return books that you have borrowed");
            }
            book.setAvailable(true);
            book.setBorrowedBy(null);
            return bookRepository.save(book);
        }
        throw new RuntimeException("Book not found");
    }
    
    // Update book
    public Book updateBook(String bookId, Book updatedBook) {
        Optional<Book> bookOpt = bookRepository.findById(bookId);
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setIsbn(updatedBook.getIsbn());
            return bookRepository.save(book);
        }
        throw new RuntimeException("Book not found");
    }
    
    // Delete book
    public void deleteBook(String bookId) {
        if (!bookRepository.existsById(bookId)) {
            throw new RuntimeException("Book not found");
        }
        bookRepository.deleteById(bookId);
    }
}