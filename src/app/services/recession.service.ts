import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import { Recession } from '../interfaces/recession';

@Injectable({
  providedIn: 'root'
})
export class RecessionService {

  private dbUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  addRecession(recessionData: Recession)
  {
    return this.http.post(`${this.dbUrl}/recessions`, recessionData);
  }

  removeRecession(recessionId: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/recessions/${recessionId}`);
  }

  editRecession(recessionId: string, updatedRecessionData: Recession): Observable<any> {
    return this.http.put(`${this.dbUrl}/recessions/${recessionId}`, updatedRecessionData);
  }

  getRecessionById(id: string): Observable<Recession>
  {
    return this.http.get<Recession>(`${this.dbUrl}/recessions?id=${id}`);
  }

  getRecessions(): Observable<Recession[]> {
    return this.http.get<Recession[]>(`${this.dbUrl}/recessions`);
  }
}
