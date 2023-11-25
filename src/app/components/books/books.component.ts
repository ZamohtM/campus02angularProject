import {Component, Input, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  constructor(private books: BookService){}

  @Input() bookCollection: Book[] = [];

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      data: this.bookCollection,
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Titel',
        data: 'title'
      }, {
        title: 'Author',
        data: 'author'
      }, {
        title: 'Year',
        data: 'year'
      }, {
        title: 'Genre',
        data: 'genre'
      }]
    };

  }
}
