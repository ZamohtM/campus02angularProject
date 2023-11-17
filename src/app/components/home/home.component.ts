import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';

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

  showProfile: boolean = false;
  showUsers: boolean = false;
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
          if(this.showUsers)
          {
            this.showUsers = false;
            this.showProfile = !this.showProfile;
          } else {
            this.showProfile = !this.showProfile;
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
          if(this.showProfile)
          {
            this.showProfile = false;
            this.showUsers = !this.showUsers;
          } else {
          this.showUsers = !this.showUsers;
          }
        } 
      }
    )
  }

  receiveNotification($event: string)
  {
    this.showProfile = false;
    this.notification = $event;
    alert(this.notification);
  }

}