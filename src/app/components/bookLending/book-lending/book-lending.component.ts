import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Book} from "../../../interfaces/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../services/book.service";
import {bookLending} from "../../../interfaces/bookLending";
import {BookLendingService} from "../../../services/book-lending.service";
import {AuthService} from "../../../services/auth.service";
import {BookLendingComboComponent} from "../book-lending-combo/book-lending-combo.component";
import {notesLengthValidatorDirective} from "../../shared/notes-length-validator.directive";

@Component({
  selector: 'app-book-lending',
  templateUrl: './book-lending.component.html',
  styleUrl: './book-lending.component.css'
})
export class BookLendingComponent implements OnInit{

  lendStatus: string = "";
  loanDate: string = "";
  returnDate: string = "";
  lastUser: string = "";

  constructor(private formBuilder: FormBuilder, private bookLendingService: BookLendingService, private authService: AuthService) {
  }
  bookId: string = ''
  bookLending!: FormGroup;
  clickedBook: string = "";
  message = '';

  selectedConditionIdFromChild: string = '';

  @Input() bookCollection: Book[] = [];
  @Input() lendingData: bookLending[] = [];
  @Input() lendingDataEntry: bookLending = {} as bookLending;
  @Input() bibData: bookLending = {} as bookLending;
  @Output() bookConditionData: { name: string, id: string }[] = [];
  @Input() bookCondition: string = "";

  @ViewChild('bookCombo') bookCombo!: BookLendingComboComponent;
  dtOptions: DataTables.Settings = {};



  someClickHandler(info: any): void {
    console.log(info.id)
    this.bookLendingService.getLendStatusByBookId(info.id).subscribe(response => {
      console.log(this.bookCondition)
      if (Array.isArray(response) && response.length > 0) {
        this.bookLending.patchValue({
          id: response[0].id,
          title: info.title,
          loanDate: response[0].loanDate,
          returnDate: response[0].returnDate,
          book_id: response[0].book_id,
          lendStatus: response[0].lendStatus,
          bookCondition: response[0].bookCondition,
          notes: response[0].notes,
        })
        this.loanDate = response[0].loanDate
        this.lendStatus = response[0].lendStatus
        this.returnDate = response[0].returnDate
        this.bookCondition = response[0].bookCondition

        this.bookCombo.updateSelectedConditionById(this.bookCondition);
        console.log('BookCondition: ', this.bookCondition);

      } else {
        this.bookId = info.id
        this.resetLabels();
        this.bookCombo.updateSelectedConditionById(this.bookCondition);
        console.log('BookCondition: ', this.bookCondition);
        this.bookLending.patchValue({
          lendStatus: "0"
        })
      }
    })
    this.bookId = info.id;
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

  onConditionChange(selectedConditionId: string) {
    this.selectedConditionIdFromChild = selectedConditionId;
  }

  private createBookLendingForm() {
    this.bookLending = this.formBuilder.group(
      {
        id: ['', Validators.required],
        title: ['', Validators.required],
        loanDate: ['', Validators.required],
        returnDate: ['', Validators.required],
        book_id: ['', Validators.required],
        lendStatus: ['', Validators.required],
        bookCondition: ['', Validators.required],
        notes: ['', [notesLengthValidatorDirective(15)]]
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
    this.bookLending.patchValue({
      notes: ""
    })
  }

  bookLendingManagement(lendStatus: string): void {
    let tempId: string = "";
    if (lendStatus === '0') {

      this.bookLendingService.getLendStatusByBookId(this.bookId).subscribe(response => {
        if (Array.isArray(response) && response.length > 0) {
          console.log("Jetzt kommt ein Buch, welches schon angelegt ist und nochmals ausgeborgt ist. ID", this.bookId)
          this.bibData = {
            id: response[0].id,
            lendStatus: '1',
            loanDate: this.GetDate(),
            returnDate: this.bookLending.controls['loanDate'].value,
            book_id: this.bookId,
            user_id: this.lastUser,
            bookCondition: this.selectedConditionIdFromChild,
            notes: this.bookLending.controls['notes'].value
          }
          console.log(this.bibData)
          this.bookLendingService.updateBibData(this.bookLending.controls['id'].value, this.bibData as bookLending).subscribe(response => {
            console.log(response);
          }, error => {
            console.log(error);
            alert("Fehler!");
          });
          this.RefreshUc(this.bibData);
        } else {
          tempId = this.GenerateUniqueId();
          this.lendingDataEntry = {
            id: tempId,
            lendStatus: '1',
            loanDate: this.GetDate(),
            returnDate: '',
            book_id: this.bookId,
            user_id: this.lastUser,
            bookCondition: this.selectedConditionIdFromChild,
            notes: this.bookLending.controls['notes'].value
          }
          this.bookLendingService.addBookToBib(this.lendingDataEntry).subscribe()
          console.log("Buch Datum angelegt")
          this.RefreshUc(this.lendingDataEntry);
        }
      })
    } else if (lendStatus === '1') {
      console.log(this.bibData)
      this.bibData = {
        id: this.bookLending.controls['id'].value,
        lendStatus: '0',
        loanDate: this.bookLending.controls['loanDate'].value,
        returnDate: this.GetDate(),
        book_id: this.bookId,
        user_id: this.lastUser,
        bookCondition: this.selectedConditionIdFromChild,
        notes: this.bookLending.controls['notes'].value
      }

      this.bookLendingService.updateBibData(this.bookLending.controls['id'].value, this.bibData as bookLending).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
        alert("Fehler!");
      });
      tempId = this.bookLending.controls['id'].value;
      this.RefreshUc(this.bibData);
    }

  }

  private RefreshUc(tempBibData: bookLending): void {
    console.log("refreshUC")
    this.loanDate = tempBibData.loanDate
    this.lendStatus = tempBibData.lendStatus
    this.returnDate = tempBibData.returnDate
    this.bookCondition = tempBibData.bookCondition
  }

  GenerateUniqueId(): string {
    let result = '';

    for (let i = 0; i < 8; i++) {
      const randomDigit = Math.floor(Math.random() * 10); // Zufällige Zahl von 0 bis 9
      result += randomDigit.toString();
    }

    this.bookLendingService.getBibDataById(result).subscribe(response => {
      if (Array.isArray(response) && response.length > 0) {
        this.GenerateUniqueId()
      }
    })
    return result;
  }

  GetDate(): string {
    let options: Intl.DateTimeFormatOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};
    let currentDateAsString: string = new Date().toLocaleDateString(undefined, options);

    return currentDateAsString;
  }

  removeBibData(){
    this.bookLendingService.removeBibData(this.bookLending.controls['id'].value).subscribe();
  }
  editBookLendingForm() {
    this.bookLending.patchValue({});
  }
}
