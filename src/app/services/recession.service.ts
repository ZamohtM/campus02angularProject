import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import { Recession } from '../interfaces/recession';
import { map } from 'jquery';
import { tap } from 'rxjs';

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

  editRecession(id: string, updatedRecessionData: Recession): Observable<any> {
    return this.http.put(`${this.dbUrl}/recessions/${id}`, updatedRecessionData);
  }

  getRecessionById2(id: string): Observable<any>
  {
    return this.http.get<Recession>(`${this.dbUrl}/recessions?id=${id}`).pipe(tap(res => console.log(res)));
  }

  getRecessionById(id: string): Observable<Recession>
  {
    return this.http.get<Recession>(`${this.dbUrl}/recessions?id=${id}`);
  }

  getRecessions(): Observable<Recession[]> {
    return this.http.get<Recession[]>(`${this.dbUrl}/recessions`);
  }
}
