import {Component, Input} from '@angular/core';
import {Book} from "../../../interfaces/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../services/book.service";
import {bookLending} from "../../../interfaces/bookLending";
import {BookLendingService} from "../../../services/book-lending.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-book-lending',
  templateUrl: './book-lending.component.html',
  styleUrl: './book-lending.component.css'
})
export class BookLendingComponent {

  lendStatus: string = "";
  loanDate: string = "";
  returnDate: string = "";
  bookCondition: string = "";
  lastUser: string = "";

  constructor(private formBuilder: FormBuilder, private bookLendingService: BookLendingService, private authService: AuthService) {
  }

  bookLending!: FormGroup;
  clickedBook: string = "";
  message = '';
  @Input() bookCollection: Book[] = [];
  @Input() lendingData: bookLending[] = [];
  dtOptions: DataTables.Settings = {};

  someClickHandler(info: any): void {

    // this.authService.getUserById(info.id).subscribe(response => {
    //   if (Array.isArray(response) && response.length > 0) {
    //       this.lastUser = response[0].surname
    //   }})


    this.bookLendingService.getLendStatusByBookId(info.id).subscribe(response => {
      if (Array.isArray(response) && response.length > 0) {

        this.bookLending.patchValue({
          title: info.title,
          loanDate: response[0].loanDate,
          lendStatus: response[0].lendStatus
        })

        this.loanDate = response[0].loanDate
        this.lendStatus = response[0].lendStatus
        this.returnDate = response[0].returnDate
        this.bookCondition = response[0].bookCondition

      } else {
        this.resetLabels();
        this.bookLending.patchValue({
          lendStatus: "0"
        })
      }
    })
    this.UserTbValue();
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

  private createBookLendingForm() {
    this.bookLending = this.formBuilder.group(
      {
        title: ['', Validators.required],
        loanDate: ['', Validators.required],
        lendStatus: [['', Validators.required]]
      })
  }

  UserTbValue() {
    const currentUserEmail = sessionStorage.getItem('email');
    this.authService.getUserByEmail(currentUserEmail as string).subscribe(
      response => {
        if (response.length > 0) {
          this.lastUser = response[0].surname
          console.log("last User: ", response[0].surname)
        } else {
          this.lastUser = ""
        }
      }
    )
  }

  resetLabels() {
    this.lendStatus = "0"
    this.bookCondition = ""
    this.returnDate = ""
    this.loanDate = ""
    this.lastUser = ""
  }

  editBookLendingForm() {
    this.bookLending.patchValue({});
  }

}
