import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  title = 'ngBook';
  selected: Book | null = null;
  searched: Book | null = null;
  newBook: Book = new Book();
  editBook: Book | null = null;
  bookId: number | undefined;
  bookTitle: string | undefined;
  searchTerm: string = '';
  constructor(
    private bookService: BookService
  ){}

  ngOnInit(): void {
    this.loadBooks();
  }
  displayBook(book: Book):void{
    this.selected = book;
  }
  loadBooks(){
    this.bookService.index().subscribe({
      next: (bookList) =>{
        this.books = bookList;
        console.log(this.books); //delete later
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }

  addBook(book: Book) {
    this.bookService.create(book).subscribe({
      next: (createdBook) => {
        this.newBook = new Book();
        this.reload();
      },
      error: (ohno) => {
        console.error('BookListComponent.addBook: error adding');
        console.error(ohno);
      }
    });
  }

  lookupBook() {
    const bookIdInput = document.getElementById('bookIdInput') as HTMLInputElement;
    const bookId = +bookIdInput.value;


    this.getBook(bookId);
  }

  getBook(bookId:number){
    this.bookService.show(bookId).subscribe({
      next: (book) => {
        this.selected = book;
      },
      error: (oops) => {
        console.error('BookListComponent.getBook: error getting book')
        console.error(oops);
        // this.router.navigateByUrl('bookNotFound');
      }
    });
  }
  getBookByTitle(bookTitle: string): void {
    this.bookService.showByTitle(bookTitle).subscribe({
      next: (book) => {
        this.selected = book;
      },
      error: (oops) => {
        console.error('YourComponent.getBookByTitle: error getting book');
        console.error(oops);
      }
    });
  }
  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.getBookByTitle(this.searchTerm);
    } else {
      console.log('Empty search term');
    }
  }

  setEditBook() {
    if (this.selected) {
      this.editBook = Object.assign({}, this.selected);
    }
  }

  reload() {
    this.bookService.index().subscribe({
      next: (bookList) => {
        console.log('Successfully retrieved book list:', bookList);
      },
      error: (error) => {
        console.error('BookListComponent.reload(): error getting book list', error);
      },
    });
  }



  updateBook(updatedBook: Book) {
    this.bookService.update(updatedBook).subscribe({
      next: (updatedBook: Book | null) => {
        if (updatedBook) {
          this.selected = updatedBook;
          this.editBook = null;
          this.reload();
        } else {
          console.error('BookListComponent.updateBook: updatedBook is null');
        }
      },
      error: (fail: any) => {
        console.error('BookListComponent.updateBook: failed to update');
      }
    });
  }



  deleteBook() {
    if (this.bookId) {
      this.bookService.destroy(this.bookId).subscribe({
        next: () => {
          alert('Book deleted successfully');
          location.reload();
        },
        error: (nojoy: any) => {
          console.error('BookListComponent.deleteBook: error');
          console.error(nojoy);
        }
      });
    } else {
      console.error('BookListComponent.deleteBook: bookId is undefined');
    }
  }




}
