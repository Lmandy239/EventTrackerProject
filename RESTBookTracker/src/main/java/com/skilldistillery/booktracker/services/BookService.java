package com.skilldistillery.booktracker.services;

import java.util.List;

import com.skilldistillery.booktracker.entities.Book;

public interface BookService {
    List<Book> findAll();
    Book findById(int bookId);
    boolean deleteById(int bookId);
    Book create(Book book);
	Book update(Book book, int id);
	Book findByTitle(String bookTitle);
}

