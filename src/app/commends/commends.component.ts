import { Component, OnInit } from '@angular/core';
import { Recession } from '../interfaces/recession';
import { RecessionService } from "../services/recession.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-commends',
  templateUrl: './commends.component.html',
  styleUrl: './commends.component.css'
})
export class CommendsComponent implements OnInit {
  
  recessions: Recession[] = [];
  
  constructor(private router: Router, private recessionService: RecessionService){}

  navigateToHome(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {
    this.getRecessions();
  }

  getRecessions(): void {
    this.recessionService.getRecessions().subscribe(recessions => this.recessions = recessions);
  }

}
