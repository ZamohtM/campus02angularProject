import {
  Component, EventEmitter,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})

export class BooksComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private bookService: BookService){}
  @Input() bookCollection: Book[] = [];
  @Input() book = {} as Book;
  @Output() notificationEvent = new EventEmitter<string>();
  editForm!: FormGroup;
  removeForm!:FormGroup;
  showEditForm : boolean = false;
  activeForm : string = "";
  editorText : string = "";
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  ngOnInit(): void {

    this.updateBookCollection();
  this.createEditForm();
  this.createRemoveForm();
  }

  addBook() {
    this.book = {
      id: this.generateUniqueRandomId(),
      title: this.title.value,
      author: this.author.value,
      year: this.year.value,
      genre: this.genre.value,
    };
    this.bookService.addBook(this.book).subscribe(
      (response) => {
        this.updateBookCollection();
        console.log('Book added successfully:', response);
        this.sendNotification("add");
      }
    );
  }
  removeBook(){
    console.log("removed book")
    this.bookService.removeBook(this.id).subscribe(response =>{
      this.updateBookCollection();
      this.sendNotification("remove");
    });

  }
  editBook(){
    this.bookService.editBook(this.id, {
      id: this.id,
      title: this.title.value,
      author: this.author.value,
      year: this.year.value,
      genre: this.genre.value,
    }).subscribe(response =>{
      this.updateBookCollection();
      this.sendNotification("edit");
    });
  }

  private createEditForm(){
    this.editForm = this.formBuilder.group(
      {
        title: ['',Validators.required],
        author: ['',Validators.required],
        year: ['',[Validators.required,Validators.pattern(/^\d{4}$/)]],
        genre: ['',Validators.required]

      })
  }

  private createRemoveForm() {
    this.removeForm = this.formBuilder.group(
      {
        ID: ['',Validators.required]
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
            this.bookService.getBookById(this.id).subscribe(
                response => {
                    if (Array.isArray(response) && response.length > 0) {
                        const bookData = response[0];

                        this.editForm.patchValue({
                            title: bookData.title,
                            author: bookData.author,
                            year: bookData.year,
                            genre: bookData.genre,
                        });

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
  get id()
  {
    return this.editorText
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
    const randomId = Math.random().toString(36).substring(2, 10);
    return randomId;
  }
  private generateUniqueRandomId(): string {
    let randomId = this.generateRandomId();
    while (this.checkIdExists(randomId)) {
      randomId = this.generateRandomId();
    }
    return randomId;
  }

  private checkIdExists(id: string): boolean {

    let exists = false;
    this.bookService.getBookById(id).subscribe(
      (_) => {

        exists = true;
      },
      (error) => {

        exists = false;
      }
    );
    return exists;
  }
  updateBookCollection()
  {
    this.bookService.getBooks().subscribe(
      (books) => {
        this.bookCollection = books;

        console.log('Updated book collection:', this.bookCollection);
      },
      (error) => {
        console.error('Error fetching updated book collection:', error);
      }
    );
  }

  sendNotification(notificationType:string)
  {
    let notification = ""
    if (notificationType=="add")
    {
      notification = "Buch hinzugefügt"
    }
    if (notificationType=="edit")
    {
      notification = "Buch bearbeitet"
    }
    if (notificationType=="remove")
    {
      notification = "Buch entfernt"
    }

    this.notificationEvent.emit(notification);
  }
}


