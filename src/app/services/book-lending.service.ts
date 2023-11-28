import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../interfaces/book";
import {bookLending} from "../interfaces/bookLending";
import {Observable} from "rxjs/internal/Observable";
import {BookLendingComponent} from "../components/bookLending/book-lending/book-lending.component";

@Injectable({
  providedIn: 'root'
})
export class BookLendingService {

  private dbUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getLendStatusByBookId(id: string): Observable<bookLending>
  {
     return this.http.get<bookLending>(`${this.dbUrl}/bookLending?book_id=${id}`);
  }

  addBookToBib(bookLending: bookLending){
    return this.http.post(`${this.dbUrl}/bookLending`, bookLending);
  }

  getBibDataById(id: string): Observable<bookLending>
  {
    return this.http.get<bookLending>(`${this.dbUrl}/bookLending?id=${id}`);
  }

  updateBibData(id: string, updateBibData: bookLending): Observable<any> {
    return this.http.put(`${this.dbUrl}/bookLending/${id}`, updateBibData);
  }

  removeBibData(id: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/bookLending/${id}`);
  }

}
