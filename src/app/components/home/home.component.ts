import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/book";
import { Recession } from '../../interfaces/recession';
import { RecessionService } from "../../services/recession.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router,private auth: AuthService, private books: BookService, private recessions: RecessionService) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
    alert("Abmeldung erfolgreich.")
  }


  activeView: string = ""; //Profile,Users,Books
  userData = {} as User;
  userCollection: User[] = [];
  bookCollection: Book[] = [];
  recessionCollection: Recession[] = [];
  notification: string = "";


  toggleProfile() {
    const currentUserEmail = sessionStorage.getItem('email');
    this.auth.getUserByEmail(currentUserEmail as string).subscribe(
      response => {
        if(response.length > 0)
        {
          this.userData = response[0];
          if(this.activeView!="profile")
          {
            this.activeView="profile"
          }
        }
      }
    )
  }

  toggleUsers(){
    this.auth.getAllUsers().subscribe(
      response => {
        if(response.length > 0)
        {
          this.userCollection = response;
          if(this.activeView!="users")
          {
            this.activeView="users"
          }
        }
      }
    )
  }

  toggleBooks(){
    this.books.getBooks().subscribe(
      response => {
        if(response.length > 0)
        {
          this.bookCollection = response;
          if(this.activeView!="books")
          {
            this.activeView="books"
          }
        }
      }
    )
  }


  toggleRecessions(){
    this.recessions.getRecessions().subscribe(
      response => {
        console.log('here');
        if(response.length > 0)
        {
          this.recessionCollection = response;
          if(this.activeView!="recessions")
          {
            this.activeView="recessions"
          }
        }
      }
    )
  }


  receiveNotification($event: string)
  {
    this.activeView="";
    this.notification = $event;
    alert(this.notification);
  }

}
