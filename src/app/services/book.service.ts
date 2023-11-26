import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../interfaces/book";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private dbUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  addBook(bookData: Book)
  {
    return this.http.post(`${this.dbUrl}/books`, bookData);
  }

  removeBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/books/${bookId}`);
  }

  editBook(bookId: string, updatedBookData: Book): Observable<any> {
    return this.http.put(`${this.dbUrl}/books/${bookId}`, updatedBookData);
  }

  getBookById(id: string): Observable<Book>
  {
    return this.http.get<Book>(`${this.dbUrl}/books?id=${id}`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.dbUrl}/books`);
  }
}
