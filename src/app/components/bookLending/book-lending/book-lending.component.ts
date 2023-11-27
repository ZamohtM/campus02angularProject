import {Component, Input} from '@angular/core';
import {Book} from "../../../interfaces/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../services/book.service";
import {bookLending} from "../../../interfaces/bookLending";
import {BookLendingService} from "../../../services/book-lending.service";

@Component({
  selector: 'app-book-lending',
  templateUrl: './book-lending.component.html',
  styleUrl: './book-lending.component.css'
})
export class BookLendingComponent {
  constructor(private formBuilder: FormBuilder, private bookLendingService : BookLendingService){}
  bookLending!: FormGroup;
  showBookLendingForm : boolean = false;
  clickedBook: string = "";
  message = '';
  @Input() bookCollection: Book[] = [];
  @Input() lendingData: bookLending[] = [];
  dtOptions: DataTables.Settings = {};

  someClickHandler(info: any): void {


    this.bookLendingService.getLendStatusByBookId(info.id).subscribe(response => {
      if (Array.isArray(response) && response.length > 0) {

        this.bookLending.patchValue({
          title: info.title,
          loanDate: response[0].loanDate
        })
      }
    })

    this.clickedBook = info.id;
    this.message = info.title;

  }
  ngOnInit(): void {
    console.log('ngOnInit called');
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
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };
    this.createBookLendingForm();
  }

  private createBookLendingForm(){
    this.bookLending = this.formBuilder.group(
      {
        title: ['',Validators.required],
        loanDate:  ['',Validators.required]
      })
  }
  editBookLendingForm(){
    this.bookLending.patchValue({
    });
  }
}
