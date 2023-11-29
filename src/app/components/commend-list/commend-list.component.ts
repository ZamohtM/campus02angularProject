import { Component, OnInit, Input, Output } from '@angular/core';
import { Recession } from '../../interfaces/recession';
import { RecessionService } from "../../services/recession.service";
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'commend-list',
  templateUrl: './commend-list.component.html',
  styleUrl: './commend-list.component.css'
})
export class CommendListComponent implements OnInit{

  constructor(private router: Router, private recessions: RecessionService) { }
  
  @Input() reviewCollection: Recession[] = [];
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {

  this.dtOptions = {
    data: this.reviewCollection,
    columns: [{
      title: 'ID',
      data: 'id'
    }]};

  }

}
