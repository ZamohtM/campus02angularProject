import {
  Component,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../interfaces/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})

export class BooksComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router){}
  @Output() bookCollection: Book[] = [];
  @Input() inputBook: Book = {} as Book;
  book = {} as Book;
  editForm!: FormGroup;
  removeForm!:FormGroup;
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
      () => {
        this.updateBookCollection();
        this.sendNotification("add");
      }
    );
  }
  removeBook(){
    this.bookService.removeBook(this.book.id).subscribe(() =>{
      this.updateBookCollection();
      this.sendNotification("remove");
    });

  }
  editBook(){
    this.bookService.editBook(this.book.id, {
      id: this.book.id,
      title: this.title.value,
      author: this.author.value,
      year: this.year.value,
      genre: this.genre.value,
    }).subscribe(() =>{
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
  this.refreshForm();

    if (this.activeForm!="edit")
    {
      this.activeForm="edit";
    }
    else {
      this.activeForm="";
    }

  }

  refreshForm()
  {
    this.editForm.patchValue({
      title: this.book.title,
      author: this.book.author,
      year: this.book.year,
      genre: this.book.genre,
    });
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

    alert(notification);
  }

  receiveBook($event: Book)
  {
    this.book= $event;
    this.refreshForm();
  }

  navigateToHome()
  {
    this.router.navigate(['home']);
  }
}


