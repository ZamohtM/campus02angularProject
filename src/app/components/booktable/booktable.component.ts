import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild,} from '@angular/core';
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
  @Output() outputBook = new EventEmitter<Book>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  book: Book ={} as Book;
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
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookCollection']) {
      if (this.dtElement && this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.clear();
          dtInstance.rows.add(this.bookCollection);
          dtInstance.draw();
        });
      }
    }
  }
  someClickHandler(info: any): void {
    this.book= info;
    this.sendBook();
  }

  sendBook()
  {
    this.outputBook.emit(this.book);
  }

}
