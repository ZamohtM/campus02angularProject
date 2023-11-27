import { Component } from '@angular/core';
//import { Recession } from '../../interfaces/recession';
//import { RecessionService } from "../../services/recession.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-commends',
  templateUrl: './commends.component.html',
  styleUrl: './commends.component.css'
})
export class CommendsComponent {
  
  constructor(private router: Router){}

  navigateToHome(){
    this.router.navigateByUrl('/home');
  }

}
