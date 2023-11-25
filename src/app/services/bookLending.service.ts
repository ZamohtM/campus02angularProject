import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class bookLendingService {

  private dbUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }


}
