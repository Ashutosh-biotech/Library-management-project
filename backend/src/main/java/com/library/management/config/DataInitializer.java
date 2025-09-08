package com.library.management.config;

import com.library.management.model.User;
import com.library.management.model.Book;
import com.library.management.repository.UserRepository;
import com.library.management.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        // Create default admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("password123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Default admin user created: username=admin, password=password123");
        }
        
        // Create default books if none exist
        if (bookRepository.count() == 0) {
            Book[] defaultBooks = {
                new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0-7432-7356-5"),
                new Book("To Kill a Mockingbird", "Harper Lee", "978-0-06-112008-4"),
                new Book("1984", "George Orwell", "978-0-452-28423-4"),
                new Book("Pride and Prejudice", "Jane Austen", "978-0-14-143951-8"),
                new Book("The Catcher in the Rye", "J.D. Salinger", "978-0-316-76948-0")
            };
            
            for (Book book : defaultBooks) {
                bookRepository.save(book);
            }
            System.out.println("Default books created: 5 books added to library");
        }
    }
}