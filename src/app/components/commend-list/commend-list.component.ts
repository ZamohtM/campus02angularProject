import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Recession } from '../../interfaces/recession';
import { RecessionService } from "../../services/recession.service";
import { Router } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'commend-list',
  templateUrl: './commend-list.component.html',
  styleUrl: './commend-list.component.css'
})
export class CommendListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(private router: Router, private recessions: RecessionService) { }
  
  @Input() reviewCollection: Recession[] = [];
  @Output() ItemSelectedEvent = new EventEmitter<string>();
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      data: this.reviewCollection,
      columns: [
        {title: 'ID', data: 'id'},
        {title: 'ResponseToID', data: 'reply_id'},
        {title: 'Book', data: 'book_id'},
        {title: 'User', data: 'user_id'},
        {title: 'Comment', data: 'comment'},
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.select(data);
        });
        return row;
      }
    };
  }


  select(Selected: any): void {
    this.ItemSelectedEvent.emit(Selected.id);
  }
}
