package com.skilldistillery.booktracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.booktracker.entities.Book;
import java.util.List;


public interface BookRepository extends JpaRepository<Book, Integer> {
	Book findById(int bookId);
	Book deleteById(int id);
	Book findByTitleIgnoreCase(String bookTitle);
}
