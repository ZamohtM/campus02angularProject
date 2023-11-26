import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private bookService: BookService){}

  @Input() bookCollection: Book[] = [];
  @Input() book = {} as Book;
  editForm!: FormGroup;
  removeForm!:FormGroup;
  dtOptions: DataTables.Settings = {};
  showEditForm : boolean = false;
  activeForm : string = "";
  editorText : string = "";

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
      }]
    };
  this.createEditForm();
  this.createRemoveForm();

  }
  addBook(){
    console.log("added book");
    console.log(this.book);
    this.book.id = this.generateRandomId()
    //this.bookService.addBook(this.book).subscribe();
  }
  removeBook(){
    console.log("removed book")
    this.bookService.removeBook(this.book.id);
  }
  editBook(){
    console.log("edited book")
    this.bookService.editBook(this.book.id,this.book);
  }

  private createEditForm(){
    this.editForm = this.formBuilder.group(
      {
        title: [Validators.required],
        author: [Validators.required],
        year: [Validators.required],
        genre: [Validators.required]

      })
  }

  private createRemoveForm() {
    this.removeForm = this.formBuilder.group(
      {
        ID: [Validators.required]
      }
    )
  }
  toggleCreateForm()
  {
    if (this.activeForm!="create")
    {
        this.editForm.patchValue({
            title: '',
            author: '',
            year: '',
            genre: '',
        });
    this.activeForm="create";
    }
    else {
      this.activeForm="";
    }
  }
  toggleEditForm()
  {
    if (this.activeForm!="edit")
    {
      this.showEditForm=false;
      this.activeForm="edit";
    }
    else {
      this.activeForm="";
    }
  }
  toggleRemoveForm()
  {
    if (this.activeForm!="remove")
    {
      this.activeForm="remove";
    }
    else {
      this.activeForm="";
    }
  }

    toggleEditButton() {
            this.bookService.getBookById(this.editorText).subscribe(
                response => {
                    if (Array.isArray(response) && response.length > 0) {
                        const bookData = response[0];
                        // Update the form controls with the new values
                        this.editForm.patchValue({
                            title: bookData.title,
                            author: bookData.author,
                            year: bookData.year,
                            genre: bookData.genre,
                        });

                        // Show the edit form
                        this.showEditForm = true;
                    } else {
                        console.error('Invalid or empty API response.');
                    }
                },
                error => {
                    console.error('Error fetching book by ID:', error);
                }
            );
    }

  get author()
  {
    return this.editForm.controls['author'];
  }

  get title()
  {
    return this.editForm.controls['title'];
  }

  get year()
  {
    return this.editForm.controls['year'];
  }

  get genre()
  {
    return this.editForm.controls['genre'];
  }

  private generateRandomId(): string {
    // this example generates a random string of 8 characters.
    const randomId = Math.random().toString(36).substring(2, 10);
    this.checkId(randomId);
    return randomId;
  }
  private checkId(id:string)
  {
    var tempId : string ='';
    var duplicate : boolean = true;
//    while(duplicate)
    {

    }
    this.bookService.getBookById("999").subscribe(response=>{tempId=response.id})
    console.log(tempId);
  }

}
