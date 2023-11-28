import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  registerNewUser(userData: User)
  {
    return this.http.post(`${this.dbUrl}/users`, userData);
  }

  getUserByEmail(email: string): Observable<User[]>
  {
    return this.http.get<User[]>(`${this.dbUrl}/users?email=${email}`);
  }

  editUser(userId: string, updatedUserData: User): Observable<any> {
    return this.http.put(`${this.dbUrl}/users/${userId}`, updatedUserData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/users/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.dbUrl}/users`);
  }

  getUserById(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.dbUrl}/users/${userId}`);
  }

}
