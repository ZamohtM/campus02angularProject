import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../interfaces/book";
import {bookLending} from "../interfaces/bookLending";
import {Observable} from "rxjs/internal/Observable";

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
}
