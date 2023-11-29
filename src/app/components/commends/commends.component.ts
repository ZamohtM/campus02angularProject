import { Component, OnInit, Input } from '@angular/core';
import { Recession } from '../../interfaces/recession';
import { RecessionService } from "../../services/recession.service";
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-commends',
  templateUrl: './commends.component.html',
  styleUrl: './commends.component.css'
})
export class CommendsComponent implements OnInit {
  
  reviewCollection: Recession[] = [];
  showList: boolean = false;

  constructor(private router: Router, private recessionService: RecessionService){}

  navigateToHome(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {

    this.recessionService.getRecessions().subscribe(Response => {this.reviewCollection = Response});
   
  }

  ShowCommendList(){
    this.recessionService.getRecessions().subscribe(
      response => {
          this.reviewCollection = response;
          this.showList = !this.showList;
          console.log("showlist: "+this.showList);
        
      }
    )
  }
}


