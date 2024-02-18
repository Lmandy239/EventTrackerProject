package com.skilldistillery.booktracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.booktracker.entities.Book;
import com.skilldistillery.booktracker.repositories.BookRepository;

@Service
public class BookServiceImpl implements BookService {
	@Autowired
	private BookRepository bookRepo;

	@Override
	public List<Book> findAll() {

		return bookRepo.findAll();
	}

	@Override
	public Book findById(int bookId) {
		return bookRepo.findById(bookId);
	}


	@Override
	public Book create(Book book) {
	    return bookRepo.save(book);
	}


	@Override
	public Book update(Book book, int id) {
		Book original = bookRepo.findById(id);
		original.setTitle(book.getTitle());
		original.setDescription(book.getDescription());
		
		return bookRepo.save(original);
	}

	@Override
	public boolean deleteById(int bookId) {
		boolean deleted = false;
		if (bookRepo.existsById(bookId)) {
			bookRepo.deleteById(bookId);
			deleted = true;
		}
		return deleted;

	}

}
