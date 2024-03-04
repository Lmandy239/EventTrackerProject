import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = environment.baseURL + "api/books";
  constructor(
    private http: HttpClient
  ) { }

    index(): Observable<Book[]>{
      return this.http.get<Book[]>(this.url).pipe(
        catchError((err: any) => {
          console.log( err);
          return throwError(
            () => new Error('BookService.index(): error')
          );
        })
      );
    }
    show(bookId:number): Observable<Book> {
      return this.http.get<Book>(`${this.url}/${bookId}`).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('BookService.index(): error')
          );
        })
      );
    }
    showByTitle(bookTitle: string): Observable<Book> {
      const apiUrl = `${this.url}/title/${bookTitle}`;
      return this.http.get<Book>(apiUrl).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(() => new Error('BookService.showByTitle(): error'));
        })
      );
    }

    create(book: Book): Observable<Book> {
      return this.http.post<Book>(this.url, book).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(() => new Error('BookService.create(): error creating book: ' + err));
        })
      );
    }

    update(book: Book): Observable<Book> {
      return this.http.put<Book>(`${this.url}/${book.id}`, book)
        .pipe(
          catchError((error: any) => {
            console.error(error);
            return throwError(() => new Error('BookService.update(): error updating book: ' + error));
          })
        );
    }


    destroy(id: number): Observable<void> {
      const deleteUrl = `${this.url}/${id}`;
      return this.http.delete<void>(deleteUrl).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(() => new Error('BookService.destroy(): error deleting book: ' + err));
        })
      );
    }

}
