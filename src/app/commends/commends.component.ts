import { Component, OnInit, Input } from '@angular/core';
import { Recession } from '../interfaces/recession';
import { RecessionService } from "../services/recession.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-commends',
  templateUrl: './commends.component.html',
  styleUrl: './commends.component.css'
})
export class CommendsComponent implements OnInit {
  
  recessionCollection: Recession[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private recessionService: RecessionService){}

  navigateToHome(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {

    this.getRecessions();
    
    this.dtOptions = {
      data: this.recessionCollection,
      columns: [
        {title: 'ID', data: 'id'}, 
        {title: 'Antwort auf',data: 'reply_id'}, 
        {title: 'Buch', data: 'book_id'}, 
        {title: 'User', data: 'user_id'}, 
        {title: 'Kommentar', data: 'comment'}]
    };

    
  }

  getRecessions(): void {
    this.recessionService.getRecessions().subscribe(recessions => {this.recessionCollection = recessions});
  }

}
