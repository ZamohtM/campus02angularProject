import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Recession } from '../interfaces/recession';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recession-search',
  templateUrl: './recession-search.component.html',
  styleUrl: './recession-search.component.css'
})
export class RecessionSearchComponent implements OnInit{
  //recessions: Array<Recession> = [];
  //selectRecession: Recession | undefined;

  @Input() recessionCollection: Recession[] = [];
  @Input() recessions = {} as Recession;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.dtOptions = {
    data: this.recessionCollection,
    columns: [
      {
      title: 'ID',
      data: 'id'
      },
      {
      title: 'reply_id',
      data: 'reply_id'
      },
      {
      title: 'book_id',
      data: 'book_id'
      },
      {
      title: 'user_id',
      data: 'user_id'
      },
      {
      title: 'comment',
      data: 'comment'
      }],
    }
  }
}