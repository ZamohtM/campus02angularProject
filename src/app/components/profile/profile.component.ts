import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  @Input() userData = {} as User;

  @Output() notificationEvent = new EventEmitter<string>();

  editProfileForm!: FormGroup;

  showEditForm: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private home: HomeComponent){}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(){
  this.editProfileForm = this.fb.group(
    {
      name: [this.userData.name,Validators.required],
      surname: [this.userData.surname,Validators.required],
      email: [this.userData.email,Validators.email],
      password: [this.userData.password,[
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
       ]],
       confirmPassword: [this.userData.password,[
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
       ]]
    },{
      validators: passwordMatchValidator
    })
  }

  get name()
  {
    return this.editProfileForm.controls['name'];
  }

  get surname()
  {
    return this.editProfileForm.controls['surname'];
  }

  get email()
  {
    return this.editProfileForm.controls['email'];
  }

  get password()
  {
    return this.editProfileForm.controls['password'];
  }

  get confirmPassword()
  {
    return this.editProfileForm.controls['confirmPassword'];
  }

  submitEditedUser()
  {
    const userData = { ...this.editProfileForm.value };
    delete userData.confirmPassword;

    this.auth.editUser(this.userData.id, userData as User).subscribe(response => {
        console.log(response);
        this.home.activeView="";
        this.sendNotification(userData.name,userData.surname,this.userData.id);
    }, error => {
        console.log(error);
        alert("Beim bearbeiten/speichern des Benutzers ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    });
  }

  deleteProfile()
  {
     this.auth.deleteUser(this.userData.id).subscribe(response => {
      console.log(response);
      this.home.logOut();
      alert("Ihr Benutzerprofil wurde erfolgreich gelöscht.")
     }, error => {
      console.log(error);
      alert("Beim Löschen Ihres Benutzerprofils ist ein fehler aufgetreten, bitte versuchen Sie es später erneut.")
    })
  }

  sendNotification(name:string, surname:string,id:string)
  {
    const notification = "Der Benutzer ("+id+"): "+name+" "+surname+" wurde bearbeitet und gespeichert."
    this.notificationEvent.emit(notification);
  }

  toggleEditForm()
  {
    this.showEditForm = !this.showEditForm;
  }

}
