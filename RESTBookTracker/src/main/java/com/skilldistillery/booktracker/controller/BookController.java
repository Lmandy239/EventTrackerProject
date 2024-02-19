package com.skilldistillery.booktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skilldistillery.booktracker.entities.Book;
import com.skilldistillery.booktracker.services.BookService;

import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("api")
@RestController
public class BookController {

	@Autowired
	private BookService bookService;

	@GetMapping("books")
	public List<Book> findall() {
		return bookService.findAll();
	}

	@GetMapping("books/{bookId}")
	public Book booktId(@PathVariable("bookId") Integer bookId, HttpServletResponse res) {
		Book book = bookService.findById(bookId);
		if (book == null) {
			res.setStatus(404);
		} 
		res.setStatus(200);
		return book;

	}

	@PostMapping("books")
	public void create(@RequestBody String userJson) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Book newBook = mapper.readValue(userJson, Book.class);
			bookService.create(newBook);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PostMapping("books/{id}")
	public Book create(@RequestBody Book book, HttpServletResponse res) {
		Book created = bookService.create(book);
		if (created != null) {
			res.setStatus(201);
		}else {
			res.setStatus(400);
		}
		return created;
	}

	@PutMapping("books/{id}")
	public Book update(@RequestBody Book book, @PathVariable("id") int id, HttpServletResponse res) {
		Book updated = bookService.update(book, id);
		if (updated != null) {
			res.setStatus(200);
		} else {
			res.setStatus(400);
		}
		return updated;

	}
	@DeleteMapping("books/{id}")
	public boolean delete(@PathVariable("id") int id, HttpServletResponse res) {
		boolean deleted;
		deleted = bookService.deleteById(id);
		
		if(deleted) {
			res.setStatus(200);
		} res.setStatus(400);
		return deleted;
		
	}

}
