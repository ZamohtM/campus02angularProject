import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild,} from '@angular/core';
import {Book} from "../../interfaces/book";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'app-book-table',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css'],
})
export class BooktableComponent implements OnInit, OnChanges {
  dtOptions: DataTables.Settings = {};
  @Input() bookCollection: Book[] = [];
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;


  ngOnInit(): void {
    this.dtOptions = {
      data: this.bookCollection,
      responsive: true,
      columns: [
        {title: 'ID', data: 'id'},
        {title: 'Titel', data: 'title'},
        {title: 'Author', data: 'author'},
        {title: 'Year', data: 'year'},
        {title: 'Genre', data: 'genre'},
      ],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookCollection']) {
      // Use square bracket notation to access the property
      if (this.dtElement && this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.clear();
          dtInstance.rows.add(this.bookCollection);
          dtInstance.draw();
        });
      }
    }
  }
}
