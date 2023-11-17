import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { passwordMatchValidator } from '../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm = this.fb.group(
    {
      name: ['',Validators.required],
      surname: ['',Validators.required],
      email: ['',Validators.email],
      password: ['',[
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
       ]],
       confirmPassword: ['',[
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
       ]]
    },{
      validators: passwordMatchValidator
    })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){}

  get name()
  {
    return this.registerForm.controls['name'];
  }

  get surname()
  {
    return this.registerForm.controls['surname'];
  }
  
  get email()
  {
    return this.registerForm.controls['email'];
  }

  get password()
  {
    return this.registerForm.controls['password'];
  }

  get confirmPassword()
  {
    return this.registerForm.controls['confirmPassword'];
  }

  submitNewUser()
  {
    const userData = { ...this.registerForm.value };
    delete userData.confirmPassword;
    this.authService.registerNewUser(userData as User).subscribe(
      response => {
        console.log(response)
        alert("Der Benutzer: "+userData.name+" "+userData.surname+" wurde angelegt.")
        this.router.navigate(['login'])
      },
      error => {
        console.log(error)
        alert("Beim registrieren des Benutzers ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.")
      }
    )
  }
}
