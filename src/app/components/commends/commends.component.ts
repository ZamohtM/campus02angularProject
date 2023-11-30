import { Component, OnInit, Input } from '@angular/core';
import { Recession } from '../../interfaces/recession';
import { RecessionService } from "../../services/recession.service";
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map } from 'jquery';



@Component({
  selector: 'app-commends',
  templateUrl: './commends.component.html',
  styleUrl: './commends.component.css'
})
export class CommendsComponent implements OnInit {

  reviewCollection: Recession[] = [];
  showList: boolean = false;
  SelectedID: string = "";
  Review = {} as Recession;

  //CRUD
  FormNew!: FormGroup;

  reviewForm = new FormGroup({
    id: new FormControl(''),
    reply_id: new FormControl(''),
    book_id: new FormControl(''),
    user_id: new FormControl(''),
    comment: new FormControl('')
  });


  constructor(private router: Router, private recessionService: RecessionService, private formBuilder: FormBuilder) { }




  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {
    this.recessionService.getRecessions().subscribe(Response => { this.reviewCollection = Response });
  }

  ToggleCommendList() {
    this.showList = !this.showList;
  }


  GetID(id: string) {
    this.SelectedID = id;

    console.log("GOT ITEM IN PARENT" + id);

    this.propagateForm(id);
  }

  propagateForm(id: string) {
    this.recessionService.getRecessionById(id).subscribe(
      response => {
        if (Array.isArray(response) && response.length > 0) {
          this.reviewForm.patchValue({
            id: response[0].id,
            reply_id: response[0].reply_id,
            user_id: response[0].user_id,
            book_id: response[0].book_id,
            comment: response[0].comment
          });
        } else {
          console.error('Could not get Recession with ID: ' + id);
        }
      },
      error => {
        console.error('Error getRecessionById ' + Error);
      }
    );
  }


  addRec() {
    this.recessionService.addRecession(this.Review).subscribe(
      (response) => {
        console.log('rec added successfully:', response);
      },
      (error) => {
        console.error('Error adding rec:', error);
      }
    );
  }
  editRec() {
    this.recessionService.editRecession(this.Review.id, this.Review).subscribe(
      (response) => {
        console.log('rec edi suc:', response);
      },
      (error) => {
        console.error('rec edi err:', error);
      }
    );
  }
  delRec() {
    this.recessionService.removeRecession(this.Review.id).subscribe(
      (response) => {
        console.log('rec rem suc:', response);
      },
      (error) => {
        console.error('rec rem err:', error);
      }
    );
  }





  FormToReview(){
    this.Review.id = (this.reviewForm.controls['id'].value || '').toString();
    this.Review.reply_id = (this.reviewForm.controls['reply_id'].value || '').toString();
    this.Review.book_id = (this.reviewForm.controls['book_id'].value || '').toString();
    this.Review.user_id = (this.reviewForm.controls['user_id'].value || '').toString();
    this.Review.comment = (this.reviewForm.controls['comment'].value || '').toString();
  }
  onSubmit() {
    this.FormToReview();

    this.recessionService.getRecessionById(this.Review.id).subscribe(
      response => {
        if (Array.isArray(response) && response.length > 0) {
          this.editRec();
        } else {
          this.addRec();
        }
      });
    
  }
  Clear() {
    this.reviewForm.reset();
  }
  deleteComment(){
    this.FormToReview();
    this.delRec();
    this.Clear();
    alert("Kommentar gelöscht");
  }


}





