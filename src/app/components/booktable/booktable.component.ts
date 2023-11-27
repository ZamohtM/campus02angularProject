import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-table',
  templateUrl: './booktable.component.html',
  styleUrl: './booktable.component.css'
})
export class BooktableComponent implements OnInit {
  @Input() bookCollection: any[] = []; // Adjust the type based on your Book model

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      data: this.bookCollection,
      columns: [
        { title: 'ID', data: 'id' },
        { title: 'Titel', data: 'title' },
        { title: 'Author', data: 'author' },
        { title: 'Year', data: 'year' },
        { title: 'Genre', data: 'genre' },
      ],
    };
  }
}
