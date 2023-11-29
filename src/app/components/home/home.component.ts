import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/book";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router,private auth: AuthService) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
    alert("Abmeldung erfolgreich.")
  }

  navigateToBooks() {
    this.router.navigate(['books']);
  }


  activeView: string = ""; //Profile,Users,Books
  userData = {} as User;
  userCollection: User[] = [];
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
/* //use for pipeline routing
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
*/
  receiveNotification($event: string)
  {
    this.notification = $event;
    alert(this.notification);
  }

}
