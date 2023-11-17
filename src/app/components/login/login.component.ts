import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm = this.fb.group(
    {
      email: ['', Validators.email],
      password: ['', Validators.required]
    }
  )

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){}

  get email()
  {
    return this.loginForm.controls['email'];
  }

  get password()
  {
    return this.loginForm.controls['password'];
  }

  loginUser()
  {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 &&  response[0].password === password)
        {
          sessionStorage.setItem('email',email as string);
          alert("Anmeldung erfolgreich.");
          this.router.navigate(['home'])
        } else {
          alert("Anmeldung fehlgeschlagen.");
        }
      }
    )
  }
}
